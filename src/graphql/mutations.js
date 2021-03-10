import { gql } from '@apollo/client';


export const ADD_SONG = gql`
  mutation AddSong($title: String){
    addSong(title: $title ) {
      id
      title
    }
  }
`;
export const ADD_LYRIC = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id 
      lyrics{
        id
        content
        likes
      }
    }
  }
`;

export const DELETE_SONG = gql`
  mutation DeleteSong($id: ID){
        deleteSong(id:$id) {
            id 
            title
        }
    }
`;

export const LIKE_LYRIC = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;
 