import { FormatterService } from "./formatter.service";

describe("test formatter service", () => {
  it("should return page id and post id", () => {
    const formatterService = new FormatterService();
    const [pageId, postId] = formatterService.getPagePostIds(
      "https://www.facebook.com/391833401230049/videos/693373047954459/"
    );
    expect(pageId).toBe("391833401230049");
    expect(postId).toBe("693373047954459");
  });
});
