import { useState } from 'react';
import { postData, getData } from '../Methods';

const Product = () => {
    //DATA
    const attributes = ['size', 'design', 'pack'];
    let data = {
        name: 'prod name', description: "description", variationTypes: ["color"],
        // variations: [{ id: 5, variations: ["orange",], stock: 10, price: 50.25, imgs: [''] }]
        variations: [{ id: 2, variations: ["red"], stock: 10, price: 50.25, imgs: [''] }, { id: 3, variations: ["green"], stock: 10, price: 50.25, imgs: [''] }, { id: 4, variations: ["blue"], stock: 10, price: 50.25, imgs: [''] }, { id: 5, variations: ["orange",], stock: 10, price: 50.25, imgs: [''] }]
    };
    let deepcopy = JSON.parse(JSON.stringify(data));

    //STATE
    const [variationTypes, setvariationTypes] = useState(data.variationTypes);
    // const [newAttribute, setnewAttribute] = useState();
    const [variations, setvariations] = useState(data.variations);
    const [newAttributeValues, setnewAttributeValues] = useState([]);
    const [newVariation, setnewVariation] = useState([]);



    //UI elements
    const addControl =
        <>
            <select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Add New tribute"
                value={0}
                onChange={(event) => addAttribute(event.target.value)}
            >
                <option value={0}>Add New Attribute</option>
                {attributes.map((value, index) => (
                    <option key={index} value={value}>{value}</option>
                ))}
            </select>

            {/* <select onChange={(event) => addAttribute(event.target.value)}>
                <option value='none'>-- Select --</option>
                {attributes.map((value, index) => (
                    <option key={index} value={value}>{value}</option>
                ))}
            </select> */}
            {/* <button id='new-attribute' onClick={addAttribute}>Add</button> */}
        </>;
    const saveControl = <button onClick={SaveAttribute}>Save</button>;
    const cancelControl = <button onClick={cancelAttribute}>Cancel</button>

    const addVariationControl = <button className='my-2' id='new-attribute' onClick={addVariation}>Add</button>;
    const saveVariationControl = <button id='save-new-attribute' onClick={saveVariation}>Save</button>;

    //DYNAMICALLY CHANGING UI ELEMENT
    const [attributeControls, setattributeControls] = useState(addControl);
    const [variationControls, setvariationControls] = useState(addVariationControl);

    function cancelAttribute() {

        setvariations(deepcopy.variations);
        setvariationTypes(deepcopy.variationTypes);

        setattributeControls(addControl);
        setvariationControls(addVariationControl);

    }
    function addAttribute(newAttribute) {
        setvariationTypes([...variationTypes, newAttribute]);
        //add new attribute
        const updatedVariations = variations.map((item) => ({
            ...item,
            variations: [...item.variations, <input onBlur={(event) => updateAttribute(event, item.id)} type="text" />]

        }));
        setvariations(updatedVariations);
        //show save and cancel button only.
        setattributeControls(<>{saveControl}{cancelControl}</>);
        //hide add variation button also
        setvariationControls('');
    }
    function SaveAttribute(newAttribute) {
        let data = { attribute: newAttribute, values: newAttributeValues };
        console.log(data);
        //set controls
        setattributeControls(addControl);
        setvariationControls(addVariationControl);
        //SEND THAT data TO THE SERVER
        //IF UPLOADED SUCCESSFULLY. SERVER SHOULD RETURN THE NEW DATA.
        //UPDATE VARIAIONS STATE TO RE RENDER

    }

    function addVariation() {
        setvariations([...variations, {
            id: '',
            variations: variationTypes.map((key) =>
                // <input onBlur={(event) => updateAttribute(event, item.id)} type="text" variant="outlined" />
                (<input onChange={(event) => updateVariation(event, key)} type="text" />)),
            stock: <input onChange={(event) => updateVariation(event, "stock")} type="number" min={0} />,
            price: <input onChange={(event) => updateVariation(event, "price")} type="number" step="0.01" />, imgs: ['']
        }]);
        setattributeControls('');
        setvariationControls(<>{saveVariationControl}{cancelControl}</>);
    }

    function saveVariation() {
        setvariationControls(addVariationControl);
        setattributeControls(addControl);
        console.log(newVariation);
        //SEND TO SERVER newVariation state
        //SET state newVariation from the response sent by server
    }

    function updateAttribute(event, id) {
        //create copy of state object
        const updatednewAttributeValues = newAttributeValues;
        //create new object
        const newObject = { id: id, value: event.target.value };
        //check if object exist with same id
        const index = updatednewAttributeValues.findIndex((item) => item.id === newObject.id);
        if (index !== -1) {
            // If an object with the same id exists, replace it
            updatednewAttributeValues[index] = newObject;
        } else {
            // If no object with the same id exists, add the new object
            updatednewAttributeValues.push(newObject);
        }
        setnewAttributeValues(updatednewAttributeValues);
    }
    function updateVariation(event, attribute) {
        const updatednewVariation = newVariation;
        const newObject = { attr: attribute, value: event.target.value };

        const index = updatednewVariation.findIndex((item) => item.attr === newObject.attr);

        if (index !== -1) {
            // If an object with the same id exists, replace it
            updatednewVariation[index] = newObject;
        } else {
            // If no object with the same id exists, add the new object
            updatednewVariation.push(newObject);
        }
        setnewVariation(updatednewVariation);
    }
    return (
        <>
            <div maxWidth="sm">
                <h4>
                    {data.name}
                </h4>
                <h4>
                    {data.description}
                </h4>
            </div>
            <div maxWidth="sm">
                <span>
                    {attributeControls}
                </span>
            </div>
            <div>
                <div className="flex justify-center">
                    <table aria-label="simple table" className=''>
                        <thead>
                            <tr>
                                <th>ID</th>
                                {variationTypes.map((variation, index) => (
                                    <th key={index}>{variation}</th>
                                ))}
                                <th>Stock</th>
                                <th>Price</th>
                                <th>Images</th>
                            </tr>
                        </thead>
                        <tbody>
                            {variations.map((variation) => (
                                <tr key={variation.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <td>{variation.id}</td>
                                    {variation.variations.map((attr, index) => (
                                        <td key={index}>{attr}</td>
                                    ))}
                                    <td>{variation.stock}</td>
                                    <td>{variation.price}</td>
                                    <td>Images</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>{variationControls}</div>
            </div>


            
        </>
    );
};
export default Product;