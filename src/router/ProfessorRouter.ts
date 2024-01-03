import express, { Router } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { AccountData } from "../data/AccountData/AccountData";
import { ProfessorData } from "../data/ProfessorData/ProfessorData";
import { ProfessorBusiness } from "../business/ProfessorBusiness/ProfessorBusiness";
import { ProfessorController } from "../controller/ProfessorController/ProfessorController";

const professorBusiness: ProfessorBusiness = new ProfessorBusiness(
   new IdGenerator(),
   new AccountData(),
   new TokenManager(),
   new ProfessorData()
);
const professorController: ProfessorController = new ProfessorController(professorBusiness);

export const professorRouter: Router = express.Router();

//Routes

professorRouter.post("/add-professor", professorController.addProfessor);

professorRouter.get("/professor/:id", professorController.getProfessorProfile);
professorRouter.get("/get-all/professor", professorController.getAllProfessors);

professorRouter.put("/professor/:id/edit", professorController.editProfessor);
professorRouter.put("/professor/add-specialization/:id", professorController.addSpecialization);

professorRouter.delete("/professor/delete/:id", professorController.deleteProfessor);
