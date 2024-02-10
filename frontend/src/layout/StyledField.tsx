import { TextField, TextFieldProps, TextFieldVariants } from "@mui/material";
import { forwardRef } from "react";
import styled from "styled-components";

interface IStyledField {
  label: string;
  variant: TextFieldVariants | undefined;
}

const Field = styled(TextField)<TextFieldProps>`
  & .MuiInputBase-input {
    color: white;
  }

  & label {
    color: #870252; /* Kolor etykiety */
  }

  & label.Mui-focused {
    color: #870252; /* Kolor etykiety po kliknięciu */
  }

  & .MuiInput-underline:before {
    border-bottom-color: #d3037c; /* Kolor linii podkreślenia przed wprowadzeniem tekstu */
  }

  & .MuiInput-underline:after {
    border-bottom-color: #870252; /* Kolor linii podkreślenia po wprowadzeniu tekstu */
  }

  &:hover .MuiInput-underline:before {
    border-bottom-color: blue; /* Kolor linii podkreślenia po najechaniu myszką */
  }
`;

const StyledField = forwardRef<HTMLInputElement, IStyledField & TextFieldProps>(
  ({ label, variant, ...inputProps }, ref) => {
    return <Field label={label} variant={variant} fullWidth inputRef={ref} {...inputProps} />;
  }
);

export default StyledField;
