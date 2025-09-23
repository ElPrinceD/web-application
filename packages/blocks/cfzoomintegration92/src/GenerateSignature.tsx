const KJUR = require("jsrsasign");

function generateSignature(
  key: string, 
  secret: string, 
  meetingNumber: string | number, 
  role: number
): string {
  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2;
  const oHeader = { alg: "HS256", typ: "JWT" };

  const oPayload = {
    sdkKey: key,
    appKey: key,
    mn: meetingNumber,
    role: role,
    iat: iat,
    exp: exp,
    tokenExp: exp,
  };

  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  const sdkJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, secret);
  return sdkJWT;
}
export default generateSignature;

export function generateVideoSignature(key: string, secret: string, sessionName: string) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 2;
  const oHeader = { alg: "HS256", typ: "JWT" };

  const oPayload = {
    app_key: key,
    role_type: 0,
    tpc: sessionName,
    iat,
    exp,
    version: 1,
  };

  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  const sdkJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, secret);
  return sdkJWT;
}
