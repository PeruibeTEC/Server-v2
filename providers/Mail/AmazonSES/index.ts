import { inject } from '@adonisjs/core/build/standalone';

import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';

import MailTemplateProvider from '../MailTemplate/Model/MailTemplateProvider';
import MailProvider from './Model/MailProvider';
import SendMailDTO from './dtos/SendMailDTO';

@inject(['Providers/MailTemplateProvider'])
export default class AmazonSESMailProvider implements MailProvider {
  private client: Transporter;

  constructor(private mailTemplateProvider: MailTemplateProvider) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_DEFAULT_REGIONS,
      }),
    });
  }

  public async sendMail({
    to,
    subject,
    templateData,
  }: SendMailDTO): Promise<void> {
    await this.client.sendMail({
      from: {
        name: 'Equipe PeruibeTec',
        address: 'suporte@peruibetec.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
