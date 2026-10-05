import { useForm } from "react-hook-form";
// import { Link } from "react-router";
import { useNavigate } from "react-router";

function Notes() {
  const { register, handleSubmit , reset } = useForm();
  const navigate = useNavigate();

  function AfterSubmit(data: any) {

    console.log(data);
  }

  function ClearScreen() : void {

   reset();

  }

  function MyNotes() {

    navigate("/mynotes")

  }

  return (
    <div style={{ marginTop: "2%" }}>

      <button className="save-btn" onClick={ClearScreen}>Clear The Screen</button> &nbsp;
      <button form="note-form" className="save-btn"> Save Notes</button> &nbsp;
      <button  className="save-btn" onClick={MyNotes}> My Notes</button> &nbsp;

      <div style={{ marginTop: "6%" }}>
        <form id="note-form" onSubmit={handleSubmit(AfterSubmit)}>
          <input
            className="note-title"
            placeholder="Enter Your title Here"
            required
            {...register("title")}
          />
          <br />
          <br />
          <br />
          <br />
          <textarea
            className="note-text-area"
            placeholder="Write something here."
            required
            {...register("content")}
          ></textarea>
        </form>
      </div>
    </div>
  );
}

export default Notes;
