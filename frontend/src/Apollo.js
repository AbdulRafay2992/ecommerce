import React from 'react'
import { useQuery, gql } from '@apollo/client';

const Apollo = () => {
    const GET_CATEGORIES = gql`
    query {
        allCategories {
        id
        name
        parentCategory
        }
    }
    `;
    const { loading, error, data } = useQuery(GET_CATEGORIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            {data.allCategories.map(category => (
                <div key={category.id}>
                    <p>ID: {category.id}</p>
                    <p>Name: {category.name}</p>
                    <p>Parent Category: {category.parentCategory}</p>
                </div>
            ))}
        </div>
    );
};

export default Apollo;
