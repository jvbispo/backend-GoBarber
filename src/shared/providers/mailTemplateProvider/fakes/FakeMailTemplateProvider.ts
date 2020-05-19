import IParseMailTemplateProvider from '../models/IMailTemplateProvider';

export default class FakeMailTemplateProvider
  implements IParseMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'mail template';
  }
}
