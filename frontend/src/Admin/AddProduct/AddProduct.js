import React, { useState, useRef } from 'react';
import Categories from './Categories';
import style from './AddProduct.module.css'
import Files from './Files';
import Attributes from './Attributes'

function AddProduct() {

    const name=useRef()
    const [category,setCategory] = useState()
    const description=useRef()
    const [files, setFiles] = useState([]);
    const [attributes, setAttributes] = useState([])

    return (
        <div className={style.AddProduct}>
            <div>
                <input type='text' onChange={(e)=>name.current=e.target.value} placeholder='Product name' />
                <Categories setCategory={setCategory}/>
                <textarea onChange={(e)=>description.current=e.target.value} placeholder='Description'></textarea>
                <Files files={files} setFiles={setFiles} />
                <Attributes attributes={attributes} setAttributes={setAttributes} />
                <button>Save and Proceed</button>
            </div>
        </div>
    );
}

export default AddProduct;