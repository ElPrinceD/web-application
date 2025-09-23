import React, { Component } from "react";
import {
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  styled,
} from "@material-ui/core";

interface Props {
  placeholder: string;
  isAsteriskShown?: boolean;
  asteriskColor?: string;
  onChange?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  inputColor?: string;
  value?: unknown;
  borderColor?: string;
  placeholderColor?: string;
  borderRadius?: string;
  endAdornment?: React.ReactNode;
  height?: string;
  type?: string | undefined;
  bgColor?: string;
}

interface S {}

export default class CustomTextField extends Component<Props, S> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      onChange,
      onClick,
      value,
      placeholder,
      asteriskColor,
      borderColor,
      borderRadius,
      endAdornment,
      height,
      inputColor,
      isAsteriskShown,
      placeholderColor,
      type,
      bgColor
    } = this.props;
    return (
      <ThemeProvider
        theme={theme(
          inputColor,
          borderColor,
          placeholderColor,
          borderRadius,
          height
        )}
      >
        <StyledTextField
          fullWidth
          variant="outlined"
          value={value}
          type={type}
          style={{backgroundColor: bgColor, borderRadius: borderRadius ? borderRadius : "8px"}}
          label={
            !value && <Typography>
              {placeholder}
              {isAsteriskShown && <span style={{ color: asteriskColor ? asteriskColor : "red" }}> *</span>}
            </Typography>
          }
          InputLabelProps={{
            shrink: false
          }}
          onChange={onChange}
          onClick={onClick}
          InputProps={{
            endAdornment: endAdornment,
            style: { width: "100%" },
          }}
        />
      </ThemeProvider>
    );
  }
}

const theme = (
  inputColor?: Props["inputColor"],
  borderColor?: Props["borderColor"],
  placeholderColor?: Props["placeholderColor"],
  borderRadius?: Props["borderRadius"],
  height?: Props["height"],
) =>
  createTheme({
    overrides: {
      MuiOutlinedInput: {
        root: {
          height: height ? height : "48px",
          "&$focused $notchedOutline": {
            borderColor: borderColor ? borderColor : "#011342",
          },
          "&:hover $notchedOutline": {
            borderColor: borderColor ? borderColor : "#011342",
          },
          "&:active $notchedOutline": {
            borderColor: borderColor ? borderColor : "#011342",
          },
        },
        notchedOutline: {
          borderColor: borderColor ? borderColor : "#011342",
          borderRadius: borderRadius ? borderRadius : "8px",
        },
      },
      MuiFormLabel: {
        root: {
          "&.Mui-focused": {
            color: placeholderColor ? placeholderColor : "#011342",
          }
        }
      },
      MuiInputBase: {
        input: {
          color: inputColor ? inputColor : "#011342",
        },
      },
    },
  });

const StyledTextField = styled(TextField)({
  width: "100%",
  "&.MuiFormLabel-root .MuiFocused": {
    display: "none"
  }
});
