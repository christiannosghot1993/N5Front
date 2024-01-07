import { Fab } from "@mui/material";


export const ButtonIcon = (props) => {

  const onClick = () => props.handleClick();
  return (
    <Fab color="primary" aria-label="add" onClick={onClick} sx={
      {
        marginTop:{
          md:'15px'
        },
        marginBottom:{
          xs:'10px',
          md:'0px'
        }
      }
    }>
      {props.children}
    </Fab>
  )
}
