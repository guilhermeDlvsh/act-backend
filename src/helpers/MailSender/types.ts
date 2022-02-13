export interface IMailSender {
  send(mailConfig: MailConfig): Promise<void>;
}
export type MailConfig = {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
};
