import React, { useEffect, useState, useRef } from 'react';
import { useParams, Redirect} from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client'; 
import { LOAD_SONG_DETAIL} from '../graphql/queries';
import LyricList from "./LyricList";
import LyricCreate from "./LyricCreate";
import { DELETE_SONG } from '../graphql/mutations'; 

function SongDetail() {
    let { id } = useParams(); 
    const [redirect, setRedirect] = useState(false);
    const isMountedRef = useRef(null);
    isMountedRef.current = true;

    const {error, loading, data} = useQuery(LOAD_SONG_DETAIL, {
        variables: { id }
    });

    const [deleteSong] = useMutation(DELETE_SONG);
    const [songDetail, setSong] = useState([]);
   
    const RenderDetails = (song) => {
      return  (
        <>
        <h1>Song Detail </h1>
        <div>ID: {song.id}</div>
        <div>Title: {song.title}</div>
        <LyricList song={song} />
        <LyricCreate song={song} />
        <button onClick={()=>{delete_song(song)}}>Delete This Song</button>
        </>
     )
    } 
    const delete_song = (song) => {
      //console.log("+++ delete song:", song.id, "  title:", song.title);
      deleteSong({
        variables: { id: song.id}
      });   
      setRedirect(true);   
    }
 
    useEffect(() => {
        //isMountedRef.current = !redirect;
        if (data && !redirect) { 
            setSong(data.song); 
        }        
        return () => isMountedRef.current = false;
      }, [data, redirect]); // [data, redirect]);

    if (error) return <h1> Error found</h1>;
       
    const renderRedirect = () => {
      // console.log("+++++ redirect:", redirect);
      if (redirect) {
        isMountedRef.current  = false
        return <Redirect to='/' />
      }
    }
    
   
    if (loading) {
    return <div>..... Loading '{songDetail.title}' Details</div>
    }
    if (redirect) {
      return <>{renderRedirect()}</>
    }
    return  (
       <>  
       { RenderDetails(songDetail) }
       </>
    );
} 

export default SongDetail;