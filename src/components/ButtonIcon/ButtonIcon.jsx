
import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material'; // Importa el icono que desees

export const ButtonIcon = (props) => {

  const onClick=()=>props.handleClick();
  return (
    <IconButton aria-label="Delete" onClick={onClick}>
      {
        props.children
      }
    </IconButton>
  )
}
