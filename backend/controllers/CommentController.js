import CommentModel from '../models/Comment.js';
import PostModel from '../models/Post.js';

// Создать новый комментарий
export const createComment = async (req, res) => {
  const { postId, author, content } = req.body;
  try {
    const newComment = new CommentModel({ postId, author, content });
    await newComment.save();
    res.status(201).json(newComment);

    // Увеличение количество просмотров комментариев для соответствующего поста
    const post = await PostModel.findById(postId);
    post.commentsCount += 1;
    await post.save();
  } catch (err) {
    // res.status(400).json({ error: err.message });
    res.status(500).json({
      message: 'Не удалось создать комментарий',
    });
  }
};

// Получить комментарии для поста
export const getComment = async (req, res) => {
  try {
    const comments = await CommentModel.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (err) {
    // res.status(400).json({ error: err.message });
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить комментарий для поста',
    });
  }
};

// Удаление комментария
export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;

    // Удаление комментария
    const deletedComment = await CommentModel.findByIdAndDelete(commentId);

    // Уменьшение commentsCount для соответствующего поста
    const post = await PostModel.findById(deletedComment.post);
    post.commentsCount -= 1;
    await post.save();

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось удалить комментарий',
    });
  }
};
