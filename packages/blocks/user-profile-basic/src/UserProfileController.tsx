import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import { getStorageData, setStorageData } from "../../../framework/src/Utilities";
const navigation = require("react-navigation");
import { parsePhoneNumberFromString  } from 'libphonenumber-js';


export interface FileData {
  name: string;
  type: string;
  uri: string | undefined;
}
export interface ApiCallInterface {
  contentType?:string;
  method?:string;
  endPoint?:string;
  body?:object;
  type?:string;
}

export interface ValidResponseType {
  message: object;
  data: object;
  errors:string;
}

export interface ResponseCountry  {
  id: string,
  type: string,
  attributes: {
      name: string
  }
}

export interface ProfileDetails {
  data: {
    attributes: {
      id: number,
      first_name: null,
      last_name: null,
      full_phone_number: string,
      city: string,
      post_code: string,
      country_code: string,
      phone_number: string,
      email: string,
      activated: true,
      status: string,
      gender: null,
      date_of_birth: null,
      age: null,
      country: string,
      address: string,
      address_line_2: string,
      contact_name: null,
      company_name: string,
      full_name: string;
      user_type: string;
      photo?: { url: string };
      role_id: number;
    }
}
}

export interface CountryData {
  countries: [
    {
      country_code: string,
      name: string
    }
  ]
}

export interface CountryName {
  data: [
    {
      id: string,
      type: string,
      attributes: {
          name: string
      }
  }
  ]
}

export interface CountryDataObject {
  country_code: string,
  name: string
}
// Customizable Area End

export const configJSON = require("./config");
export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  isSideBarOpen: boolean;
  isEditing: boolean;
  avatar?: {
    url?: string,
    file?:File | null;
  };
  fullName: string;
  emailProfile: string;
  companyName: string;
  countryCode: string;
  phoneNumberProfile: string;
  addressOne: string;
  addressTwo: string;
  city: string;
  country: string;
  postalCode: string;
  countryCodes: Array<CountryDataObject>;
  profileOpen: boolean;
  isFullName: boolean;
  isProValidNumber: boolean;
  isCompany: boolean;
  isAddressOne: boolean;
  isAddressTwo: boolean;
  isPhone: boolean;
  isCity: boolean;
  isPostCode: boolean;
  invalidFile: boolean;
  online: boolean;
  roleID: number;
  user_type: string;
  countries: Array<ResponseCountry>;
  isValidNumber:boolean;
  // Customizable Area End

}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class UserProfileController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  getUserProfileApiCallID: string = "";
  editUserProfileApiCallID: string = "";
  getCountryCodeApiCallID: string = "";
  getCountryAPICallID: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.SessionSaveMessage),
    ];
   
    this.state = {
    isSideBarOpen: false,
      isEditing: false,
      avatar: {
        url: "" ,
        file: null
      },
      fullName: "",
      emailProfile: "",
      companyName:"",
      countryCode: "",
      phoneNumberProfile: "",
      addressOne: "",
      addressTwo: "",
      city: "",
      country: "",
      postalCode: "",
      countryCodes: [],
      profileOpen: false,
      isFullName: false,
      isProValidNumber: false,
      isCompany:false,
      isAddressOne: false,
      isAddressTwo: false,
      isPhone: false,
      isCity: false,
      isPostCode: false,
      invalidFile: false,
      online: false,
      roleID: 0,
      countries: [],
      user_type:'',
      isValidNumber:true,
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const data = message.getData(
        getName(MessageEnum.SessionResponseData)
      );
      this.setState({
        isEditing: data.isEdit,
        profileOpen: data.isEdit,
      });
    }
  
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      setStorageData("token", token);
    }
  
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const webApiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
  
      let webResponseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
  
      if (this.isValidRespons(webResponseJson)) {
        this.responseSuccessCallBack(webApiRequestCallId, webResponseJson);
      }
    }
    // Customizable Area End
  }
  

   // Customizable Area Start

  isValidRespons = (responseJson: ValidResponseType) => {
    return responseJson && !responseJson.errors;
  }
  responseSuccessCallBack = (apiRequestCallId: string, responseJson: ProfileDetails & CountryData & CountryName ) => {
    if (apiRequestCallId === this.getUserProfileApiCallID) {
      if (responseJson && responseJson.data)
      this.setState({ 
        emailProfile: responseJson.data.attributes.email,
        fullName: responseJson.data.attributes.full_name,
        addressOne: responseJson.data.attributes.address,
        addressTwo: responseJson.data.attributes.address_line_2,
        city: responseJson.data.attributes.city,
        country: responseJson.data.attributes.country,
        postalCode: responseJson.data.attributes.post_code,
        countryCode: responseJson.data.attributes.country_code,
        phoneNumberProfile: responseJson.data.attributes.phone_number?.toString(),
        roleID: responseJson.data.attributes.role_id,
        avatar: responseJson.data.attributes.photo,
        companyName: responseJson.data.attributes.company_name,
        user_type: responseJson.data.attributes.user_type
       });
    } if (apiRequestCallId === this.editUserProfileApiCallID) {
      this.setState({
        addressOne: responseJson.data.attributes.address,
        emailProfile: responseJson.data.attributes.email,
        phoneNumberProfile: responseJson.data.attributes.phone_number,
        postalCode: responseJson.data.attributes.post_code,
        fullName: responseJson.data.attributes.full_name,
        addressTwo: responseJson.data.attributes.address_line_2,
        city: responseJson.data.attributes.city,
        country: responseJson.data.attributes.country,
        avatar: responseJson.data.attributes.photo,
        countryCode: responseJson.data.attributes.country_code,
        isEditing:false
      });
    }  if (apiRequestCallId === this.getCountryCodeApiCallID) {
       const uniqueCountryCodeData = responseJson.countries.filter((country, index, self) =>
        index === self.findIndex((c) => c.country_code === country.country_code)
      );      
      this.setState({ countryCodes: uniqueCountryCodeData})
    } if (apiRequestCallId === this.getCountryAPICallID) {
      this.setState({ countries: responseJson.data })
    }
  }
  handleChangeEditing = () => {
    this.setState({ isEditing: true });
  };

  handleCancel = () => {
    this.setState({ isEditing: false, isAddressOne:false, isFullName: false,  isCity:false, isPostCode:false, isPhone: false,isCompany:false}, () => this.getProfile());
  };

  handleChangeSave = () => {
    const { fullName, city, postalCode, addressOne, phoneNumberProfile, companyName, user_type, isValidNumber } = this.state;
    
    const errors = {
      isFullName: !fullName || fullName.length === 0,
      isCity: !city || city === "" || city === "null",
      isAddressOne: !addressOne || addressOne === "" || addressOne === "null",
      isPostCode: !postalCode || postalCode === "null" || postalCode.length === 0,
      isProValidNumber: !!phoneNumberProfile && phoneNumberProfile.length !== 0 && isValidNumber !== true,
      isCompany: (user_type === "notary" || user_type === "business") ? companyName === "" : false
    };
    this.setState(errors, () => {
      const noErrors = Object.values(errors).every(error => !error);
      if (noErrors) {
        const cleanedPhoneNumber = phoneNumberProfile ? String(phoneNumberProfile).trim() : "";
        this.setState({ phoneNumberProfile: cleanedPhoneNumber }, () => {
          this.editProfile();
        });
      }
    });
  };
  
  handleAvatarChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files && event?.target?.files[0]) {
      const validTypes = [ 'image/jpeg','image/png', 'image/jpg']; 

      if (!validTypes.includes(event?.target?.files[0].type)) {
       this.setState({ invalidFile: true})
        return;
      }
      else{this.setState({invalidFile:false})}
      this.setState({
        avatar: {
          url: URL.createObjectURL(event.target.files[0]),
          file : event.target.files[0]
        }
      });
    }
  };


  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      fullName: event.target.value, isFullName: false
    });
  };
  handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      emailProfile: event.target.value,
    });
  };

  handleCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      companyName: event.target.value,
    });
  };

  handleCodeChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    this.setState({ countryCode: event.target.value as string,isValidNumber: true, },()=> this.validatePhoneNumber());
  };

  validatePhoneNumber = () => {
    const { phoneNumberProfile, countryCode } = this.state;
    if (phoneNumberProfile && countryCode) {
      const fullPhoneNumber = `+${countryCode}${phoneNumberProfile}`;
      const phoneNumberObj = parsePhoneNumberFromString(fullPhoneNumber);
      if (phoneNumberProfile.length >= 9 && phoneNumberObj) {
        this.setState({ isValidNumber: true });
      } else {
        this.setState({ isValidNumber: false });
      }
    }
  };


  handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value ?? "";
    const sanitizedInput = String(input).replace(/\D/g, "");
    this.setState({
      phoneNumberProfile: sanitizedInput,
      isValidNumber: true,
      isPhone: false,
    }, this.validatePhoneNumber);
  };
  handleAddressOneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      addressOne: event.target.value, isAddressOne: false
    });
  };
  handleAddressTwoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      addressTwo: event.target.value
    });
  };

  handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      city: event.target.value, isCity: false
    });
  };

  handleBackArrow = () => {
    const msgs = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(getName(MessageEnum.NavigationTargetMessage), "UserProfileBasicBlock");
    msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgs);
  };

 

  handleCountryChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
    child: React.ReactNode
  ) => {
    const { value } = event.target;
    this.setState({ country: value as string });
  };

  handlePostalCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      isPostCode: false,
      postalCode: event.target.value
    });
  };

  async componentDidMount() {
    super.componentDidMount();
    this.countryCodeAPI();
    this.getProfile();
    this.getCountryAPI();
  }

  apiCall = async (apiData: ApiCallInterface) => {
    let Token = await getStorageData("token");
     const {method, endPoint, body, type } = apiData;
    const header = {
      token: Token
    };
     const requestMessages = new Message(
         getName(MessageEnum.RestAPIRequestMessage)
     );
     requestMessages.addData(
         getName(MessageEnum.RestAPIRequestHeaderMessage),
         JSON.stringify(header)
     );
     requestMessages.addData(
         getName(MessageEnum.RestAPIResponceEndPointMessage),
         endPoint
     );
     requestMessages.addData(
         getName(MessageEnum.RestAPIRequestMethodMessage),
         method
     );
    body && type !== "formData" ?
      requestMessages.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      ) :
      requestMessages.addData(getName(
        MessageEnum.RestAPIRequestBodyMessage),
        body
      )
    runEngine.sendMessage(requestMessages.id, requestMessages);
    return requestMessages.messageId;
};

  getProfile = async () => {
    this.getUserProfileApiCallID = await this.apiCall({
      method: configJSON.methodTypeApiGetUserProfile,
      endPoint: configJSON.getUserProfileEndPoint
    });
  };

  editProfile = async () => {
    let formData = new FormData();
    const fullPhoneNumber = this.state.countryCode + this.state.phoneNumberProfile;

    formData.append("profile[address]", this.state.addressOne );
    formData.append("profile[city]", this.state.city);
    formData.append("profile[address_line_2]", this.state.addressTwo);
    formData.append("profile[post_code]", this.state.postalCode);
    formData.append("profile[email]", this.state.emailProfile);
    formData.append("profile[full_name]", this.state.fullName);
    formData.append("profile[country]", this.state.country);
    this.state.avatar?.file !== undefined && 
    formData.append("profile[photo]",this.state.avatar?.file as File);
    formData.append("profile[full_phone_number]", fullPhoneNumber);

    this.editUserProfileApiCallID = await this.apiCall({
      method: configJSON.apiUpdateUserType,
      endPoint: configJSON.editProfileAPIEndPoint,
      body: formData,
      type: "formData"
    });
  };

  countryCodeAPI = async() => {
    this.getCountryCodeApiCallID = await this.apiCall({
      method: configJSON.methodTypeApiGetUserProfile,
      endPoint: configJSON.countryCodeAPIEndPoint
    });
  };

  getCountryAPI = async () => {
    this.getCountryAPICallID = await this.apiCall({
      method: configJSON.methodTypeApiGetUserProfile,
      endPoint: configJSON.getCountryAPI
    })
  }

  getValueOrDefault = (value:string) => {
    return value === "null" ? "44" : value;
  };

  getCountryCodeValue = (value:string) => {
    if(value === null){
      this.setState({countryCode: "44"});
      return "44"
    }else {
      return value;
    }
  };

  // Customizable Area End

}
