import { CustomError } from "../../models/CustomError";
import { HashManager } from "../../services/HashManager";
import { IdGenerator } from "../../services/IdGenerator";
import { TokenManager } from "../../services/TokenManager";
import { AccountData } from "../../data/AccountData/AccountData";
import { AuthenticationData } from "../../models/AuthenticationData";
import { Account } from "@prisma/client";

export class AccountBusiness {
   constructor(
      private idGenerator: IdGenerator,
      private hashManager: HashManager,
      private tokenManager: TokenManager,
      private accountData: AccountData
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

         const verifyEmail: Account | null = await this.accountData.getUserByEmail(email);

         if (verifyEmail) throw new CustomError(409, "Email already registered");

         const id: string = this.idGenerator.generate();
         const hashedPassword: string = await this.hashManager.generate(password);
         const token = this.tokenManager.generate({ id: id });

         await this.accountData.signup(id, email, hashedPassword, name, lastname);

         return token;
      } catch (error: any) {
         if (error instanceof CustomError) {
            throw new CustomError(error.statusCode, error.message);
         } else {
            throw new Error(error.message);
         }
      }
   };

   login = async (email: string, password: string) => {
      try {
         if (!email) throw new CustomError(400, "Invalid email");
         if (!password) throw new CustomError(400, "Enter a password");

         const user: Account | null = await this.accountData.getUserByEmail(email);

         if (!user) throw new CustomError(401, "Incorrect credentials");

         const verifyPassword: boolean = await this.hashManager.compare(password, user.password);

         if (!verifyPassword) throw new CustomError(401, "Incorrect password");

         const token = this.tokenManager.generate({ id: user.id });

         return token;
      } catch (error: any) {
         if (error instanceof CustomError) {
            throw new CustomError(error.statusCode, error.message);
         } else {
            throw new Error(error.message);
         }
      }
   };

   validateToken = async (token: string) => {
      try {
         if (!token) throw new CustomError(400, "Enter a token");

         const validate = this.tokenManager.getTokenData(token);
         if (!validate) throw new CustomError(401, "Invalid token, login again");

         return true;
      } catch (error: any) {
         if (error instanceof CustomError) {
            throw new CustomError(error.statusCode, error.message);
         } else {
            throw new Error(error.message);
         }
      }
   };

   editCredential = async (
      password: string,
      token: string,
      email?: string,
      name?: string,
      lastname?: string
   ) => {
      try {
         if (!token) throw new CustomError(401, "Log in first");
         if (!password) throw new CustomError(400, "Enter a password");

         const { id }: AuthenticationData = this.tokenManager.getTokenData(token);

         const user: Account | null = await this.accountData.getUserById(id);
         if (!user) throw new CustomError(401, "Incorrect credentials");

         const verifyPassword: boolean = await this.hashManager.compare(password, user.password);
         if (!verifyPassword) throw new CustomError(401, "Incorrect password");

         await this.accountData.editCredential(id, email, name, lastname);
      } catch (error: any) {
         if (error instanceof CustomError) {
            throw new CustomError(error.statusCode, error.message);
         } else {
            throw new Error(error.message);
         }
      }
   };

   getProfile = async (token: string) => {
      try {
         if (!token) throw new CustomError(401, "Log in first");

         const { id }: AuthenticationData = this.tokenManager.getTokenData(token);

         const user: Account | null = await this.accountData.getUserById(id);
         if (!user) throw new CustomError(401, "User not found");

         return await this.accountData.getProfile(id);
      } catch (error: any) {
         if (error instanceof CustomError) {
            throw new CustomError(error.statusCode, error.message);
         } else {
            throw new Error(error.message);
         }
      }
   };

   deleteAccount = async (token: string) => {
      try {
         if (!token) throw new CustomError(401, "Log in first");

         const { id }: AuthenticationData = this.tokenManager.getTokenData(token);

         const user: Account | null = await this.accountData.getUserById(id);
         if (!user) throw new CustomError(401, "User not found");

         return await this.accountData.deleteAccount(id);
      } catch (error: any) {
         if (error instanceof CustomError) {
            throw new CustomError(error.statusCode, error.message);
         } else {
            throw new Error(error.message);
         }
      }
   };
}
