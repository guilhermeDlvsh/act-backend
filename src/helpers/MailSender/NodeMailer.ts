import nodeMailer from "nodemailer";

import { IMailSender, MailConfig } from "./types";

class MailSenderNodeMailer implements IMailSender {
  private readonly mailer: any;
  constructor() {
    this.mailer = nodeMailer.createTransport({
      host: process.env.NODE_MAILER_HOST,
      port: process.env.NODE_MAILER_PORT,
      auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASS,
      },
    });
  }
  async send(mailConfig: MailConfig): Promise<void> {
    let info = await this.mailer.sendMail(mailConfig);
    console.log(info.messageId);
  }
}

export default MailSenderNodeMailer;
