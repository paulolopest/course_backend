import { Account } from "@prisma/client";
import { AccountData } from "../../data/AccountData/AccountData";
import { CourseData } from "../../data/CourseData/CourseData";
import { AuthenticationData } from "../../models/AuthenticationData";
import { CustomError } from "../../models/CustomError";
import { IdGenerator } from "../../services/IdGenerator";
import { TokenManager } from "../../services/TokenManager";

export class CourseBusiness {
   constructor(
      private idGenerator: IdGenerator,
      private accountData: AccountData,
      private tokenManager: TokenManager,
      private courseData: CourseData
   ) {}

   addCourse = async (
      token: string,
      name: string,
      description: string,
      category: string,
      difficulty: string,
      programmingLanguage: string
   ) => {
      try {
         if (!token) throw new CustomError(401, "Log in first");
         if (!name) throw new CustomError(400, "Enter an username");
         if (!description) throw new CustomError(400, "Enter a description");
         if (!category) throw new CustomError(400, "Enter a category");
         if (!difficulty) throw new CustomError(400, "Enter a difficulty");
         if (!programmingLanguage) throw new CustomError(400, "Enter a programmingLanguage");

         const { id }: AuthenticationData = this.tokenManager.getTokenData(token);

         const account: Account | null = await this.accountData.getUserById(id);
         if (account?.type !== "ADMIN") {
            throw new CustomError(401, "Only admin can manipulate data");
         }

         const courseId: string = this.idGenerator.generate();

         await this.courseData.addCourse(
            courseId,
            name,
            description,
            category,
            difficulty,
            programmingLanguage
         );
      } catch (error: any) {
         if (error instanceof CustomError) {
            throw new CustomError(error.statusCode, error.message);
         } else {
            throw new Error(error.message);
         }
      }
   };

   getAllCourses = async () => {
      try {
         return await this.courseData.getAllCourses();
      } catch (error: any) {
         if (error instanceof CustomError) {
            throw new CustomError(error.statusCode, error.message);
         } else {
            throw new Error(error.message);
         }
      }
   };

   getCourseById = async (id: string) => {
      try {
         if (!id) throw new CustomError(400, "Enter a course id");

         const course = await this.courseData.getCourseById(id);
         if (!course) throw new CustomError(404, "Course not found");

         return await this.courseData.getCourseById(id);
      } catch (error: any) {
         if (error instanceof CustomError) {
            throw new CustomError(error.statusCode, error.message);
         } else {
            throw new Error(error.message);
         }
      }
   };

   editCourse = async (
      token: string,
      id: string,
      name?: string,
      description?: string,
      category?: string,
      difficulty?: string,
      programmingLanguage?: string
   ) => {
      try {
         if (!token) throw new CustomError(401, "Log in first");
         if (!id) throw new CustomError(400, "Enter a course id");

         const course = await this.courseData.getCourseById(id);
         if (!course) throw new CustomError(404, "Course not found");

         const user: AuthenticationData = this.tokenManager.getTokenData(token);

         const account: Account | null = await this.accountData.getUserById(user.id);
         if (account?.type !== "ADMIN") {
            throw new CustomError(401, "Only admin can manipulate data");
         }

         return await this.courseData.editCourse(
            id,
            name,
            description,
            category,
            difficulty,
            programmingLanguage
         );
      } catch (error: any) {
         if (error instanceof CustomError) {
            throw new CustomError(error.statusCode, error.message);
         } else {
            throw new Error(error.message);
         }
      }
   };

   deleteCourse = async (token: string, id: string) => {
      try {
         if (!token) throw new CustomError(401, "Log in first");
         if (!id) throw new CustomError(400, "Enter a course id");

         const course = await this.courseData.getCourseById(id);
         if (!course) throw new CustomError(404, "Course not found");

         const user: AuthenticationData = this.tokenManager.getTokenData(token);

         const account: Account | null = await this.accountData.getUserById(user.id);
         if (account?.type !== "ADMIN") {
            throw new CustomError(401, "Only admin can manipulate data");
         }

         await this.courseData.deleteCourse(id);
      } catch (error: any) {
         if (error instanceof CustomError) {
            throw new CustomError(error.statusCode, error.message);
         } else {
            throw new Error(error.message);
         }
      }
   };
}
