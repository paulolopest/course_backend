import express, { Router } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { TokenManager } from "../services/TokenManager";
import { AccountData } from "../data/AccountData/AccountData";
import { AccountBusiness } from "../business/AccountBusiness/AccountBusiness";
import { AccountController } from "../controller/AccountController/AccountController";

const accountBusiness: AccountBusiness = new AccountBusiness(
   new IdGenerator(),
   new HashManager(),
   new TokenManager(),
   new AccountData()
);
const accountController: AccountController = new AccountController(accountBusiness);

export const accountRouter: Router = express.Router();

//Routes

accountRouter.post("/signup", accountController.signup);

accountRouter.get("/login", accountController.login);
accountRouter.get("/admin/profile", accountController.getProfile);

accountRouter.put("/admin/edit-credential", accountController.editCredential);

accountRouter.delete("/admin/delete", accountController.deleteAccount);
