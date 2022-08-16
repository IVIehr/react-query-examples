import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// It does not cache data
const usePosts = () => {
    return useQuery(['posts'], async () => {
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
        return data;
    });
}
export default usePosts;