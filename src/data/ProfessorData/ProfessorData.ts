import { v4 } from "uuid";
import { prisma } from "../BaseDatabase";

export class ProfessorData {
   addProfessor = async (
      id: string,
      email: string,
      name: string,
      lastname: string,
      profile_img?: string
   ) => {
      try {
         await prisma.professor.create({
            data: {
               id,
               email,
               name,
               lastname,
               profile_img,
            },
         });
      } catch (error: any) {
         throw new Error(error.message);
      }
   };

   getAllProfessors = async () => {
      try {
         return await prisma.professor.findMany();
      } catch (error: any) {
         throw new Error(error.message);
      }
   };

   getProfessorById = async (id: string) => {
      try {
         return await prisma.professor.findUnique({
            where: { id },
         });
      } catch (error: any) {
         throw new Error(error.message);
      }
   };
   getProfessorByEmail = async (email: string) => {
      try {
         return await prisma.professor.findUnique({
            where: { email },
         });
      } catch (error: any) {
         throw new Error(error.message);
      }
   };

   editProfessor = async (
      id: string,
      email?: string,
      name?: string,
      lastname?: string,
      profileImg?: string,
      status?: boolean
   ) => {
      try {
         await prisma.professor.update({
            where: { id },
            data: {
               email,
               name,
               lastname,
               profile_img: profileImg,
               status,
            },
         });
      } catch (error: any) {
         throw new Error(error.message);
      }
   };

   addSpecialization = async (id: string, specialization: string) => {
      try {
         await prisma.professor.update({
            where: { id },
            data: {
               specialization: {
                  push: specialization,
               },
            },
         });
      } catch (error: any) {
         throw new Error(error.message);
      }
   };

   deleteProfessor = async (id: string) => {
      try {
         return await prisma.professor.delete({
            where: { id },
         });
      } catch (error: any) {
         throw new Error(error.message);
      }
   };
}
