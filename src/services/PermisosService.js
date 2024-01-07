import axios from 'axios';

const baseUrl='https://localhost:7263/api/Permisos';

export const postEndpoint =  async ( data={}, endpoint ) => {
    try {
        const res= await axios({
            method: 'post',
            url: baseUrl+endpoint,
            data
        });
        return res.data;
      } catch (error) {
        return error.response.data;
      }
    
};

export const getEndpoint= async(endpoint, params)=>{
    try {
        const res = await axios({
            method: 'get',
            url: baseUrl+endpoint,
            params
        });
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export const putEndpoint =  async ( data={}, endpoint ) => {
    try {
        const res= await axios({
            method: 'put',
            url: baseUrl+endpoint,
            data
        });
        return res.data;
      } catch (error) {
        return error.response.data;
      }
    
};