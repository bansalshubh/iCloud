import React from 'react'
import { useContext,useEffect } from 'react'
import noteContext from '../context/notes/noteContext'

function Home() {
    const a = useContext(noteContext);
    useEffect(() => {
        a.update("Rohit")
    }, [])
    return (
        <div>
            <h1>This is Home {a.state.name}</h1>
        </div>
    )
}

export default Home
