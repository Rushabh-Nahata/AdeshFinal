import "./App.css";
import Box from "@mui/material/Box";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
// import Footer from "./components/layout/Footer/Footer";
// import NavBar from "./components/layout/Navbar/NavBar";
import Products from "./components/Product/Products/Products";
import Search from "./components/Product/Search/Search";
import LoginSignUp from "./components/User/LoginSignUp/LoginSignUp";
import Verify from "./components/User/verify/Verify";
import { loadUser } from "./store/users/userActions";
import { useDispatch } from "react-redux";
import Profile from "./components/User/Profile/Profile";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword/ResetPassword";
import Cart from "./components/Product/Cart/Cart";
import Shipping from "./components/Product/Cart/Shipping";
import ConfirmOrder from "./components/Product/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./components/payment/Payment";
import OrderSuccess from "./components/Product/Cart/OrderSuccess";
import MyOrder from "./components/Order/MyOrder";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import NewNavBar from "./components/layout/NewNavBar/NewNavBar";
import ExtraNavbar from "./components/layout/ExtraNavbar/ExtraNavbar";

function App() {
  const dispatch = useDispatch();

   useEffect(() => {
    dispatch(loadUser());
    console.log("loadUser(dispatch);");
  }, [dispatch]);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Box className="App">
        {/* <NavBar /> */}
        <ExtraNavbar />
        <NewNavBar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route exact path="/rushabh" element={<Rushabh />} /> */}
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/login" element={<LoginSignUp />} />
          <Route exact path="/verify" element={<Verify />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/newnavbar" element={<NewNavBar />} />
          <Route
            exact
            path="/account"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/me/update"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/password/update"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />
          <Route exact path="/cart" element={<Cart />} />

          <Route
            exact
            path="/shipping"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/order/confirm"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/processes/payment"
            element={

              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }


          />

          {/* <ProtectedRoute exact path="/success" component={OrderSuccess} /> */}

          <Route
            exact
            path="/success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/orders"
            element={
              <ProtectedRoute>
                <MyOrder />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/dashboard"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/products"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/product"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewProduct />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/product/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateProduct />
              </ProtectedRoute>
            }
          />



          <Route
            exact
            path="/admin/orders"
            element={
              <ProtectedRoute isAdmin={true}>
                <OrderList />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/order/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProcessOrder />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
