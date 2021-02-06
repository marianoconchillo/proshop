import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HomeScreen } from "./components/screens/HomeScreen";
import { ProductScreen } from "./components/screens/ProductScreen";
import { CartScreen } from "./components/screens/CartScreen";
import { LoginScreen } from "./components/screens/LoginScreen";
import { RegisterScreen } from "./components/screens/RegisterScreen";
import { ProfileScreen } from "./components/screens/ProfileScreen";
import { ShippingScreen } from "./components/screens/ShippingScreen";
import { PaymentScreen } from "./components/screens/PaymentScreen";
import { PlaceOrderScreen } from "./components/screens/PlaceOrderScreen";
import { OrderScreen } from "./components/screens/OrderScreen";
import { UserListScreen } from "./components/screens/UserListScreen";
import { UserEditSCreen } from "./components/screens/UserEditScreen";
import { ProductListScreen } from "./components/screens/ProductListScreen";
import { ProductEditScreen } from "./components/screens/ProductEditScreen";
import { OrderListScreen } from "./components/screens/OrderListScreen";

export const App = () => {
  return (
      <Router >
        <Header />
        <main className="py-3">
          <Container className="body-container ">
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route exact path="/cart/:id?" component={CartScreen} />
            <Route exact path="/shipping" component={ShippingScreen} />
            <Route exact path="/payment" component={PaymentScreen} />
            <Route exact path="/placeOrder" component={PlaceOrderScreen} />
            <Route exact path="/admin/userlist" component={UserListScreen} />
            <Route
              exact
              path="/admin/user/:id/edit"
              component={UserEditSCreen}
            />
            <Route
              exact
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
            />
            <Route
              exact
              path="/admin/productlist"
              component={ProductListScreen}
            />
            <Route
              exact
              path="/admin/productlist/:pageNumber"
              component={ProductListScreen}
            />
            <Route exact path="/admin/orderlist" component={OrderListScreen} />
            <Route exact path="/search/:keyword" component={HomeScreen} />
            <Route exact path="/page/:pageNumber" component={HomeScreen} />
            <Route
              exact
              path="/search/:keyword/page/:pageNumber"
              component={HomeScreen}
            />
            <Route exact path="/" component={HomeScreen} />
          </Container>
        </main>
        <Footer />
      </Router>
  );
};
