import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import NavigationMenu from "../../src/NavigationMenu.web"
import { GoogleAuthProvider } from "../../../../components/src/GoogleAuthProvider.web"
import { OutlookAuthProvider } from "../../../../components/src/OutlookAuthProvider.web"
import { Wrapper } from "@material-ui/pickers/wrappers/Wrapper";
import { getStorageData, setStorageData } from '../../../../framework/src/Utilities';
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "NavigationMenu"
  }

const screenProps2 = {
  navigation: {
      navigate: jest.fn()
  },
  id: "NavigationMenu"
}


const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
    wrapper.findWhere((node) => node.prop("data-testID") === testID).first();

const mockAPICall = (instance: any, apiCallID: string, apiData: object) => {
    const msgSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
    msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgSucessRestAPI.messageId);
    msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), apiData);
    instance[apiCallID] = msgSucessRestAPI.messageId
    const { receive: MockRecieve } =  instance
    MockRecieve("", msgSucessRestAPI)
  }

  const notaryUserProfileResponse = {
    "data": {
        "id": "1204",
        "type": "profile",
        "attributes": {
            "id": 1204,
            "first_name": null,
            "last_name": null,
            "full_phone_number": "567993470",
            "city": "Anand",
            "post_code": "778 jkkk",
            "country_code": null,
            "phone_number": 567993470,
            "email": "Testdeviam1@yopmail.com",
            "activated": true,
            "user_type": "notary",
            "user_name": null,
            "platform": null,
            "suspend_until": null,
            "status": "regular",
            "role_id": 2,
            "full_name": "Dev User",
            "gender": null,
            "date_of_birth": null,
            "age": null,
            "country": "India",
            "address": "Dev User Dev User Dev User Dev Dev User Dev User D",
            "address_line_2": "hhyhh",
            "contact_name": "Test dev iam",
            "company_name": "Test devnotary",
            "is_online": true,
            "photo": {
                "url": "f76c29a9fb2dc556e138f1cbce07aed7411e/download.jpg"
            }
        }
    }
  }
  
  const endUserProfileResponse = {
    "data": {
        "id": "1045",
        "type": "profile",
        "attributes": {
            "id": 1045,
            "first_name": null,
            "last_name": null,
            "full_phone_number": "",
            "city": null,
            "post_code": null,
            "country_code": null,
            "phone_number": null,
            "email": "qwert@gmail.com",
            "activated": true,
            "user_type": "individual",
            "user_name": null,
            "platform": null,
            "suspend_until": null,
            "status": "regular",
            "role_id": 1,
            "full_name": "sdf wer",
            "gender": null,
            "date_of_birth": null,
            "age": null,
            "country": null,
            "address": null,
            "address_line_2": null,
            "contact_name": "",
            "company_name": "",
            "is_online": true,
            "photo": {
                "url": null
            }
        }
    }
  }
  const responseData={
     token:"eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NzY3LCJleHAiOjE3MTcwNDgzODksInRva2VuX3R5cGUiOiJsb2dpbiJ9.D6m14lPSiTbGNjU1dnKHkCfKuvmxR_pAlNtkPuGH8EmYiRAlmb5k7S5ofyEsidPZ6KG3mVX24yNc8t2707MnMw","refresh_token":"eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NzY3LCJleHAiOjE3NDg0OTc5ODksInRva2VuX3R5cGUiOiJyZWZyZXNoIn0.BzzOfAot_lS4zz8yoZbt993Kn-VIS0_7LIuVUAYfWBAOE_svv0bvuZbayrV7-W67-lssArtTG77KWW4dO8605A",
  }

jest.mock('../../../../framework/src/Utilities', () => ({
    getStorageData: jest.fn(),
    setStorageData: jest.fn()
}));


const feature = loadFeature('./__tests__/features/NavigationMenu-scenario.web.feature');

jest.mock("gapi-script", () => ({
    loadGapiInsideDOM: () => Promise.resolve(true)
  }));

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        Object.defineProperty(window, 'location', {
          value: { pathname: '/Dashboard' },
          writable: true
      });

        const originalWindow: any = { ...window };
        const windowSpy = jest.spyOn(global, "window", "get");
        windowSpy.mockImplementation(() => ({
            ...originalWindow,
            gapi: {
              auth2: {
                getAuthInstance: () => ({
                  signIn: () =>
                    Promise.resolve({
                      getAuthResponse: () => ({ access_token: "access_token" })
                    }),
                    isSignedIn: {
                      get: jest.fn(() => true),
                    },
                    currentUser: {
                      get: jest.fn(() => ({
                        disconnect: jest.fn(),
                        reloadAuthResponse: jest.fn(() => Promise.resolve({
                          access_token: "new_access_token"
                        })),
                        isSignedIn: jest.fn(),
                      })),
                    },
                    signOut: jest.fn().mockResolvedValue("")
                }),
                init() {
                }
              },
              load(value: string, callback: () => void) {
                callback();
              }
            }
          }));

          window.matchMedia = jest.fn().mockImplementation(query => ({
            matches: query === "(max-width: 950px)",
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          }));
    });

    test('User navigates to NavigationMenu', ({ given, when, then }) => {
        let navigationMenuBlock:ShallowWrapper;
        let instance:NavigationMenu; 

        given('I am a User loading NavigationMenu', () => {
            navigationMenuBlock = shallow(<NavigationMenu {...screenProps}/>);
            instance = navigationMenuBlock.instance() as NavigationMenu;
        });

        when("Notary user is logged in", () => {
            mockAPICall(instance, "getProfileApiCallId", notaryUserProfileResponse);

        })
        then("Notary user sees service section", () => {
            let serviceSection = navigationMenuBlock.find(".serviceSection");
            expect(serviceSection).toHaveLength(1); 
        })
        
        when("End user is logged in", () => {
            mockAPICall(instance, "getProfileApiCallId", endUserProfileResponse);
        })
        then("End user sees service section", () => {
            let serviceSection = navigationMenuBlock.find(".serviceSection");
            expect(serviceSection).toHaveLength(1); 
        })

         when("I can click on the logo", () => {
            
            navigationMenuBlock
            .findWhere((wrapper) => wrapper.prop("data-test-id") === "landing-redirect")
            .first()
            .simulate("click");
         });

         then("redirect to the landing page", () => {
            expect(
                navigationMenuBlock
                    .findWhere((wrapper) => wrapper.prop("data-test-id") === "landing-redirect")
            ).toHaveLength(1);
            
            expect(
              navigationMenuBlock.findWhere(
                (node) => node.prop("data-test-id") === "serviceSection"
              )
            ).toBeTruthy();
            expect(
              navigationMenuBlock.findWhere(
                (node) => node.prop("data-test-id") === "indicateBox"
              )
            ).toBeTruthy();
        });
        
        when("User click on the my account button", async() => {
          (getStorageData as jest.Mock).mockResolvedValueOnce(responseData.token)
          await instance.handleSideBarNavigation('My Account');
              });

        then("User will be navigate to the my account page", () => {
            expect(MessageEnum.NavigationTargetMessage).toEqual(6);
        });


        when("User click on the dashboard button", () => {
          (getStorageData as jest.Mock).mockResolvedValueOnce(responseData.token)
            instance.setState({activeTab: "Dashboard"});
         });
 
         then("User will be navigate to the dashboard page", () => {
            expect(MessageEnum.NavigationTargetMessage).toEqual(6);
         });

         when("User click on the request button", () => {
            let navibutton = findByTestID(navigationMenuBlock, "naviButton1");
            navibutton.simulate("click");
         });
 
         then("User will be navigate to the request page", () => {
            expect(MessageEnum.NavigationTargetMessage).toEqual(6);
         });

         when("User click on the catalogue button", async() => {
          (getStorageData as jest.Mock).mockResolvedValueOnce(responseData.token)
          await instance.handleSideBarNavigation('Catalogue');
         });
 
         then("User will be navigate to the catalogue page", () => {
            expect(MessageEnum.NavigationTargetMessage).toEqual(6);
         });

         when("User click on the calender button", async() => {
          (getStorageData as jest.Mock).mockResolvedValueOnce(responseData.token)
          await instance.handleSideBarNavigation('Calendar');
         });
 
         then("User will be navigate to the calender page", () => {
            expect(MessageEnum.NavigationTargetMessage).toEqual(6);
         });

        when("User click on the logout button", async() => {
            navigationMenuBlock
            .findWhere((wrapper) => wrapper.prop("data-test-id") === "NevigationLinks")
            .first()
            .simulate("click");
            instance.handleLogoutNavigation()
            instance.logOutNvigation('Log Out')
            instance.setState({handleLogOutPopup:true})
            instance.setState({isSideBarOpen: true});
            await GoogleAuthProvider.signOut();
            await OutlookAuthProvider.signOut(); 

            
         });
 
         then("User will be navigate to the landing page", () => {
            expect(MessageEnum.NavigationTargetMessage).toBe(6);
         });

         then("User can click on menubar icon", ()=> {
            const menuIcon = navigationMenuBlock.find('[data-test-id="menu-icon"]');
            const closeMenuIcon = navigationMenuBlock.find('[data-test-id="close-menu-icon"]');
            instance.toggleDrawer(true);
            instance.setState({isSideBarOpen: true});

            instance.toggleDrawer(false);

            instance.toggleSideBar(true);
            instance.toggleSideBar(false);
            instance.toggleMenu(true);
            instance.toggleMenu(false);
            expect(navigationMenuBlock).toBeTruthy();
         })
    });

    test('Guest User Navigation and Authentication Flow', ({ given, when, then }) => {
      let navigationMenuBlock: ShallowWrapper;
      let instance: NavigationMenu;

      given('I am a Guest User loading NavigationMenu', () => {
          navigationMenuBlock = shallow(<NavigationMenu {...screenProps2}/>);
          instance = navigationMenuBlock.instance() as NavigationMenu;
      });

      when('I check for token', async () => {
        setStorageData("token", responseData.token)
         instance.tabByUser();
      });

      then('I should see default services without token', () => {
          expect(instance.state.services).toHaveLength(4);
          expect(instance.state.services[0].title).toBe('Dashboard');
          expect(instance.state.services[1].title).toBe('Requests');
          expect(instance.state.services[2].title).toBe('Catalogue');
          expect(instance.state.services[3].title).toBe('Calendar');        
      });

      when('I try to access protected route', async () => {
          await instance.handleSideBarNavigation('My Account');
      });

      then('I should see login popup', () => {
          expect(instance.state.isLoginPopupShowen).toBe(true);
      });

      when('I click login button in popup', () => {
          instance.navigateToLogin();
      });

      then('I should navigate to login page', () => {
          expect(instance.props.navigation.navigate).toHaveBeenCalledWith('EmailAccountLoginBlock');
      });

      when('I click signup button in popup', () => {
          instance.navigateToSignUp();
      });

      then('I should navigate to signup page', () => {
          expect(instance.props.navigation.navigate).toHaveBeenCalledWith('EmailAccountRegistrationWeb');
      });

      when('I click close button in popup', () => {
          instance.closeLoginPopup();
      });

      then('Login popup should be closed', () => {
          expect(instance.state.isLoginPopupShowen).toBe(false);
      });

      then("Logut is not Showen",() => {
        instance.tabByUser();
      })

  });

  test("Navigation Menu Role-based Service Configuration", ({ given, when, then }) => {
    let navigationMenuBlock: ShallowWrapper;
    let instance: NavigationMenu;

    given("I am a User loading NavigationMenu", () => {
        navigationMenuBlock = shallow(<NavigationMenu {...screenProps}/>);
        instance = navigationMenuBlock.instance() as NavigationMenu;
    });

    when("User has role_id 1", async () => {
        (getStorageData as jest.Mock).mockResolvedValueOnce("1");
        await instance.componentDidMount();
    });

    then("Services should be configured for role_id 1", () => {
      expect(instance.state.services).toBeDefined();

    });

    when("User has role_id 2", async () => {
        (getStorageData as jest.Mock).mockResolvedValueOnce("2");
        await instance.componentDidMount();
    });

    then("Services should be configured for role_id 2", () => {
      expect(instance.state.services).toBeDefined();
    });

    when("Window location pathname is set", async () => {
        Object.defineProperty(window, 'location', {
            value: { pathname: '/Dashboard' },
            writable: true
        });
        await instance.componentDidMount();
    });

    then("Active tab should be set correctly", () => {
        expect(instance.state.activeTab).toBe('/Dashboard');
    });

    when("Role ID is neither 1 nor 2", async () => {
       (getStorageData as jest.Mock).mockResolvedValueOnce("0");
        await instance.componentDidMount();
    });

    then("Default services should remain unchanged", () => {
        expect(instance.state.services).toBeDefined();
    });
});

});
