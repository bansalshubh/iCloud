import React from 'react'
import AddNote from './AddNote'
import Login from './Login'
import Notes from './Notes'

function Home() {

    return (
        <>
        {localStorage.getItem('token')?<>
            <AddNote />
            <Notes />
        </>:<Login/>}
        </>
    )
}

export default Home
