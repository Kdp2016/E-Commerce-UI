import { Box, Button, ButtonGroup, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { User } from "../models/User";
import OrderCard from "./Cards/OrderCard";
import SellerProductCard from "./Cards/SellerProductCard";
import SellerOrderCard from "./Cards/SellerOrderCard";
import UserCard from "./Cards/UserCard";

interface IDashboardProps {
  currentUser: User | undefined;
}

function Dashboard(props: IDashboardProps) {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productImage, setProductImage] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("0");
  const [category, setCategory] = useState("");


  useEffect(() => {
    fetch("http://localhost:5000/ecommerce/products")
      .then((resp) => resp.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/ecommerce/orders")
      .then((resp) => resp.json())
      .then((data) => {
        setOrders(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/ecommerce/users")
      .then((resp) => resp.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  let updateProductName = (e: SyntheticEvent) => {
    setProductName((e.target as HTMLInputElement).value);
  };

  let updateProductDesc = (e: SyntheticEvent) => {
    setProductDesc((e.target as HTMLInputElement).value);
  };

  let updateBrand = (e: SyntheticEvent) => {
    setBrand((e.target as HTMLInputElement).value);
  };

  let updateProductImage = (e: SyntheticEvent) => {
    setProductImage((e.target as HTMLInputElement).value);
  };

  let updatePrice = (e: SyntheticEvent) => {
    setPrice((e.target as HTMLInputElement).value);
  };


  let updateCategory = (e: SyntheticEvent) => {
    setCategory((e.target as HTMLInputElement).value);
  };

  return props.currentUser ? (
    <Navigate to="/login" />
  ) : (
    <>
      <Container>
        <h1>Admin Dashboard</h1>
        <h3>Users</h3>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          {users.map((user: User) => (
            <UserCard user={user} key={user.id} />
          ))}
        </Grid>
      </Container>
      <Container>
        <h1>Dashboard</h1>
        <h3>Purchase History</h3>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          {orders.map((order: Order) => (
            <OrderCard order={order} key={order.id} />
          ))}
        </Grid>
      </Container>
      <Container>
        <h1>Seller Dashboard</h1>
        <Box
          className="checkoutForm"
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <h2>Create a Product</h2>

          <TextField
            color="error"
            required
            id="outlined-required"
            label="Product Name"
            defaultValue=""
            onChange={updateProductName}
          />
          <TextField
            color="error"
            required
            id="outlined-required"
            label="Product Description"
            defaultValue=""
            onChange={updateProductDesc}
          />
          <TextField
            color="error"
            required
            id="outlined-required"
            label="Brand"
            defaultValue=""
            onChange={updateBrand}
          />
          <TextField
            color="error"
            required
            id="outlined-required"
            label="Price"
            defaultValue=""
            onChange={updatePrice}
          />
          <label htmlFor="image">Image URL</label>
          <input id="image" onChange={updateProductImage} type="file"></input>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={category}
              label="Category"
            >
              <MenuItem >Cat1</MenuItem>
              <MenuItem >Cat2</MenuItem>
              <MenuItem >Cat3</MenuItem>
            </Select>
          </FormControl>
          {message && <p>{message}</p>}{" "}
          <button >Create Product</button>
        </Box>
        <div>
          <h3>Orders</h3>
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            {orders.map((order: Order) => (
              <SellerOrderCard order={order} key={order.id} />
            ))}
          </Grid>
        </div>
        <div>
          <h3>Your Products</h3>
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            {products.map((product: Product) => (
              <SellerProductCard product={product} key={product.id} />
            ))}
          </Grid>
        </div>
      </Container>
    </>
  );
}

export default Dashboard;
