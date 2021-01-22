import { inject, injectable } from "inversify";
import { FormatterService } from "./formatter.service";
import { HttpClientService } from "./http-client.service";
import { Comment, CommentPaging, Paging } from "../interfaces";

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
    const response = await this.httpClientService.get<CommentPaging>(
      `${process.env.API}/${pageId}_${postId}/comments?access_token=${process.env.TOKEN}&limit=25`
    );
    data = response.data.data;
    next = response.data.paging.next;
    comments.push(...data);
    while (next) {
      const nextResponse = await this.httpClientService.get<CommentPaging>(
        next
      );
      comments.push(...nextResponse.data.data);
      next = nextResponse.data.paging.next;
    }
    return comments;
  }
}
