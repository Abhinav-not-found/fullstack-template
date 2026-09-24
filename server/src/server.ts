import createApp from "./app.js";
import connectDb from "./shared/config/db.config.js";
import env from "./shared/config/env.config.js";
import { colorText } from "./shared/utils/color-text.utils.js";

async function startServer() {
  const app = createApp();

  await connectDb();
  app.listen(env.PORT, () => {
    console.log(
      colorText(`Server started on port:${env.PORT}`, "black", "cyan"),
    );
  });
}
startServer();
