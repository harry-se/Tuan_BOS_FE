// Transactional email adapter (requirement 14.2: "Email transactional:
// SMTP/provider chuyên dụng"). No provider credentials exist yet, so the
// active implementation logs to the server console. Swap `emailAdapter` for
// a real implementation (SMTP via nodemailer, Brevo/SendGrid/Resend API...)
// once a provider account exists — every call site in this app only depends
// on the EmailAdapter interface below.
export interface EmailMessage {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export interface EmailAdapter {
  send(message: EmailMessage): Promise<{ ok: boolean; id?: string }>;
}

class ConsoleEmailAdapter implements EmailAdapter {
  async send(message: EmailMessage) {
    console.log("[email:stub] would send email:", {
      to: message.to,
      subject: message.subject,
      preview: message.text.slice(0, 200),
    });
    return { ok: true, id: `stub-${Date.now()}` };
  }
}

export const emailAdapter: EmailAdapter = new ConsoleEmailAdapter();
