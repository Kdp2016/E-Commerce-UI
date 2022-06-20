import {
    Button,
    Card,
    CardMedia,
    Grid,
  } from "@mui/material";
import { ProductModel } from "../models/Product";



type Props = {
  product: ProductModel;
  handleAddToCart: (clickedItem: ProductModel) => void;
};

const ProductCard = ({ product, handleAddToCart }: Props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <h4>{product.title}</h4>

    <a href={'/product/${product.id}'}>
    <CardMedia component="img" image={product.image}/>
    </a> 

    <h3>{product.price}</h3>

    {product.description}
      <Button onClick={() => handleAddToCart(product)}>Add to cart</Button>
      {/* <Button onClick={() => handleAddToCart(product)}>Add to cart</Button> */}
    </Card>
  );
};

export default ProductCard;













