import React, { useState, useEffect, Suspense, useRef } from "react";
import { useMutation, gql, useQuery } from '@apollo/client';
import style from './Category.module.css'
import Category from "./Category";


function CategoryTree() {


  const [categories, setCategory] = useState([])
  const parent = useRef()
  const [showModal, setShowModal] = useState(false)
  const Modal = React.lazy(() => import('./AddModal'))

  const GET_CATEGORIES = gql`
    query {
      allCategories {
        id
        name
        parentCategory
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery(GET_CATEGORIES);
  useEffect(() => {
    if (data && data.allCategories && !loading && !error) {
      setCategory(categoriesTree(data.allCategories));
    }
  }, [data, loading, error, refetch]);


  const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!, $parentCategory: ID!) {
    createCategory(name: $name, parentCategory: $parentCategory) {
      category {
        name
        parentCategory
      }
    }
  }
`;

  const [createCategory] = useMutation(CREATE_CATEGORY);


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

  function openModal(category) {
    setShowModal(true)
    parent.current = category
  }
  function addCategory(newCategory) {
    createCategory({
      variables: {
        name: newCategory,
        parentCategory: parent.id
      }
    }).then(response => {
      refetch()
    }).catch(error => {
      // Handle error if needed
      console.log(error);
    });
    setShowModal(false)
  }


  return (
    <div className={style.CategoryTree}>
      <div>
        {
          categories.map((item, index) => {
            return <Category key={index} category={item} openModal={openModal}></Category>
          })
        }
        <button onClick={() => openModal({ id: 0, name: "NEW" })}>Add</button>
        <Suspense fallback={<div></div>}>
          {showModal && <Modal parent={parent} addCategory={addCategory} close={() => setShowModal(false)} />}
        </Suspense>
      </div>
    </div>
  )
}
export default CategoryTree;