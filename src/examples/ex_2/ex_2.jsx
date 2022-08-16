import React,{useState} from 'react'
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Posts from './components/Posts';
import Post from './components/Post';

const queryClient = new QueryClient();

const Ex_2 = () => {
    const [postId, setPostId] = useState(-1);
    
    return (
        <QueryClientProvider client={queryClient}>
            {postId > -1 ? (
                <Post postId={postId} setPostId={setPostId} />
            ) : (
                <Posts setPostId={setPostId} />
            )}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default Ex_2