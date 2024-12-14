import { ButtonHTMLAttributes } from "react";
import { Button, ButtonProps, SxProps, Theme, styled } from "@mui/material";
import { pink } from '@mui/material/colors';

interface IButton {
  title?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  sx?: SxProps<Theme>;
  fsize?: number;
  isActive?: boolean;
  variant?: string;
  disabled?: boolean;
}

const ColorButton = styled(Button)<ButtonProps & IButton>(({ theme, sx, fsize, isActive }) => ({
  color: theme.palette.getContrastText(pink[900]),
  backgroundColor: isActive ? pink[700] : pink[900],
  fontSize: `${fsize}px`,
  sx,
  '&:hover': {
    backgroundColor: isActive ? pink[700] : pink[900],
  },
}));

const StyledButton: React.FC<IButton> = ({
  title,
  type,
  onClick,
  sx,
  fsize,
  isActive,
  variant,
  disabled,
}) => {
  return (
    <ColorButton
      variant={!variant ? "contained" : "outlined"}
      disabled={disabled}
      color="secondary"
      type={type}
      onClick={onClick}
      sx={sx}
      fsize={fsize}
      isActive={isActive}
    >
      {title}
    </ColorButton>
  );
};

export default StyledButton;