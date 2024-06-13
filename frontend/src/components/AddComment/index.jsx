import React, { useState, useEffect } from 'react';
import styles from './AddComment.module.scss';
import axios from '../../axios';
// import Avatar from '@mui/material/Avatar';

export const Index = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${postId}`);
        setComments(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/comments', {
        postId,
        author,
        content,
      });
      setComments([...comments, res.data]);
      setAuthor('');
      setContent('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h3>Комментарии</h3>
      <div className={styles.root}>
        {/* <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        /> */}
        <div className={styles.form}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Ваше имя"
              required
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Ваш комментарий"
              required
            />
            <button type="submit">Добавить комментарий</button>
          </form>
        </div>
        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>
              <p>
                <strong>{comment.author}</strong>
              </p>
              <p>{comment.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
