import { Request, Response } from "express";
import pool from "../db.js";
import bcrypt from "bcrypt"

async function DeleteAccount(req: Request, res: Response) {
  const userid = req.user?.userid;
  const username = req.user?.username;
  const password = req.body.password

  try {


  if (!password) {

   return res.status(400).json({
      success : false,
      message : "To delete your account you must include your account password"
    })

  }

  const query = await pool.query("SELECT password FROM users WHERE userid = $1" , [userid]);
  const hashedpassword = query.rows[0].password as string
 const matched =  await bcrypt.compare(password , hashedpassword)

  if (matched === false) {

   return res.status(400).json({
      success : false,
      message : "Password didn't matched , Account Deletation Failed."
    })

  }

    await pool.query("DELETE FROM users WHERE userid = $1", [userid]);
    return res.json({
      success: true,
      message: `Your Account ${username} got deleted Permanently.`,
    });


  }


  catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      messsge: "Server Error",
    });
  }
}

export { DeleteAccount };
