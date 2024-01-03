import cors from "cors";
import express, { Express } from "express";
import { accountRouter } from "./router/AccountRouter";
import { professorRouter } from "./router/ProfessorRouter";
import { courseRouter } from "./router/CourseRouter";

const port: number = 3000;
const app: Express = express();

app.use(express.json());
app.use(cors());

const server = app.listen(port, () => {
   if (server) {
      console.log(`The server is running on localhost:${port}`);
   } else {
      console.log("Error running the server");
   }
});

//Routes

app.use(accountRouter);
app.use(professorRouter);
app.use(courseRouter);
