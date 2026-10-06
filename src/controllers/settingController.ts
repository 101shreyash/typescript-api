import { Request, Response } from "express";
import pool from "../db.js";

async function DeleteAccount(req: Request, res: Response) {
  const userid = req.user?.userid;
  const username = req.user?.username;

  try {
    await pool.query("DELETE FROM users WHERE userid = $1", [userid]);
    return res.json({
      success: true,
      message: `Your Account ${username} got deleted Permanently.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      messsge: "Server Error",
    });
  }
}

export { DeleteAccount };
