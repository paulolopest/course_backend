import { Request, Response } from "express";
import { AccountBusiness } from "../../business/AccountBusiness/AccountBusiness";
import { CustomError } from "../../models/CustomError";

export class AccountController {
   constructor(private accountBusiness: AccountBusiness) {}

   signup = async (req: Request, res: Response) => {
      try {
         const { email, password, name, lastname } = req.body;

         const result: string = await this.accountBusiness.signup(email, password, name, lastname);

         res.status(201).send(result);
      } catch (error: any) {
         if (error instanceof CustomError) {
            res.status(error.statusCode).send(error.message);
         } else {
            res.status(404).send(error.message);
         }
      }
   };

   login = async (req: Request, res: Response) => {
      try {
         const { email, password } = req.body;

         const result: string = await this.accountBusiness.login(email, password);

         res.status(200).send(result);
      } catch (error: any) {
         if (error instanceof CustomError) {
            res.status(error.statusCode).send(error.message);
         } else {
            res.status(404).send(error.message);
         }
      }
   };

   validateToken = async (req: Request, res: Response) => {
      try {
         const { token } = req.body;
         const response = await this.accountBusiness.validateToken(token);

         res.status(200).send(response);
      } catch (error: any) {
         if (error instanceof CustomError) {
            res.status(error.statusCode).send(error.message);
         } else {
            res.status(404).send(error.message);
         }
      }
   };

   editCredential = async (req: Request, res: Response) => {
      try {
         const token: string = req.headers.authorization as string;
         const { password, email, name, lastname } = req.body;

         await this.accountBusiness.editCredential(password, token, email, name, lastname);

         res.status(200).send("Credencial atualizada");
      } catch (error: any) {
         if (error instanceof CustomError) {
            res.status(error.statusCode).send(error.message);
         } else {
            res.status(404).send(error.message);
         }
      }
   };

   getProfile = async (req: Request, res: Response) => {
      try {
         const token: string = req.headers.authorization as string;

         const result = await this.accountBusiness.getProfile(token);

         res.status(200).send(result);
      } catch (error: any) {
         if (error instanceof CustomError) {
            res.status(error.statusCode).send(error.message);
         } else {
            res.status(404).send(error.message);
         }
      }
   };

   deleteAccount = async (req: Request, res: Response) => {
      try {
         const token: string = req.headers.authorization as string;

         await this.accountBusiness.deleteAccount(token);

         res.status(200).send("Conta deletada com sucesso");
      } catch (error: any) {
         if (error instanceof CustomError) {
            res.status(error.statusCode).send(error.message);
         } else {
            res.status(404).send(error.message);
         }
      }
   };
}
