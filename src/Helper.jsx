import axios from "axios";
const adimUrl="https://restapinodejs.onrender.com/api"
export const baseURL=adimUrl;

let axiosIntance = axios.create({
  baseURL,
  
});
export {adimUrl}

export const testi_pic=(media)=>{
    return`https://restapinodejs.onrender.com/api/testimonials/photo/${media}`
}
export const team_pic=(media)=>{
    return `https://restapinodejs.onrender.com/api/team/photo/${media}`
}
export const banner_pic=(media)=>{
    return `https://restapinodejs.onrender.com/api/banner/photo/${media}`
}
export const course_pic=(media)=>{
    return `https://restapinodejs.onrender.com/api/course/photo/${media}`
}
export const blog_pic=(media)=>{
    return `https://restapinodejs.onrender.com/api/blog/image/${media}`
}
axiosIntance.interceptors.request.use(
    async function(config) {
        const token=localStorage.getItem("token") ||sessionStorage.getItem("toke")
       if (token!=null || token!=undefined) {
        config.headers["x-access-token"]=token
        
       } 
       return config
    },
    function (error) {
        return Promise.reject(error)
        
    }

);



export default axiosIntance;