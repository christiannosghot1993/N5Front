import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { getEndpoint, postEndpoint, putEndpoint } from '../../services/PermisosService';
import FormControl from '@mui/material/FormControl';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function formatoFecha(date) {
  const año = date.getFullYear();
  const mes = ('0' + (date.getMonth() + 1)).slice(-2);
  const dia = ('0' + date.getDate()).slice(-2);
  return `${año}-${mes}-${dia}`;
}

export const KeepMountedModal = ({ open, handleClose, dataModal }) => {
  useEffect(() => {
    const obtenerData = async () => {
      const res = await getEndpoint('/GetPermissionsType');
      setdata(res);
    };
    obtenerData();
  }, []);
  useEffect(() => {
    if(dataModal.id!=0){
      setSelectedPermissionType(dataModal.tipoPermiso);
      setnombre(dataModal.nombreEmpleado);
      setapellido(dataModal.apellidoEmpleado);
      setFecha(formatoFecha(new Date(dataModal.fechaPermiso)));
      settituloModal('Editar Permiso');
    }else{
      setSelectedPermissionType('');
      setnombre('');
      setapellido('');
      setFecha(formatoFecha(new Date()));
      settituloModal('Nuevo Permiso')
    }
  }, [dataModal])
  
  
  const [data, setdata] = useState([]);
  const [selectedPermissionType, setSelectedPermissionType] = useState('');
  const [nombre, setnombre] = useState('');
  const [apellido, setapellido] = useState('');
  const [Fecha, setFecha] = useState(formatoFecha(new Date()));
  const [tituloModal, settituloModal] = useState('')

  const handleSubmitChange = (event) => {
    setSelectedPermissionType(event.target.value);
  };
  const handleNombreChange = (e) => {
    setnombre(e.target.value);
  };
  const handleApellidoChange = (e) => {
    setapellido(e.target.value);
  };
  const handleFechaChange = (e) => {
    setFecha(e.target.value)
  };
  const handleSubmitForm = (e) => {
    // e.preventDefault();
    const guardarPermiso = async () => {
      
      if(tituloModal==='Nuevo Permiso'){
        const data = {
          'id': 0,
          'nombreEmpleado': nombre,
          'apellidoEmpleado': apellido,
          'fechaPermiso': Fecha,
          'tipoPermiso': selectedPermissionType,
          'descripcionTipoPermiso': ''
        };
        await postEndpoint(data, '/RequestPermission');
      }else{
        const data = {
          'id': dataModal.id,
          'nombreEmpleado': nombre,
          'apellidoEmpleado': apellido,
          'fechaPermiso': Fecha,
          'tipoPermiso': selectedPermissionType,
          'descripcionTipoPermiso': ''
        }
        await putEndpoint(data, '/ModifyPermission');
      }
    }
    guardarPermiso();
  };
  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          sx={style}
        >
          <Typography component="h1" variant="h5">
            {tituloModal}
          </Typography>
          <Box component="form" onSubmit={handleSubmitForm} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nombre empleado"
              type='text'
              value={nombre}
              onChange={handleNombreChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Apellido Empleado"
              value={apellido}
              onChange={handleApellidoChange}
              type="text"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              // label="Fecha del permiso"
              type="date"
              value={Fecha}
              onChange={handleFechaChange}
              id="fechaPermiso"
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Tipo Permiso</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedPermissionType}
                required
                label="Tipo permiso"
                onChange={handleSubmitChange}
              >
                {
                  data.map((item, index) => (
                    <MenuItem key={index} value={item.id}>{item.descripcion}</MenuItem>
                  ))
                }

              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Guardar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}