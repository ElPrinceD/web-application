import { setStorageData, removeStorageData } from "../../framework/src/Utilities";
interface TokenData {
  access_token: string;
  refresh_token?: string; // Refresh token may not always be present
}
export class GoogleAuthProvider {

  static trySilentLogin = async (): Promise<string | null> => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    try {
      // Check if the user is already signed in
      if (auth2.isSignedIn.get()) {
        const user = auth2.currentUser.get();
        const accessToken = user.getAuthResponse().access_token;

        // Save token to local storage (or fetch from storage)
        setStorageData("google_auth", accessToken);
        return accessToken;
      } else {
        // User is not signed in
        return null;
      }
    } catch (error) {
      console.error("Silent login failed:", error);
      return null;
    }
  };

  // Get Google Access Token

  static getAccessToken = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const gapi = window.gapi; // Assuming gapi is loaded globally

      gapi.auth2.getAuthInstance().grantOfflineAccess({
        prompt: 'consent', // Force consent to get refresh token
      }).then((response) => {
        const authorizationCode = response.code;
        console.log('Authorization Code:', response);
        resolve(authorizationCode); // Resolve the authorization code
      }).catch((error) => {
        console.error('Error during sign-in:', error);
        reject(error);
      });
    });
  };



  // Sign Out from Google
  static signOut = async () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    try {
      removeStorageData("google_auth");
      removeStorageData("refresh_google_auth");
      removeStorageData("isGoogleSync");
      return true;
    } catch (error) {
      console.error("Error signing out from Google:", error);
      return false;
    }
  };

  // Refresh Google Access Token (if required)

  static refreshAccessToken = async (refreshToken: string) => {
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || "",
          client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET || "",
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStorageData("google_auth", data.access_token);
        return data.access_token;
      } else {
        console.error("Failed to refresh Google access token", data);
        removeStorageData("google_auth");
        removeStorageData("refresh_google_auth");
        removeStorageData("isGoogleSync");
      }
    } catch (error) {
      removeStorageData("google_auth");
      removeStorageData("refresh_google_auth");
      removeStorageData("isGoogleSync");
      console.error("Error refreshing Google access token:", error);
    }
  }



  // Function to exchange authorization code for tokens
  static fetchTokens = async (authorizationCode: string): Promise<TokenData> => {
    const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
    const CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET || "";
    const REDIRECT_URI = window.location.origin;

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: authorizationCode,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tokens');
    }

    const tokenData: TokenData = await response.json();
    return tokenData;
  };

}
