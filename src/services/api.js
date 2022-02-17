import axios from 'axios';

const api = axios.create({
  baseURL: 'https://discio-api.herokuapp.com/',
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})

export default api;