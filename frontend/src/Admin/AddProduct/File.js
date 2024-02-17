import React, { useState, useEffect } from 'react';
import style from './AddProduct.module.css';

const File = ({ file, deleteFile }) => {
    const [image, setImage] = useState('');

    useEffect(() => {
        if (file.file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target.result);
            };
            reader.readAsDataURL(file.file);
        }
    }, [file]);

    return (
        <div className={style.File}>
            {image && <img src={image} alt="Uploaded" />}
            <span onClick={() => deleteFile(file.id)}>×</span>
        </div>
    );
};

export default File;