import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

function PostList({ posts }) {
  return (
    <Grid container spacing={4}>
      {posts.map((post) => (
        <Grid item key={post.id} xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {post.body}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                By {post.author} | {new Date(Number(post.timestamp) / 1000000).toLocaleString()}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
}

export default PostList;
