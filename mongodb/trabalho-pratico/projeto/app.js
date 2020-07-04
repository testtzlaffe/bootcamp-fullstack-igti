import express from "express";
import mongoose from "mongoose";
import { router } from "./routes/accountsRouter.js";

const app = express();
app.use(express.json());
app.use(router);

(async () => {
  await mongoose.connect(
    "mongodb+srv://<login>:<password>@cluster0.bazmo.mongodb.net/<database>?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log("MongoDB Atlas connected");
})();

app.listen(3000, () => {
  console.log("API started");
});
