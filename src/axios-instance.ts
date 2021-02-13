import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://unitn-fisica-simulatore-react.firebaseio.com/',
});

export default instance;
