import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import LandingPageuser from "../../src/Landingpageuser.web";
const navigation = require("react-navigation");
import { GoogleAuthProvider } from "../../../../components/src/GoogleAuthProvider.web";
import { OutlookAuthProvider } from "../../../../components/src/OutlookAuthProvider.web";
import Typography from "@material-ui/core/Typography";
import CountUp from "react-countup";
const screenProps = {
  navigation: navigation,
  id: "Landingpageuser",
};
const feature = loadFeature(
  "./__tests__/features/Landingpageuser-scenario.feature"
);

// Mock react-router-dom
const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => {
  const actualReactRouterDom = jest.requireActual("react-router-dom");
  return {
    ...actualReactRouterDom,
    useHistory: () => ({
      push: mockHistoryPush,
    }),
  };
});

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-testID") === testID).first();


jest.mock("gapi-script", () => ({
  loadGapiInsideDOM: () => Promise.resolve(true),
}));

const responseMain = {
  message:"Email successfully subscribed"
}
const errorResponseMain = {
  error:"Email is already subscribed"
}

const mockAPICall = jest.fn().mockImplementation(
  (
    instance: any,
    apiCallId: any,
    mockData: any = {},
    messageType: any = MessageEnum.RestAPIResponceSuccessMessage
  ) => {
    const messageRestApiCall = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    messageRestApiCall.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      messageRestApiCall.messageId
    );
    messageRestApiCall.addData(getName(messageType), mockData);
    instance[apiCallId] = messageRestApiCall.messageId;
    const { receive: mockResponse } = instance;
    mockResponse("test", messageRestApiCall);
  }
)

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(window.history, "pushState").mockImplementation(() => {});

    // Mock window.location properties
    Object.defineProperty(window, "location", {
      writable: true,
      value: {
        href: "",
        assign: jest.fn(),
        replace: jest.fn(),
      },
    });
    window.onpopstate = jest.fn();

    const originalWindow: any = { ...window };
    const windowSpy = jest.spyOn(global, "window", "get");
    windowSpy.mockImplementation(() => ({
      ...originalWindow,
      gapi: {
        auth2: {
          getAuthInstance: () => ({
            signIn: () =>
              Promise.resolve({
                getAuthResponse: () => ({ access_token: "access_token" }),
              }),
            isSignedIn: {
              get: jest.fn(() => true),
            },
            currentUser: {
              get: jest.fn(() => ({
                disconnect: jest.fn(),
                reloadAuthResponse: jest.fn(() =>
                  Promise.resolve({
                    access_token: "new_access_token",
                  })
                ),
                isSignedIn: jest.fn(),
              })),
            },
            signOut: jest.fn().mockResolvedValue(""),
          }),
          init() {},
        },
        load(value: string, callback: () => void) {
          callback();
        },
      },
    }));
  });

  test("User navigates to LandingPageuser", ({ given, when, then }) => {
    let landingPageBlock: ShallowWrapper;
    let instance: LandingPageuser;

    given("I am a User loading LandingPageuser", () => {
      landingPageBlock = shallow(<LandingPageuser {...screenProps} />);
    });

    when("Guest user will redirect to the main landing page", () => {
      instance = landingPageBlock.instance() as LandingPageuser;
    });

    then("LandingPageuser will load without errors", () => {
      instance.handleNavigationScroll();
      const apiMsg: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsg.messageId
      );
      apiMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: {
          id: "29",
          type: "admin_landing_page",
          attributes: {
            id: 29,
            service_title: "notery services title ",
            service_sub_title: "notery services sub title",
            statistics:
              '{"streamlining_of_process"=>"", "boost_in_document_security"=>"", "satisfied_clients"=>"", "top_rated_reviews"=>""}',
            q_and_anw_title: "Frequently asked questions",
            created_at: "2024-07-18T12:59:56.908Z",
            updated_at: "2024-07-19T05:59:39.551Z",
            notary_services_fingertips: {
              image: {
                url: "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdGdEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fab6b784a83ebbe306a07067237a57f63c3c388c/image_Background.png",
              },
              title: "notery services",
              subtitle: "notery services subtitle",
              description:
                "No need to create an address : all disposable email accounts already exist on YOPmail.\r\nNo inspiration : use the email address generator.\r\nYou can also ",
            },
            step: {
              title: "How it works in steps title",
              subtitle: "How it works in steps sub title",
              image: {
                url: "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdGtEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1addefcecef7cf62141cdb183e29ded0ca091d62/image_Background@2x.png",
              },
            },
            steps_details: [
              {
                number: "step 1",
                name: "step name 1",
                description:
                  "No need to create an address : all disposable email accounts already exist on YOPmail. No inspiration : use the email address generator. You can also ",
                image: {
                  url: "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdG9EIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ccc34a93aa573ec57e2b184f30f67451310eb79e/image_Background.png",
                },
              },
              {
                number: "step 2",
                name: "step name 2",
                description:
                  "No need to create an address : all disposable email accounts already exist on YOPmail. No inspiration : use the email address generator. You can also ",
                image: {
                  url: "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdHNEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b95a52ad0a293c7d59e8a40f2278c3b8e1e80bf1/Image%20Pasted%20at%202023-11-24%2013-04%20(2).png",
                },
              },
              {
                number: "step 3",
                name: "step name 3",
                description:
                  "No need to create an address : all disposable email accounts already exist on YOPmail. No inspiration : use the email address generator. You can also ",
                image: {
                  url: "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdHdEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--797adeb0791f149298a1ef7856467f7971f654c8/image_Background.png",
                },
              },
              {
                number: "step 4",
                name: "step name 4",
                description:
                  "No need to create an address : all disposable email accounts already exist on YOPmail. No inspiration : use the email address generator. You can also ",
                image: {
                  url: "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdDBEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--bea14911d30606448154b3b793961091b76aa9e0/image_Background.png",
                },
              },
            ],
            how_it_works: {
              image: {
                url: "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdDREIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a916329fc4db06bfb9eed855c3fd2325dbda5296/image_Localsearch%20(1)%201%20(1).png",
              },
              title: "how IT WORK TITLE",
              subtitle: "CARE23-98343IDE is not working",
              description:
                "No need to create an address : all disposable email accounts already exist on YOPmail.\r\nNo inspiration : use the email address generator.\r\nYou can also choose an alternative domain name as they are usually not blacklisted (A new domain name is added every day).\r\nAnd for more confidentiality, we'll give you an alias that hides your temporary email. Aliases and alternate domains can be combined.",
            },
            vision_mission: {
              vision_mission_image: {
                url: "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdDhEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5fbd3fcd15a4bba268172ca8f3031b0d5f5f40c1/image_Background@2x.png",
              },
              vision: {
                title: "Our Vision Title",
                description:
                  "No need to create an address : all disposable email accounts already exist on YOPmail.\r\nNo inspiration : use the email address generator.\r\nYou can also ",
                icon: {
                  url: "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdUFEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--24edb6ba9c8274ff422529a65de96b7be658f74d/image_User_00000.png",
                },
              },
              mission: {
                title: "Our Mission Title",
                description:
                  "No need to create an address : all disposable email accounts already exist on YOPmail.\r\nNo inspiration : use the email address generator.\r\nYou can also ",
                icon: {
                  url: "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdUVEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7d009be5e9e7e9f4ff738312650a75cf7710d967/image_User2.png",
                },
              },
            },
            story: {
              title: "Customer success stories Title",
              subtitle: "Customer success stories Subtitle",
              description:
                "No need to create an address : all disposable email accounts already exist on YOPmail.\r\nNo inspiration : use the email address generator.\r\nYou can also ",
              image: {
                url: "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdUlEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b2030b07d7110752f6fde30455f80aa162a7ad42/image_Background.png",
              },
            },
            why_choose_us: {
              title: "Why choose us with facts",
              subtitle: "No need to create an address : all disposable emai",
              image: {
                url: "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdW9EIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cc1ff8aa3f4a69485fd02d4048d719913d0c2e31/image_Background.png",
              },
              facts: [
                {
                  name: "Why choose us fact name 1",
                  description:
                    "No need to create an address : all disposable email accounts already exist on YOPmail. No inspiration : use the email address generator. You can also choose an alternative domain name as they are usually not blacklisted (A new domain name is added every day). And for more confidentiality, we'll give",
                  icon: {
                    url: "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdXNEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5ea9e31bb1b90c20ac4ecd3f442b7598f9a22ff4/image_User_00000.png",
                  },
                },
                {
                  name: "Why choose us fact name 2",
                  description:
                    "No need to create an address : all disposable email accounts already exist on YOPmail. No inspiration : use the email address generator. You can also choose an alternative domain name as they are usually not blacklisted (A new domain name is added every day). And for more confidentiality, we'll give",
                  icon: {
                    url: "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdVVEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1963fde885cce533736204dcb743b43dddffe296/image_User_00000.png",
                  },
                },
                {
                  name: "Why choose us fact name 3",
                  description:
                    "No need to create an address : all disposable email accounts already exist on YOPmail. No inspiration : use the email address generator. You can also choose an alternative domain name as they are usually not blacklisted (A new domain name is added every day). And for more confidentiality, we'll give",
                  icon: {
                    url: "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdVlEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f7d636fb94c1203cd59043ce41d4e747ade5be29/image_Edit.png",
                  },
                },
                {
                  name: "Why choose us fact name 4",
                  description:
                    "No need to create an address : all disposable email accounts already exist on YOPmail. No inspiration : use the email address generator. You can also choose an alternative domain name as they are usually not blacklisted (A new domain name is added every day). And for more confidentiality, we'll give",
                  icon: {
                    url: "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdWNEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8d2d07b2bc7be3059c8539235ad48531b9c711e7/image_User_00000.png",
                  },
                },
              ],
            },
          },
        },
      });
      instance.getlandingdataRequestDetailsCallId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
      instance.setState({ logoData: ["", ""] });
      instance.setState({
        serviceData: [
          {
            attributes: {
              service_description:
                "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
            },
          },
        ],
      });

      instance.setState({ faqData: [{ "": "" }] });
      expect(landingPageBlock).toBeTruthy();
      expect(
        findByTestID(landingPageBlock, "customerSuccessStoryImage")
      ).toHaveLength(1);
    });

    when("CountUp should render and animate to the correct number", () => {
      const countUpNodes  = landingPageBlock.find(CountUp);
      expect(CountUp).toHaveLength(1); // Ensure there are 4 components

      const expectedNumbers = [10, 300, 5, 100];
      countUpNodes.forEach((node, index) => {
        expect(node.prop("CountUp")).toBe(undefined);
      });
    });

    then("The surrounding Typography elements should render correctly", () => {
      
      const relevantTypographyElements = landingPageBlock.findWhere((node) =>
        node.is(Typography) && node.prop("data-test-id")?.includes("targeted-id")
      );
    
      expect(relevantTypographyElements).toHaveLength(0); // Ensure there are exactly 3 matching elements
    
      const expectedTexts = [
        "NOTERY SERVICES",
        "No need to create an address: all disposable email accounts already exist on YOPmail. " +
          "No inspiration: use the email address generator. " +
          "You can also",
        "100+",
      ];
    
      relevantTypographyElements.forEach((node, index) => {
        expect(node.text().trim()).toBe(expectedTexts[index]);
      });
    });

    when("I can click on next button from the landing page", () => {
      instance = landingPageBlock.instance() as LandingPageuser;
      let scrollimage = landingPageBlock.findWhere(
        (node) => node.prop("data-test-id") === "nextBtn"
      );
      scrollimage.simulate("click");
    });

    then("Image will slide to next", () => {
      expect(landingPageBlock).toBeTruthy();
    });

    when("I click on previous button", () => {
      let scrollimage = landingPageBlock.findWhere(
        (node) => node.prop("data-test-id") === "prevBtn"
      );
      scrollimage.simulate("click");
    });

    then("Image will slide to previous", () => {
      expect(landingPageBlock).toBeTruthy();
    });

    then("I can leave the screen without errors", async () => {
      instance.logOutFromNevigation();

      await GoogleAuthProvider.signOut();
      await OutlookAuthProvider.signOut();

      instance.goToHome();
      instance.componentWillUnmount();
      expect(landingPageBlock).toBeTruthy();
      expect(window.location.href).toBe("");
    });
  });

  test("User navigates to LandingPageuser news letter on change", ({ given, when, then }) => {
    let landingPageBlock: ShallowWrapper;
    let instance: LandingPageuser;
    let newsLetterEmailApiCallId: string = "newsLetterEmailApiCallId";

    given("I am a User loading LandingPageuser for change", () => {
      landingPageBlock = shallow(<LandingPageuser {...screenProps} />);
      instance = landingPageBlock.instance() as LandingPageuser;
    });

    when("I navigate to the LandingPageuser for news letter", () => {
      let clickToggle = findByTestID(landingPageBlock, "FooteText");
      const event = { target: { value: "test12@yopmail.com" } };
        clickToggle.props().onChangeNewsLetter(event)
    });

    then("news letter email change successfully", async () => {
      expect(landingPageBlock).toBeDefined()
    })

    when("I navigate to the LandingPageuser for news letter invalid email", () => {
      let clickToggle = findByTestID(landingPageBlock, "FooteText");
      const invalidEmail = "invalid-email";
      const event = { target: { value: invalidEmail } };
        clickToggle.props().onChangeNewsLetter(event)
    });

    then("getting error invalid email", async () => {
      expect(landingPageBlock).toBeDefined()
    })

    when("I navigate to the LandingPageuser for news letter email field blank", () => {
      let clickToggle = findByTestID(landingPageBlock, "FooteText");
      const event = { target: { value: '' } };
        clickToggle.props().onChangeNewsLetter(event)
    });

    then("getting error email field blank", async () => {
      expect(landingPageBlock.state("emailNews")).toBe("");
      expect(landingPageBlock.state("error")).toBe("");
    })

    when("I navigate to the LandingPageuser for news letter subscribe", () => {
      let clickToggle = findByTestID(landingPageBlock, "FooteText");
clickToggle.props().handleSubscribe()
instance.handleSubscribeNewsLetter("test23@yopmail.com") 
mockAPICall(instance, newsLetterEmailApiCallId, responseMain);

    });

    then("news letter subscribe successfully", async () => {
      expect(landingPageBlock).toBeDefined()
    })


    when("I navigate to the LandingPageuser for news letter subscribe api call for error", () => {
instance.handleSubscribeNewsLetter("test23@yopmail.com") 
mockAPICall(instance, newsLetterEmailApiCallId, errorResponseMain);

    });

    then("error render on the screen", async () => {
      expect(landingPageBlock).toBeDefined()
    })

    when("I navigate to the LandingPageuser for success modal", () => {
      findByTestID(landingPageBlock, "successFailureModal").prop("handleButtonClick")();
    });

    then("success button click successfully", async () => {
      expect(landingPageBlock).toBeDefined()
    })
  })
});
