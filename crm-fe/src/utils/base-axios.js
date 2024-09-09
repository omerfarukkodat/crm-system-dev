import axios from 'axios';

export const customerAxios= axios.create({
    baseURL:'http://localhost:8088/api/v1/customers',
});
export const userAuthAxios= axios.create({
    baseURL:'http://localhost:8088/api/v1/auth',
});