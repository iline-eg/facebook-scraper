import container from "../inversify";
import { FbService } from "./fb.service";

describe("test facebook service", () => {
  it(
    "should get comments of post",
    async () => {
      const fbService = container.resolve<FbService>(FbService);
      const comments = await fbService.getComments(
        "https://www.facebook.com/103564684971860/posts/110640310930964"
      );
      console.log(comments);
      expect(comments.length).toBeGreaterThan(400);
    },
    1000 * 60 * 60
  );
});
