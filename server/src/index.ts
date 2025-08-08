import app from "@/app";
import { PORT } from "@/config/env";
import { AppDataSource } from "@/database/data-source";

function main() {
  try {
    AppDataSource.initialize();
    console.log(" Connected to postgresql");
    app.listen(PORT, () => {
      console.log(" http://localhost:" + PORT);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
