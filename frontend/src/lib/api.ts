import axios from 'axios'

//TODO: set right url
export const api = axios.create({
  baseURL: 'https://some-domain.com/api/',
})
