import FB from "fb";

export class FbService {
  async getUserData(id: string): Promise<any> {
    console.log(FB.api);
    try {
      FB.api(id, function (response) {
        console.log(response);
        return response;
      });
    } catch (e) {
      console.log(e);
    }
  }
}
