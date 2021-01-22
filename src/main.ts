import "reflect-metadata";
import { config } from "dotenv";
import * as inquirer from "inquirer";
import { colors } from "./constants/colors";
import container from "./inversify";
import { ScrapperService } from "./services/scrapper.service";
import ObjectsToCsv = require("objects-to-csv");

config();

(async () => {
  console.log(colors.FgWhite, "please make sure that your TOKEN in .env file");
  if (!process.env.TOKEN) {
    console.log(colors.FgRed, "token not found");
  } else {
    console.log(colors.FgGreen, "token found");
  }
  const result = await inquirer.prompt<{ postUrl: string; resultFile: string }>(
    [
      {
        type: "input",
        name: "postUrl",
        message:
          "please enter post url in format https://www.facebook.com/{page-id}/[posts|videos]/{post-id}",
      },
      {
        type: "input",
        name: "resultFile",
        message: "please enter name of file to save data as shoppers.csv",
      },
    ]
  );

  const scrapper = container.resolve<ScrapperService>(ScrapperService);
  const users = await scrapper.getUsersNameAndFBIDFromPost(result.postUrl);
  console.log(
    colors.FgGreen,
    `finished with total ${users.length} and will be saved to ${result.resultFile}`
  );

  await new ObjectsToCsv(users).toDisk(result.resultFile);
})();
