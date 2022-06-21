import { Button, Card, CardMedia, Grid } from "@mui/material";
import { Product } from "../models/Product";

type Props = {
  product: Product;
  handleAddToCart: (clickedItem: Product) => void;
};

const ProductCard = ({ product, handleAddToCart }: Props) => {
  return (
    <Grid item key={product.id} xs={4} md={4} lg={2.8}>
      <Card className="product">
        <CardMedia component="img" image={product.productImage} />
        <div>
          <h4>{product.productName}</h4>
          <h6>{product.category.category_name}</h6>
        </div>
        <h3>${product.price} USD</h3>
        <Button
          className="addToCart"
          size="large"
          variant="contained"
          color="primary"
          onMouseDown={(event) => event.stopPropagation()}
          onClick={() => handleAddToCart(product)}
        >
          Add To Cart
        </Button>
      </Card>
    </Grid>
  );
};

export default ProductCard;
