import express, { Router } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { AccountData } from "../data/AccountData/AccountData";
import { CourseBusiness } from "../business/CourseBusiness/CourseBusiness";
import { CourseData } from "../data/CourseData/CourseData";
import { CourseController } from "../controller/CourseController/CourseController";

const courseBusiness: CourseBusiness = new CourseBusiness(
   new IdGenerator(),
   new AccountData(),
   new TokenManager(),
   new CourseData()
);
const courseController: CourseController = new CourseController(courseBusiness);

export const courseRouter: Router = express.Router();

//Routes

courseRouter.post("/add-course", courseController.addCourse);

courseRouter.get("/get-all-courses", courseController.getAllCourses);
courseRouter.get("/course/:id", courseController.getCourseById);

courseRouter.put("/course/edit/:id", courseController.editCourse);

courseRouter.delete("/course/delete/:id", courseController.deleteCourse);
