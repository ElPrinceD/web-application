export const PublicClientApplication = jest.fn().mockImplementation(() => {
    return {
      acquireTokenSilent: jest.fn().mockResolvedValue({
        accessToken: 'mockAccessTokenSilent'
      }),
      acquireTokenPopup: jest.fn().mockResolvedValue({
        accessToken: 'mockAccessTokenPopup'
      })
    };
  });
  