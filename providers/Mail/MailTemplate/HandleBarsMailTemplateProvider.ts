import fs from 'fs';
import handlebars from 'handlebars';

import ParseMailTemplateDTO from './dtos/ParseMailTemplateDTO';
import MailTemplateProvider from './Model/MailTemplateProvider';

export default class HandlebarsMailTemplateProvider
  implements MailTemplateProvider
{
  public async parse({
    file,
    variables,
  }: ParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
