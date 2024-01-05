import { useEffect, useState } from 'react'
import './App.css'
import { Loader } from './components/Loader/Loader'
import { TableData } from './components/Table/TableData'
import { ObtenerPermisos } from './services/PermisosService';
import { ButtonIcon } from './components/ButtonIcon/ButtonIcon';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Grid } from '@mui/material';
import { KeepMountedModal } from './components/KeepMountedModal/KeepMountedModal';

function App() {
  useEffect(() => {
    const obtenerDatos = async () => {
      const res = await ObtenerPermisos();
      setTimeout(() => {
        setPermisos(res);
      }, 2000);
    };
    obtenerDatos();
  }, []);
  const [permisos, setPermisos] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const handleModal=()=>setViewModal(true);
  return (
    <>
      <Grid container>
        <Grid item sm={12} md={10}>
          <h1>Listado de permisos</h1>
        </Grid>
        <Grid item sm={12} md={2}>
          <ButtonIcon handleClick={handleModal}>
            <AddBoxIcon/> Nuevo permiso
          </ButtonIcon>
        </Grid>
      </Grid>
      {
        permisos.length == 0 ?
          <Loader /> :
          <TableData permisos={permisos} />
      }
      <KeepMountedModal open={viewModal} handleClose={setViewModal}/>
    </>
  )
}

export default App
