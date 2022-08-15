import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import {
    useInfiniteQuery,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query"
import axios from 'axios'

const apiEndpoint = 'https://heh46g.sse.codesandbox.io';
  
const Example_one = () => {
    // when an element enters or leaves the viewport.
    const { ref, inView } = useInView();
    //  Assign the ref to the DOM element you want to monitor, and the hook will report the status.

    const { status, data, error, isFetching, isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage, } = useInfiniteQuery(['projects'], async ({ pageParam = 0 }) => {
            const res = await axios.get(apiEndpoint + '/api/projects?cursor=' + pageParam);
            return res.data;
        }, {
            getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
            getNextPageParam: (lastPage) => lastPage.nextId ?? undefined
        },
        );
    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    },[inView])
  return (
      <div>
          <h1>Infinitie Loading</h1>
          {status === 'loading' ? (
              <p>Loading...</p>
          ) : status === 'error' ? (
                <span>Error: {error.message}</span>
              ) : (
                      <>
                          <div>
                              <button
                                  onClick={() => fetchPreviousPage}
                                  disabled={!hasPreviousPage || isFetchingNextPage}
                              >
                                  {isFetchingPreviousPage ? 'Loading more...':hasPreviousPage ? 'Load older':'Nothing more to load'}     
                              </button>
                          </div>
                      </>
          )}
      </div>
  )
}

export default Example_one