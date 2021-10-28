import { ApplicationContract } from '@ioc:Adonis/Core/Application';

import AmazonSESMailProvider from './Mail/AmazonSES';
import HandlebarsMailTemplateProvider from './Mail/MailTemplate/HandleBarsMailTemplateProvider';
import MailTemplateInterface from './Mail/MailTemplate/Model/MailTemplateProvider';

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register(): void {
    this.app.container.singleton('Providers/MailTemplateProvider', () => {
      return new HandlebarsMailTemplateProvider();
    });

    const mailTemplate: MailTemplateInterface = this.app.container.use(
      'Providers/MailTemplateProvider',
    );

    this.app.container.singleton('Providers/AmazonSES', () => {
      return new AmazonSESMailProvider(mailTemplate);
    });
  }

  public async boot() {
    // App is ready
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
