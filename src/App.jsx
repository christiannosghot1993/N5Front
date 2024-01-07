import { useEffect, useState } from 'react'
import './App.css'
import { Loader } from './components/Loader/Loader'
import { TableData } from './components/Table/TableData'
import { getEndpoint } from './services/PermisosService';
import { ButtonIcon } from './components/ButtonIcon/ButtonIcon';
import AddIcon from '@mui/icons-material/Add';
import { Container, CssBaseline, Grid, ThemeProvider, createTheme, } from '@mui/material';
import { KeepMountedModal } from './components/KeepMountedModal/KeepMountedModal';

const defaultTheme = createTheme();

function App() {
  useEffect(() => {
    const obtenerDatos = async () => {
      const res = await getEndpoint('/GetPermissions');
      setTimeout(() => {
        setPermisos(res);
      }, 2000);
    };
    obtenerDatos();
  }, []);
  const [permisos, setPermisos] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [modalInfo, setmodalInfo] = useState({
    'id': 0,
    'nombreEmpleado': '',
    'apellidoEmpleado': '',
    'fechaPermiso': new Date(),
    'tipoPermiso': 0,
    'descripcionTipoPermiso': ''
  });
  const handleModal = () => {
    setmodalInfo({
      'id': 0,
      'nombreEmpleado': '',
      'apellidoEmpleado': '',
      'fechaPermiso': new Date(),
      'tipoPermiso': 0,
      'descripcionTipoPermiso': ''
    });
    setViewModal(true);
  };
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main">
          <CssBaseline />
          <Grid container>
            <Grid item xs={12} md={11} >
              <h1>Listado de permisos</h1>
            </Grid>
            <Grid item xs={12} md={1}>
              <ButtonIcon handleClick={handleModal} >
                <AddIcon />
              </ButtonIcon>
            </Grid>
          </Grid>
          {
            permisos.length == 0 ?
              <Loader /> :
              <TableData permisos={permisos} openModal={handleModal} setmodalInfo={setmodalInfo} />
          }
          <KeepMountedModal open={viewModal} handleClose={setViewModal} dataModal={modalInfo} />
        </Container>
      </ThemeProvider>

    </>
  )
}

export default App
