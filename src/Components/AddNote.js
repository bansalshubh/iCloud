import { React, useContext,useState } from 'react'
import noteContext from '../context/notes/noteContext'

export default function AddNote() {
    const context1 = useContext(noteContext);
    const {addNote} = context1;
    const [mynote, setMynote] = useState({
        title:"",
        description:""
    });

    const handleonClick = (e)=>{
        e.preventDefault();
        addNote(mynote.title,mynote.description);
        setMynote({
            title:"",
            description:""
        });
    }

    const onChange = (e)=>{
        setMynote({...mynote,[e.target.name]:e.target.value})
    }

    return (
        <div className='container'>
            <h2 className='my-2'>Add a Note</h2>
            <form>
                <div className="my-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Enter Title</label>
                    <input type="text" onChange={onChange} className="form-control" id="title" value={mynote.title} name="title" placeholder="" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter Description</label>
                    <textarea className="form-control" onChange={onChange} id="textarea" name='description' value={mynote.description} rows="5"></textarea>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleonClick}>Add Note</button>
            </form>
        </div>
    )
}
