import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

const cardScheme = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, 'Минимальная длина поля name: 2 символа'],
      maxlength: [30, 'Максимальная длина поля name: 30 символов'],
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (url) => validator.isURL(url),
        message: 'Некорректный URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, default: [], ref: 'user' }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

export default mongoose.model('card', cardScheme);
