import axios from "axios";

class ProjectService {
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

  //Get all projects
  
  getAllProjects = () => {
    return this.api.get("/api/projects")
    //this is the same as axios.get(`${import.meta.env.VITE_API_URL}/api/projects`)
  }
  
  //create a project 
  //body refers to the object with title and description
  createProject = (body) => {
  return this.api.post("/api/projects", body)
  }

  getSingleProject = (id) =>{
    return this.api.get(`/api/projects/${id}`)
  }
}



const projectService = new ProjectService()

export default projectService