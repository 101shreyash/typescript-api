import express from "express";
import { Request, Response } from "express";
import pool from "../db.js";

async function PostNotes(req: Request, res: Response) {
  const userid = req.user?.userid;
  const title: string = req.body.title;
  const content: string = req.body.content;

  if (!title || title === undefined) {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  if (!content || content === undefined) {
    return res.status(400).json({
      success: false,
      message: "Content is required",
    });
  }

  if (title.length > 100) {
    return res.status(400).json({
      success: false,
      message: "Do not extend the title for more than 100 characters",
    });
  }

  try {
    await pool.query(
      "INSERT INTO notes (userid , title , content) VALUES ($1,$2,$3)",
      [userid, title, content],
    );

    return res.status(200).json({
      success: true,
      message: "Notes Sucessfully Added",
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({
      message: "Server Error",
    });
  }
}

// post notes scope ends here

async function ViewNotes(req: Request, res: Response) {
  const userid = req.user?.userid;

  try {

    const notes = await pool.query("SELECT * FROM notes WHERE userid = $1", [
      userid,
    ]);

    return res.status(200).json({
      success : true,
      message : notes.rows
    })

  }

  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

}

export { PostNotes, ViewNotes };
