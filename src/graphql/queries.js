import { gql } from '@apollo/client';

export const LOAD_SONGS = gql`
 query {
  songs{
    id 
    title
    lyrics{
        id 
        content
        likes
    }
  }
}
`;

export const LOAD_SONG_DETAIL = gql`
 query SongQuery($id: ID!){
  song(id: $id){
    id 
    title
    lyrics{
        id 
        content
        likes
    }
  }
}
`;
 