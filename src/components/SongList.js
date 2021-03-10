import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

import {useQuery } from '@apollo/client'; 
import { LOAD_SONGS } from '../graphql/queries';
 
function RenderSongs(songs) {
    //console.log(songs)
    if (!songs) {
        return <div/>;
    }
   
    return  songs.map((s)=>{
        return (
          <li key={s.id} className="collection-item">
              <Link to={`/songs/${s.id}`}>
              {s.title }
              </Link>  
          </li>);
     })
}
function SongList() {   
    const isMountedRef = useRef(null); 
    
    const [songs, setSongs] = useState([]); 
    const {error, loading, data} = useQuery(LOAD_SONGS,{
        fetchPolicy:"cache-and-network"
    });
  
    //console.log("+++ SongList isMountedRef-------", isMountedRef);

    useEffect(() => {    
        isMountedRef.current = true; 
        
        console.log("+++ SongList point1 isMountedRef.current:", isMountedRef.current)
        if (data && isMountedRef.current) {

            console.log("+++ SongList point2 isMountedRef.current:", isMountedRef.current) 
            setSongs(data.songs); // songs is the graphql method and re-renders the page (useState)
                
        }
        return () => {
            console.log("+++ SongList isMountedRef.current = false");
            isMountedRef.current = false; 
        };
    }, [data]);
    

    if (error) {
        return (<div>Error: {error}</div>)
    }

    if (loading) {
        return(<div>....Loading</div>);
    } 

    return ( 
     
      <div> 
         <ul className="collection">
            {RenderSongs(songs)}
         </ul> 
      </div>
  
    ); 
}
export default SongList;