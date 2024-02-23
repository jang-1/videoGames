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
    color: #870252; 
  }

  & label.Mui-focused {
    color: #870252; 
  }

  & .MuiInput-underline:before {
    border-bottom-color: #d3037c; 
  }

  & .MuiInput-underline:after {
    border-bottom-color: #870252; 
  }

  &:hover .MuiInput-underline:before {
    border-bottom-color: blue; 
  }
`;

const StyledField = forwardRef<HTMLInputElement, IStyledField & TextFieldProps>(
  ({ label, variant, ...inputProps }, ref) => {
    return <Field label={label} variant={variant} fullWidth inputRef={ref} {...inputProps} />;
  }
);

export default StyledField;
