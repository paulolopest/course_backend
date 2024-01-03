import { v4 } from "uuid";
import { prisma } from "../BaseDatabase";

export class AccountData {
   signup = async (id: string, email: string, password: string, name: string, lastName: string) => {
      try {
         await prisma.account.create({
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
         return await prisma.account.findUnique({
            where: { email },
         });
      } catch (error: any) {
         throw new Error(error.message);
      }
   };
   getUserById = async (id: string) => {
      try {
         return await prisma.account.findUnique({
            where: { id },
         });
      } catch (error: any) {
         throw new Error(error.message);
      }
   };

   getProfile = async (id: string) => {
      try {
         return await prisma.account.findUnique({
            where: { id },
            select: {
               id: true,
               email: true,
               name: true,
               last_name: true,
               created_at: true,
            },
         });
      } catch (error: any) {
         throw new Error(error.message);
      }
   };

   deleteAccount = async (id: string) => {
      try {
         return await prisma.account.delete({
            where: { id },
         });
      } catch (error: any) {
         throw new Error(error.message);
      }
   };

   editCredential = async (id: string, email?: string, name?: string, lastname?: string) => {
      try {
         await prisma.account.update({
            where: { id },
            data: {
               email,
               name,
               last_name: lastname,
            },
         });
      } catch (error: any) {
         throw new Error(error.message);
      }
   };
}
