import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { useMutation, refetch } from '@apollo/client'
import { ADD_SONG } from '../graphql/mutations';



export default function SongCreate() {

    const isMountedRef = useRef(null); 
    isMountedRef.current = true

    const [title, setTitle] = useState("");
    const [redirect, setRedirect] = useState(false);

    const [ addSong, { error } ] = useMutation(ADD_SONG);
    if (error) {
        console.log("Error on SongCreate:", error);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("+++ Submit", title)
        addSong({
            variables: {title: title},
            onCompleted: refetch,
        });
        //setTitle("");
        setRedirect(true);
    }

    useEffect(() => {
        //isMountedRef.current = true;        
        if(isMountedRef.current && !redirect){
            setTitle(title);
        }              
        return () => isMountedRef.current = false;
    }, [title, redirect]);

    const renderRedirect = () => { 
        if (redirect) {
          isMountedRef.current  = false
          return <Redirect to='/' />
        } 
    }

    return (
        <div> 
              {renderRedirect()}
              <h3>Create a New Song</h3>
              <form onSubmit={(event)=> onSubmit(event)}>
                    <label>Song Title:</label>
                    <input 
                        onChange={event => setTitle(event.target.value)}
                        value={title}
                    />
              </form>
            </div>
    )
}