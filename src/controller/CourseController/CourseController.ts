import { Request, Response } from "express";
import { CustomError } from "../../models/CustomError";
import { CourseBusiness } from "../../business/CourseBusiness/CourseBusiness";

export class CourseController {
   constructor(private courseBusiness: CourseBusiness) {}

   addCourse = async (req: Request, res: Response) => {
      try {
         const token: string = req.headers.authorization as string;
         const { name, description, category, difficulty, programmingLanguage } = req.body;

         await this.courseBusiness.addCourse(
            token,
            name,
            description,
            category,
            difficulty,
            programmingLanguage
         );

         res.status(201).send("Curso adicionado com sucesso");
      } catch (error: any) {
         if (error instanceof CustomError) {
            res.status(error.statusCode).send(error.message);
         } else {
            res.status(404).send(error.message);
         }
      }
   };

   getAllCourses = async (req: Request, res: Response) => {
      try {
         const result = await this.courseBusiness.getAllCourses();

         res.status(200).send(result);
      } catch (error: any) {
         if (error instanceof CustomError) {
            res.status(error.statusCode).send(error.message);
         } else {
            res.status(404).send(error.message);
         }
      }
   };

   getCourseById = async (req: Request, res: Response) => {
      try {
         const { id } = req.params;

         const result = await this.courseBusiness.getCourseById(id);

         res.status(200).send(result);
      } catch (error: any) {
         if (error instanceof CustomError) {
            res.status(error.statusCode).send(error.message);
         } else {
            res.status(404).send(error.message);
         }
      }
   };

   editCourse = async (req: Request, res: Response) => {
      try {
         const token: string = req.headers.authorization as string;
         const { id } = req.params;
         const { name, description, category, difficulty, programmingLanguage } = req.body;

         await this.courseBusiness.editCourse(
            token,
            id,
            name,
            description,
            category,
            difficulty,
            programmingLanguage
         );

         res.status(200).send("Curso atualizado com sucesso");
      } catch (error: any) {
         if (error instanceof CustomError) {
            res.status(error.statusCode).send(error.message);
         } else {
            res.status(404).send(error.message);
         }
      }
   };

   deleteCourse = async (req: Request, res: Response) => {
      try {
         const token: string = req.headers.authorization as string;

         const { id } = req.params;

         await this.courseBusiness.deleteCourse(token, id);

         res.status(200).send("Curso removido com sucesso!");
      } catch (error: any) {
         if (error instanceof CustomError) {
            res.status(error.statusCode).send(error.message);
         } else {
            res.status(404).send(error.message);
         }
      }
   };
}
