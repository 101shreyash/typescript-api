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
      message: "Note Sucessfully Added",
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
    const notes = await pool.query(
      "SELECT noteid , title, content, created_at FROM notes WHERE userid = $1",
      [userid],
    );

    if (notes.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "You don't have any notes right now. Try Adding Some",
      });
    }

    return res.status(200).json({
      success: true,
      message: notes.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

async function UpdateNotes(req: Request, res: Response) {
  try {
    const userid = req.user?.userid;
    const noteid = Number(req.params.noteid);
    const title: string = req.body.title ?? null;
    const content: string = req.body.content ?? null;

    if (title === null && content === null) {
      return res.status(400).json({
        success: false,
        message: "Provide at least title or contet",
      });
    }

    const result = await pool.query(
      "UPDATE notes SET title = COALESCE($1 , title) , content = COALESCE($2 , content) WHERE noteid = $3 AND userid = $4;",
      [title, content, noteid, userid],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

async function DeleteNotes(req: Request, res: Response) {
  const userid = req.user?.userid;
  const noteid = req.params.noteid;

  try {
    const result = await pool.query(
      "DELETE FROM notes WHERE userid = $1 AND noteid = $2",
      [userid, noteid],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export { PostNotes, ViewNotes, UpdateNotes, DeleteNotes };
