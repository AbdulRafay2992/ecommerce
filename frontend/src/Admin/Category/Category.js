import { useState } from 'react';
import style from './Category.module.css';


const Category = ({ category, openModal }) => {
    const [expand, setExpand] = useState(false);
    let expandIcon=<span onClick={() => setExpand(!expand)}>{expand ? '-' : '+'}</span>;
    if (category.subcategory.length==0) {
        expandIcon=<span></span>
    }

    return (
        <div className={style.Category}>
            <div className={style.name}>
                <div>
                    {expandIcon}
                    <span>{category.name}</span>
                </div>
                <button onClick={() => openModal(category)}>Add</button>
            </div>
            <div className={expand ? style.show : style.hide}>
                {category.subcategory.map((item, index) => (
                    <Category key={index} category={item} openModal={openModal} />
                ))}
            </div>
        </div>
    );
};
export default Category;