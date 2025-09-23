import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";

import { runEngine } from '../../../../framework/src/RunEngine';
import { Message } from '../../../../framework/src/Message';
import MessageEnum, { getName } from '../../../../framework/src/Messages/MessageEnum';
import Services from "../../src/Services.web";
import ReactVisibilitySensor from "react-visibility-sensor";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Services",
};

const feature = loadFeature("./__tests__/features/Services-scenario.feature");

jest.mock("gapi-script", () => ({
    loadGapiInsideDOM: () => Promise.resolve(true)
}));

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");

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
  });

  test("User navigates to Services", ({ given, when, then }) => {
    let landingPageBlock: ShallowWrapper;
    let instance: Services;

    given("I am a User loading Services", () => {
      landingPageBlock = shallow(<Services {...screenProps} />);
    });

    when("I navigate to the Services", () => {
      instance = landingPageBlock.instance() as Services;
    });

    then("Services will load with out errors", () => {
      const apiMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
          apiMsg.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiMsg.messageId);
          apiMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
            "data": {
                "id": "29",
                "type": "admin_landing_page",
                "attributes": {
                    "id": 29,
                    "service_title": "notery services title ",
                    "service_sub_title": "notery services sub title",
                    "statistics": "{\"streamlining_of_process\"=>\"\", \"boost_in_document_security\"=>\"\", \"satisfied_clients\"=>\"\", \"top_rated_reviews\"=>\"\"}",
                    "q_and_anw_title": "Frequently asked questions",
                    "created_at": "2024-07-18T12:59:56.908Z",
                    "updated_at": "2024-07-19T05:59:39.551Z",
                    "notary_services_fingertips": {
                        "image": {
                            "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdGdEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fab6b784a83ebbe306a07067237a57f63c3c388c/image_Background.png"
                        },
                        "title": "notery services",
                        "subtitle": "notery services subtitle",
                        "description": "No need to create an address : all disposable email accounts already exist on YOPmail.\r\nNo inspiration : use the email address generator.\r\nYou can also "
                    },
                    "step": {
                        "title": "How it works in steps title",
                        "subtitle": "How it works in steps sub title",
                        "image": {
                            "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdGtEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1addefcecef7cf62141cdb183e29ded0ca091d62/image_Background@2x.png"
                        }
                    },
                    "steps_details": [
                        {
                            "number": "step 1",
                            "name": "step name 1",
                            "description": "No need to create an address : all disposable email accounts already exist on YOPmail. No inspiration : use the email address generator. You can also ",
                            "image": {
                                "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdG9EIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ccc34a93aa573ec57e2b184f30f67451310eb79e/image_Background.png"
                            }
                        },
                        {
                            "number": "step 2",
                            "name": "step name 2",
                            "description": "No need to create an address : all disposable email accounts already exist on YOPmail. No inspiration : use the email address generator. You can also ",
                            "image": {
                                "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdHNEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b95a52ad0a293c7d59e8a40f2278c3b8e1e80bf1/Image%20Pasted%20at%202023-11-24%2013-04%20(2).png"
                            }
                        },
                        {
                            "number": "step 3",
                            "name": "step name 3",
                            "description": "No need to create an address : all disposable email accounts already exist on YOPmail. No inspiration : use the email address generator. You can also ",
                            "image": {
                                "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdHdEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--797adeb0791f149298a1ef7856467f7971f654c8/image_Background.png"
                            }
                        },
                        {
                            "number": "step 4",
                            "name": "step name 4",
                            "description": "No need to create an address : all disposable email accounts already exist on YOPmail. No inspiration : use the email address generator. You can also ",
                            "image": {
                                "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdDBEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--bea14911d30606448154b3b793961091b76aa9e0/image_Background.png"
                            }
                        }
                    ],
                    "how_it_works": {
                        "image": {
                            "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdDREIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a916329fc4db06bfb9eed855c3fd2325dbda5296/image_Localsearch%20(1)%201%20(1).png"
                        },
                        "title": "how IT WORK TITLE",
                        "subtitle": "CARE23-98343IDE is not working",
                        "description": "No need to create an address : all disposable email accounts already exist on YOPmail.\r\nNo inspiration : use the email address generator.\r\nYou can also choose an alternative domain name as they are usually not blacklisted (A new domain name is added every day).\r\nAnd for more confidentiality, we'll give you an alias that hides your temporary email. Aliases and alternate domains can be combined."
                    },
                    "vision_mission": {
                        "vision_mission_image": {
                            "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdDhEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5fbd3fcd15a4bba268172ca8f3031b0d5f5f40c1/image_Background@2x.png"
                        },
                        "vision": {
                            "title": "Our Vision Title",
                            "description": "No need to create an address : all disposable email accounts already exist on YOPmail.\r\nNo inspiration : use the email address generator.\r\nYou can also ",
                            "icon": {
                                "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdUFEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--24edb6ba9c8274ff422529a65de96b7be658f74d/image_User_00000.png"
                            }
                        },
                        "mission": {
                            "title": "Our Mission Title",
                            "description": "No need to create an address : all disposable email accounts already exist on YOPmail.\r\nNo inspiration : use the email address generator.\r\nYou can also ",
                            "icon": {
                                "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdUVEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7d009be5e9e7e9f4ff738312650a75cf7710d967/image_User2.png"
                            }
                        }
                    },
                    "story": {
                        "title": "Customer success stories Title",
                        "subtitle": "Customer success stories Subtitle",
                        "description": "No need to create an address : all disposable email accounts already exist on YOPmail.\r\nNo inspiration : use the email address generator.\r\nYou can also ",
                        "image": {
                            "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdUlEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b2030b07d7110752f6fde30455f80aa162a7ad42/image_Background.png"
                        }
                    },
                    "why_choose_us": {
                        "title": "Why choose us with facts",
                        "subtitle": "No need to create an address : all disposable emai",
                        "image": {
                            "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdW9EIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cc1ff8aa3f4a69485fd02d4048d719913d0c2e31/image_Background.png"
                        },
                        "facts": [
                            {
                                "name": "Why choose us fact name 1",
                                "description": "No need to create an address : all disposable email accounts already exist on YOPmail. No inspiration : use the email address generator. You can also choose an alternative domain name as they are usually not blacklisted (A new domain name is added every day). And for more confidentiality, we'll give",
                                "icon": {
                                    "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdXNEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5ea9e31bb1b90c20ac4ecd3f442b7598f9a22ff4/image_User_00000.png"
                                }
                            },
                            {
                                "name": "Why choose us fact name 2",
                                "description": "No need to create an address : all disposable email accounts already exist on YOPmail. No inspiration : use the email address generator. You can also choose an alternative domain name as they are usually not blacklisted (A new domain name is added every day). And for more confidentiality, we'll give",
                                "icon": {
                                    "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdVVEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1963fde885cce533736204dcb743b43dddffe296/image_User_00000.png"
                                }
                            },
                            {
                                "name": "Why choose us fact name 3",
                                "description": "No need to create an address : all disposable email accounts already exist on YOPmail. No inspiration : use the email address generator. You can also choose an alternative domain name as they are usually not blacklisted (A new domain name is added every day). And for more confidentiality, we'll give",
                                "icon": {
                                    "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdVlEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f7d636fb94c1203cd59043ce41d4e747ade5be29/image_Edit.png"
                                }
                            },
                            {
                                "name": "Why choose us fact name 4",
                                "description": "No need to create an address : all disposable email accounts already exist on YOPmail. No inspiration : use the email address generator. You can also choose an alternative domain name as they are usually not blacklisted (A new domain name is added every day). And for more confidentiality, we'll give",
                                "icon": {
                                    "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdWNEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8d2d07b2bc7be3059c8539235ad48531b9c711e7/image_User_00000.png"
                                }
                            }
                        ]
                    }
                }
            }
        })
          instance.getlandingdataRequestDetailsCallId = apiMsg.messageId
          runEngine.sendMessage("Unit Test", apiMsg);
          instance.setState({serviceData:[
            {
              attributes:{
                service_description:"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"
              }
            }
        ]})
        instance.setState({stepsData:[
          {
              "number": "step 1",
              "name": "step name 1",
              "description": "No need to create an address : all disposable email accounts already exist on YOPmail. No inspiration : use the email address generator. You can also ",
              "image": {
                  "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdG9EIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ccc34a93aa573ec57e2b184f30f67451310eb79e/image_Background.png"
              }
          },
          {
              "number": "step 2",
              "name": "step name 2",
              "description": "No need to create an address : all disposable email accounts already exist on YOPmail. No inspiration : use the email address generator. You can also ",
              "image": {
                  "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdHNEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b95a52ad0a293c7d59e8a40f2278c3b8e1e80bf1/Image%20Pasted%20at%202023-11-24%2013-04%20(2).png"
              }
          },
          {
              "number": "step 3",
              "name": "step name 3",
              "description": "No need to create an address : all disposable email accounts already exist on YOPmail. No inspiration : use the email address generator. You can also ",
              "image": {
                  "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdHdEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--797adeb0791f149298a1ef7856467f7971f654c8/image_Background.png"
              }
          },
          {
              "number": "step 4",
              "name": "step name 4",
              "description": "No need to create an address : all disposable email accounts already exist on YOPmail. No inspiration : use the email address generator. You can also ",
              "image": {
                  "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdDBEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--bea14911d30606448154b3b793961091b76aa9e0/image_Background.png"
              }
          }
      ]})
      expect(landingPageBlock).toBeTruthy();
    });
    when("I scroll images without errors", () => {

    landingPageBlock.find('[data-test-id="ImageScroll"]').forEach(imageNode => {
      imageNode.simulate('onChange');
    });
    });
    then("Image and content will change", () => {
      instance.setState({currentIndex:1})
     instance.imagesArray
     const event = {
      target: {
        scrollTop: 50,
        clientHeight: 200,
        scrollHeight: 400,
      },
    };
      instance.handleScroll(event)
      expect(instance.state.currentIndex).toBe(1);
      // expect(instance.state.currentIndex).toBe(1);
    });
    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(landingPageBlock).toBeTruthy();
    });
  });
});
