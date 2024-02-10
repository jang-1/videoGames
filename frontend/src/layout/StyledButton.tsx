import { ButtonHTMLAttributes } from "react";

import { Button, ButtonProps, styled } from "@mui/material";
import { pink } from '@mui/material/colors';

interface IButton {
    title: string
    color: string
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
}


const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(pink[900]),
  backgroundColor: pink[900],
  '&:hover': {
    backgroundColor: pink[700],
  },
}));


const StyledButton:React.FC<IButton> = ({title, type}) => {
 return (
   <ColorButton variant="contained" color="secondary" type={type}>
      {title}
   </ColorButton>
 )
}

export default StyledButton
