import React, { useState, useEffect, Suspense } from "react";
import { useMutation, gql, useQuery } from '@apollo/client';
import style from './Attribute.module.css';

const Attributes = () => {
    const [attributes, setAttributes] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [modalSetting, setmodalSetting] = useState({ text: null, upload: null })
    const Modal = React.lazy(() => import('./AddModal'))

    const GET_ATTRIBUTES = gql`
    query {
        attributesWithValues {
          name
          values {
            value
          }
        }
    }
  `;
    const { loading, error, data, refetch } = useQuery(GET_ATTRIBUTES);
    useEffect(() => {
        if (data && data.attributesWithValues && !loading && !error) {
            setAttributes(data.attributesWithValues);
            console.log(data.attributesWithValues);
        }
    }, [loading, error, data, refetch]);


    const CREATE_ATTRIBUTE = gql`
        mutation($name:String!) {
            createAttribute(name: $name) {
                attribute {
                    name
                }
            }
        }
    `;
    const CREATE_ATTRIBUTE_VALUE = gql`
    mutation ($attribute:String!, $value:String!){
        createAttributeValue(attribute: $attribute, value: $value) {
          attributeValue {
            value
          }
        }
      }
      
    `;

    const [createAttribute] = useMutation(CREATE_ATTRIBUTE);
    const [createAttributeValue] = useMutation(CREATE_ATTRIBUTE_VALUE);

    function openModal(text, method) {
        setmodalSetting(() => ({
            text: text,
            upload: method
        }))
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

    function addAttributeValue(attribute, value) {
        createAttributeValue({
            variables: {
                attribute: attribute,
                value: value
            }
        }).then(response => {
            refetch()
        }).catch(error => {
            console.log(error);
        });
        // console.log(attribute, value);
        setShowModal(false)
    }

    return (
        <div>
            <div className={style.Attributes}>
                <div>
                    {
                        attributes.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div>
                                        <div>{item.name}</div>
                                        <button onClick={
                                            () => openModal(item.name, addAttributeValue)}
                                        >Add</button>
                                    </div>
                                    <div>
                                        {
                                            item.values.map((value, index) => {
                                                return <div key={index}>{value.value}</div>
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                    <button onClick={
                        () => openModal("", addAttribute)}>New Attribute</button>
                </div>
            </div>
            <Suspense fallback={<div></div>}>
                {showModal && <Modal setting={modalSetting} close={() => setShowModal(false)} />}
            </Suspense>
        </div>

    );
}


export default Attributes;