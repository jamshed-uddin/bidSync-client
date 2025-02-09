import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import Home from "./pages/Home.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import UserProfile from "./pages/dashboard/UserProfile.jsx";
import PrivateRoute from "./privateRoutes/PrivateRoute.jsx";
import MyListings from "./pages/dashboard/MyListings.jsx";
import MyBids from "./pages/dashboard/MyBids.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import ScrollTop from "./ScrollTop.jsx";

import Sell from "./pages/Sell.jsx";

import SavedItems from "./pages/SavedItems.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WonAuctions from "./pages/dashboard/WonAuctions.jsx";
import Overview from "./pages/dashboard/Overview.jsx";
import Shipping from "./pages/dashboard/Shipping.jsx";
import Checkout from "./pages/dashboard/Checkout.jsx";
import PaymentSuccess from "./pages/dashboard/PaymentSuccess.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ListAnItem from "./pages/dashboard/ListAnItem.jsx";
import ItemDetails from "./pages/ItemDetails.jsx";
import Deals from "./pages/Listings.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollTop />
        <App />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/listings",
        element: <Deals />,
      },
      {
        path: "/listings/:id",
        element: <ItemDetails />,
      },

      {
        path: "/sell",
        element: <Sell />,
      },

      {
        path: "/savedItems",
        element: (
          <PrivateRoute>
            <SavedItems />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "forgotpassword",
    element: <ForgotPassword />,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Overview />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },

      {
        path: "myListings",
        element: (
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
        ),
      },
      {
        path: "myBids",
        element: (
          <PrivateRoute>
            <MyBids />
          </PrivateRoute>
        ),
      },
      {
        path: "wonAuctions",
        element: (
          <PrivateRoute>
            <WonAuctions />
          </PrivateRoute>
        ),
      },

      {
        path: "listItem",
        element: (
          <PrivateRoute>
            <ListAnItem />
          </PrivateRoute>
        ),
      },
      {
        path: "editItem/:id",
        element: (
          <PrivateRoute>
            <ListAnItem />
          </PrivateRoute>
        ),
      },

      {
        path: "paymentSuccess",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "checkout/:id",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "shipping",
        element: (
          <PrivateRoute>
            <Shipping />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
