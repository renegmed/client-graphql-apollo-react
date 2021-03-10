import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_LYRIC } from '../graphql/mutations';

export default function LyricCreate({song}) {

    const [content, setContent] = useState("");

    const [addLyricToSong, { error }] = useMutation(ADD_LYRIC);
    if (error) {
        console.log("++++ Error on add lyric to song", error);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("++++ submit lyric song ID", song.id, "  content: ", content,);
        addLyricToSong({
            variables: { content: content, songId: song.id}
        });
        setContent("");
    };
    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <label>Add a Lyric</label>
            <input 
                value={content}
                onChange={event => setContent(event.target.value)}
            />
        </form>
    );
}