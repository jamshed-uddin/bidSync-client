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
import CreateAuction from "./pages/dashboard/CreateAuction.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import DataProvider from "./providers/DataProvider.jsx";
import ScrollTop from "./ScrollTop.jsx";
import Auctions from "./pages/Auctions.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import Sell from "./pages/Sell.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import SavedItems from "./pages/SavedItems.jsx";
import AuctionDetail from "./pages/AuctionDetail.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
        path: "/auctions",
        element: <Auctions />,
      },
      {
        path: "/auctions/:id",
        element: <AuctionDetail />,
      },
      {
        path: "/categories",
        element: <CategoryPage />,
      },
      {
        path: "/sell",
        element: <Sell />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/savedItems",
        element: <SavedItems />,
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
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
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
        path: "createAuction",
        element: (
          <PrivateRoute>
            <CreateAuction />
          </PrivateRoute>
        ),
      },
      {
        path: "editAuction/:id",
        element: (
          <PrivateRoute>
            <CreateAuction />
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
        <DataProvider>
          <RouterProvider router={router} />
        </DataProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
