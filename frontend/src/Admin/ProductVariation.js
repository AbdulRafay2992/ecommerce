import './App.css';
import Header from "./Products/Header";
import Categories from "./Products/Categories";
import Main from './Products/Main';
import Footer from './Products/Footer';

function App() {
  let data=['T-shirts',"Night Dress","Baby clothes","Shoes","Bags"];
  return (
    <>
      <Header user="Abdul Rafay Pal" />
      <Categories data={data} />
      <Main />
      <Footer data={data} />

    </>
  );
}

export default App;
