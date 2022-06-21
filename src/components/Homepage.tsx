import { Box, Button, Card, Grid } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import "../css/homepage.css";
import ProductCard from "./ProductCard";
// import products from "../models/products";

function Homepage() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((resp) => resp.json())
      .then((data) => {
        setProducts(data);
        console.log(products);
      });
  }, []);
  console.log(products);
  const handleAddToCart = (clickedItem: Product) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find(
        (product) => product.id === clickedItem.id
      );

      if (isItemInCart) {
        return prev.map((product) =>
          product.id === clickedItem.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      }

      return [...prev, { ...clickedItem, quantity: 1 }];
    });
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const randomElement: Product =
    products[Math.floor(Math.random() * products.length)];

  return (
    <>
      <div className="storeHeader">
        <img
          width="100%"
          className="header-video"
          src="https://res.cloudinary.com/drrkccbb4/image/upload/v1655537289/Purple_Music_Store_Etsy_Banner_2240_560_px_2240_700_px_2240_900_px_2_c7grzc.gif"
        ></img>
      </div>

      <Container>
        <h3>Latest Products</h3>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          {products.map((product: Product) => (
            <ProductCard product={product} handleAddToCart={handleAddToCart} />
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Homepage;
