import {
    Card,
    Grid,
  } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';
import { Container } from "@mui/system";
import products from "../models/products";

   function Homepage(){
    return (
        <>
        <h1>WELCOME TO OUR STORE!</h1>
            <h3>Latest Products</h3>
            <Container>

                <Grid container spacing={3}>
                    {products.map((product) =>(
                    <Grid item key={product._id} xs={12} md={6} lg={4}>

                        <Card sx={{ maxWidth: 345 }}>
                            <h4>{product.name}</h4>

                            <a href={'/product/${product._id}'}>
                            <CardMedia component="img" image={product.image}/>
                            </a> 

                            <h3>{product.price}</h3>

                            {product.description}

                        </Card> 
                    </Grid>
                    ))}
                </Grid>
        </Container>
        </>
      
    )
  }
  
  export default Homepage;