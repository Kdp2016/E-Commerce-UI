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
import React, { useEffect, useState } from "react";
import { Product } from "../models/Product";
import ProductCard from "./ProductCard";

const cartFromLocalStorage = JSON.parse(
  localStorage.getItem("cartItems") || "[]"
);

const Cart = ({}) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [cartTotal, setCartTotal] = useState("");
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    setCartItems(cartFromLocalStorage);
    calculateTotal(cartFromLocalStorage);
  }, []);

  const getTotalItems = (items: Product[]) => {
    setTotalItems(items.reduce((acc, item) => acc + item.amount, 0));
  };

  const calculateTotal = (items: Product[]) => {
    setCartTotal(
      items.reduce((acc, item) => acc + item.amount * item.price, 0).toFixed(2)
    );
  };

  const plusItemAmount = (item: Product) => {
    let itemIndex = cartItems.indexOf(item);
    const newState = [...cartItems];

    newState[itemIndex].amount = item.amount + 1;
    setCartItems(newState);
    calculateTotal(cartItems);
  };

  const minusItemAmount = (item: Product) => {
    let itemIndex = cartItems.indexOf(item);
    const newState = [...cartItems];

    if (newState[itemIndex].amount == 1) {
      newState.splice(itemIndex, 1);
    } else {
      newState[itemIndex].amount = item.amount - 1;
    }

    setCartItems(newState);
    console.log("Updated Array(Not State)");
    console.log(newState);
    console.log("Cart Items State");
    console.log(cartItems);
    calculateTotal(newState);
  };

  return (
    <>
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
                          variant="contained"
                          size="small"
                          aria-label="small contained button group"
                        >
                          <p>{product.amount}</p>
                          <Button onClick={() => plusItemAmount(product)}>
                            +
                          </Button>
                          <Button onClick={() => minusItemAmount(product)}>
                            -
                          </Button>
                        </ButtonGroup>
                      </Grid>

                      <Grid item xs>
                        <div>
                          <p>Cost: ${product.price}</p>
                        </div>
                      </Grid>
                    </ListItemButton>
                  </Grid>
                </ListItem>
              </Container>
            );
          })}
          <Typography variant="subtitle1">Total: ${cartTotal}</Typography>
        </List>
      </div>
    </>
  );
};

export default Cart;
