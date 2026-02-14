
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { email, message } = await req.json();

        if (!email || !message) {
            return NextResponse.json(
                { error: 'Email and message are required' },
                { status: 400 }
            );
        }

        // Transporter using the provided credentials
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER || 'newmove2030@gmail.com', // Sender email
                pass: process.env.GMAIL_PASS || 'vzowmfjiumdjeute',      // App password
            },
        });

        // Email options
        const mailOptions = {
            from: `"RokiRoy Digital Contact" <${process.env.GMAIL_USER || 'newmove2030@gmail.com'}>`, // Sender address
            to: 'rokiroydev@gmail.com', // Receiver address
            replyTo: email, // The user's email so you can reply to them
            subject: `New Contact Form Message from ${email}`,
            text: `
        You have received a new message from your website contact form.
        
        From: ${email}
        
        Message:
        ${message}
      `,
            html: `
        <h3>New Contact Message</h3>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
