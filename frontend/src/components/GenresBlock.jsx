import React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

import { SideBlock } from './SideBlock';

export const GenresBlock = ({ items, isLoading = true }) => {
  return (
    <SideBlock title="Стили боевых искусств">
      <List>
        {(isLoading ? [...Array(5)] : Array.from(new Set(items))).map(
          (
            name,
            i // Убираем дублирование жанров при отображении
          ) => (
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              to={`/genres/${name}`}
              key={i} // Добавляем ключ для элементов списка
            >
              <ListItem disablePadding>
                <ListItemButton>
                  {isLoading ? (
                    <Skeleton width={100} />
                  ) : (
                    <ListItemText primary={name} />
                  )}
                </ListItemButton>
              </ListItem>
            </Link>
          )
        )}
      </List>
    </SideBlock>
  );
};
