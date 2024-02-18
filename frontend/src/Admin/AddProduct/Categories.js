import React, { useState, useEffect, Suspense, useRef } from "react";
import { useMutation, gql, useQuery } from '@apollo/client';
import style from "./AddProduct.module.css";

const Categories = ({setCategory}) => {
    const [categories, setCategories] = useState([])

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
    useEffect(() => {
        if (data && data.allCategories && !loading && !error) {
            setCategories(categoriesTree(data.allCategories));
        }
    }, [loading, error, data]);

    function categoriesTree(inputData, parentCategory = 0) {
        const result = [];
        for (const item of inputData) {
            if (item.parentCategory === parentCategory) {
                const { parentCategory, ...rest } = item; // Exclude parent_id property
                const newItem = { ...rest, subcategory: categoriesTree(inputData, parseInt(item.id)) };
                result.push(newItem);
            }
        }
        return result;
    }

    function CategorySelected(ID) {
        let category = categories.filter(item => item.id == ID)[0]
        let subcategory = [...category.subcategory]
        if (subcategory.length > 0) {
            setCategories(subcategory);
        }
        else if (subcategory.length == 0) {
            setCategories([category])
            setCategory(category.id)
        }
    }

    return (
        <div className={style.select}>
            {
                categories.map((item, index) => {
                    return (
                        <div key={index} onClick={() => CategorySelected(item.id)}>
                            {item.name}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Categories