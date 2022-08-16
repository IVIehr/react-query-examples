import React from 'react'
import usePost from './../hooks/usePost';
import {useQueryClient } from '@tanstack/react-query';


const Post = ({postId, setPostId}) => {
  const { status, data, error, isFetching, isLoading } = usePost(postId);
  return (
    <div>
      <div>
        <a href="#" onClick={() => setPostId(-1)}>Back</a>
      </div>
      {!postId || isLoading ? (
        "Loading..."
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
      <>
        <h1>{data.title}</h1>
        <div>
          <p>{data.body}</p>
              </div>
              <div>{isFetching ? "Backgournd Updating..." : ""}</div>
      </>
      )
      }
      </div>
  )
}

export default Post