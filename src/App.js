import React, { useEffect, Suspense, lazy } from "react";
import { DataProvider } from './context/DataContext';
import {BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Cart from "./page/Cart";
import Wishlist from './page/Wishlist';
import Compare from "./page/Compare";
import Shop from "./page/Shop";
import ShopProduct from "./page/ShopProduct";
import Blog from "./page/Blog";
import Contact from "./page/Contact";
import BlogContent from "./page/BlogContent";
import LoginRegister from "./page/LoginRegister";
import ForgotPassword from "./page/ForgotPassword";
import NotFound from "./page/NotFound";
import DashBoardUser from "./page/DashBoardUser";
import Profile from "./page/DashboardUser/Profile";
import ChangePassword from "./page/DashboardUser/ChangePassword"; 
import Order from "./page/DashboardUser/Order";
import ConfirmU from "./page/DashboardUser/ConfirmU";
import History from "./page/DashboardUser/History";
import Address from "./page/DashboardUser/Address";
import CheckOut from "./page/CheckOut";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./assets/styles.css";
import "lightgallery.js/dist/css/lightgallery.css";




function App() {

  //const Home = lazy(() => import("./page/Home"));

  return (
   <>
     <DataProvider>
          <BrowserRouter>
              <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/compare" element={<Compare />} />
                    <Route path="/shop" element={<Shop />}>
                    </Route>
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login-register" element={<LoginRegister />} />
                    <Route path="/dashboard-user" element={<DashBoardUser />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/orders" element={<Order />} />
                    <Route path="/confirm" element={<ConfirmU />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/address" element={<Address />} />
                    <Route path="/checkout" element={<CheckOut />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/blog-content/:id" element={<BlogContent />} />
                    <Route path="/product/:id" element={<ShopProduct />} />
                    <Route path="/notfound" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />

              </Routes>
          </BrowserRouter>
      </DataProvider>
   </>
      
    
     
  );
}

export default App;
