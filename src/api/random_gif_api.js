import axios from 'axios';

export default axios.create({
    baseURL: `http://api.giphy.com/v1/gifs/random`,
    headers: {
        'Content-Type': 'application/json'
    }
});