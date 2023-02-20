'use client'
import AddPost from './components/AddPost';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Post from './components/Post';
import { PostsType } from './types/Posts';
import { ReactNode } from 'react';

const allPosts = async () => {
  const response = await axios.get('/api/posts/getPosts');
  return response.data;
}

export default function Home(): ReactNode {
  const { data, error, isLoading } = useQuery<PostsType[]>({ queryFn: allPosts, queryKey: ['posts']})
  //if(error) return error;
  if(isLoading) return 'Loading...'
  
  return (
    <main>
      <AddPost /> 
      {data?.map((post) => (
        <Post 
          key={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          id={post.id}
          comments={post.comments!}
        />
      ))}
    </main>
  )
}
