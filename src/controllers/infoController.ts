import { Request, Response } from "express";
import pool from "../db.js";

async function FullName(req: Request, res: Response) {

  const fullname : string = req.body.fullname 
  const userid = req.user?.userid;

  if (!fullname || fullname === undefined) {
    return res.status(400).json({
      success: false,
      message: "Fullname is required",
    });
  }

  if (/^[a-zA-Z ]+$/.test(fullname) === false) {
    return res.status(400).json({
      success: false,
      message: "Fullname cannot contain numbers and special characters",
    });
  }

  if (fullname.length < 5 || fullname.length > 30) {

    return res.json({
      success : false,
      message : "Fullname shouldn't be less than 5 characters or more than 30"
    })

  }

  try {
    await pool.query("UPDATE users SET fullname = $1 WHERE userid = $2", [
      fullname,
      userid,
    ]);

    return res.json({
      success: false,
      message: `Alright from now on we will call you ${fullname}`,
    });
  } catch (error: any) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export default FullName;
