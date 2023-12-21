import './App.css';
import React  from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './User/Layout/Layout';
import DashbordLayout from './DashBord/Layout/Layout';
import Home from './User/Home/Home';
import DashBordHome from './DashBord/Home/Home';
import Categories from './User/Categories/Categories';
import Register from './User/Register/Register';
import Login from './User/Login/LogIn';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PageNotFound from './User/Shared/PageNotFound';
import Product from './User/products/Product';
import SingleProduct from './User/products/SingleProduct';
import CartContextProvider from './Context/CartContext';
import UserInfoContextProvider from './Context/UserInfoContext';
import Cart from './User/Cart/Cart';
import NewPassWord from './User/Password/NewPassWord';
import SendCode from './User/Password/sendCode';
import Profile from './User/profile/Profile';
import CreateOrder from './User/orders/CreateOrder';
import Orders from './User/orders/Orders';
import AllProducts from './User/products/AllProducts';
import Guard from './User/Shared/Guard';

function App() {
  const queryClient = new QueryClient()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children : [
        {
          path: "/",
          element : <Home></Home>
        },
        {
          path: "categories",
          element : <Categories></Categories>
        },
        {
          path: "register",
          element : <Register></Register>
        },
        {
          path : "Login",
          element:  <Login></Login>
        },
        {
          path : "products/category/:categoryId",
          element:  <Product></Product>
        },
        {
          path : "products/:productId",
          element:  <SingleProduct></SingleProduct>
        },
        {
          path : "cart",
          element:  <Guard><Cart></Cart></Guard>
        },
        {
          path : "NewPassWord",
          element:  <NewPassWord></NewPassWord>
        },
        {
          path : "sendCode",
          element:  <SendCode></SendCode>
        },
        {
          path : "profile",
          element:  <Profile></Profile>
        },
        {
          path : "order",
          element:  <CreateOrder></CreateOrder>
        },
        {
          path : "UserOrders",
          element:  <Orders></Orders>
        },
        {
          path : "products",
          element:  <AllProducts></AllProducts>
        },
        {
          path : "*",
          element : <PageNotFound/>
        }
      ],
    },
    {
      path: "/Dashbord",
      element : <DashbordLayout></DashbordLayout>,
      children : [
        {
          path: "home",
          element : <DashBordHome></DashBordHome>
        }
      ],
    }
  ]);
  return (
    <>
    <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <UserInfoContextProvider>
              <div className="App">
                  <RouterProvider router={router}></RouterProvider>
              </div>
          </UserInfoContextProvider>
        </CartContextProvider>
    </QueryClientProvider>
    </>
  );
}

export default App;
