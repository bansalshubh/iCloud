import {React,useContext} from 'react'
import noteContext from '../context/notes/noteContext';


export default function Noteitem(props) {
    const { n,handleOnUpdate } = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;

    return (
        <div className='col-md-3'>
            <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{n.title}</h5>
                        <p className="card-text">{n.description}</p>
                        <i onClick={()=>{deleteNote(n._id)}} className="far fa-trash-alt mx-2"></i>
                        <i onClick={()=>{handleOnUpdate(n)}} className="far fa-edit mx-2"></i>
                    </div>
            </div>
        </div>
    )
}
