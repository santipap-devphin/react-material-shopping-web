import React, { useEffect, Suspense, lazy } from "react";
import { DataProvider } from './context/DataContext';
import {BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Cart from "./page/Cart";
import Wishlist from './page/Wishlist';
import Compare from "./page/Compare";
import Shop from "./page/Shop";
import PromotionPrice from "./page/PromotionPrice";
import ShopProduct from "./page/ShopProduct";
import Blog from "./page/Blog";
import CategoryGroup from "./page/CategoryGroup";
import TagGroup from "./page/TagGroup";
import Contact from "./page/Contact";
import BlogContent from "./page/BlogContent";
import LoginRegister from "./page/LoginRegister";
import ForgotPassword from "./page/ForgotPassword";
import NotFound from "./page/NotFound";
import Profile from "./page/DashboardUser/Profile";
import ChangePassword from "./page/DashboardUser/ChangePassword"; 
import Order from "./page/DashboardUser/Order";
import ConfirmU from "./page/DashboardUser/ConfirmU";
import History from "./page/DashboardUser/History";
import Address from "./page/DashboardUser/Address";
import CheckOut from "./page/CheckOut";
import ChatUser from "./page/DashboardUser/ChatUser";
import DashBoardAdmin from './page/DashboardAdmin/Home';
import DashBoardAdminNotfound from './page/DashboardAdmin/DashNotFound';
import DashBoardAdminBlog from './page/DashboardAdmin/Blog';
import DashBoardAdminBlogAdd from './page/DashboardAdmin/BlogAdd';
import DashBoardAdminBlogEdit from './page/DashboardAdmin/BlogEdit';
import DashBoardAdminCategory from './page/DashboardAdmin/Category';
import DashBoardAdminCategoryAdd from './page/DashboardAdmin/CategoryAdd';
import DashBoardAdminCategoryEdit from './page/DashboardAdmin/CategoryEdit';
import DashBoardAdminChat from './page/DashboardAdmin/Chat';
import DashBoardAdminConfirm from './page/DashboardAdmin/Confirm';
import DashBoardAdminCoupon from './page/DashboardAdmin/Coupon';
import DashBoardAdminCouponAdd from './page/DashboardAdmin/CouponAdd';
import DashBoardAdminCouponEdit from './page/DashboardAdmin/CouponEdit';
import DashBoardAdminInbox from './page/DashboardAdmin/Inbox';
import DashBoardAdminOrders from './page/DashboardAdmin/Orders';
import DashBoardAdminPayment from './page/DashboardAdmin/Payment';
import DashBoardAdminPaymentAdd from './page/DashboardAdmin/PaymentAdd';
import DashBoardAdminPaymentEdit from './page/DashboardAdmin/PaymentEdit';
import DashBoardAdminProduct from './page/DashboardAdmin/Product';
import DashBoardAdminProductAdd from './page/DashboardAdmin/ProductAdd';
import DashBoardAdminProductEdit from './page/DashboardAdmin/ProductEdit';
import DashBoardAdminPromotion from './page/DashboardAdmin/Promotion';
import DashBoardAdminPromotionAdd from './page/DashboardAdmin/PromotionAdd';
import DashBoardAdminPromotionEdit from './page/DashboardAdmin/PromotionEdit';
import DashBoardAdminReportProduct from './page/DashboardAdmin/ReportProduct';
import DashBoardAdminReportProSale from './page/DashboardAdmin/ReportProSale';
import DashBoardAdminShipping from './page/DashboardAdmin/Shipping';
import DashBoardAdminSizeProduct from './page/DashboardAdmin/SizeProduct';
import DashBoardAdminSizeProductAdd from './page/DashboardAdmin/SizeAdd';
import DashBoardAdminSizeProductEdit from './page/DashboardAdmin/SizeEdit';
import DashBoardAdminSupply from './page/DashboardAdmin/Supply';
import DashBoardAdminSupplyAdd from './page/DashboardAdmin/SupplyAdd';
import DashBoardAdminSupplyEdit from './page/DashboardAdmin/SupplyEdit';
import DashBoardAdminTags from './page/DashboardAdmin/Tags';

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
                    <Route path="/shop" element={<Shop />}></Route>
                    <Route path="/promotion" element={<PromotionPrice />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="blog/:slug" element={<CategoryGroup />} />
                    <Route path="/tag/:slug" element={<TagGroup />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login-register" element={<LoginRegister />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/orders" element={<Order />} />
                    <Route path="/confirm" element={<ConfirmU />} />
                    <Route path="/chatuser" element={<ChatUser />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/address" element={<Address />} />
                    <Route path="/checkout" element={<CheckOut />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/blog-content/:id" element={<BlogContent />} />
                    <Route path="/product/:id" element={<ShopProduct />} />
                    <Route path="/notfound" element={<NotFound />} />

                    <Route path="/backend" element={<DashBoardAdmin />} />
                    <Route path="/backend/blog" element={<DashBoardAdminBlog />} />
                    <Route path="backend/blog/add" element={<DashBoardAdminBlogAdd />} />
                    <Route path="backend/blog/edit/:id" element={<DashBoardAdminBlogEdit />} />
                    <Route path="/backend/category" element={<DashBoardAdminCategory />} />
                    <Route path="backend/category/add" element={<DashBoardAdminCategoryAdd />} />
                    <Route path="backend/category/edit/:id" element={<DashBoardAdminCategoryEdit />} />
                    <Route path="/backend/chat" element={<DashBoardAdminChat />} />
                    <Route path="/backend/confirm" element={<DashBoardAdminConfirm />} />
                    <Route path="/backend/coupon" element={<DashBoardAdminCoupon />} />
                    <Route path="backend/coupon/add" element={<DashBoardAdminCouponAdd />} />
                    <Route path="backend/coupon/edit/:id" element={<DashBoardAdminCouponEdit />} />
                    <Route path="backend/inbox" element={<DashBoardAdminInbox />} />
                    <Route path="backend/orders" element={<DashBoardAdminOrders />} />
                    <Route path="/backend/payment" element={<DashBoardAdminPayment />} />
                    <Route path="backend/payment/add" element={<DashBoardAdminPaymentAdd />} />
                    <Route path="backend/payment/edit/:id" element={<DashBoardAdminPaymentEdit />} />
                    <Route path="/backend/product" element={<DashBoardAdminProduct />} />
                    <Route path="backend/product/add" element={<DashBoardAdminProductAdd />} />
                    <Route path="backend/product/edit/:id" element={<DashBoardAdminProductEdit />} />
                    <Route path="/backend/promotion/" element={<DashBoardAdminPromotion />} />
                    <Route path="/backend/promotion/add" element={<DashBoardAdminPromotionAdd />} />
                    <Route path="/backend/promotion/edit/:id" element={<DashBoardAdminPromotionEdit />} />
                    <Route path="/backend/reportproduct" element={<DashBoardAdminReportProduct />} />
                    <Route path="/backend/reportproductsale" element={<DashBoardAdminReportProSale />} />
                    <Route path="/backend/shipping" element={<DashBoardAdminShipping />} />
                    <Route path="/backend/sizeproduct" element={<DashBoardAdminSizeProduct />} />
                    <Route path="backend/sizeproduct/add" element={<DashBoardAdminSizeProductAdd />} />
                    <Route path="backend/sizeproduct/edit/:id" element={<DashBoardAdminSizeProductEdit />} />
                    <Route path="/backend/supply" element={<DashBoardAdminSupply />} />
                    <Route path="backend/supply/add" element={<DashBoardAdminSupplyAdd />} />
                    <Route path="backend/supply/edit/:id" element={<DashBoardAdminSupplyEdit />} />
                    <Route path="/backend/tags" element={<DashBoardAdminTags />} />
                    
                    <Route path="backend/*" element={<DashBoardAdminNotfound />} />
                    <Route path="*" element={<NotFound />} />

              </Routes>
          </BrowserRouter>
      </DataProvider>
   </>
      
    
     
  );
}

export default App;
