import React, { useState, useEffect, useRef } from 'react';
import Categories from './Categories';
import style from './AddProduct.module.css'
import Files from './Files';
import { useMutation, gql } from '@apollo/client';

function AddProduct() {

    const name=useRef()
    const [category,setCategory] = useState()
    const description=useRef()
    const stock=useRef()
    const price=useRef()
    const [files, setFiles] = useState([]);

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

    return (
        <div className={style.AddProduct}>
            <div>
                <input type='text' onChange={(e)=>name.current=e.target.value} placeholder='Product name' />
                <Categories setCategory={setCategory}/>
                <textarea onChange={(e)=>description.current=e.target.value} placeholder='Description'></textarea>
                <input onChange={(e)=>stock.current=e.target.value} type='number' placeholder='Stock' />
                <input onChange={(e)=>price.current=e.target.value} type='number' placeholder='Price' />
                <Files files={files} setFiles={setFiles} />
                <button>Save</button>
            </div>
        </div>
    );
}

export default AddProduct;