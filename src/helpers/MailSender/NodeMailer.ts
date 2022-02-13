import nodeMailer from "nodemailer";

import { IMailSender, MailConfig } from "./types";

type ConfigsNodeMailer = {
  host: string;
  port: number;
  user: string;
  pass: string;
};
class MailSenderNodeMailer implements IMailSender {
  private readonly mailer: any;
  constructor(configs: ConfigsNodeMailer) {
    this.mailer = nodeMailer.createTransport({
      host: configs.host,
      port: configs.port,
      auth: {
        user: configs.user,
        pass: configs.pass,
      },
    });
  }
  async send(mailConfig: MailConfig): Promise<void> {
    let info = await this.mailer.sendMail(mailConfig);
    console.log(info.messageId);
  }
}

export default MailSenderNodeMailer;
