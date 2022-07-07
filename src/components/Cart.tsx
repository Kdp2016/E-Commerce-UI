import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
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
import "../css/cart.css";
import ProductCard from "./Cards/ProductCard";
import { User } from "../models/User";

interface ICartProps {
  currentUser: User | undefined;
}

function Cart(props: ICartProps) {
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem("cartItems");
    const initialValue = JSON.parse(saved || "[]");
    return initialValue || "[]";
  });
  const [cartTotal, setCartTotal] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [streetAdress, setStreetAdress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [message, setMessage] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [user, setUser] = useState<User>();


  useEffect(() => {
    calculateTotal(cartItems);
    getTotalItems(cartItems);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    if (props.currentUser) {
      setUser(props.currentUser);
    }
  }, [cartItems]);

  useEffect(() => {
    setFullAddress(`${streetAdress}, ${city}, ${state}, ${zipcode}`);
  })

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
  };
  let updateCity = (e: SyntheticEvent) => {
    setCity((e.target as HTMLInputElement).value);
  };
  let updateState = (e: SyntheticEvent) => {
    setState((e.target as HTMLInputElement).value);
  };
  let updateZipcode = (e: SyntheticEvent) => {
    setZipcode((e.target as HTMLInputElement).value);
    let Zipcodenumber = parseInt(zipcode);
  };



  const placeorder = async (event: SyntheticEvent) => {

    if (!streetAdress || !city || !state || !zipcode) {
      setMessage("Missing information, Please fill all Boxes.");
    } else if (state.length !== 2) {
      setMessage("State Postal Abbreviate must be 2 letters IE: NY");
    } else if (zipcode.length !== 5) {
      setMessage("Zip code must be 5 digits long.");
    } else if (isNaN(+zipcode)) {
      setMessage("Zip code must be numbers only.");
    } else {
      setMessage("");
      console.log("FETCH PLEAASE");
      await fetch("http://Ecommerce-env.eba-hz3mknpp.us-east-1.elasticbeanstalk.com/ecommerce/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            buyer: {
              id: user!.id,
            },
            address: streetAdress,
            orderItems: cartItems.map(item => { return { productId: item.id, quantity: item.quantity } }),
            status: "ORDERED",
            total: (parseFloat(cartTotal) * 1.07).toFixed(2),
          })
        });
    };
  }
  return (
    <>
      <h1 className="cartTitle">
        Cart<span>({totalItems} Items)</span>
      </h1>
      <div className="Container">
        <div className="Cart">
          <div>
            <List className="cartList">
              {cartItems.map((product: Product) => {
                return (
                  <div className="cartItem">
                    <div className="itemInfo">
                      <div className="itemDesc">
                        <img src={product.productImage}></img>
                        <div>
                          <span>{product.productName}</span>
                          <p>Sold and shipped by {product.brand}</p>
                        </div>
                      </div>

                      <div className="itemPrice">
                        <h3>
                          ${(product.quantity * product.price).toFixed(2)}
                        </h3>
                        <span>${product.price} ea</span>
                      </div>
                    </div>
                    <div className="itemfunctions">
                      <div>
                        <button onClick={() => minusItemAmount(product)}>
                          <i className="fa fa-minus"></i>
                        </button>
                        <p>{product.quantity}</p>
                        <button onClick={() => plusItemAmount(product)}>
                          <i className="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </List>
          </div>
        </div>
        <div className="Checkout">
          <div>
            <Box
              className="checkoutForm"
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <h2>Shipping Address</h2>
              <p>Where should we deliver your order?</p>
              <TextField
                color="error"
                required
                id="outlined-required"
                label="Street Address"
                defaultValue=""
                onChange={updateStreetAdress}
              />
              <TextField
                color="error"
                required
                id="outlined-required"
                label="City"
                defaultValue=""
                onChange={updateCity}
              />
              <TextField
                color="error"
                required
                id="outlined-required"
                label="State"
                defaultValue=""
                onChange={updateState}
              />
              <TextField
                color="error"
                required
                id="outlined-required"
                label="Zip Code"
                defaultValue=""
                onChange={updateZipcode}
              />
              {message && <p>{message}</p>}{" "}
            </Box>
            <div className="total">
              <div className="formFlex">
                <Typography variant="h6">
                  Subtotal <span>({totalItems} items)</span>
                </Typography>
                <Typography variant="body1">${cartTotal}</Typography>
              </div>
              <div className="formFlex">
                <Typography variant="h6">Taxes</Typography>
                <Typography variant="body1">
                  ${(parseFloat(cartTotal) * 0.07).toFixed(2)}
                </Typography>
              </div>
            </div>

            <div className="total bottom">
              <div className="formFlex">
                <Typography variant="h6">Estimated Total</Typography>
                <Typography variant="body1">
                  ${(parseFloat(cartTotal) * 1.07).toFixed(2)}
                </Typography>
              </div>
            </div>
            <button onClick={placeorder}>Place Order</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;