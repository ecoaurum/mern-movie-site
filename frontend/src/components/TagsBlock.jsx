import React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

import { SideBlock } from './SideBlock';

export const TagsBlock = ({ items, isLoading = true }) => {
  const uniqueTags = [...new Set(items)]; // Создаем новый массив с уникальными тегами
  return (
    <SideBlock title="Актеры">
      <List>
        {(isLoading ? [...Array(5)] : uniqueTags).map((name, i) => (
          <Link
            style={{ textDecoration: 'none', color: 'black' }}
            to={`/tags/${name}`}
          >
            <ListItem key={i} disablePadding>
              <ListItemButton>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
  );
};
