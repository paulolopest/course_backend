import { Admin } from "@prisma/client";
import { AdminData } from "../../data/AdminData/AdminData";
import { CustomError } from "../../models/CustomError";
import { HashManager } from "../../services/HashManager";
import { IdGenerator } from "../../services/IdGenerator";
import { TokenManager } from "../../services/TokenManager";

export class AdminBusiness {
   constructor(
      private idGenerator: IdGenerator,
      private hashManager: HashManager,
      private tokenManager: TokenManager,
      private adminData: AdminData
   ) {}

   signup = async (email: string, password: string, name: string, lastname: string) => {
      try {
         if (!email) throw new CustomError(400, "Enter an email");
         if (!name) throw new CustomError(400, "Enter an username");
         if (!lastname) throw new CustomError(400, "Enter an username");
         if (!password) throw new CustomError(400, "Enter an password");
         if (password.length < 8)
            throw new CustomError(400, "Password must contain at least 8 characters");
         if (!email.includes("@")) throw new CustomError(400, "Enter a valid email");

         const verifyEmail: Admin | null = await this.adminData.getUserByEmail(email);

         if (verifyEmail) throw new CustomError(409, "Email already registered");

         const id: string = this.idGenerator.generate();
         const configId: string = this.idGenerator.generate();
         const hashedPassword: string = await this.hashManager.generate(password);
         const token = this.tokenManager.generate({ id: id });

         await this.adminData.signup(id, email, hashedPassword, name, lastname);

         return token;
      } catch (error: any) {
         if (error instanceof CustomError) {
            throw new CustomError(error.statusCode, error.message);
         } else {
            throw new Error(error.message);
         }
      }
   };

   login = async (credential: string, password: string) => {
      try {
      } catch (error: any) {
         if (error instanceof CustomError) {
            throw new CustomError(error.statusCode, error.message);
         } else {
            throw new Error(error.message);
         }
      }
   };
}
