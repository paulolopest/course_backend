import { Account, Professor } from "@prisma/client";
import { CustomError } from "../../models/CustomError";
import { IdGenerator } from "../../services/IdGenerator";
import { ProfessorData } from "../../data/ProfessorData/ProfessorData";
import { AccountData } from "../../data/AccountData/AccountData";
import { TokenManager } from "../../services/TokenManager";
import { AuthenticationData } from "../../models/AuthenticationData";

export class ProfessorBusiness {
   constructor(
      private idGenerator: IdGenerator,
      private accountData: AccountData,
      private tokenManager: TokenManager,
      private professorData: ProfessorData
   ) {}

   addProfessor = async (
      token: string,
      email: string,
      name: string,
      lastname: string,
      profileImg?: string
   ) => {
      try {
         if (!token) throw new CustomError(401, "Log in first");
         if (!email) throw new CustomError(400, "Enter an email");
         if (!name) throw new CustomError(400, "Enter an username");
         if (!lastname) throw new CustomError(400, "Enter an username");

         const { id }: AuthenticationData = this.tokenManager.getTokenData(token);

         const account: Account | null = await this.accountData.getUserById(id);
         if (account?.type !== "ADMIN")
            throw new CustomError(401, "Only admin can manipulate data");

         const verifyEmail: Professor | null = await this.professorData.getProfessorByEmail(email);
         if (verifyEmail) throw new CustomError(409, "Email already registered");

         const professorId: string = this.idGenerator.generate();

         await this.professorData.addProfessor(professorId, email, name, lastname, profileImg);
      } catch (error: any) {
         if (error instanceof CustomError) {
            throw new CustomError(error.statusCode, error.message);
         } else {
            throw new Error(error.message);
         }
      }
   };

   getProfessorProfile = async (id: string) => {
      try {
         if (!id) throw new CustomError(401, "Enter an in");

         const professor: Professor | null = await this.professorData.getProfessorById(id);
         if (!professor) throw new CustomError(401, "User not found");

         return await this.professorData.getProfessorById(id);
      } catch (error: any) {
         if (error instanceof CustomError) {
            throw new CustomError(error.statusCode, error.message);
         } else {
            throw new Error(error.message);
         }
      }
   };
   getAllProfessors = async () => {
      try {
         return await this.professorData.getAllProfessors();
      } catch (error: any) {
         if (error instanceof CustomError) {
            throw new CustomError(error.statusCode, error.message);
         } else {
            throw new Error(error.message);
         }
      }
   };

   editProfessor = async (
      token: string,
      id: string,
      email?: string,
      name?: string,
      lastname?: string,
      profileImg?: string,
      status?: boolean
   ) => {
      try {
         if (!token) throw new CustomError(401, "Log in first");
         if (!id) throw new CustomError(404, "Enter a professor id");

         const user: AuthenticationData = this.tokenManager.getTokenData(token);

         const account: Account | null = await this.accountData.getUserById(user.id);
         if (account?.type !== "ADMIN")
            throw new CustomError(401, "Only admin can manipulate data");

         const verifyId: Professor | null = await this.professorData.getProfessorById(id);
         if (!verifyId) throw new CustomError(404, "Professor not found");

         await this.professorData.editProfessor(id, email, name, lastname, profileImg, status);
      } catch (error: any) {
         if (error instanceof CustomError) {
            throw new CustomError(error.statusCode, error.message);
         } else {
            throw new Error(error.message);
         }
      }
   };

   addSpecialization = async (token: string, id: string, specialization: string) => {
      try {
         if (!token) throw new CustomError(401, "Log in first");
         if (!id) throw new CustomError(404, "Enter a professor id");

         const user: AuthenticationData = this.tokenManager.getTokenData(token);

         const account: Account | null = await this.accountData.getUserById(user.id);
         if (account?.type !== "ADMIN")
            throw new CustomError(401, "Only admin can manipulate data");

         const verifyId: Professor | null = await this.professorData.getProfessorById(id);
         if (!verifyId) throw new CustomError(404, "Professor not found");

         const verifySpecialization: string | undefined = verifyId.specialization.find(
            (spec) => spec === specialization
         );
         if (verifySpecialization) throw new CustomError(409, "Specialization already registered");

         await this.professorData.addSpecialization(id, specialization);
      } catch (error: any) {
         if (error instanceof CustomError) {
            throw new CustomError(error.statusCode, error.message);
         } else {
            throw new Error(error.message);
         }
      }
   };

   deleteProfessor = async (token: string, id: string) => {
      try {
         if (!token) throw new CustomError(401, "Log in first");
         if (!id) throw new CustomError(404, "Enter a professor id");

         const user: AuthenticationData = this.tokenManager.getTokenData(token);

         const account: Account | null = await this.accountData.getUserById(user.id);
         if (account?.type !== "ADMIN")
            throw new CustomError(401, "Only admin can manipulate data");

         const verifyId: Professor | null = await this.professorData.getProfessorById(id);
         if (!verifyId) throw new CustomError(404, "Professor not found");

         return await this.professorData.deleteProfessor(id);
      } catch (error: any) {
         if (error instanceof CustomError) {
            throw new CustomError(error.statusCode, error.message);
         } else {
            throw new Error(error.message);
         }
      }
   };
}
