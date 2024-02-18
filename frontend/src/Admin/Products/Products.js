import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { fetchData } from "../Methods";

const Products = () => {
  const [categories, setCategory] = useState([])
  const [products, setProducts] = useState([])
  // const [categories, setCategory] = useState([{ "id": 1, "name": "Clothes", "parent_category": 0 }, { "id": 2, "name": "T-Shirts", "parent_category": 1 }, { "id": 3, "name": "Trousers", "parent_category": 1 }, { "id": 4, "name": "red", "parent_category": 2 }, { "id": 5, "name": "under", "parent_category": 1 }])
  // const [products, setProducts] = useState([
  //   {
  //     "id": 1,
  //     "category_id": 1,
  //     "name": "Pant",
  //     "description": "Trouser"
  //   },
  //   {
  //     "id": 2,
  //     "category_id": 2,
  //     "name": "Night Shirt",
  //     "description": "Night dress"
  //   }
  // ])

  useEffect(() => {
    fetchData('/getproducts', setProducts)
    fetchData('/getcategories', setCategory)
  }, [])

  return (
    <div className="flex justify-center">
      <div className="w-2/3 bg-slate-100">
        <Link to={'/newproduct'}>+ Add</Link>
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Name</th>
              <th>Description</th>
              <th>Variation</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((record, index) => (
                <tr key={index}>
                  <td>{categories.find(item => item.id === record.category_id).name}</td>
                  <td><Link to={window.location.origin + "/product/" + record.id}>{record.name}</Link></td>
                  <td>{record.description}</td>
                  <td>Yes</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>

  );
};
export default Products;