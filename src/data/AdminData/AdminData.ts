import { v4 } from "uuid";
import { prisma } from "../BaseDatabase";

export class AdminData {
   signup = async (id: string, email: string, password: string, name: string, lastName: string) => {
      try {
         await prisma.admin.create({
            data: {
               id,
               email,
               password,
               name,
               last_name: lastName,
            },
         });
      } catch (error: any) {
         throw new Error(error.message);
      }
   };

   getUser = async (id: string) => {
      try {
      } catch (error: any) {
         throw new Error(error.message);
      }
   };

   getUserByEmail = async (email: string) => {
      try {
         return await prisma.admin.findUnique({
            where: { email },
         });
      } catch (error: any) {
         throw new Error(error.message);
      }
   };
}
