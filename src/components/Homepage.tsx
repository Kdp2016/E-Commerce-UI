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
