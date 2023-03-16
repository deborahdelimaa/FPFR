import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navigationbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Private from './components/Private';
import Reviews from './pages/Reviews';
import ShoppingCart from './pages/ShoppingCart';
import MyProducts from './pages/MyProducts';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Introduction from './pages/Introduction';
import AddReview from './pages/AddReview';
import Footer from './components/Footer';
import Favorites from './pages/Favorites';

function App() {
  return (
    <div>
      <Navigationbar />

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={
              <Private>
                <Products />
              </Private>
            }
          />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products/new" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products/bought" element={<ShoppingCart />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/myProducts" element={<MyProducts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit/:id" element={<EditProfile />} />
          <Route path="/intro" element={<Introduction />} />
          <Route path="/review/:id" element={<AddReview />} />
          <Route path="/favorites" element={<Favorites />} />
          {/*           <Route path="/favorites/:id" element={<Favorites/>} />
           */}{' '}
        </Routes>
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
