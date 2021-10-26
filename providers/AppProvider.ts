import { ApplicationContract } from '@ioc:Adonis/Core/Application';

import HandleBarsMailTemplateProvider from './Mail/MailTemplate/HandleBarsMailTemplateProvider';

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register(): void {
    this.app.container.singleton('MailTemplateProvider', () => {
      return new HandleBarsMailTemplateProvider();
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
