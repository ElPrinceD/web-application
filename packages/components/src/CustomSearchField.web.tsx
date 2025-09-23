import React, { Component } from "react";
import {
  InputAdornment,
  TextField,
  ThemeProvider,
  createTheme,
  styled,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

interface Props {
  placeholder: string;
  onChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  inputColor: string;
  borderColor: string;
  placeholderColor: string;
  searchIconColor: string;
  borderRadius: string;
}

interface S {}

export default class CustomSearchField extends Component<Props, S> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <ThemeProvider theme={theme(this.props.inputColor, this.props.borderColor, this.props.placeholderColor, this.props.borderRadius)}>
        <StyledTextField
          variant="outlined"
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search style={{ color: this.props.searchIconColor }} />
              </InputAdornment>
            ),
            style: { width: "100%" },
          }}
        />
      </ThemeProvider>
    );
  }
}

const theme = (inputColor: Props["inputColor"], borderColor: Props["borderColor"] ,placeholderColor: Props["placeholderColor"], borderRadius: Props["borderRadius"]) =>
  createTheme({
    overrides: {
      MuiOutlinedInput: {
        root: {
          width: "390px",
          height: "48px",
          "&$focused $notchedOutline": {
            borderColor: borderColor,
          },
          '&:hover $notchedOutline': {
            borderColor: borderColor,
          },
          '&:active $notchedOutline': {
            borderColor: borderColor,
        },
        },
        notchedOutline: {
          borderColor: borderColor,
          borderRadius: borderRadius,
        },
      },
      MuiInputBase: {
        input: {
          color: inputColor,
          "&::placeholder": {
            color: placeholderColor,
            opacity: 1,
          },
        },
      },
    },
  });

const StyledTextField = styled(TextField)({
  width: "100%",
});
