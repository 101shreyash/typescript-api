import { Request, Response } from "express";
import pool from "../db.js";

async function BrowseNotes(req: Request, res: Response) {

  // Basic Rule Here is
  // Guest could see = Guest Notes and Could not see Teachers And Students Note.
  // Students Could see Students Note But not teachers and Guest's note
  // Where as Teachers Could see  Students Note but couldnot see other teachers note And Guest Notes.

  const observerRole = req.user?.role;
  const observerName = req.user?.username;

  const requestedUsername = req.params.username;

  if (observerName === requestedUsername) {
    return res.status(400).json({
      success: false,
      message:
        "You're trying to view your Own Notes. You can do that by going to the note section.",
    });
  }

  try {
    const result = await pool.query(
      "SELECT users.role , users.username , notes.noteid , notes.title , notes.content , notes.created_at FROM users INNER JOIN notes ON users.userid = notes.userid WHERE users.username = $1",
      [requestedUsername],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Username or notes Not Found.",
      });
    }


    interface QueryObject {
      role: string;
      username: string;
      noteid: number;
      title: string;
      content: string;
      created_at: string;
    }

    const playerInfo: QueryObject = result.rows[0];

    console.log(`observerRole`, observerRole);
    console.log("PlayerRole", playerInfo.role);

    if (playerInfo.role === "student" && observerRole === "student") {
      return res.status(200).json({
        success: true,
        message: playerInfo,
      });
    }

    else if (playerInfo.role === "guest" && observerRole === "guest") {
      return res.status(200).json({
        success: true,
        message: playerInfo,
      });
    }

    else if (observerRole === "teacher" && playerInfo.role === "student") {
      return res.status(200).json({
        success: true,
        message: playerInfo,
      });
    }

    else {
      res.status(400).json({
        success: false,
        message: `You being ${observerRole} could'not view ${playerInfo.role}'s Note.`,
      });
    }
  }


  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export default BrowseNotes;
