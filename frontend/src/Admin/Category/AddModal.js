import React,{useRef} from 'react'
import style from './Category.module.css';

const AddModal = ({addCategory,parent,close}) => {
    const category=useRef()
    
    function change(event) {
        category.current=event.target.value
    }
    function save() {
        addCategory(category.current)
    }
    return (
        <div className={style.modal}>
            <div>
                <div>
                    <div onClick={close}>+</div>
                </div>
                <div>
                    <div>{parent.name}</div>
                    <input onChange={(event)=>change(event)} type='text' />
                    <button onClick={save}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default AddModal