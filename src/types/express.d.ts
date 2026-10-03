declare global {
  namespace Express {
    interface Request {
      user?: {
        userid: number;
        username: string;
        role: string;
      };
    }
  }
}


export {};
