<<<<<<< HEAD
import {
    Grid,
  } from "@mui/material";
import { Container } from "@mui/system";
import { ProductModel } from "../models/Product";
import products from "../models/products";
import ProductCard from "./Product";
import { useState } from "react";


   function Homepage(){

    const [cartItems, setCartItems] = useState<ProductModel[]>([]);

  const handleAddToCart = (clickedItem: ProductModel) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((product) => product.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((product) =>
          product.id === clickedItem.id
            ? { ...product, amount: product.amount + 1 }
            : product
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    
    });
    
  };
console.log(cartItems)
//   const handleRemoveFromCart = (id: number) => {
//     setCartItems((prev) =>
//       prev.reduce((acc, item) => {
//         if (item.id === id) {
//           if (item.amount === 1) return acc;
//           return [...acc, { ...item, amount: item.amount - 1 }];
//         } else {
//           return [...acc, item];
//         }
//       }, [] as ProductModel[])
//     );
//   };
    return (
        <>
        <h1>WELCOME TO OUR STORE!</h1>
            <h3>Latest Products</h3>
            <Container>

                <Grid container spacing={3}>
                    {products.map((product) =>(
                    <Grid item key={product.id} xs={9} sm={6} md={4} lg={3} xl={3}>
                        <ProductCard product={product} handleAddToCart={handleAddToCart}/>
                    </Grid>
                    ))}
                </Grid>
        </Container>
        </>
      
    )
  }
  
  export default Homepage;
=======
import { Box, Button, Card, Grid } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import "../css/homepage.css";
// import products from "../models/products";

function Homepage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((resp) => resp.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

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
            <Grid item key={product.id} xs={4} md={4} lg={2.8}>
              <Card className="product">
                <CardMedia component="img" image={product.productImage} />
                <h4>{product.productName}</h4>
                <h3>${product.price} USD</h3>
                <Button
                  className="addToCart"
                  size="large"
                  variant="contained"
                  color="primary"
                  onMouseDown={(event) => event.stopPropagation()}
                >
                  Add To Cart
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Homepage;
>>>>>>> 3ba204567a589c6a7434bfda6fef69c1c1acf2c3
