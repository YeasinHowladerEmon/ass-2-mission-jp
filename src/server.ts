import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config";

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(` database is connected successfully`);
    server = app.listen(config.port, () => {
      console.log(`Application listening at http://localhost:${config.port}`);
    });
  } catch (error) {
    console.log(`failed to connect database`, error);
  }
}
bootstrap();
