import React, { useState, useEffect, useRef } from "react";
import { gql, useQuery } from '@apollo/client';
import style from "./AddProduct.module.css";

const Categories = ({ setCategory }) => {
    const [categories, setCategories] = useState([])
    const allCategories = useRef()

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
            allCategories.current=categoriesTree(data.allCategories)
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
        let subcategory = category.subcategory
        if (subcategory.length > 1) {
            setCategories(subcategory);
        }
        else if (subcategory.length == 1) {
            setCategories(subcategory);
            setCategory(subcategory[0].id)
        }
        else if (subcategory.length == 0) {
            setCategory(ID)
            setCategories([category]);
        }
    }

    function resetCategory() {
        console.log(allCategories.current);
        setCategories(allCategories.current);
        setCategory(undefined)
    }

    return (
        <div>
            <div className="align-in-row bg-teal-300">
                <div>Select Category</div>
                <div className="close">
                    <div onClick={resetCategory}>+</div>
                </div>
            </div>
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
        </div>

    )
}

export default Categories