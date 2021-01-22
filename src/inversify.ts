import { Container } from "inversify";
import { FormatterService } from "./services/formatter.service";
import { FbService } from "./services/fb.service";
import { HttpClientService } from "./services/http-client.service";

const container = new Container();
container.bind<FormatterService>(FormatterService).toSelf();
container.bind<FbService>(FbService).toSelf();
container.bind<HttpClientService>(HttpClientService).toSelf();

export default container;
