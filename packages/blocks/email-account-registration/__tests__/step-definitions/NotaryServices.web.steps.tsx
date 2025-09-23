import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import NotaryServices from "../../src/NotaryServices.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "email-account-registration-scenario",
};

const feature = loadFeature(
  "./__tests__/features/NotaryServices-scenario.web.feature"
);

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("testID") === testID).first();

const errorResponse={
  errors:[{otp:"Token and OTP code are required"}]
}
const responseServiceData ={
    "data": [
        {
            "id": "10",
            "type": "service",
            "attributes": {
                "id": 10,
                "service_icon": null,
                "service_name": "Business and Corporate Service",
                "service_description": "Catering to business needs by certifying company records, witnessing corporate documents, and authenticating the......"
            }
        } 
    ]
}
const temp={"data": {"attributes": {"user_type": "testUserType"}}, "meta": {"email_otp_token": "testEmailOtpToken", "token": "testToken"}}
const responseData={
    data: [
      {
        id: 10,
        type: "service",
        attributes: {
            id: 10,
            service_icon: null,
           srvice_name: "Business and Corporate Service",
            service_description: "Catering to business needs by certifying company records, witnessing corporate documents, and authenticating the......"
        , is_selected: false
        }
    } , {
        id: 11,
        type: "service",
        attributes: {
            id: 11,
            service_icon: null,
            service_name: "Business and Corporate Service",
            service_description: "Catering to business needs by certifying company records, witnessing corporate documents, and authenticating the......"
            ,is_selected: false
        }
    }
    ]}
   let mockMessage;
   
   let originalInnerWidth:any;
   let originalWindow:any;
   const getIsMobiles = () => {
    return typeof window !== 'undefined' ? window.innerWidth <= 767 : false;
  };

const scrollIntoViewMock = jest.fn();
const topRefMock = {
  current: {
    scrollIntoView: scrollIntoViewMock
  }
}
jest.spyOn(React, "createRef").mockReturnValue(topRefMock);

defineFeature(feature, (test) => {
  beforeAll(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "android");
    jest.spyOn(runEngine, "sendMessage");
   
    // originalInnerWidth = global.innerWidth;
    originalWindow = { ...global.window };
    // originalInnerWidth = window.innerWidth;
    mockMessage = {
      id: MessageEnum.NavigationPayLoadMessage,
      getData: jest.fn(() => ({
        data: {
          attributes: {
            user_type: 'individual',
          },
        },
        meta: {
          email_otp_token: 'testEmailOtpToken',
          token: 'testToken',
        },
      })),
    };
  });
 
  afterEach(() => {
    jest.mock("react-native/Libraries/Utilities/Platform", () => ({
      OS: "web",
      select: jest.fn(),
    }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    global.innerWidth = originalInnerWidth;
    global.window = originalWindow;
    
  });
  afterAll(() => {
    // Restore the original window.innerWidth
    global.window = originalWindow;
    // Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth });
  });
  const setWindowWidth = (width:number) => {
    // Mock the window object with the given width
    global.window = {
      ...originalWindow,
      innerWidth: width,
    };
  };
  test("User add Notary Services", ({ given, when, then }) => {
    let NotaryService: ShallowWrapper;
    let instance: NotaryServices;
    let spy: jest.SpyInstance;
    given("User navigate to NotaryServices screen", () => {
      NotaryService = shallow(<NotaryServices {...screenProps} />);
      instance = NotaryService.instance() as NotaryServices;
      const getNotaryServices = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      getNotaryServices.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getNotaryServices.messageId
      );
      getNotaryServices.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),responseData );
      instance.GetNotaryServicesApi = getNotaryServices.messageId;
      runEngine.sendMessage("Unit Test", getNotaryServices);
      global.innerWidth = 767;
    // global.window = { innerWidth: 767 };

    // Import the function to test after mocking
    const isMobile = () => {
      if (typeof window !== 'undefined') {
        return window.innerWidth <= 767;
      }
      return false;
    };

    expect(isMobile()).toBe(false);
    });

    then("NotaryServices will load with api call with out errors", () => {
    instance.setState({ServiceArrayitems:responseData.data,emptyServiceMsg:'No Services Available now !',signUpVerifyToken:'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NjAxLCJleHAiOjE3MTE2NTE1MjcsInR5cGUiOiJBY2NvdW50QmxvY2s6OkVtYWlsT3RwIiwiYWNjb3VudF9pZCI6NDkyfQ.T4IRojy0EU3z67MTkWpK00W4RUrKXoZ01c_V1QTFQuy_bccncCEaddlBRzaAtHcjjB62SmvccTBNtHl7fyx4sWjg',userType:'individual',token:'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q'})
      instance.GetNotaryServices();
    instance.GetNotaryServices = jest.fn();

    const getNotaryServices = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getNotaryServices.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getNotaryServices.messageId
      );
      getNotaryServices.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),responseData );
      instance.GetNotaryServicesApi = getNotaryServices.messageId;
      runEngine.sendMessage("Unit Test", getNotaryServices);
      const errorResponseJson = { errors: "No Services Available now !" };
      const emptyResponseJson =  { errors: "No Services Available now !" }; 

        instance.handleServiceAPI2("GetNotaryServicesApi", responseData);
        expect(instance.state.ServiceArrayitems).toBe(responseData.data)
        expect(instance.state.userType).toBe('individual');
        expect(instance.state.signUpVerifyToken).toBe('eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NjAxLCJleHAiOjE3MTE2NTE1MjcsInR5cGUiOiJBY2NvdW50QmxvY2s6OkVtYWlsT3RwIiwiYWNjb3VudF9pZCI6NDkyfQ.T4IRojy0EU3z67MTkWpK00W4RUrKXoZ01c_V1QTFQuy_bccncCEaddlBRzaAtHcjjB62SmvccTBNtHl7fyx4sWjg');
        expect(instance.state.token).toBe('eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q');
        expect(temp).toEqual({
          data: {
            attributes: {
              user_type: 'testUserType',
            },
          },
          meta: {
            email_otp_token: 'testEmailOtpToken',
            token: 'testToken',
          },
        });
        // instance.handleServiceAPI2("GetNotaryServicesApi", emptyResponseJson);
        // instance.showAlert("Server issue!","Something went wrong, please try agin later")
    });

    then("Everyone can review the footer part", () => {
      expect(findByTestID(NotaryService, "footer")).toHaveLength(1);
    })

    then("Top of NotaryServices page will open", () => {
      expect(scrollIntoViewMock).toHaveBeenCalled()
    })

    when("Going back to landing page", () => {
        let buttonComponent = NotaryService.findWhere(
          (node) => node.prop("data-test-id") === "LandingButtonID"
        );
        buttonComponent.simulate("click")
        instance.goToLandingScreen();
       
      });

      then("It will navigate to Landing page", () => {
        expect(NotaryService).toBeTruthy();
      });
      when("User click on back arrow", () => {
        let gobackbtn = NotaryService.findWhere(
          (node) => node.prop("data-test-id") === "gobackbtn"
        );
        gobackbtn.simulate("click")
      });

      then("It will navigate to previous page", () => {
        instance.GotoVerifyOtpScreen();
        expect(NotaryService).toBeTruthy();
      });
    when("User select services from list without error", () => {
      const wrapper =  shallow(<NotaryServices {...screenProps} />);
      wrapper.setState({ ServiceArrayitems: responseData.data });
      const selectServiceBtns = wrapper.find('[data-test-id="selectserviceBtn"]');
            selectServiceBtns.forEach((btn, index) => {
        btn.simulate("click");
        instance.selectService(index+1)
        const updatedState = instance.state.ServiceArrayitems[index];
        expect(updatedState.attributes.is_selected).toBe(true); 
      });
         
    });
    then("Selected service add into a elementArray", () => {
    
        const elementArray = [ {
            id: 10,
            type: "service",
            attributes: {
                id: 10,
                service_icon: null,
               srvice_name: "Business and Corporate Service",
                service_description: "Catering to business needs by certifying company records, witnessing corporate documents, and authenticating the......"
            , is_selected: true
            }
        } , {
            id: 11,
            type: "service",
            attributes: {
                id: 11,
                service_icon: null,
                service_name: "Business and Corporate Service",
                service_description: "Catering to business needs by certifying company records, witnessing corporate documents, and authenticating the......"
                ,is_selected: true
            }
        } ];
        instance.setState({ServiceArrayitems:elementArray})
        instance.state.ServiceArrayitems[1].attributes.is_selected = true;
        expect(instance.state.ServiceArrayitems).toEqual(elementArray); 
      });
     
  
    when("User clicks on the continue button", () => {
      const contBtn = NotaryService.find('[data-test-id="contbutton"]');
      contBtn.simulate("click");

    });
    then("selected services will send to server without errors", () => {
      const wrapper =  shallow(<NotaryServices {...screenProps} />);
    wrapper.setState({ ServiceArrayitems: responseData.data });
      instance.handleSubmitServices()
      instance.setState({  loader: false,
        enableVerificationModel:false,enableSuccessModel:false}) 
     
        const mockData = [
          { id: 1, attributes: { id: 1, is_selected: true } },
          { id: 2, attributes: { id: 2, is_selected: false } },
          { id: 3, attributes: { id: 3, is_selected: true } },
        ];
        wrapper.setState({ ServiceArrayitems: mockData });
        instance.addServiceFunc();
        const elementArray :any =[];
        
        instance.state.ServiceArrayitems.forEach((item:any) => {
            if (item.attributes.is_selected) {
              instance.state.selectedArrayIds.push(item.attributes.id);
              elementArray.push(item.attributes.id)
            instance.setState({selectedArrayIds: [...instance.state.selectedArrayIds, elementArray]});
            }
          });
    
      const addServicesAPICall = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      addServicesAPICall.addData(getName(MessageEnum.AuthTokenDataMessage), "TOKEN");

      addServicesAPICall.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addServicesAPICall.messageId
      );
      addServicesAPICall.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
            {
                service_ids: [10]
              }
        
      );
      instance.addServiceAPI = addServicesAPICall.messageId;
      runEngine.sendMessage("Unit Test", addServicesAPICall);
    instance.addServiceAPI = "addServiceAPI";
    const setStateMock = jest.spyOn(instance, "setState").mockImplementation(() => {});

    instance.handleServicesAPis("addServiceAPI", responseData);
    expect(setStateMock).toHaveBeenCalledWith({ loader: false });
    expect(setStateMock).toHaveBeenCalledWith({ enableVerificationModel: true });
    expect(setStateMock).toHaveBeenCalledWith({ loader: false });
    expect(setStateMock).toHaveBeenCalledWith({ enableVerificationModel: true });
    instance.handleServicesAPis("addServiceAPI", errorResponse);
    instance.setState({loader:false,enableVerificationModel:false})
    instance.handleServicesAPis("addServiceAPI", errorResponse);
    instance.setState({loader:false,enableVerificationModel:false})
    instance.showAlert("Server issue!","Something went wrong, please try agin later")
      
    });
    when("User unselect services from list without error", () => {
      const wrapper =  shallow(<NotaryServices {...screenProps} />);
      wrapper.setState({ ServiceArrayitems: responseData.data });
      const selectServiceBtns = wrapper.find('[data-test-id="selectserviceBtn"]');
      selectServiceBtns.forEach((btn, index) => {
        btn.simulate("click");
        instance.selectService(index+1)
        const updatedState = instance.state.ServiceArrayitems[index];
        expect(updatedState.attributes.is_selected).toBe(true); 
      });
        
});
then("Selected services remove from a elementArray", () => {
  instance.setState({
    ServiceArrayitems: [
      {
          id: 10,
          type: "service",
          attributes: {
              id: 10,
              service_icon: null,
             srvice_name: "Business and Corporate Service",
              service_description: "Catering to business needs by certifying company records, witnessing corporate documents, and authenticating the......"
          , is_selected: false
          }
      } , {
          id: 11,
          type: "service",
          attributes: {
              id: 11,
              service_icon: null,
              service_name: "Business and Corporate Service",
              service_description: "Catering to business needs by certifying company records, witnessing corporate documents, and authenticating the......"
              ,is_selected: true
          }
      }
  ],
  tempArray:[
    {
        id: 10,
        type: "service",
        attributes: {
            id: 10,
            service_icon: null,
           srvice_name: "Business and Corporate Service",
            service_description: "Catering to business needs by certifying company records, witnessing corporate documents, and authenticating the......"
        , is_selected: false
        }
    } , {
        id: 11,
        type: "service",
        attributes: {
            id: 11,
            service_icon: null,
            service_name: "Business and Corporate Service",
            service_description: "Catering to business needs by certifying company records, witnessing corporate documents, and authenticating the......"
            ,is_selected: true
        }
    }
]
  })
    let item={
        id:10
    }
    instance.selectService(item.id)
    const elementArray = [ 
      {
        id: 10,
        type: "service",
        attributes: {
            id: 10,
            service_icon: null,
           srvice_name: "Business and Corporate Service",
            service_description: "Catering to business needs by certifying company records, witnessing corporate documents, and authenticating the......"
        , is_selected: false
        }
    } , {
        id: 11,
        type: "service",
        attributes: {
            id: 11,
            service_icon: null,
            service_name: "Business and Corporate Service",
            service_description: "Catering to business needs by certifying company records, witnessing corporate documents, and authenticating the......"
            ,is_selected: false
        }
    }
   ];
    instance.setState({ServiceArrayitems:elementArray})
    instance.state.ServiceArrayitems[1].attributes.is_selected = false;
    expect(instance.state.ServiceArrayitems).toEqual(elementArray); // Check if the correct items were added to elementArray
    expect(instance.state.tempArray).toStrictEqual(elementArray)
  });
    when("User recieve error API response", () => {
        instance.handleServicesAPis("addServiceAPI", errorResponse);
    instance.setState({loader:false,enableVerificationModel:false})
    instance.showAlert("Server issue!","Something went wrong, please try agin later")
              });
      then("User can see the error message", () => {
        expect(instance.state.loader).toBe(false) // State should not be updated
        expect(instance.state.enableVerificationModel).toBe(false); // State should not be updated

  
      });
    then("User Navigate to Next Screen without errors", () => {
        instance.GotoDashboard();
        expect(NotaryService).toBeTruthy();
  
      });
    when("User click skip button without errors", () => {
      const skipbtn = NotaryService.find('[data-test-id="skipbutton"]');
      skipbtn.simulate("click");
    });

    then("User can review the account verification modal", () => {
      expect(NotaryService.find('[data-test-id="account_verification"]')).toHaveLength(1);
    });

    
    then("User Navigate to Next Screen without errors", () => {
      instance.GotoDashboard();
      expect(NotaryService).toBeTruthy();

    });
    when("NotaryServices will load api with empty service data", () => {
        instance.GetNotaryServices();

      instance.GetNotaryServices = jest.fn();
      const responseJson = { errors: ['error1'] };
     

      const getNotaryServices = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        getNotaryServices.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          getNotaryServices.messageId
        );
        getNotaryServices.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),responseJson );
        instance.GetNotaryServicesApi = getNotaryServices.messageId;
        runEngine.sendMessage("Unit Test", getNotaryServices);
  
          instance.handleServiceAPI2(instance.GetNotaryServicesApi, responseJson);
          expect(instance.state.emptyServiceMsg).toEqual('No Services Available now !');

          // expect(instance.state.emptyServiceMsg).toe(responseJson.errors)
          // instance.handleServiceAPI2("GetNotaryServicesApi", emptyResponseJson);
          // instance.showAlert("Server issue!","Something went wrong, please try agin later")
      });
      then("No service data will available", () => {
      
        expect(NotaryService).toBeTruthy();
      });
      when("NotaryServices will load api with error", () => {
        instance.GetNotaryServices();
      instance.GetNotaryServices = jest.fn();
      const responseJson = {};
     

      const getNotaryServices = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        getNotaryServices.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          getNotaryServices.messageId
        );
        getNotaryServices.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),responseJson );
        instance.GetNotaryServicesApi = getNotaryServices.messageId;
        runEngine.sendMessage("Unit Test", getNotaryServices);
  
          instance.handleServiceAPI2(instance.GetNotaryServicesApi, responseJson);
          instance.showAlert("Server issue!","Something went wrong, please try agin later")
      });
      then("Error response will show", () => {

        instance.GetNotaryServices();
      instance.GetNotaryServices = jest.fn();
      const responseJsons = {email_otp_token:'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NjAxLCJleHAiOjE3MTE2NTE1MjcsInR5cGUiOiJBY2NvdW50QmxvY2s6OkVtYWlsT3RwIiwiYWNjb3VudF9pZCI6NDkyfQ.T4IRojy0EU3z67MTkWpK00W4RUrKXoZ01c_V1QTFQuy_bccncCEaddlBRzaAtHcjjB62SmvccTBNtHl7fyx4sWjg'};
      const getNotaryServices = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        getNotaryServices.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          getNotaryServices.messageId
        );
        getNotaryServices.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),responseJsons );
        instance.resendOtpAPICall = getNotaryServices.messageId;
        runEngine.sendMessage("Unit Test", getNotaryServices);
  
          instance.handleServiceAPI2(instance.resendOtpAPICall, responseJsons);
          expect(instance.state.signUpVerifyToken).toBe(responseJsons.email_otp_token)
      });
  });
  test('should return true if window.innerWidth <= 767', () => {
    let NotaryService: ShallowWrapper;
    let instance: NotaryServices;
    let spy: jest.SpyInstance;
    NotaryService = shallow(<NotaryServices {...screenProps} />);
      instance = NotaryService.instance() as NotaryServices;
    setWindowWidth(767);
    instance.handleResize()
    expect(getIsMobiles()).toBe(true);

    setWindowWidth(500);
    expect(getIsMobiles()).toBe(true);
  });

  test('should return false if window.innerWidth > 767', () => {
    let NotaryService: ShallowWrapper;
    let instance: NotaryServices;
    let spy: jest.SpyInstance;
    NotaryService = shallow(<NotaryServices {...screenProps} />);
      instance = NotaryService.instance() as NotaryServices;
    setWindowWidth(768);
    expect(getIsMobiles()).toBe(false);
    instance.handleResize()
    setWindowWidth(1024);
    expect(getIsMobiles()).toBe(false);
  });

  test('should return false if window is undefined', () => {
    const originalWindow = global.window;
    expect(getIsMobiles()).toBe(false);
    global.window = originalWindow;
  });
});
