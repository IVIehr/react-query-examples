import React from 'react';
import usePosts from '../hooks/usePosts';
import {useQueryClient } from '@tanstack/react-query';


const Posts = ({ setPostId }) => {
    const queryClient = useQueryClient();
    const { status, data, error, isFetching, isLoading } = usePosts();

    return (
      <div>
            <h1>Posts</h1>
            <div>
                {isLoading ? ("Loading...") : status === 'error' ? (<span>Error: {error.message}</span>) : (
                    <>
                        <div>
                            {data.map(post => (
                                <p key={post.id}>
                                    <a href="#"
                                    onClick={() => setPostId(post.id)}
                                    style={
                                        queryClient.getQueryData(["post", post.id]) ?
                                        { fontWeight: 'bold', color: 'blue' } : {}
                                    }
                                    >
                                    {post.title}
                                    </a>
                                </p>
                            ))}
                        </div>
                        <div>{isFetching ? "Background Updating...": ""}</div>
                    </>
                )}
            </div>
      </div>
  )
}

export default Posts