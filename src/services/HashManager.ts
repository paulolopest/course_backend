import bcrypt from "bcryptjs";

export class HashManager {
   generate = async (password: string): Promise<string> => {
      const rounds = Number(12);
      const salt = await bcrypt.genSalt(rounds);

      return bcrypt.hash(password, salt);
   };

   compare = async (password: string, hashedPassword: string): Promise<boolean> => {
      return bcrypt.compare(password, hashedPassword);
   };
}
