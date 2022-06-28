import { Button, ButtonGroup, Card, CardMedia, Grid } from "@mui/material";
import { Order } from "../../models/Order";

type Props = {
    order: Order;
};

const SellerOrderCard = ({ order }: Props) => {
    return (
        <Grid item key={order.id} xs={4} md={4} lg={2.8}>
            <Card className="product">
                <div>
                    <h2>Order: {order.id}</h2>
                    <h4>Customer:</h4>
                    <h4>First Name: {order.buyer.firstName}</h4>
                    <h4>Last Name: {order.buyer.lastName}</h4>
                    <h4>Email: {order.buyer.email}</h4>
                    <h4>Shipping Address: {order.address}</h4>
                    <h4>Total: ${order.total}</h4>
                    <h4>Status: {order.status}</h4>
                </div>
                <ButtonGroup>
                    <Button>Cancel</Button>
                    <Button>Deliver</Button>
                </ButtonGroup>
            </Card>
        </Grid>
    );
};

export default SellerOrderCard;
