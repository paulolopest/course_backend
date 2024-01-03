import * as jwt from "jsonwebtoken";
import { CustomError } from "../models/CustomError";
import { AuthenticationData } from "../models/AuthenticationData";

const secretKey = "IDBDHBSEUSIAKMSAKMSAMOAISJAIJSYASMINAOKSAOKSDEMAIS#DSIJDO(*(*s*a&¨s&a¨s))";

// Deixei a chave publica para o caso de voce (recrutador) estar rodando o projeto localmente e não ter problemas com .env.
// Esse tipo de info sensivel vai no arquivo .env

export class TokenManager {
   generate = (id: AuthenticationData): string => {
      return jwt.sign(id, secretKey, {
         expiresIn: "12h",
      });
   };

   getTokenData = (token: string): AuthenticationData => {
      try {
         return jwt.verify(token, secretKey) as AuthenticationData;
      } catch (error: any) {
         if (error.name === "TokenExpiredError") {
            throw new CustomError(401, "Expired token, login again");
         } else if (error.name === "JsonWebTokenError") {
            throw new CustomError(401, "Invalid token, login again");
         } else {
            throw new CustomError(404, "Unknown validation error, login again");
         }
      }
   };
}
