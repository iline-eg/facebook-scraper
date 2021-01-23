import { inject, injectable } from "inversify";
import { FormatterService } from "./formatter.service";
import { HttpClientService } from "./http-client.service";
import { Comment, CommentPaging, Paging } from "../interfaces";
import { colors } from "../constants/colors";

@injectable()
export class FbService {
  @inject(FormatterService)
  private readonly formatterService: FormatterService;

  @inject(HttpClientService)
  private readonly httpClientService: HttpClientService;

  async getComments(postUrl: string) {
    const comments: Comment[] = [];
    const [pageId, postId] = this.formatterService.getPagePostIds(postUrl);
    let data: Comment[];
    let next: string;
    try {
      const response = await this.httpClientService.get<CommentPaging>(
        `${process.env.API}/${pageId}_${postId}/comments?access_token=${process.env.TOKEN}&limit=25`
      );
      data = response.data.data;
      next = response.data.paging.next;
      comments.push(...data);
      while (next) {
        try {
          const nextResponse = await this.httpClientService.get<CommentPaging>(
            next
          );
          comments.push(...nextResponse.data.data);
          next = nextResponse.data.paging.next;
          process.stdout.clearLine(0); // clear current text
          process.stdout.cursorTo(0); // move cursor to beginning of line
          process.stdout.write(
            `${colors.FgBlue} number of comments ${comments.length}`
          );
        } catch (e) {
          console.warn("error while get comments", e);
          console.log(colors.FgRed, "FACEBOOK BLOCKED YOU ");
          next = null;
        }
      }
      return comments;
    } catch (e) {
      console.log(colors.FgRed, "FACEBOOK BLOCKED YOU ");
    }
  }
}
