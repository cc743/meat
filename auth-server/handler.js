const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");

/**
 *SCOPES allows you to set the access levels
 **/

const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

/**
 *Credentials are those values required to get access to your calendar 
 **/

const credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  redirect_uris: ["https://cc743.github.io/meat/"],
  javascript_origins: ["https://cc743.github.io", "http://localhost:3000"],
};
const { client_secret, client_id, redirect_uris, calendar_id } = credentials;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

//the first step in the oAuth process is to generate a URL so users can log in with Google and be authorized to see your calendar.  After logging in, they'll receive a code as a URL parameter
module.exports.getAuthURL = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      authUrl: authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  //The values used to instantiate the OAuthClient are at the top of the file
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  //Decode authorization code extracted from the URL query
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    //exchange authorization code for access token with a "callback" after the exchange, The callback in this case is an arrow function with the results as parameters: "err" and "token"

    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  })
  .then((token) => {
    //respond with oAuth token
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(token),
    };
  })
  .catch((err) => {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  });
};