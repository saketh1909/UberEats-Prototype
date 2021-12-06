
import { gql } from 'apollo-boost';

const addBookMutation = gql`
    mutation ($name: String, $genre: String, $authorId: ID){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;

const loginMutation = gpl`
    mutation ($email: String , $password: String){
        customerLogin(email: $email , password: $password){
            Name
            Password
            Email
        }
    }
`;

export {addBookMutation};