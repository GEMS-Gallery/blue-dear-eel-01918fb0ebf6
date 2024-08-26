import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { AppBar, Toolbar, Typography, Container, Button, CircularProgress, Card, CardContent, Grid } from '@mui/material';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

const HeroSection = styled('div')(({ theme }) => ({
  backgroundImage: 'url(https://images.unsplash.com/photo-1613843433065-819a04a47a09?ixid=M3w2MzIxNTd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ2OTI2NDN8&ixlib=rb-4.0.3)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  padding: theme.spacing(8, 0, 6),
  marginBottom: theme.spacing(4),
}));

const FloatingButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openPostForm, setOpenPostForm] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const fetchedPosts = await backend.getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    setLoading(false);
  };

  const handleCreatePost = async (title, body, author) => {
    try {
      await backend.createPost(title, body, author);
      setOpenPostForm(false);
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Crypto Blog</Typography>
        </Toolbar>
      </AppBar>
      <HeroSection>
        <Container>
          <Typography variant="h2" gutterBottom>
            Welcome to Crypto Blog
          </Typography>
          <Typography variant="h5">
            Explore the latest insights in the world of cryptocurrency
          </Typography>
        </Container>
      </HeroSection>
      <Container>
        {loading ? (
          <CircularProgress />
        ) : (
          <PostList posts={posts} />
        )}
      </Container>
      <FloatingButton
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpenPostForm(true)}
      >
        Create Post
      </FloatingButton>
      <PostForm
        open={openPostForm}
        onClose={() => setOpenPostForm(false)}
        onSubmit={handleCreatePost}
      />
    </>
  );
}

export default App;
