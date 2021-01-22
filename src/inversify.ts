import { Container } from "inversify";
import { FormatterService } from "./services/formatter.service";
import { FbService } from "./services/fb.service";
import { HttpClientService } from "./services/http-client.service";
import { ScrapperService } from "./services/scrapper.service";

const container = new Container();
container.bind<FormatterService>(FormatterService).toSelf();
container.bind<FbService>(FbService).toSelf();
container.bind<HttpClientService>(HttpClientService).toSelf();
container.bind<ScrapperService>(ScrapperService).toSelf();

export default container;
