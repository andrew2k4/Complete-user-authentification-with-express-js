const SibApiV3Sdk = require("sib-api-v3-sdk");

SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
  "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";

function TransactionEmail(email: string, message: string): any {
  return new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
    sender: { email: "nguemnangandrew@gmail.com", name: "Coin Control" },
    subject: "One Time Password",
    htmlContent: `<!DOCTYPE html><html><body><p>Your one time password is : ${message} </p></body></html>`,
    params: {
      greeting: "This is the default greeting",
      headline: "This is the default headline",
    },
    messageVersions: [
      //Definition for Message Version 1

      {
        to: [
          {
            email: `${email}`,
            name: "Coin Control",
          },
        ],

        htmlContent: `<!DOCTYPE html><html><body><p>Your one time password is : ${message} </p></body></html>`,
        subject: "We are happy to be working with you",
      },

      // Definition for Message Version 2
      {
        to: [
          {
            email: `${email}`,
          },
        ],
      },
    ],
  });
}

export async function sendEmailToken(email: string, token: string) {
  return await TransactionEmail(email, token);
}
