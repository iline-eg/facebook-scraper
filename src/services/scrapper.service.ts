import { inject, injectable } from "inversify";
import { FbService } from "./fb.service";
import { From } from "../interfaces";

@injectable()
export class ScrapperService {
  @inject(FbService) protected readonly fbService: FbService;

  async getUsersNameAndFBIDFromPost(postUrl: string) {
    const comments = await this.fbService.getComments(postUrl);
    const usersComments: From[] = [];
    comments.forEach((comment) => {
      if (!comment.from.category) {
        usersComments.push(comment.from);
      }
    });
    return usersComments;
  }
}
