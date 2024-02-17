import React from 'react'
import style from './AddProduct.module.css'
import File from './File';

const Files = ({ files, setFiles }) => {

    const addfiles = (newFiles) => {
        let counter = files.length
        const filesWithId = newFiles.map(file => ({
            id: ++counter,
            file: file
        }));
        setFiles([...files, ...filesWithId]);
    };

    const deleteFile = (idToDelete) => {
        const updatedFiles = files.filter(file => file.id !== idToDelete);
        setFiles(updatedFiles);
    };

    const DragOver = (event) => {
        event.preventDefault();
    };

    const Drop = (event) => {
        event.preventDefault();
        const newFiles = Array.from(event.dataTransfer.files);
        validateAndSetFiles(newFiles);
    };
    const Selected = (event) => {
        const newFiles = Array.from(event.target.files);
        validateAndSetFiles(newFiles);
    };


    const validateAndSetFiles = (newFiles) => {
        if (newFiles.length>9) {
            alert('Max 10 files allowed');
                return;
        }
        for (let i = 0; i < newFiles.length; i++) {
            const file = newFiles[i];
            if (!file.type.startsWith('image/')) {
                alert('Only JPEG files are allowed!');
                return;
            }
            if (file.size>10485760) {
                alert('File Size should be less than 10MB');
                return;
            }
        }
        addfiles(newFiles)
    };


    return (
        <div className={style.droparea}>
            <div>
                {files.map((file, index) => {
                    return <File key={index} file={file} deleteFile={deleteFile} />
                }
                )}
            </div>
            <div
                onDragOver={DragOver}
                onDrop={Drop}
                onClick={() => document.getElementById('file-input').click()}
            >
                <span>Drop files here</span>
                <input
                    type="file"
                    multiple
                    onChange={Selected}
                    id='file-input'
                />
            </div>
        </div>
    );
};
export default Files