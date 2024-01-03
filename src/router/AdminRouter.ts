import express, { Router } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { TokenManager } from "../services/TokenManager";
import { AdminData } from "../data/AdminData/AdminData";
import { AdminBusiness } from "../business/AdminBusiness/AdminBusiness";
import { AdminController } from "../controller/AdminController/AdminController";

const adminBusiness: AdminBusiness = new AdminBusiness(
   new IdGenerator(),
   new HashManager(),
   new TokenManager(),
   new AdminData()
);
const adminController: AdminController = new AdminController(adminBusiness);

export const adminRouter: Router = express.Router();

//Routes

adminRouter.post("/signup", adminController.signup);
adminRouter.post("/login", adminController.login);
