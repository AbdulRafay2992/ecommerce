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
        let name = event.target.value
        event.target.value='0'
        setAttributes(prevAttributes  => [...prevAttributes , {
            name: name
        }])
        setremainingAttributes(remainingAttributes.filter(item => item.name !== name))
    }

    const Delete = (event) => {
        let name = event.target.parentNode.parentNode.getAttribute('data-name');
        setAttributes(prevAttributes=>prevAttributes.filter(item=>item.name!=name))
        setremainingAttributes(prev=>[...prev,{name:name}])
        //     => [...prevAttributes , {
        //     name: name
        // }])
        // alert(itemName);
    }

    return (
        <div>
            <select onChange={Selected} value='0'>
                <option key={0} value={0} disabled>--Select Attributes--</option>
                {
                    remainingAttributes.map((item, index) => {
                        return <option key={index} value={item.name}>{item.name}</option>
                    })
                }
            </select>
            <div onClick={Delete} className={style.select}>
                {
                    attributes.map((item, index) => {
                        return (
                            <div key={index} data-name={item.name} className="align-in-row">
                                <div>{item.name}</div>
                                <div className="close">
                                    <div>+</div>    
                                </div>    
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
export default Attributes;