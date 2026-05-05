import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const welcomeEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to CodeLifeWithHarsh</title>
</head>
<body style="margin: 0; padding: 0; background-color: #09090B; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #09090B; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width: 560px; width: 100%; background-color: #111113; border-radius: 16px; border: 1px solid #1E1E24; overflow: hidden;">
          <tr>
            <td style="height: 3px; background: linear-gradient(to right, #7F77DD, #1D9E75);"></td>
          </tr>
          <tr>
            <td style="padding: 36px 40px 0;">
              <p style="margin: 0 0 28px; font-size: 13px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: #7F77DD;">CodeLifeWithHarsh</p>
              <h1 style="margin: 0 0 8px; font-size: 28px; font-weight: 600; color: #FFFFFF; line-height: 1.2;">You're in.</h1>
              <p style="margin: 0 0 28px; font-size: 16px; color: #71717A; line-height: 1.5;">Welcome to the AI Toolkit - glad you're here.</p>
              <div style="height: 1px; background: #1E1E24; margin-bottom: 28px;"></div>
              <p style="margin: 0 0 16px; font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: #52525B;">What you get</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px;">
                <tr>
                  <td width="32" valign="top" style="padding-top: 1px; font-size: 16px;">🔧</td>
                  <td style="font-size: 14px; color: #A1A1AA; line-height: 1.6;"><strong style="color: #E4E4E7;">AI tools worth using</strong> - curated from real builds, not sponsored lists</td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px;">
                <tr>
                  <td width="32" valign="top" style="padding-top: 1px; font-size: 16px;">⚡</td>
                  <td style="font-size: 14px; color: #A1A1AA; line-height: 1.6;"><strong style="color: #E4E4E7;">n8n templates and workflows</strong> - production-ready, free to copy</td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 28px;">
                <tr>
                  <td width="32" valign="top" style="padding-top: 1px; font-size: 16px;">🎯</td>
                  <td style="font-size: 14px; color: #A1A1AA; line-height: 1.6;"><strong style="color: #E4E4E7;">Honest breakdowns</strong> - what I'm learning, building, and shipping before it hits Instagram</td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 32px;">
                <tr>
                  <td align="center">
                    <a href="https://codelifewithharsh.vercel.app/toolkit" style="display: inline-block; background: #7F77DD; color: #FFFFFF; text-decoration: none; font-size: 14px; font-weight: 500; padding: 12px 32px; border-radius: 8px; letter-spacing: 0.02em;">Browse the AI Toolkit -></a>
                  </td>
                </tr>
              </table>
              <div style="height: 1px; background: #1E1E24; margin-bottom: 28px;"></div>
              <p style="margin: 0 0 16px; font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: #52525B;">Find me here</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 32px;">
                <tr>
                  <td>
                    <a href="https://instagram.com/codelifewithharsh" style="display: inline-block; margin: 0 8px 8px 0; padding: 8px 16px; background: #1A1A1F; border: 1px solid #2A2A32; border-radius: 6px; text-decoration: none; font-size: 13px; color: #A1A1AA;">📱 Instagram</a>
                    <a href="https://youtube.com/@codelifewithharsh" style="display: inline-block; margin: 0 8px 8px 0; padding: 8px 16px; background: #1A1A1F; border: 1px solid #2A2A32; border-radius: 6px; text-decoration: none; font-size: 13px; color: #A1A1AA;">🎥 YouTube</a>
                    <a href="https://linkedin.com/in/code-life-with-harsh" style="display: inline-block; margin: 0 8px 8px 0; padding: 8px 16px; background: #1A1A1F; border: 1px solid #2A2A32; border-radius: 6px; text-decoration: none; font-size: 13px; color: #A1A1AA;">💼 LinkedIn</a>
                    <a href="https://github.com/codelifewithharsh" style="display: inline-block; margin: 0 8px 8px 0; padding: 8px 16px; background: #1A1A1F; border: 1px solid #2A2A32; border-radius: 6px; text-decoration: none; font-size: 13px; color: #A1A1AA;">🐙 GitHub</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 4px; font-size: 14px; color: #71717A;">Talk soon,</p>
              <p style="margin: 0 0 32px; font-size: 15px; font-weight: 500; color: #E4E4E7;">Harsh - @codelifewithharsh</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px; border-top: 1px solid #1E1E24; background: #0D0D10;">
              <p style="margin: 0; font-size: 12px; color: #3F3F46; line-height: 1.6;">You subscribed at codelifewithharsh.vercel.app/toolkit - No spam, ever. Reply to this email to unsubscribe anytime.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export async function POST(req: NextRequest) {
  try {
    const { email, source = "website" } = await req.json();

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { error: dbError } = await supabaseAdmin
      .from("subscribers")
      .insert({ email, source });

    if (dbError) {
      if (dbError.code === "23505") {
        return NextResponse.json({ error: "already_subscribed" }, { status: 409 });
      }
      console.error("Supabase insert error:", dbError);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    const { error: emailError } = await resend.emails.send({
      from: "Harsh Goyal <onboarding@resend.dev>",
      to: email,
      subject: "You're in - welcome to codelifewithharsh",
      html: welcomeEmailHtml,
    });

    if (emailError) {
      console.error("Resend welcome email error:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Subscribe route error:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
