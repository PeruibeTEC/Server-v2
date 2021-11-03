import ParseMailTemplateDTO from '../../MailTemplate/dtos/ParseMailTemplateDTO';

interface MailContent {
  name: string;
  email: string;
}

interface SendMail {
  to: MailContent;
  from?: MailContent;
  subject: string;
  templateData: ParseMailTemplateDTO;
}

export default interface MailProvider {
  sendMail(data: SendMail): Promise<void>;
}
