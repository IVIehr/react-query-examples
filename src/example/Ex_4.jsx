import React,{useState, useEffect} from 'react'
import { useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import fetchProjects from './hooks/fetchProjects';

function Ex_4() {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(0);

    const { isLoading, isFetching, data, error, isPreviousData, isError } = useQuery(
        ['projects', page],
        () => fetchProjects(page), {
        keepPreviousData: true, staleTime: 5000
    });

    // Prefetch the next page
    useEffect(() => {
        if (data?.hasMore) {
            // prefetch the results of a query to be placed into the cache:
            queryClient.prefetchQuery(['projects', page + 1], () => fetchProjects(page + 1));
        }
    }, [data, page, queryClient]);

  return (
      <div>
          {isLoading ? ("Loading...") : isError ? (<span>Error: {error.message}</span>) : (
              <div>
                  {data.projects.map(project => (
                      <p key={project.id}>{project.name}</p>
                  ))}
              </div>
          )}
          <div>Current Page: {page + 1}</div>
          <button
              onClick={() => setPage(old => Math.max(old - 1, 0))}
              disabled={page === 0}
              >
            Previous page
          </button>{' '}
          <button
              onClick={() => setPage(old => (data?.hasMore ? old + 1 : old))}
              disabled={isPreviousData || !data?.hasMore}
              >
              Next Page
          </button>
          {
        // Since the last page's data potentially sticks around between page requests,
        // we can use `isFetching` to show a background loading
        // indicator since our `status === 'loading'` state won't be triggered
        isFetching ? <span> Loading...</span> : null
      }{' '}
    </div>
  )
}

export default Ex_4