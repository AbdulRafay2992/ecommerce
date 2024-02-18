import React, { useState, useEffect } from "react";
import { gql, useQuery } from '@apollo/client';
import style from './AddProduct.module.css';

const Attributes = ({ attributes, setAttributes }) => {

    const [remainingAttributes, setremainingAttributes] = useState([])

    const GET_ATTRIBUTES = gql`
        query {
          allAttributes {
            id
            name
          }
        }
      `;
    const { loading, error, data } = useQuery(GET_ATTRIBUTES);
    useEffect(() => {
        if (data && data.allAttributes && !loading && !error) {
            setremainingAttributes(data.allAttributes);
        }
    }, [loading, error, data]);

    const Selected = (event) => {
        let id = event.target.value
        let name = event.target.options[event.target.selectedIndex].innerText;
        event.target.value='0'
        setAttributes(prevAttributes  => [...prevAttributes , {
            id: id,
            name: name
        }])
        setremainingAttributes(remainingAttributes.filter(item => item.id !== id))
    }

    return (
        <div className={style.Attributes}>
            <select onChange={Selected} value='0'>
                <option key={0} value={0} disabled>--Select Attributes--</option>
                {
                    remainingAttributes.map((item, index) => {
                        return <option key={index} value={item.id}>{item.name}</option>
                    })
                }
            </select>
            <div>
                {
                    attributes.map((item, index) => {
                        return <div key={index}>{item.name}</div>
                    })
                }
            </div>
        </div>
    );
}
export default Attributes;