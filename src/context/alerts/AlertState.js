import React, { useState } from 'react';
import alertContext from './alertContext';

export default function AlertState(props) {

    const [alert, setAlert] = useState(null);

    const showAlert = (type,message)=>{
        setAlert({
            type:type,
            message:message
        })
        setTimeout(() => {
            setAlert(null);
          }, 1500);
    }

  return <div>
      <alertContext.Provider value={{alert,showAlert}}>
          {props.children}
      </alertContext.Provider>
  </div>;
}

