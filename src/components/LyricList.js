import React from 'react';
import { useMutation } from '@apollo/client';
import { LIKE_LYRIC } from '../graphql/mutations';

export default function LyricList({song}) {
     
    const OnLike = (id) => { 
        likeLyric({
            variables: { id },
        });   
    }

    const [likeLyric, { error }] = useMutation(LIKE_LYRIC);
    if (error) {
        console.log("++++ ERROR: ", error);
    }
    //console.log("Lyric list song: ", song.lyrics) 
    if (song.lyrics) {

        return song.lyrics.map(({id, content, likes}) => {
            //console.log("Lyric content:", lyric.content)
            return (
                <li key={id} className="collection-item"> 
                {content} 
                    <div className="vote-box">
                        <i 
                            className="material-icons"
                            onClick={() => {
                                OnLike(id);
                            } }
                            >thumb_up</i>
                        {likes}    
                    </div>
                {likes}
                </li>
            );
        }); 
    }  else {
        return <div></div>;
    } 
}  