import { Request, Response } from "express";
import { CustomError } from "../../models/CustomError";
import { ProfessorBusiness } from "../../business/ProfessorBusiness/ProfessorBusiness";

export class ProfessorController {
   constructor(private professorBusiness: ProfessorBusiness) {}

   addProfessor = async (req: Request, res: Response) => {
      try {
         const token: string = req.headers.authorization as string;
         const { email, name, lastname, profileImg } = req.body;

         await this.professorBusiness.addProfessor(token, email, name, lastname, profileImg);

         res.status(201).send("Professor adicionado");
      } catch (error: any) {
         if (error instanceof CustomError) {
            res.status(error.statusCode).send(error.message);
         } else {
            res.status(404).send(error.message);
         }
      }
   };

   getProfessorProfile = async (req: Request, res: Response) => {
      try {
         const { id } = req.params;

         const result = await this.professorBusiness.getProfessorProfile(id);

         res.status(200).send(result);
      } catch (error: any) {
         if (error instanceof CustomError) {
            res.status(error.statusCode).send(error.message);
         } else {
            res.status(404).send(error.message);
         }
      }
   };

   getAllProfessors = async (req: Request, res: Response) => {
      try {
         const result = await this.professorBusiness.getAllProfessors();

         res.status(200).send(result);
      } catch (error: any) {
         if (error instanceof CustomError) {
            res.status(error.statusCode).send(error.message);
         } else {
            res.status(404).send(error.message);
         }
      }
   };

   editProfessor = async (req: Request, res: Response) => {
      try {
         const token: string = req.headers.authorization as string;
         const { id } = req.params;
         const { email, name, lastname, profileImg, status } = req.body;

         await this.professorBusiness.editProfessor(
            token,
            id,
            email,
            name,
            lastname,
            profileImg,
            status
         );

         res.status(200).send("Dados do professor atualizado com sucesso!");
      } catch (error: any) {
         if (error instanceof CustomError) {
            res.status(error.statusCode).send(error.message);
         } else {
            res.status(404).send(error.message);
         }
      }
   };

   addSpecialization = async (req: Request, res: Response) => {
      try {
         const token: string = req.headers.authorization as string;
         const { id } = req.params;
         const { specialization } = req.body;

         await this.professorBusiness.addSpecialization(token, id, specialization);

         res.status(200).send("Dados do professor atualizado com sucesso!");
      } catch (error: any) {
         if (error instanceof CustomError) {
            res.status(error.statusCode).send(error.message);
         } else {
            res.status(404).send(error.message);
         }
      }
   };

   deleteProfessor = async (req: Request, res: Response) => {
      try {
         const token: string = req.headers.authorization as string;

         const { id } = req.params;

         await this.professorBusiness.deleteProfessor(token, id);

         res.status(200).send("Professor deletado com sucesso");
      } catch (error: any) {
         if (error instanceof CustomError) {
            res.status(error.statusCode).send(error.message);
         } else {
            res.status(404).send(error.message);
         }
      }
   };
}
