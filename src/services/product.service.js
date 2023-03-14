import axios from "axios";

class ProductService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
    });
    //here we intercept every request that uses this api and call a middleware function
    this.api.interceptors.request.use((config)=>{
        //inside this middleware function the first thing we do is get the token from the localStorage
const storedToken = localStorage.getItem("authToken")
// if there is a token we're going to add it to the headers of the request

if(storedToken){
    //here we pass to the headers an object with Authorization and the Bearer token
    config.headers = {Authorization: `Bearer ${storedToken}`}
}
return config;
    })
  }


  //Create the methods to connet to the api

  //Get all product
  
  getAllProducts = () => {
    return this.api.get("/api/products")
    //this is the same as axios.get(`${import.meta.env.VITE_API_URL}/api/projects`)
  }
  
  //create a product 
  //body refers to the object with title and description
  createProduct = (body) => {
  return this.api.post("/api/products", body)
  }

  getSingleProduct = (id) =>{
    return this.api.get(`/api/products/${id}`)
  }

  getAllBoughtProducts = () => {
    return this.api.get("/api/products/bought")
}

getSingleBoughtProduct = (id) =>{
  return this.api.get(`/api/products/bought/${id}`)
}

}

const productService = new ProductService()

export default productService