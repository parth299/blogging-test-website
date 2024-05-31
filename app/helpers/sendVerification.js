import { Resend } from "resend"
import VerificationEmail from "../email/VerificationEmail";

export async function sendVerificationEmail({
  email,
  username,
  verifyCode
}) {
    const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'CodeBlogz | Verification Email',
      react: VerificationEmail({username, otp: verifyCode})
    });
    return {success: true, message: "Verification email sent successfully"}
  } catch (error) {
    console.error("Error occured while sending the verification email");
    return {success: false, message: "Could not send verification email"}
  }
}

