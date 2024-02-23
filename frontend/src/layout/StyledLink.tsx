import { ButtonProps, styled, SxProps, Theme } from "@mui/material";
import { pink } from '@mui/material/colors';
import { Link } from "react-router-dom";

interface ILink extends ButtonProps {
    title: string
    to: string
    fsize: number
    sx?: SxProps<Theme>
}

const ColorButton = styled(Link)<ILink>(({ theme, fsize, sx }) => ({
  color: theme.palette.getContrastText(pink[900]),
  borderRadius:"5px",
  padding:"5px",
  textDecoration:"none",
  fontSize: `${fsize}px`,
  textAlign:"center",
  backgroundColor: pink[900],
  sx,
  '&:hover': {
    backgroundColor: pink[700],
  },
}));

const StyledLink:React.FC<ILink> = ({title, to, fsize, sx}) => {
 return (
   <ColorButton title={title} to={to} variant="contained" color="secondary" fsize={fsize} sx={sx}>
      {title}
   </ColorButton>
 )
}

export default StyledLink
