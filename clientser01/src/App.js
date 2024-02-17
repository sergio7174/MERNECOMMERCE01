import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/authPages/Register';
import Login from './pages/authPages/Login';
import PublicRoute from './components/privatenpublicroutes/PublicRoute';
import ForgotPassword from './pages/authPages/ForgotPassword';
import ProtectedRoute from './components/privatenpublicroutes/ProtectedRoute';
import Dashboard from './pages/user/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Users from './pages/admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/admin/Products';
import UpdateProduct from './pages/admin/UpdateProduct';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import CategoryWiseProducts from './pages/CategoryWiseProducts';
import CartPage from './pages/CartPage';
import Search from './pages/Search';
import WishListPage from './pages/user/WishListPage';
import Address from './pages/user/Address';
import CreateTag from './pages/admin/CreateTag';
import Tags from './pages/Tags';
import TagWiseProducts from './pages/TagWiseProducts';

function App() {
  return (
    <>
      <Router>
        <Routes>

  {/* ******authentication routes************/}
          <Route exact path='/' element={<Home />} />
        <Route exact path='/register' element={<PublicRoute><Register /></PublicRoute>} />
          <Route exact path='/login' element={<PublicRoute><Login /></PublicRoute>} />
          <Route exact path='/forgot-password' element={<ForgotPassword />} />
          <Route exact path='/product-detail/:slug' element={<ProductDetail />} />
          <Route exact path='/categories' element={<Categories />} />
          <Route exact path='/tags' element={<Tags />} />
          <Route exact path='/category/:slug' element={<CategoryWiseProducts />} />
          <Route exact path='/tag/:slug' element={<TagWiseProducts />} />
          <Route exact path='/cart' element={<CartPage />} />
  <Route exact path='/search' element={<Search />} />
          
   {/* *******admin routes *********/}
       <Route exact path='/dashboard/admin' element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route exact path='/dashboard/admin/create-category' element={<ProtectedRoute><CreateCategory /></ProtectedRoute>} />
          <Route exact path='/dashboard/admin/create-tag' element={<ProtectedRoute><CreateTag /></ProtectedRoute>} />
          <Route exact path='/dashboard/admin/create-product' element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
          <Route exact path='/dashboard/admin/product/:slug' element={<ProtectedRoute><UpdateProduct /></ProtectedRoute>} />
          <Route exact path='/dashboard/admin/products' element={<ProtectedRoute><Products /></ProtectedRoute>} />
  <Route exact path='/dashboard/admin/users' element={<ProtectedRoute><Users /></ProtectedRoute>} />

{/* *********user routes ************/}
        <Route exact path='/dashboard/user' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route exact path='/dashboard/user/orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route exact path='/dashboard/user/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route exact path='/dashboard/user/address' element={<ProtectedRoute><Address /></ProtectedRoute>} />
  <Route exact path='/dashboard/user/wishList' element={<ProtectedRoute><WishListPage /></ProtectedRoute>} />

{/* **********basic footer routes *****/}
          <Route exact path='/about' element={<About />} />
        <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/policy' element={<Policy />} />
  <Route exact path='*' element={<Pagenotfound />} />
</Routes>
      </Router>
    </>
  );
}

export default App;