import NoteContext from "./noteContext";
import { useState } from "react";

const Notestate = (props)=>{
    const s1 = {
        "name":"Shubham",
        "age":"20"
    }
    const [state, setState] = useState(s1)
    const update = (name)=>{
        setState({
            "name":name
        })
    }
    return (
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default Notestate;