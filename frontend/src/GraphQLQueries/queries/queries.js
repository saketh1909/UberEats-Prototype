import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
        
    }
`;

const getBooksQuery = gql`
    {
        books {
                name
                id
            }
        
    }
`;

const getRestaurantsQuery = gql`
    {
        restaurants{
            Name
            RestaurantID
            Location
        }
    }
`;

export { getAuthorsQuery, getBooksQuery,getRestaurantsQuery };

