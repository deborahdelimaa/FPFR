import axios from 'axios';

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5005',
    });
    //here we intercept every request that uses this api and call a middleware function
    this.api.interceptors.request.use((config) => {
      //inside this middleware function the first thing we do is get the token from the localStorage
      const storedToken = localStorage.getItem('authToken');
      // if there is a token we're going to add it to the headers of the request

      if (storedToken) {
        //here we pass to the headers an object with Authorization and the Bearer token
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
}

updateImage = (file) => {
    return this.api.post("/api/upload", file)
  }


}

const userService = new UserService();

export default userService;