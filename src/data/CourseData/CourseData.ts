import { v4 } from "uuid";
import { prisma } from "../BaseDatabase";

export class CourseData {
   addCourse = async (
      id: string,
      name: string,
      description: string,
      category: string,
      difficulty: string,
      programming_language: string
   ) => {
      try {
         await prisma.course.create({
            data: {
               id,
               name,
               description,
               category,
               difficulty,
               programming_language,
            },
         });
      } catch (error: any) {
         throw new Error(error.message);
      }
   };

   getAllCourses = async () => {
      try {
         return await prisma.course.findMany();
      } catch (error: any) {
         throw new Error(error.message);
      }
   };

   getCourseById = async (id: string) => {
      try {
         return await prisma.course.findUnique({
            where: {
               id,
            },
         });
      } catch (error: any) {
         throw new Error(error.message);
      }
   };

   editCourse = async (
      id: string,
      name?: string,
      description?: string,
      category?: string,
      difficulty?: string,
      programmingLanguage?: string
   ) => {
      try {
         await prisma.course.update({
            where: {
               id,
            },
            data: {
               name,
               description,
               category,
               difficulty,
               programming_language: programmingLanguage,
            },
         });
      } catch (error: any) {
         throw new Error(error.message);
      }
   };

   deleteCourse = async (id: string) => {
      try {
         await prisma.course.delete({
            where: {
               id,
            },
         });
      } catch (error: any) {
         throw new Error(error.message);
      }
   };
}
