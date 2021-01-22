import { FbService } from "./fb.service";

describe("test facebook service", () => {
  it("should get user data via id", async () => {
    const fbService = new FbService();
    const res = await fbService.getUserData("100032014957416");
    console.log(res);
  });
});
