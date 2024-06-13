// components/Comments.js
import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Index as AddComment } from '../AddComment'; // Импортируем компонент для добавления комментариев
import { CommentsBlock } from '../CommentsBlock'; // Импортируем компонент для отображения комментариев

// Компонент для управления комментариями
const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // Получаем комментарии с сервера
        const res = await axios.get(`/api/comments/${postId}`);
        setComments(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        // Обработка ошибки авторизации
        if (err.response && err.response.status === 403) {
          alert('Доступ запрещен. Пожалуйста, войдите в систему.');
        }
      }
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async (author, content) => {
    try {
      // Отправляем новый комментарий на сервер
      const res = await axios.post('/api/comments', {
        postId,
        author,
        content,
      });
      setComments([...comments, res.data]);
    } catch (err) {
      console.error(err);
      // Обработка ошибки авторизации
      if (err.response && err.response.status === 403) {
        alert('Доступ запрещен. Пожалуйста, войдите в систему.');
      }
    }
  };

  return (
    <div>
      <AddComment postId={postId} onAddComment={handleAddComment} />
      <CommentsBlock items={comments} isLoading={isLoading} />
    </div>
  );
};

export default Comments;
