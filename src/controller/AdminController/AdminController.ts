import { Request, Response } from "express";
import { AdminBusiness } from "../../business/AdminBusiness/AdminBusiness";
import { CustomError } from "../../models/CustomError";

export class AdminController {
   constructor(private adminBusiness: AdminBusiness) {}

   signup = async (req: Request, res: Response) => {
      try {
         const { email, password, name, lastname } = req.body;

         const result = this.adminBusiness.signup(email, password, name, lastname);

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
      } catch (error: any) {
         if (error instanceof CustomError) {
            res.status(error.statusCode).send(error.message);
         } else {
            res.status(404).send(error.message);
         }
      }
   };
}
