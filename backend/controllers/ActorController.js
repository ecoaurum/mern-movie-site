import ActorModel from '../models/Actor.js';

// Создание нового актера
export const createActor = async (req, res) => {
  try {
    const doc = new ActorModel({
      name: req.body.name,
      photo: req.body.photo,
      dateOfBirth: req.body.dateOfBirth,
      placeOfBirth: req.body.placeOfBirth,
      dateOfDeath: req.body.dateOfDeath,
      placeOfDeath: req.body.placeOfDeath,
      height: req.body.height,
      career: req.body.career,
      genres: req.body.genres,
      styles: req.body.styles,
      biography: req.body.biography,
    });

    const actor = await doc.save();
    return res.status(200).json(actor);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не удалось создать актера',
    });
  }
};

// Получение всех актеров
export const getAllActors = async (req, res) => {
  try {
    const actors = await ActorModel.find();
    return res.json(actors);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не удалось получить актеров',
    });
  }
};

// Получение одного актера по имени
export const getActorByName = async (req, res) => {
  try {
    const actorName = req.params.name;
    const actor = await ActorModel.findOne({ name: actorName });

    if (!actor) {
      return res.status(404).json({ message: 'Актер не найден' });
    }

    return res.json(actor);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не удалось получить информацию об актере',
    });
  }
};

// Получение одного актера по ID
export const getActorById = async (req, res) => {
  try {
    const actorId = req.params.id;
    const actor = await ActorModel.findById(actorId);

    if (!actor) {
      return res.status(404).json({ message: 'Актер не найден' });
    }

    return res.json(actor);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не удалось получить информацию об актере',
    });
  }
};

// Обновление информации об актере
export const updateActor = async (req, res) => {
  try {
    const actorId = req.params.id;
    await ActorModel.findByIdAndUpdate(
      {
        _id: actorId,
      },
      {
        name: req.body.name,
        photo: req.body.photo,
        dateOfBirth: req.body.dateOfBirth,
        placeOfBirth: req.body.placeOfBirth,
        dateOfDeath: req.body.dateOfDeath,
        placeOfDeath: req.body.placeOfDeath,
        height: req.body.height,
        career: req.body.career,
        genres: req.body.genres,
        styles: req.body.styles,
        biography: req.body.biography,
      }
    );
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить актера',
    });
  }
};

// Удаление актера
export const removeActor = async (req, res) => {
  try {
    const actorId = req.params.id;
    await ActorModel.findByIdAndDelete(actorId);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не удалось удалить актера',
    });
  }
};
