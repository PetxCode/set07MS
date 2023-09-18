import nodemailer from "nodemailer";
import { google } from "googleapis";
import path from "path";
import ejs from "ejs";

const GOOGLE_ID =
  "848542784186-9os7noa7qvcg3nckfu38s3bhob8u6oga.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_REFRESHTOKEN =
  "1//04GgN8ydoI_ZdCgYIARAAGAQSNwF-L9IrKCOkFE95PncupZNTb3WCiygNcFb1vp20oW-1SMJTKzSWxnWw2B6nf4S85GXSTpgR44M";

const GOOGLE_URL = "https://developer.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_URL);
oAuth.setCredentials({ access_token: GOOGLE_REFRESHTOKEN });

const URL: string = "http://localhost:3344";

export const openingMail = async (user: any) => {
  try {
    const accessToken: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "codelabbest@gmail.com",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: GOOGLE_REFRESHTOKEN,
        accessToken,
      },
    });

    const data = {
      email: user.email,
      userName: user.userName,
      url: `${URL}/api/${user.id}/verified`,
    };

    const locateFile = path.join(__dirname, "../views/accountOpening.ejs");
    const readFile = await ejs.renderFile(locateFile, data);

    const mailer = {
      from: "Account Opening 🚀🚀🚀 <codelabbest@gmail.com>",
      to: user?.email,
      subject: "Account Opening",
      html: readFile,
    };

    transport.sendMail(mailer);
  } catch (error) {
    console.log(error);
  }
};
