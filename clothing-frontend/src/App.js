
import './App.css';

import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ViewParties from "./components/ViewParties";
import AddOrderList from "./components/AddOrderList";
import ViewItems from "./components/ViewItems";
import AddStock from "./components/AddStock";
import AddParties from "./components/AddParties";
import ViewStock from "./components/ViewStocks";
import Product from "./components/Product";
import AddStockPage from "./pages/AddStockPage";
import AddPartyPage from "./pages/AddPartyPage";
import ViewItemsPage from "./pages/ViewItemsPage";
import ViewPartiesPage from "./pages/ViewPartiesPage";
import ViewStockPage from "./pages/ViewStockPage";
import AddItemsPage from "./pages/AddItemsPage";
import AddOrderListPage from "./pages/AddOrderListPage";
import OrderHistorypage from "./pages/OrderHistorypage";
import AddPurchaseListPage from "./pages/AddPurchaseListPage";
import PurchaseHistory from "./components/PurchaseHistory";
import PurchaseHistoryPage from "./pages/PurchaseHistoryPage";
import OrderHistoryDetails from "./components/OrderHistoryDetails";
import OrderDetailPage from "./pages/OrderDetailPage";
import HomePage from "./pages/HomePage";
import PurchaseDetailPage from "./pages/PurchaseDetailPage";


function App() {
  return (
      <BrowserRouter>

          <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<DashboardPage />} >
                  <Route path="" element={<HomePage/>}/>
                  <Route path="addOrderList" element={<AddOrderListPage/>}/>
                  <Route path="addParty" element={<AddPartyPage/>}/>
                  <Route path="addStock" element={<AddStockPage/>}/>
                  <Route path="viewItems" element={<ViewItemsPage />}/>
                  <Route path="viewParties" element={<ViewPartiesPage/>}/>
                  <Route path="viewStock" element={<ViewStockPage/>}/>
                  <Route path="addItems" element={<AddItemsPage/>}/>
                  <Route path="orderHistory" element={<OrderHistorypage/>}/>
                  <Route path="orderHistory/:id" element={<OrderDetailPage/>}/>
                  <Route path="purchaseitemsList" element={<AddPurchaseListPage/>}/>
                  <Route path="purchaseHistory" element={<PurchaseHistoryPage/>}/>
                  <Route path="purchaseHistory/:id" element={<PurchaseDetailPage/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
