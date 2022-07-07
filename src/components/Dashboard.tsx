import { Box, Button, ButtonGroup, Container, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { User } from "../models/User";
import OrderCard from "./Cards/OrderCard";
import SellerProductCard from "./Cards/SellerProductCard";
import SellerOrderCard from "./Cards/SellerOrderCard";
import UserCard from "./Cards/UserCard";
import { ClassNames } from "@emotion/react";
import { Co2Sharp } from "@mui/icons-material";
import "../css/dashboard.css";

interface IDashboardProps {
  currentUser: User | undefined;
}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue(value => value + 1);
}

function Dashboard(props: IDashboardProps) {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([] as any);
  const [products, setProducts] = useState([] as any);
  const [message, setMessage] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState<File>();
  const [productImage, setProductImage] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [seller, setSeller] = useState(props.currentUser);
  const navigate = useNavigate();
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    fetch(`http://Ecommerce-env.eba-hz3mknpp.us-east-1.elasticbeanstalk.com/ecommerce/products/search?seller.id=${props.currentUser?.id}`)
      .then((resp) => {
        if (resp.status === 200) {
          return resp.json().then((data) => {
            setProducts(data);
          });
        } else {
          setProducts([]);
        }
      })
  }, []);

  useEffect(() => {
    fetch(`http://Ecommerce-env.eba-hz3mknpp.us-east-1.elasticbeanstalk.com/ecommerce/orders/search?buyer.id=${props.currentUser?.id}`)
      .then((resp) => {
        if (resp.status === 200) {
          return resp.json().then((data) => {
            setOrders(data);
          });
        } else { setOrders([]); }
      })

  }, []);

  useEffect(() => {
    fetch("http://Ecommerce-env.eba-hz3mknpp.us-east-1.elasticbeanstalk.com/ecommerce/users")
      .then((resp) => resp.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  let updateProductName = (e: SyntheticEvent) => {
    setProductName((e.target as HTMLInputElement).value);
  };

  let updateProductDesc = (e: SyntheticEvent) => {
    setProductDescription((e.target as HTMLInputElement).value);
  };

  let updateBrand = (e: SyntheticEvent) => {
    setBrand((e.target as HTMLInputElement).value);
  };

  let updateProductImage = (e: SyntheticEvent) => {
    // setProductImage((e.target as HTMLInputElement).value);
  };

  let updatePrice = (e: SyntheticEvent) => {
    let price = ((e.target as HTMLInputElement).value);
    setPrice(Number(price));
  };


  let updateCategory = (e: SyntheticEvent) => {
    setCategory((e.target as HTMLInputElement).value);
  };

  const uploadImage = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(selectedImage);
    const formData = new FormData();
    formData.append("file", selectedImage!);
    formData.append("upload_preset", "ecommerce-project");
    fetch("https://api.cloudinary.com/v1_1/drrkccbb4/image/upload", {
      method: "POST",
      body: formData,
    }).then((resp) => {
      return resp.json();
    }).then((data) => {
      setProductImage(data.secure_url);
    })
  }

  const addProduct = async (e: SyntheticEvent) => {
    e.preventDefault();
    await uploadImage(e);

    if (isNaN(price)) {
      setMessage("Price must be a number");
    }
    else if (!productName || !productDescription || !productImage || !brand || !price || !category) {
      setMessage("Please fill in all fields");
    } else if (price < 0) {
      setMessage("Price must be a number.")
    } else if (price < 0) {
      setMessage("Price must be greater than 0.")
    }
    else {

      let resp = await fetch('http://Ecommerce-env.eba-hz3mknpp.us-east-1.elasticbeanstalk.com/ecommerce/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productName, productDescription, productImage, brand, price, category, seller })

      });
      setMessage('Creating product.....')
      setTimeout(() => setMessage("Product Created!"), 2000);
      forceUpdate();

    }
  }


  if (!props.currentUser) {
    return (
      <Navigate to="/auth" />
    );

  } else if (props.currentUser.role === "ADMIN") {
    return (
      <Container>
        <h1>Admin Dashboard</h1>
        <h3>Users</h3>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          {users.map((user: User) => (
            <UserCard user={user} key={user.id} />
          ))}
        </Grid>
      </Container>
    )
  } else if (props.currentUser.role === "SELLER") {
    return (
      <Container>
        <h1>Seller Dashboard</h1>
        <Box
          className="checkoutForm"
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <h2>Create a Product</h2>

          <TextField
            color="error"
            required
            id="outlined-required"
            label="Product Name"
            defaultValue=""
            onChange={updateProductName}
          />
          <TextField
            color="error"
            required
            id="outlined-required"
            label="Product Description"
            defaultValue=""
            onChange={updateProductDesc}
          />
          <TextField
            color="error"
            required
            id="outlined-required"
            label="Brand"
            defaultValue=""
            onChange={updateBrand}
          />
          <TextField
            color="error"
            required
            id="outlined-required"
            label="Price"
            defaultValue=""
            onChange={updatePrice}
          />
          <div className="bottomForm">
            <label htmlFor="contained-button-file" id="imageLabel">
              <Input id="contained-button-file" type="file" onChange={(event) => {
                // @ts-ignore: Object is possibly 'null'.
                setSelectedImage((event.target as HTMLInputElement).files[0]!)
              }} />
              <Button variant="contained" component="span" className="uploadImage">
                Upload Image
              </Button>
            </label>
            {/* <input id="image" onChange={(event) => {
            // @ts-ignore: Object is possibly 'null'.
            setSelectedImage((event.target as HTMLInputElement).files[0]!)
          }} type="file"></input> */}
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel color="error" id="demo-simple-select-helper-label">Category</InputLabel>
              <Select
                color="error"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={category}
                label="Category"
                onChange={event => setCategory(event.target.value as string)}            >
                <MenuItem value="ELECTRONICS">ELECTRONICS</MenuItem>
                <MenuItem value="CLOTHING">CLOTHING</MenuItem>
                <MenuItem value="BOOKS">BOOKS</MenuItem>
                <MenuItem value="MOVIES">MOVIES</MenuItem>
                <MenuItem value="GAMES">GAMES</MenuItem>
                <MenuItem value="TOYS">TOYS</MenuItem>
                <MenuItem value="HOME">HOME</MenuItem>
                <MenuItem value="SPORTS">SPORTS</MenuItem>
                <MenuItem value="AUTOMOTIVE">AUTOMOTIVE</MenuItem>
                <MenuItem value="TOOLS">TOOLS</MenuItem>
                <MenuItem value="HEALTH">HEALTH</MenuItem>
                <MenuItem value="BEAUTY">BEAUTY</MenuItem>
                <MenuItem value="GARDEN">GARDEN</MenuItem>
                <MenuItem value="OUTDOORS">OUTDOORS</MenuItem>
                <MenuItem value="PETS">PETS</MenuItem>
                <MenuItem value="KIDS">KIDS</MenuItem>
                <MenuItem value="FOOD">FOOD</MenuItem>
                <MenuItem value="FASHION">FASHION</MenuItem>
                <MenuItem value="GROCERY">GROCERY</MenuItem>
                <MenuItem value="MISC">MISC</MenuItem>

              </Select>
            </FormControl>
            <Button variant="contained" color="error" component="span" onClick={addProduct}>Add Product</Button>
          </div>{message && <p>{message}</p>}{" "}

        </Box>
        <div>
          <h3>Orders</h3>
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            <h1>No Orders :(</h1>

          </Grid>
        </div>
        <div>
          <h3>Purchase History</h3>
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            {orders.length <= 0 && <h1>No Purchases</h1>}

            {orders.length > 0 && orders.map((order: Order) => (
              <OrderCard order={order} key={order.id} />
            ))}

          </Grid>
        </div>

        <div>
          <h3>Your Products</h3>
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            {products.length <= 0 && <h1>No Products, create a Product!</h1>}
            {products.length > 0 && products.map((product: Product) => (
              <SellerProductCard product={product} key={product.id} />
            ))}

          </Grid>
        </div>
      </Container>
    )
  } else if (props.currentUser.role === "BUYER") {
    return (
      <Container>
        <h1>Dashboard</h1>
        <h3>Purchase History</h3>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          {orders.map((order: Order) => (
            <OrderCard order={order} key={order.id} />
          ))}
        </Grid>
      </Container>
    )
  } else {
    return null;
  }
}

export default Dashboard;
