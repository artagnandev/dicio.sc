import axios from 'axios';

const api = axios.create({
  baseURL: 'https://significado.herokuapp.com/meanings/'
})

export default api;