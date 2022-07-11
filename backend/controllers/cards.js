const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((result) => res.send(result))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные: ${error.message}`));
        return;
      }
      next(error);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { id } = req.params;

  Card.findById(id)
    .orFail(() => new NotFoundError('Карточка не найдена.'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Нет прав для удаления этой карточки.'));
      }
      return card.remove()
        .then(() => res.status(200).send({ message: 'Карточка удалена' }));
    })
    .catch(next);
};

module.exports.setLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate('owner')
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена.');
      }
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }
      next(error);
    });
};

module.exports.removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .populate('owner')
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена.');
      }
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }
      next(error);
    });
};
