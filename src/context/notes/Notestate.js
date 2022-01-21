import NoteContext from "./noteContext";
import { useState, useContext } from "react";
import alertContext from "../alerts/alertContext";

const Notestate = (props) => {

  const APIURL = "http://localhost:5000"

  const context = useContext(alertContext)
  const {showAlert} = context;

  // Function to fetch all notes
  const fetchNote = async () => {
    const response = await fetch(`${APIURL}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setNote(json);
  }

  //State to set notes
  const [note, setNote] = useState([])

  //Add a new note
  const addNote = async (title, description) => {
    const response = await fetch(`${APIURL}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description })
    });
    const json = await response.json();
    if(json.success)
      showAlert("success","Note has been Added Successfully")
    else
      showAlert("danger",json.message);
    fetchNote();
  }

  //Update an existing note
  const updateNote = async (title, description, id) => {
    const response = await fetch(`${APIURL}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description })
    });
    const json = await response.json();
    if(json.success)
      showAlert("success","Note has been Updated Successfully")
    else
      showAlert("danger",json.message);
    fetchNote();
  }

  //Delete and existing note
  const deleteNote = async (id) => {
    const response = await fetch(`${APIURL}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    if(json.success)
      showAlert("success","Note has been deleted Successfully")
    else
      showAlert("danger",json.message);
    fetchNote();
  }

  return (
    <NoteContext.Provider value={{ note, addNote, fetchNote, updateNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default Notestate;