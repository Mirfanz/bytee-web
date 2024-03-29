import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from "@sendinblue/client";
import { UserType } from "./session";

export async function sendVerification(user: UserType, token: string) {
  const apiInstance = new TransactionalEmailsApi();
  apiInstance.setApiKey(
    TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_APIKEY
  );

  const host = process.env.HOST;

  try {
    const result = await apiInstance.sendTransacEmail({
      to: [{ email: user.email, name: user.email }],
      sender: { email: "bytee@gmail.com", name: "Bytee Smartlife" },
      subject: "Verifikasi Akun",
      htmlContent: `<h1>Hi ${user.name}!</h1></br><a href="${host}/account/verify/${token}"><button>Verifikasi Akun</button></a>`,
    });
    console.log("Email sent:", result.body);
    console.log("Email Sent");
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    console.log("Email Can`t send");
    return false;
  }
}
