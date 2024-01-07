import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableBody } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { getEndpoint } from '../../services/PermisosService'
function formatoFecha(date) {
    const año = date.getFullYear();
    const mes = ('0' + (date.getMonth() + 1)).slice(-2);
    const dia = ('0' + date.getDate()).slice(-2);
    return `${año}-${mes}-${dia}`;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const TableData = ({ permisos, openModal, setmodalInfo }) => {
    const handleEdit = (idEmpleado) => {
        const resp = async () => {
            const resp = await getEndpoint('/GetPermissionById', { 'id': idEmpleado })
            setmodalInfo({
                'id': resp.id,
                'nombreEmpleado': resp.nombreEmpleado,
                'apellidoEmpleado': resp.apellidoEmpleado,
                'fechaPermiso': resp.fechaPermiso,
                'tipoPermiso': resp.tipoPermiso,
                'descripcionTipoPermiso': ''
            });
        };
        resp();
        openModal(true);

    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right">Nombre Empleado</StyledTableCell>
                        <StyledTableCell align="right">Apellido Empleado</StyledTableCell>
                        <StyledTableCell align="right">Fecha Permiso</StyledTableCell>
                        <StyledTableCell align="right">Tipo Permiso</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {permisos
                        .sort((a, b) => b.id - a.id)
                        .map((data, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="right">
                                    <ButtonIcon handleClick={() => handleEdit(data.id)}>
                                        <ModeEditIcon />
                                    </ButtonIcon>
                                </StyledTableCell>
                                <StyledTableCell align="right">{data.nombreEmpleado}</StyledTableCell>
                                <StyledTableCell align="right">{data.apellidoEmpleado}</StyledTableCell>
                                <StyledTableCell align="right">{formatoFecha(new Date(data.fechaPermiso))}</StyledTableCell>
                                <StyledTableCell align="right">{data.tipoPermisoNavigation.descripcion}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
