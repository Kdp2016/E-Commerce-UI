import {
  Avatar,
  Button,
  ButtonGroup,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  border,
  borderRadius,
  borders,
  Container,
  grid,
  height,
} from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Product } from "../models/Product";
import "../css/cart.css"
import ProductCard from "./ProductCard";

const cartFromLocalStorage = JSON.parse(
  localStorage.getItem("cartItems") || "[]"
);

const Cart = ({ }) => {
  const [cartItems, setCartItems] = useState<Product[]>(cartFromLocalStorage);
  const [cartTotal, setCartTotal] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [streetAdress, setStreetAdress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    calculateTotal(cartItems);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const getTotalItems = (items: Product[]) => {
    setTotalItems(items.reduce((acc, item) => acc + item.quantity, 0));
  };

  const calculateTotal = (items: Product[]) => {
    setCartTotal(
      items
        .reduce((acc, item) => acc + item.quantity * item.price, 0)
        .toFixed(2)
    );
  };

  const plusItemAmount = (item: Product) => {
    let itemIndex = cartItems.indexOf(item);
    const newState = [...cartItems];

    newState[itemIndex].quantity = item.quantity + 1;
    setCartItems(newState);
    calculateTotal(cartItems);
  };

  const minusItemAmount = (item: Product) => {
    let itemIndex = cartItems.indexOf(item);
    const newState = [...cartItems];

    if (newState[itemIndex].quantity == 1) {
      newState.splice(itemIndex, 1);
    } else {
      newState[itemIndex].quantity = item.quantity - 1;
    }

    setCartItems(newState);
    console.log("Updated Array(Not State)");
    console.log(newState);
    console.log("Cart Items State");
    console.log(cartItems);
    calculateTotal(newState);
  };

  let updateStreetAdress = (e: SyntheticEvent) => {
    setStreetAdress((e.target as HTMLInputElement).value);
  }
  let updateCity = (e: SyntheticEvent) => {
    setCity((e.target as HTMLInputElement).value);
  }
  let updateState = (e: SyntheticEvent) => {
    setState((e.target as HTMLInputElement).value);
  }
  let updateZipcode = (e: SyntheticEvent) => {
    setZipcode((e.target as HTMLInputElement).value);
    let Zipcodenumber = parseInt(zipcode);
  }

  const placeorder = (event: SyntheticEvent) => {
    if (!streetAdress || !city || !state || !zipcode) {
      setMessage('Missing information, Please fill all Boxes.');
    } else if (state.length !== 2) {
      setMessage('State Postal Abbreviate must be 2 letters IE: NY');
    }
    else if (zipcode.length !== 5) {
      setMessage('Zip code must be 5 digits long.');
    }
    else if (isNaN(+zipcode)) {
      setMessage('Zip code must be numbers only.');
    }
    else {
      setMessage('Order Placed.');
    }
  }
  return (
    <><div className="Container">
      <div className="Cart">
        <h1>Your Shopping Cart</h1>
        <Typography variant="subtitle1">Cart</Typography>
        <div style={{ height: 40, width: "100%" }}>
          <List
            dense
            sx={{ width: "100%", maxWidth: 760, bgcolor: "background.blue" }}
          >
            {cartItems.map((product: Product) => {
              return (
                <Container>
                  <ListItem style={{ display: "inline" }}>
                    <Grid
                      container
                      spacing={2}
                      style={{ width: "100%", maxWidth: 760 }}
                    >
                      <ListItemButton
                        sx={{ bgcolor: "white" }}
                        style={{ border: "solid", borderRadius: "8px" }}
                      >
                        <Grid item key={product.id}>
                          <ListItemAvatar>
                            <Avatar
                              style={{
                                display: "block",
                                width: "88px",
                                height: "88px",
                                border: "none",
                                borderRadius: "8px",
                              }}
                              src={product.productImage}
                            />
                          </ListItemAvatar>
                        </Grid>

                        <Grid item xs marginLeft={5}>
                          <ListItemText primary={product.productName} />
                        </Grid>

                        <Grid item xs marginLeft={20}>
                          <ButtonGroup
                            className="buttongroup"
                            variant="contained"
                            size="small"
                            aria-label="small contained button group"
                          >
                            <Button
                              onClick={() => plusItemAmount(product)}
                              className="cartButton"
                            >
                              +
                            </Button>
                            <p>{product.quantity}</p>
                            <Button
                              className="cartButton"
                              onClick={() => minusItemAmount(product)}
                            >
                              -
                            </Button>
                          </ButtonGroup>
                        </Grid>

                        <Grid item xs>
                          <div>
                            <p>Unit Price: ${product.price}</p>
                          </div>
                        </Grid>
                      </ListItemButton>
                    </Grid>
                  </ListItem>
                </Container>
              );
            })}
          </List>
        </div></div>
      <div className="Checkout">
        <div className="cartform"><Typography>Shipping Address</Typography>
          <input type="text" placeholder='Enter Street Adress' onChange={updateStreetAdress}></input>
          <input type="text" placeholder='Enter City Name' onChange={updateCity}></input>
          <input type="text" placeholder='Enter State Abbreviation' onChange={updateState}></input>
          <input type="text" placeholder='Enter Zip Code' onChange={updateZipcode}></input>
          {message && <p>{message}</p>}
        </div>
        <Typography variant="subtitle1">Total: ${cartTotal}</Typography>
        <Button onClick={placeorder}>Place Order</Button>
      </div></div>
    </>
  );
};

export default Cart;
