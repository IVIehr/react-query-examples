import React, {useState} from 'react'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const Ex_3 = () => {
    const queryClient = useQueryClient();
    const [value, setValue] = useState('');
    const [intervalMs, setIntervalMs] = React.useState(1000)

    const {data, error, isLoading, isFetching, isError } = useQuery(['todos'], async () => {
        const res = await axios.get('/api/data');
        return res.data,
        {
          // Refetch the data every second
          refetchInterval: intervalMs,
        };
    });

    const addMutation = useMutation(value => fetch(`/api/data?add=${value}`),
        { onSuccess: () => queryClient.invalidateQuery(['todos']) });
    const clearMutation = useMutation(() => fetch(`/api/data?clear=1`), {
        onSuccess: () => queryClient.invalidateQueries(['todos'])
    });

    if (isLoading) return <h4>Loading...</h4>
    if (isError) return <span>Error: {error.message}</span>
  return (
      <div>
          <h1>Auto Refetch with stale-time set to 1s</h1>
          <span
          style={{
            display: 'inline-block',
            marginLeft: '.5rem',
            width: 10,
            height: 10,
            background: isFetching ? 'green' : 'transparent',
            transition: !isFetching ? 'all .3s ease' : 'none',
            borderRadius: '100%',
            transform: 'scale(2)',
          }}
          />
          <form onSubmit = {e => {
              e.preventDefault();
              addMutation.mutate(value, {
                  onSuccess: () => {
                      setValue('')
                  }
              })
          }}>
            <input
            placeholder="enter something"
            value={value}
            onChange={(ev) => setValue(ev.target.value)}
            />
          </form>
            <ul>
                {data.map(item => (
                    <li key={item}>item</li>
                ))}
            </ul>
            <div>
                <button onClick={() => {
                    clearMutation.mutate()
                }}>
                    Clear All
                </button>
                <ReactQueryDevtools initialIsOpen={false} />
            </div>
    </div>
  )
}

export default Ex_3;
