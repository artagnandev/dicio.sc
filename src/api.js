import axios from 'axios';

const api = axios.create({
  baseURL: 'https://significado.herokuapp.com/meanings',
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*'
   }
})

export default api;