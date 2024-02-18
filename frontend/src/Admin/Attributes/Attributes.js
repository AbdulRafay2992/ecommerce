import React, { useState, useEffect,Suspense } from "react";
import { useMutation, gql, useQuery } from '@apollo/client';
import style from './Attribute.module.css';

const Attributes = () => {
    const [attributes, setAttributes] = useState([])
    const [showModal, setShowModal] = useState(false)
    const Modal = React.lazy(() => import('./AddModal'))

    const GET_ATTRIBUTES = gql`
    query {
      allAttributes {
        name
      }
    }
  `;
    const { loading, error, data, refetch } = useQuery(GET_ATTRIBUTES);
    useEffect(() => {
        if (data && data.allAttributes && !loading && !error) {
            setAttributes(data.allAttributes);
        }
    }, [loading, error, data, refetch]);


    const CREATE_ATTRIBUTE = gql`
        mutation CreateCategory($name: String!) {
            createAttribute(name: $name) {
                attribute {
                    name
                }
            }
        }
    `;

    const [createAttribute] = useMutation(CREATE_ATTRIBUTE);

    function openModal() {
        setShowModal(true)
    }

    function addAttribute(attribute) {
        createAttribute({
            variables: {
                name: attribute,
            }
        }).then(response => {
            refetch()
        }).catch(error => {
            console.log(error);
        });
        setShowModal(false)
    }

    return (
        <div className={style.Attributes}>
            <div>
                {
                    attributes.map((item, index) => {
                        return (
                            <div key={index}>
                                {item.name}
                            </div>
                        )
                    })
                }
                <button onClick={openModal}> Add New</button>
                <Suspense fallback={<div></div>}>
                    {showModal && <Modal addAttribute={addAttribute} close={() => setShowModal(false)} />}
                </Suspense>
            </div>
        </div>
    );
}


export default Attributes;