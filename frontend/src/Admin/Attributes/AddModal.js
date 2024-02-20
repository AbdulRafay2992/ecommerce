import React,{useRef} from 'react'
import style from './Attribute.module.css';

const AddModal = ({setting,close}) => {
    const enteredText=useRef()
    
    function change(event) {
        enteredText.current=event.target.value
    }
    function save() {
        if (setting.text=="") {
            setting.upload(enteredText.current)
        }
        else {
            setting.upload(setting.text,enteredText.current)
        }

    }
    return (
        <div className='modal'>
            <div>
                <div className='close'>
                    <div onClick={close}>+</div>
                </div>
                <div>
                    <div>
                        {
                            (setting.text=="")?
                                "Add new Attribute":
                                "New value for "+setting.text
                        }
                    </div>
                    <input onChange={(event)=>change(event)} type='text' />
                    <button onClick={save}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default AddModal