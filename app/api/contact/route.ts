import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const { error: dbError } = await supabaseAdmin
      .from("contact_messages")
      .insert({ name, email, message });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
    }

    const contactEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New message - Portfolio</title>
</head>
<body style="margin: 0; padding: 0; background-color: #09090B; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #09090B; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width: 560px; width: 100%; background-color: #111113; border-radius: 16px; border: 1px solid #1E1E24; overflow: hidden;">
          <tr>
            <td style="height: 3px; background: linear-gradient(to right, #1D9E75, #7F77DD);"></td>
          </tr>
          <tr>
            <td style="padding: 32px 40px 24px; border-bottom: 1px solid #1E1E24;">
              <p style="margin: 0 0 12px; display: inline-block; font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: #1D9E75; background: rgba(29,158,117,0.1); padding: 4px 10px; border-radius: 20px; border: 1px solid rgba(29,158,117,0.2);">New message</p>
              <h1 style="margin: 0; font-size: 22px; font-weight: 600; color: #FFFFFF; line-height: 1.3;">Someone reached out from your portfolio</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px; background: #18181B; border: 1px solid #27272A; border-radius: 8px; padding: 14px 16px;">
                <tr>
                  <td width="80" style="font-size: 11px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: #52525B; vertical-align: top; padding-top: 1px;">Name</td>
                  <td style="font-size: 15px; font-weight: 500; color: #E4E4E7;">${name}</td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px; background: #18181B; border: 1px solid #27272A; border-radius: 8px; padding: 14px 16px;">
                <tr>
                  <td width="80" style="font-size: 11px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: #52525B; vertical-align: top; padding-top: 1px;">Email</td>
                  <td><a href="mailto:${email}" style="font-size: 15px; font-weight: 500; color: #7F77DD; text-decoration: none;">${email}</a></td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 28px; background: #18181B; border: 1px solid #27272A; border-radius: 8px; padding: 14px 16px;">
                <tr>
                  <td width="80" style="font-size: 11px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: #52525B; vertical-align: top; padding-top: 2px;">Message</td>
                  <td style="font-size: 14px; color: #A1A1AA; line-height: 1.7;">${message}</td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}?subject=Re: Your message on codelifewithharsh.vercel.app" style="display: inline-block; background: #7F77DD; color: #FFFFFF; text-decoration: none; font-size: 14px; font-weight: 500; padding: 12px 32px; border-radius: 8px; letter-spacing: 0.02em;">Reply to ${name} -></a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px; border-top: 1px solid #1E1E24; background: #0D0D10;">
              <p style="margin: 0; font-size: 12px; color: #3F3F46; line-height: 1.6;">Sent from your portfolio contact form at codelifewithharsh.vercel.app</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    const { error: emailError } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "harshgoyal1415@gmail.com",
      replyTo: email,
      subject: `New message from ${name}`,
      html: contactEmailHtml,
    });

    if (emailError) {
      console.error("Resend error:", emailError);
      return NextResponse.json({ error: emailError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
