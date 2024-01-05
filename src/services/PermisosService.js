import axios from 'axios';

const baseUrl='https://localhost:7263/api/Permisos';

export const RegistrarPermiso =  async ( permiso={} ) => {
    try {
        const res= await axios({
            method: 'post',
            url: baseUrl+'/RequestPermission',
            data: permiso
        });
        return res.data;
      } catch (error) {
        return error.response.data;
      }
    
};

export const ObtenerPermisos= async()=>{
    try {
        const res = await axios({
            method: 'get',
            url: baseUrl+'/GetPermissions',
        });
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.log(error)
    }
}