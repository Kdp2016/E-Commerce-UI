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