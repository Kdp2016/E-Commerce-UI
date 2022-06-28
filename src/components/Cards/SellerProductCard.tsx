import { Button, ButtonGroup, Card, CardMedia, Grid } from "@mui/material";
import { Product } from "../../models/Product";

type Props = {
    product: Product;
};

const SellerProductCard = ({ product }: Props) => {
    return (
        <Grid item key={product.id} xs={4} md={4} lg={2.8}>
            <Card className="product">
                <div>
                    <CardMedia component="img" image={product.productImage} />
                    <h4>{product.productName}</h4>
                    <h6>{product.category}</h6>
                    <h3>${product.price} USD</h3>
                </div>
                <ButtonGroup>
                    <Button>Update</Button>
                    <Button>Delete</Button>
                </ButtonGroup>
            </Card>
        </Grid>
    );
};

export default SellerProductCard;