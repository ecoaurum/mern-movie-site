import OrderWishModel from '../models/OrderWish.js';

// Создать новое пожелание
export const createOrderWish = async (req, res) => {
  const { author, content } = req.body;
  try {
    const newOrderWish = new OrderWishModel({ author, content });
    await newOrderWish.save();
    return res.status(201).json(newOrderWish);
  } catch (err) {
    return res.status(500).json({
      message: 'Не удалось создать пожелание',
    });
  }
};

// Получить все пожелания
export const getOrderWishes = async (req, res) => {
  try {
    const orderWishes = await OrderWishModel.find().exec();
    return res.status(200).json(orderWishes);
  } catch (err) {
    return res.status(500).json({
      message: 'Не удалось получить пожелания',
    });
  }
};
