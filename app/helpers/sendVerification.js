import { Resend } from "resend";
import VerificationEmail from "../email/VerificationEmail";

export async function sendVerificationEmail({ email, username, verifyCode }) {
  // Check if environment variable is set
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set in the environment variables");
    return { success: false, message: "Internal server error" };
  }

  // Basic input validation
  if (!email || !username || !verifyCode) {
    console.error("Missing required parameters: email, username, or verifyCode");
    return { success: false, message: "Missing required parameters" };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    console.log(email)
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [`${email}`],
      subject: 'CodeBlogz | Verification Email',
      react: VerificationEmail({ username, otp: verifyCode })
    });
    return { success: true, message: "Verification email sent successfully" };
  } catch (error) {
    console.error("Error occurred while sending the verification email:", error);
    return { success: false, message: "Could not send verification email", error: error.message };
  }
}
