import { React, useContext, useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/alerts/alertContext';
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';

export default function Notes() {
    let context1 = useContext(noteContext);
    const context2 = useContext(alertContext)
    let { note, fetchNote,updateNote } = context1;
    const {showAlert} = context2;
    let navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token'))
            fetchNote()
        else
            navigate('/login')
    }, []);

    const [editNote, setEditNote] = useState({
        id:"",
        title: "",
        description: ""
    });

    const onChange = (e) => {
        setEditNote({...editNote,[e.target.name]:e.target.value})
    }

    const ref = useRef(null);
    const handleOnUpdate = (n) => {
        // console.log(n);
        setEditNote({
            id:n._id,
            title: n.title,
            description: n.description
        })
        ref.current.click();
    }

    const handleOnClick = ()=>{
        updateNote(editNote.title,editNote.description,editNote.id)
        showAlert("success","Note has been Updated Successfully")
    }

    return (
        <>
            <button type="button" ref={ref} hidden={true} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="my-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Enter Title</label>
                                    <input type="text" onChange={onChange} className="form-control" id="title" name="title" value={editNote.title} placeholder="" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter Description</label>
                                    <textarea className="form-control" onChange={onChange} id="textarea" name='description' value={editNote.description} rows="5"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" data-bs-dismiss="modal" className="btn btn-secondary">Close</button>
                            <button type="button" data-bs-dismiss="modal" className="btn btn-primary" onClick={handleOnClick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-2">
                <h2 className='my-3'>Your Notes</h2>
                {note.map((n) => {
                    return <Noteitem handleOnUpdate={handleOnUpdate} key={n._id} n={n} />
                })}
            </div>
        </>
    )
}
