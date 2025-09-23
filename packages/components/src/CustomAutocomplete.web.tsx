import React, { Component } from "react";
import { TextField, Typography } from "@material-ui/core";
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@material-ui/lab";

interface Props {
  options: any[];
  value: any;
  label: string;
  getOptionLabel?: ((option: any) => string) | undefined;
  isAsteriskShown: boolean;
  asteriskColor?: string;
  border?: string;
  borderRadius?: string;
  disabled?: boolean;
  labelColor?: string;
  optionsBoxBorder?: string;
  optionsBoxBorderRadius?: string;
  optionBackgroundColor?: string;
  fontSize?: string;
  fontWeight?: number;
  optionColor?: string;
  disableClearable?: boolean;
  error?: boolean;
  onChange:
    | ((
        event: React.ChangeEvent<{}>,
        value: any,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<any> | undefined
      ) => void)
    | undefined;
}

interface S {}

export default class CustomAutocomplete extends Component<Props, S> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      options,
      value,
      onChange,
      label,
      isAsteriskShown,
      asteriskColor,
      border,
      borderRadius,
      labelColor,
      optionsBoxBorder,
      optionsBoxBorderRadius,
      optionBackgroundColor,
      optionColor,
      fontSize,
      fontWeight,
      error
    } = this.props;

    return (
      <>
        <style>
          {webStyles(
            labelColor,
            optionsBoxBorder,
            optionsBoxBorderRadius,
            optionBackgroundColor,
            optionColor,
            fontSize,
            fontWeight
          )}
        </style>
        <Autocomplete
          classes={{
            root: "customAutocomplete-root",
            inputRoot: "customAutocomplete-root",
            listbox: "MuiAutocomplete-listbox",
            option: "MuiAutocomplete-option",
            paper: "MuiAutocomplete-paper",
          }}
          options={options}
          value={value}
          disableClearable={this.props.disableClearable}
          getOptionLabel={this.props.getOptionLabel}
          disabled={this.props.disabled ? this.props.disabled : false}
          onChange={onChange}
          style={{
            borderRadius: borderRadius ? borderRadius : "8px",
            border: border ? border : "1px solid #011342"
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                style: {
                  width: "100%",
                },
              }}
              error={error}
              label={
                <Typography
                  style={{
                    fontFamily: "Inter",
                    fontWeight: fontWeight ? fontWeight : 500,
                    fontSize: fontSize ? fontSize : "16px",
                    lineHeight: "24px",
                  }}
                >
                  {label + " "}
                  {isAsteriskShown && (
                    <span
                      style={{ color: asteriskColor ? asteriskColor : "red" }}
                    >
                      *
                    </span>
                  )}
                </Typography>
              }
              variant="outlined"
            />
          )}
        />
      </>
    );
  }
}

const webStyles = (
  labelColor?: string,
  optionsBoxBorder?: string,
  optionsBoxBorderRadius?: string,
  optionBackgroundColor?: string,
  optionColor?: string,
  fontSize?: string,
  fontWeight?: number
) => `
      .customAutocomplete-root .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] {
        padding: 0;
        height: 48px;
        color: ${labelColor}
      }
  
      .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child {
        padding-left: 16px;
      }
  
      .MuiInputLabel-outlined {
        transform: translate(14px, 12px) scale(1);
        color: ${labelColor ? labelColor : "#011342"};
      }
  
      .customAutocomplete-root .MuiAutocomplete-input {
        padding: 8px 16px;
        font-size: ${fontSize ? fontSize : "16px"};
        fontweight: ${fontWeight ? fontWeight : 500};
      }
  
      .customAutocomplete-root .MuiOutlinedInput-notchedOutline {
        border: none;
      }
  
      .MuiAutocomplete-listbox {
        padding: 0;
        border: ${optionsBoxBorder ? optionsBoxBorder : "1px solid #E2E8F0"};
        border-radius: ${
          optionsBoxBorderRadius ? optionsBoxBorderRadius : "8px"
        };
      }
  
      .MuiAutocomplete-paper {
        border-radius: ${
          optionsBoxBorderRadius ? optionsBoxBorderRadius : "8px"
        };
      }
  
      .MuiAutocomplete-option {
        padding: 8px 16px;
        height: 48px;
      }
      
      .MuiAutocomplete-option:hover,
      .MuiAutocomplete-option[data-focus="true"],
      .MuiAutocomplete-option.Mui-focused {
        background-color: ${
          optionBackgroundColor ? optionBackgroundColor : "#0131a8"
        };
        color: ${optionColor ? optionColor : "white"};
      }
      
      .customAutocomplete-root .MuiInputLabel-shrink {
        display: none
      }
`;
