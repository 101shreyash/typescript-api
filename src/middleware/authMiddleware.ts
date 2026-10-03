import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function AuthChecker(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Session Expired Please Login Again",
    });
  }

  jwt.verify(
    token,
    process.env.JWTSECKEY as string,
    (error : any, decoded: any) => {
      if (!decoded) {
        return res.status(401).json({
          success: false,
          message: "Couldnot Verify the token please login again",
        });
      }

      req.user = decoded;
      next();
    },
  );
}
export default AuthChecker;
