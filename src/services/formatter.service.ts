import { injectable } from "inversify";

@injectable()
export class FormatterService {
  getPagePostIds(url: string): string[] {
    const urlParams = url.replace("https://www.facebook.com/", "").split("/");
    return [urlParams[0], urlParams[2]];
  }
}
