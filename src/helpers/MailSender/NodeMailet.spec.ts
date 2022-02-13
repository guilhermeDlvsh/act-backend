import { MailSenderNodeMailer } from "./index";

function sut() {
  const configs = {
    host: process.env.NODE_MAILER_HOST,
    port: Number(process.env.NODE_MAILER_PORT),
    user: process.env.NODE_MAILER_USER,
    pass: process.env.NODE_MAILER_PASS,
  };
  console.log(configs);
  const messageTest = {
    from: "teste@email.com",
    to: "someone@email.com",
    subject: "Message teste",
    html: "<h1>Teste<h1>",
  };
  return {
    // @ts-ignore
    mailer: new MailSenderNodeMailer(configs),
    message: messageTest,
  };
}

describe("NodeMailer module", () => {
  it("should send the value passed in", async () => {
    const { mailer, message } = sut();
    expect(await mailer.send(message)).resolves;
  });
});
