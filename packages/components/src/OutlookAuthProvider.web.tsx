import { BlockComponent } from "../../framework/src/BlockComponent";
import { AccountInfo, PublicClientApplication } from '@azure/msal-browser';
import { removeStorageData, setStorageData } from "../../framework/src/Utilities";

interface Props { }

interface S { }

interface SS { }

interface TokenData {
  access_token: string;
  refresh_token: string;
}

const msalConfig = {
  auth: {
    clientId: '42b5b413-2926-4c01-96b3-683376a1c328',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  }
};

const msalInstance = new PublicClientApplication(msalConfig);

export class OutlookAuthProvider extends BlockComponent<Props, S, SS> {

  static getAccessToken = async (): Promise<TokenData> => {
    const request = {
      scopes: ["User.Read", "Calendars.Read", "offline_access"],
      prompt: "select_account"
    };

    try {
      // const accounts = msalInstance.getAllAccounts();

      const loginResponse = await msalInstance.loginPopup(request);

      const tokenData: TokenData = {
        access_token: loginResponse.accessToken,
        refresh_token: loginResponse.idToken,
      };

      setStorageData('ms_accessToken', tokenData.access_token);
      setStorageData('ms_refreshToken', tokenData.refresh_token);
      return tokenData;
    } catch (error) {
      console.error("Error acquiring token:", error);
      throw error;

    }
  };

  static signOut = async () => {
    try {
      const accounts = msalInstance.getAllAccounts();

      if (accounts.length > 0) {
        // await msalInstance.logoutPopup();
        removeStorageData("ms_refreshToken");
        removeStorageData("isOutlookSync");
        removeStorageData("ms_accessToken");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error signing out:", error);
      return false;
    }
  };

  static fetchUserProfilePicture = async (accessToken: string) => {
    const photoEndpoint = "https://graph.microsoft.com/v1.0/me/photo/$value";

    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await fetch(photoEndpoint, options);

      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);

        reader.onloadend = () => {
          const base64data = reader.result as string;
          resolve(base64data);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      });
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  static refreshAccessToken = async (refreshToken: string): Promise<string> => {
    // const refreshToken = getStorageData('ms_refreshToken');
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const tokenEndpoint = "https://login.microsoftonline.com/common/oauth2/v2.0/token";

    const body = new URLSearchParams();
    body.append('client_id', msalConfig.auth.clientId);
    body.append('grant_type', 'refresh_token');
    body.append('refresh_token', refreshToken);
    body.append('redirect_uri', msalConfig.auth.redirectUri);
    body.append('scope', 'User.Read Calendars.Read offline_access');

    try {
      const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      const data = await response.json();
      if (data.error) {
        console.error("Error refreshing token:", data.error_description);
        removeStorageData("ms_refreshToken");
        removeStorageData("isOutlookSync");
        removeStorageData("ms_accessToken");
        throw new Error(data.error_description);
      }

      setStorageData('ms_accessToken', data.access_token);
      if (data.refresh_token) {
        setStorageData('ms_refreshToken', data.refresh_token);
      }

      return data.access_token;
    } catch (error) {
      removeStorageData("ms_refreshToken");
      removeStorageData("isOutlookSync");
      removeStorageData("ms_accessToken");
      console.error("Error during manual token refresh:", error);
      throw error;
    }
  };
}

export default msalInstance;
