import React from 'react'
import { useInView } from 'react-intersection-observer'
import {
    useInfiniteQuery,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query"
import axios from 'axios'

  
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
            const res = await axios.get('/api/projects?cursor=' + pageParam);
            return res.data;
        }, {
            getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
            getNextPageParam: (lastPage) => lastPage.nextId ?? undefined
        },
        );
  return (
    <div>Example-one</div>
  )
}

export default Example_one