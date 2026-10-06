import { Request, Response } from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

async function SignUp(req: Request, res: Response) {
  const username: string = req.body.username;
  const password: string = req.body.password;
  const role: string = req.body.role?.toLowerCase();

  try {
    if (!username || username === undefined) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    if (!password || password === undefined) {
      return res.status(400).json({
        success: false,
        message: "Password Is required",
      });
    }

    if (!role || role === undefined) {
      return res.status(400).json({
        success: false,
        message: "Define Your Role",
      });
    }

    if (["student", "teacher", "guest"].includes(role) === false) {
      return res.status(400).json({
        success: false,
        message: "Enter valid role types",
      });
    }

    if (/^[a-zA-Z]+$/.test(role) === false) {
      return res.status(200).json({
        success: false,
        message: "Roles Should not contain special Characters and Numbers",
      });
    }

    if (/^[a-zA-Z0-9]+$/.test(username) === false) {
      return res.status(400).json({
        success: false,
        message:
          "Username should only contain numbers and characters not special characters",
      });
    }

    if (username.length > 30 || username.length < 5) {
      return res.status(400).json({
        message:
          "Username should not contain less than 5 characters and more than 30",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password Must contain of atleast 8 characters",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 13);
    await pool.query(
      "INSERT INTO users (username , password , role) VALUES ($1,$2,$3)",
      [username, hashedPassword, role],
    );

    return res.status(200).json({
      success: true,
      message: "Signup Sucessfull",
    });
  } catch (error: any) {
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Username alredy exits try something unique",
      });
    }

    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

async function Login(req: Request, res: Response) {
  try {
    const username = req.body.username as string;
    const PlainPassword = req.body.password as string;

    if (!username || username === undefined) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    if (!PlainPassword || PlainPassword === undefined) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (result.rowCount === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials , Enter valid Credentials",
      });
    }

    type Userinfo = {
      userid: number;
      username: string;
      fullname: unknown;
      password: string;
      role: string;
    };

    const userinfo: Userinfo = result.rows[0];
    const matched = await bcrypt.compare(PlainPassword, userinfo.password);

    if (!matched) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials , Enter valid Credentials",
      });
    }

    if (matched) {
      const token = jwt.sign(
        {
          username: userinfo.username,
          userid: userinfo.userid,
          role: userinfo.role,
        },
        process.env.JWTSECKEY as string,
        { expiresIn: "2h" },
      );

      res.cookie("jwt", token);
      return res.status(200).json({
        success: true,
        message: "Logged In Sucessfull",
      });
    }
  } catch (error: any) {
    // try block ends here

    console.log(error);
    return res.json({
      success: false,
      message: "Server Error",
    });
  }
}

function Logout(req: Request, res: Response) {
  res.clearCookie("jwt");
  return res.status(200).json({
    success: true,
    message: "Logout Sucessfull",
  });
}

export { SignUp, Login, Logout };
