import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}
interface S {
  // Customizable Area Start
  dashboardData: { "id": string, "type": string, "attributes": { "total_candidates": number, "sub_attributres": { "type": string, "quantity": string }[] } };
  token: string;
  errorMsg: string;
  loading: boolean;
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class DashboardController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  apiDashboardItemCallId: string = "";
  // Customizable Area End
  
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage)
    ];

    this.state = {
      dashboardData: {"id":"0","type":"candidate","attributes":{"total_candidates":0,"sub_attributres":[{"type":"Interview with client","quantity":"0"}]}},      
      errorMsg: "",
      token: "",
      loading: false
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.setState({ loading: true });
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener('willFocus', () => {
        this.getToken();
      });
    }
    // Customizable Area Start
    // Dashboard data will be fetched after token is received
    // Customizable Area End
  }
  
  getToken=()=>{
    const message: Message = new Message(getName(MessageEnum.SessionRequestMessage));
    this.send(message);
  }

  getDashboardData(): boolean {
    console.log("this.state.token", this.state.token);
    if (!this.state.token) {
      console.log("Token not available, skipping dashboard data fetch");
      return false;
    }
    
    const header = {
      "Content-Type": configJSON.dashboarContentType,
      "Token": this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiDashboardItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.dashboardGetUrl
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token: string = message.getData(
        getName(MessageEnum.SessionResponseToken)
      );
      if (token) {
        runEngine.debugLog("TOKEN", token);
        this.setState({ token }, () => {
          // Now that we have the token, fetch dashboard data
          this.getDashboardData();
        });
      } else {
        this.setState({ loading: false, errorMsg: "Please Login" });
        return;
      }
    }
    
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      )

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      )

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (responseJson && !responseJson.errors) {
        if (apiRequestCallId === this.apiDashboardItemCallId) {
          console.log("Dashboard API response:", responseJson);
          
          // Transform request_counts data to dashboard format
          let dashboardData;
          if (responseJson.data && responseJson.data.attributes) {
            // If the response has the expected structure, use it directly
            dashboardData = responseJson.data;
          } else {
            // Transform request_counts data to dashboard format
            const totalRequests = responseJson.total_requests || 0;
            const pendingRequests = responseJson.pending_requests || 0;
            const completedRequests = responseJson.completed_requests || 0;
            const cancelledRequests = responseJson.cancelled_requests || 0;
            
            dashboardData = {
              "id": "1",
              "type": "candidate",
              "attributes": {
                "total_candidates": totalRequests,
                "sub_attributres": [
                  {"type": "Pending Requests", "quantity": pendingRequests.toString()},
                  {"type": "Completed Requests", "quantity": completedRequests.toString()},
                  {"type": "Cancelled Requests", "quantity": cancelledRequests.toString()},
                  {"type": "Total Requests", "quantity": totalRequests.toString()}
                ]
              }
            };
          }
          
          this.setState({ loading: false, dashboardData: dashboardData, errorMsg: ''})
        }
      }
      else if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.apiDashboardItemCallId) {
          console.log("Dashboard API error:", responseJson.errors);
          this.setState({ loading: false, dashboardData: {"id":"0","type":"candidate","attributes":{"total_candidates":0,"sub_attributres":[{"type":"Interview with client","quantity":"0"}]}}, errorMsg : "Unable to load dashboard data. Please try again later." })
        }
      }
      
      // Handle network errors or API failures
      if (errorReponse && apiRequestCallId === this.apiDashboardItemCallId) {
        console.log("Dashboard API network error:", errorReponse);
        
        // Provide fallback data so users can see the dashboard interface
        const fallbackData = {
          "id": "1",
          "type": "candidate",
          "attributes": {
            "total_candidates": 0,
            "sub_attributres": [
              {"type": "Pending Requests", "quantity": "0"},
              {"type": "Completed Requests", "quantity": "0"},
              {"type": "Cancelled Requests", "quantity": "0"},
              {"type": "Total Requests", "quantity": "0"}
            ]
          }
        };
        
        this.setState({ 
          loading: false, 
          dashboardData: fallbackData, 
          errorMsg: "Network error. Using fallback data. Please check your connection and try again." 
        })
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  getPercentageFun = (percentage: number) => {
    return (percentage * 100).toFixed(0) + '%'
  }
  getPercentageColor= (type: string) => {
   switch(type) {
    case 'Pending Requests':
      return '#FFA500' // Orange for pending
    case 'Completed Requests':
      return '#35C95E' // Green for completed
    case 'Cancelled Requests':
      return '#FF0000' // Red for cancelled
    case 'Total Requests':
      return '#007BFF' // Blue for total
    default:
      return '#D52CD0' // Default purple for any other types
    }
  }
  // Customizable Area End

}
