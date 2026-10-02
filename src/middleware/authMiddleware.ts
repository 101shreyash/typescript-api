import { Request , Response } from "express";
import jwt from "jsonwebtoken"

function AuthChecker(req:Request , res : Response , ) {


  const token = req.cookies?.jwt

  if (!token) {
   return  res.status(401).json({
    success : false,
      message : "Session Expired Please Login Again"
    })
  }


  jwt.verify(token , process.env.JWTSECKKEY as string , (error : any, decoded : any) => {

    if (!decoded) {

     return res.status(400).json({
        success : false,
        message : "Couldnot verify the token please login Again",
      })
    }

    if (error) {
    return  res.status(500).json({
        success : false,
        message : "Server Error"
      })
    }


    // to be continued


  })

} // authchecker Ends here


export default AuthChecker;
