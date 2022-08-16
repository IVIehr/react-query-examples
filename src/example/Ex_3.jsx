import React, {useState} from 'react'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Ex_3 = () => {
    const queryClient = useQueryClient();
    const [value, setValue] = useState('');

    const { status, data, error, isLoading, isFetching, isError } = useQuery(['todos'], async () => {
        const res = await axios.get("/api/data");
        return res.data;
    });

    const addMutation = useMutation(value => fetch(`/api/data?add=${value}`), { onSuccess: () => queryClient.invalidateQuery(['todos']) });
    const clearMutation = useMutation(value => fetch(`/api/data?clear=1`), {
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
    </div>
  )
}

export default Ex_3;
