import Card from '../models/Card';
import BadRequest from '../errors/BadRequest';
import NotFoundError from '../errors/NotFoundError';
import ForbiddenError from '../errors/ForbiddenError';

export const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((error) => next(error));
};

export const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      Card.findById(card._id)
        .populate('owner')
        .then((data) => res.status(201).send(data))
        .catch((error) => next(error));
    })
    .catch((error) => (error.name === 'ValidationError'
      ? next(
        new BadRequest('Переданы некоррекнтые данные при создании карточки'),
      )
      : next(error)));
};

export const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка с указанным _id не найдена'));
      }
      if (card.owner.toString() !== req.user._id) {
        return next(
          new ForbiddenError('Карточка другого пользователя, ее нельзя удалить'),
        );
      }
      return Card.deleteOne(card).then(() => {
        res.status(200).send({ message: 'Карточка удалена' });
      });
    })
    .catch(next);
};

export const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка отсутствует');
      }
      res.status(200).send(card);
    })
    .catch((error) => next(error));
};

export const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка Отсутствует');
      }
      res.status(200).send(card);
    })
    .catch((error) => next(error));
};
