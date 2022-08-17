import axios from 'axios';
const apiEndpoint = 'https://j27d4s.sse.codesandbox.io';
const fetchProjects = async (page = 0) => {
    const { data } = await axios.get(apiEndpoint + '/api/projects?page=' + page);
    return data;
}

export default fetchProjects