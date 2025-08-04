import axiosInstance from './axiosInstance';
export const login=(data: {username: string, password: string})=>{
     return axiosInstance.post('/auth/login', data);
};
export const registerApi =(data:{email: string, username:string,password:string})=>{
     return axiosInstance.post('/auth/register',data);
};
export const geUserlistApi = () =>{
     return axiosInstance.get('/user/list');
};