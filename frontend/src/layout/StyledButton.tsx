import { ButtonHTMLAttributes } from "react";

import { Button, ButtonProps, SxProps, Theme, styled } from "@mui/material";
import { pink } from '@mui/material/colors';

interface IButton {
    title?: string
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
    onClick?: (e?:any) => void; 
    sx?: SxProps<Theme>
    fsize?: number
    isActive?: boolean
    variant?: string
}


const ColorButton = styled(Button)<ButtonProps & IButton>(({ theme, sx, fsize, isActive }) => ({
  color: theme.palette.getContrastText(pink[900]),
  backgroundColor: isActive ? pink[700] : pink[900],
  fontSize:  `${fsize}px`,
  sx,
  '&:hover': {
    backgroundColor: isActive ? pink[700] : pink[900],
  },
}));


const StyledButton:React.FC<IButton> = ({title, type, onClick, sx, fsize, isActive, variant}) => {
 return (
   <ColorButton variant={!variant ? "contained" : "outlined"} color="secondary" type={type} onClick={onClick} sx={sx} fsize={fsize} isActive={isActive}>
      {title}
   </ColorButton>
 )
}

export default StyledButton
