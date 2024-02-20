import CategoryTree from './Category/CategoryTree';
import Attributes from './Attributes/Attributes';
import Products from './Products/Products';
import AddProduct from './AddProduct/AddProduct';
import style from './Admin.module.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom';

const Admin = () => {
  return (
    <>
      <div className={`bg-teal-300 ${style.header}`}>
        <div>
          <a href="/categories" aria-current="page">Categories</a>
        </div>
        <div>
          <a href="/attributes">Attributes</a>
        </div>
        <div>
          <a href="/products">Products</a>
        </div>
        <div>
          <a href="/add-product">New Product</a>
        </div>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<CategoryTree className={style.body} />} />
          <Route path="/categories" element={<CategoryTree />} />
          <Route path="/products" element={<Products />} />
          <Route path="/attributes" element={<Attributes />} />
          <Route path='/add-product' element={<AddProduct />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default Admin;