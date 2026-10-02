import { Request , Response } from "express";

function FullName(req : Request , res : Response) {

const fullname = req.body.fullname
const userid = req.user.userid;

if (!fullname || fullname === undefined) {

 return res.status(400).json({
   success : false,
    message : "Fullname is required"
  })
}

if (/^[a-zA-Z ]+$/.test(fullname) === false) {

  return res.status(400).json({
   success : false,
    message : "Fullname cannot contain numbers and special characters"
  })


  // to be continued


}


}


export default FullName;
