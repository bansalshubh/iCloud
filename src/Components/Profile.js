import React, { useEffect } from 'react';

const Profile = (props) => {

    useEffect(() => {
      console.log(props.profile);
    }, []);
    
    // const ref = useRef(null);
    // useEffect(() => {
    //     setTimeout(() => {
    //         ref.current.click();
    //     }, 1000); //miliseconds
    // }, []);
    return <div>
        {console.log(props.profile)}
        <h1>This is Profile Page</h1>
        <button type="button" autoFocus className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default Profile;
