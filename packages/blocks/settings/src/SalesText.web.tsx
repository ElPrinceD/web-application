// Customizable Area Start
import React from "react";
import Loader from "../../../components/src/Loader.web";
import SettingsController, { Props } from "./SettingsController";
import {
    Box,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    styled,
    Checkbox,
    CheckboxProps,
    withStyles
    // Customizable Area Start
    // Customizable Area End
  } from "@material-ui/core";
  import { SuccessIcon } from "./assets";

// Customizable Area End

export default class CatalogueNotary extends SettingsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  salesTextSave = ()=>{
    return(
      <>
      <Box flexGrow={1} style={webStyle.salesInputLabel} > Value Added Tax (VAT)</Box>
      <Typography style={{ fontSize: '16px', fontWeight: 400, fontFamily: 'Inter', color: '#011342',marginTop:'8px' }}>
      renotary collects VAT on transactions. We'll continue to collect taxes for now, but we'll stop collection after we confirm your valid VAT Number

        </Typography>
        <Box style={{marginTop:'6px'}}>
        <div style={{display:'flex',alignItems:'center'}} >
                                <StyledCheckBox  onChange={this.noVatHave} checked={this.state.vatcheked} value={this.state.vatcheked}/>

                <label htmlFor="hasVAT" style={{...webStyle.salescheckBoxLabel,marginTop:'1px'}}>I don’t have a VAT</label>
            </div>
         <div style={{marginTop:'-7px',display:'flex',alignItems:'center'}} >
                <StyledCheckBox  onChange={this.vatChange}  checked={this.state.noVatcheked} value={this.state.noVatcheked}/>
                <label htmlFor="hasVAT"style={{...webStyle.salescheckBoxLabel,marginTop:'1px'}} >I have a VAT</label>
            </div>
            {this.state.vatInputFieldShow&&
            <>
          <Typography style={{...webStyle.salesInputLabel,marginTop:'16px'}}> VAT Number</Typography>
          <input
                        type="text"
                        id="vatNumber"
                        placeholder="Eg - GB123456789"
                        style={{
                          ...webStyle.salesInput,
                          color: "#000000",
                          marginTop:'4px', 
                          textTransform: 'uppercase'
                        }}
                        value={this.state.vatNumber} 
                        onChange={this.handleVatNumberChange} 
                        maxLength={14}
                    />
                    <Typography style={webStyle.salesInputmessage}>
             The 9 to 14 digit number on your VAT registration certificate or last VAT Return which sometimes has ‘GB’ at the start like 123456789 or GB123456789
          </Typography>
                    {this.state.validationMessage && (
              <Typography style={{ color: 'red', marginTop: '8px' }}>
                {this.state.validationMessage}
              </Typography>
            )}
            {this.state.validErrorMessageEdit&&(
               <Typography style={{ color: 'red', marginTop: '8px' }}>
               {this.state.validErrorMessageEdit}
             </Typography>
            )}
              </>
  }  
        </Box>
         <Box style={{ display:'flex',width:'100%',justifyContent:'end',gap:'16px'}}>
         <Button  style={{ ...webStyle.buttonStyle, border:'1px solid #012275', width: "170px",color:'#012275',height:'52px'}}
            data-test-id= "adddetails-btn"
            onClick={this.canselDetails}
            >
            Cancel
          </Button>
        <Button  style={{ ...webStyle.buttonStyle, background: ( this.state.noVatcheked && this.state.vatNumber.length > 0) || this.state.vatcheked  ? '#012275':'grey' , width: "170px",height:'52px' }}
            data-test-id= "adddetails-btn"
            onClick={this.savesales}
            > 
           Save Details         
        </Button>
          </Box>
    </>
    )
  }
  salesEdit =()=>{
    return(
      <Box >
      <Box flexGrow={1} style={webStyle.salesInputLabel} >Value Added Tax (VAT)</Box>
                    <Typography style={{ fontSize: '16px', fontWeight: 400, fontFamily: 'Inter', color: '#011342',marginTop:'8px' }}>
                    renotary collects VAT on transactions. We'll continue to collect taxes for now, but we'll stop collection after we confirm your valid VAT Number

                      </Typography>
                       <Box style={{ display:'flex',width:'100%',justifyContent:'end'}}>
                      <Button  style={{ ...webStyle.buttonStyle, background: '#012275', width: "170px",height:'52px' }}
                          data-test-id= "adddetails-btn"
                          onClick={this.SaveDetails}
                          > 
                          Add Details                        
                        </Button>
                        </Box>
       </Box>
    )
  }
  salessuccess =()=>{
    return(
      <>
            {this.state.loader && <Loader loading={this.state.loader} />}
      <Box flexGrow={1} style={webStyle.salesInputLabel} > Value Added Tax (VAT)</Box>
                    <Typography style={{ fontSize: '14px', fontWeight: 400, fontFamily: 'Inter', color: '#011342',marginTop:'8px' }}>
                    renotary collects VAT on transactions. We'll continue to collect taxes for now, but we'll stop collection after we confirm your valid VAT Number

                      </Typography>
                      <Box style={{}}>
                        <Typography style={{...webStyle.vatInfoHeading,marginTop:'16px'}}>
                        VAT Information
                        </Typography>
                        {this.state.vatInputFieldShow ? 
                        <Box>
                        <Typography style={{...webStyle.salescheckBoxLabel,marginTop:'16px'}}>
                        I have a VAT number
                        </Typography>
                        <Typography style={{display:'flex',gap:'5%'}}>
                          <Typography style={{...webStyle.vatNumber,marginTop:'16px'}}> VAT Number :</Typography>
                          <Typography style={{ ...webStyle.vatNumber2, marginTop: '16px' }}>
                                 {this.state.salesShowdad ? this.state.vatNumber: this.state.validErrorMessageEdit}
                     </Typography>      
                     </Typography>
                        </Box>
                        :  <Typography style={{ fontSize: '16px', fontWeight: 400, fontFamily: 'Inter', color: '#000000',marginTop:'10px' }}> I don’t have a VAT number</Typography>
                      }
                      </Box>
                       <Box style={{ display:'flex',width:'100%',justifyContent:'end'}}>
                      <Button  style={{ ...webStyle.buttonStyle, background: '#012275', width: "170px",height:'52px' }}
                          data-test-id= "adddetails-btn"
                          onClick={this.editDetails}
                          > 
                        Edit Details                      
                        </Button>
                        </Box>
                        </>
    )
  }
  sucessePopup =() =>{
    return(
      <Box style={{}}>
       {this.state.loader && <Loader loading={this.state.loader} />}
      {this.state.loader}
      <CustomDialog
        open={this.state.salesSuccessShow}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      > 
      <Box style={{marginTop:'40px'}}>
        <img
          src={SuccessIcon}
          alt="Success"
        />
        </Box>
        <Title id="alert-dialog-title"style={{fontWeight:600,fontSize:'36px !important',fontFamily: 'Inter'}} >{"Success!"}</Title>
        <DialogContent style={{ textAlign: 'center',padding:'0px' }}>
          <p style={{fontWeight:500,fontSize:'16px !important',fontFamily: 'Inter'}} >Your <span style={{fontWeight:700}}>Value Added Tax (VAT) </span>  information has been added successfully to your account</p>
        </DialogContent>
        <Box style={{width:'98%',display:'flex',justifyContent:'center',paddingBottom:'10px'}}>
          <Button style={{background: '#012275', width: "170px",height:'52px', borderRadius: '8px',
      color: '#fff',
      fontSize: '16px',
      fontWeight: 700,
      fontFamily: 'Inter',}}
      data-testID='success-back-btn'
      onClick={this.closePopup}
      >
            ok
          </Button>
        </Box>

      </CustomDialog>
    </Box>
    )
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <div className="main_cont" style={{boxShadow:'rgba(0, 0, 0, 0.1) 1px 2px 8px',
        borderRadius:'12px',padding:'24px'}}>
            {this.state.loader && <Loader loading={this.state.loader} />}
      {this.state.savedetailsScreen && this.salesTextSave() }
                       {(this.state.displysuccsessMessage && this.state.validErrorMessage )&& this.salesEdit()}
                        {this.state.salesSuccessShow && this.sucessePopup() }
                        {(this.state.salesSuccessShows || this.state.salesShowdad) &&this.salessuccess() }
   
      </div>
    );
    // Customizable Area End
  }
}

// Customizable Area Start

const CustomDialog = styled(Dialog)(() => ({
    '& .MuiDialog-paper': {
      width: '485px', // Set the width
      height: '418px', // Set the height
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:'16px',
      
    },
    '& .MuiDialogContent-root':{
      padding:'0px 24px !important',
      overflow:'hidden'
    }
  }));

  const StyledCheckBox = withStyles({
    root: {
      color:'#64748B',
      '&$checked': {
        color: "#012275",
      },
    },
    checked: {},
  })((props: JSX.IntrinsicAttributes & CheckboxProps) => <Checkbox color="default" {...props} />);
  
  const Title = styled(DialogTitle)(({ theme }) => ({
    fontFamily: 'Inter', // Set font family
    fontWeight: 600, // Set font weight
    fontSize: '36px', // Set font size
    margin: 0,
    color:'#47A573 ',

    padding: theme.spacing(2),
   '& .MuiTypography-h6 ':{
    fontSize: '36px'
   }
  }));
const webStyle = {
    mainWrapper: {
      display: "flex",
      fontFamily: "Roboto-Medium",
      flexDirection: "column",
      alignItems: "center",
      paddingBottom: "30px",
      background: "#fff",
    },
    inputStyle: {
      borderBottom: "1px solid rgba(0, 0, 0, 0.6)",
      width: "100%",
      height: "100px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    salesInputmessage:{
      fontSize: '14px',
      fontWeight: 400,
      fontFamily: 'Inter',
      color :' #011342',
      marginTop:'8px'
    },
    salescheckBoxLabel:{
      fontSize: '16px',
      fontWeight: 400,
      fontFamily: 'Inter',
      color :' #011342',
    },
    salesInputLabel:{
      fontSize: '16px',
      fontWeight: 700,
      fontFamily: 'Inter',
      color :' #011342',
    },
    vatInfoHeading:{
      fontSize: '16px',
      fontWeight: 600,
      fontFamily: 'Inter',
      color :' #011342',
    },
    vatNumber:{
      fontSize: '14px',
      fontWeight: 600,
      fontFamily: 'Inter',
      color :' #011342',
    },
    vatNumber2:{
      fontSize: '16px',
      fontWeight: 500,
      fontFamily: 'Inter',
      color :' #011342',
    },
    salesInput:{
      fontSize: '16px',
      fontWeight: 500,
      fontFamily: 'Inter',
      color :' #011342',
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      width:'50%'
    },
    buttonStyle: {
      height: "44px",
      marginTop: "40px",
      border: "none",
      borderRadius: '8px',
      color: '#fff',
      fontSize: '16px',
      fontWeight: 700,
      fontFamily: 'Inter',
      textTransform: 'capitalize' as 'capitalize'
    },
    paymentTabContentBoxStyle: {
      position: 'relative' as 'relative'
    },
    accountDetailsLeftTypo: {
      width: '108px',
      fontSize: '14px',
      fontFamily: 'Inter',
      fontWeight: 600,
      // textAlign: 'start',
      color: '#011342'
    },
    accountDetailsRightTypo: {
      fontSize: '14px',
      fontFamily: 'Inter',
      fontWeight: 400,
      // textAlign: 'start',
      color: '#011342',
    },
    connectedTagStyle: {
      display: 'flex',
      position: 'absolute' as 'absolute',
      top: 0,
      right: 0,
      width: '83px',
      height: '24px',
      background: '#D1FAE5',
      borderRadius: '100px',
      color: '#059669',
      fontSize: '12px',
      fontWeight: 600,
      fontFamily: 'Inter',
      justifyContent: 'center',
      alignItems: 'center'
    }
  };
// Customizable Area End
