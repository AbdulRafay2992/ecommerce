import React,{useRef} from 'react'
import style from './Attribute.module.css';

const AddModal = ({addAttribute,close}) => {
    const attribute=useRef()
    
    function change(event) {
        attribute.current=event.target.value
    }
    function save() {
        addAttribute(attribute.current)
    }
    return (
        <div className={style.modal}>
            <div>
                <div>
                    <div onClick={close}>+</div>
                </div>
                <div>
                    <div>New Attribute</div>
                    <input onChange={(event)=>change(event)} type='text' />
                    <button onClick={save}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default AddModal