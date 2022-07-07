import { Box, Button, ButtonGroup, Card, CardMedia, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { SyntheticEvent, useState, useEffect } from "react";
import { Product } from "../../models/Product";
import "../../css/dashboard.css"

type Props = {
  product: Product;
};

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue(value => value + 1);
}

const SellerProductCard = ({ product }: Props) => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState<File>();
  const [productImage, setProductImage] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const forceUpdate = useForceUpdate();

  console.log(productName);
  useEffect(() => {
    setProductName(product.productName);
    setProductDescription(product.productDescription);
    setProductImage(product.productImage);
    setBrand(product.brand);
    setPrice(product.price);
    setCategory(product.category);
  }, []);

  let updateName = (e: SyntheticEvent) => {
    setProductName((e.target as HTMLInputElement).value);
  };

  let updateDescription = (e: SyntheticEvent) => {
    setProductDescription((e.target as HTMLInputElement).value);
  };

  let updateBrand = (e: SyntheticEvent) => {
    setBrand((e.target as HTMLInputElement).value);
  };

  let updatePrice = (e: SyntheticEvent) => {
    let price = ((e.target as HTMLInputElement).value);
    setPrice(Number(price));
  };

  let updateImage = (e: SyntheticEvent) => {
    // setProductImage((e.target as HTMLInputElement).value);
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

  let updateProduct = async (e: SyntheticEvent) => {

    await uploadImage(e);

    if (isNaN(price)) {
      setMessage("Price must be a number");
    } else if (price < 0) {
      setMessage("Price must be greater than 0.")
    } else {
      fetch(`http://Ecommerce-env.eba-hz3mknpp.us-east-1.elasticbeanstalk.com/ecommerce/products`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: product.id,
          brand: brand,
          productName: productName,
          productDescription: productDescription,
          productImage: productImage,
          price: price,
          category: category
        }),
      }).then((resp) => {
        setShow(false);
        return resp.json();
      });

      setMessage('Updating product...')
      setTimeout(() => setMessage("Product Created!"), 2000);
      forceUpdate();
    }
  }

  let deactivateProduct = () => {
    fetch(`http://Ecommerce-env.eba-hz3mknpp.us-east-1.elasticbeanstalk.com/ecommerce/products/delete/?id=${product.id}`, {
      method: "DELETE",
    }).then((resp) => {
      setShow(false);
      return resp.json();
    });
  }

  let activateProduct = () => {
    fetch(`http://Ecommerce-env.eba-hz3mknpp.us-east-1.elasticbeanstalk.com/ecommerce/products/activation/?id=${product.id}`, {
      method: "PATCH",
    }).then((resp) => {
      setShow(false);
      return resp.json();
    });
  }

  return (
    <Grid item key={product.id} className="gridItem">
      <Card className="product flex">
        <div>
          <div>
            <CardMedia component="img" image={product.productImage} />
            <h4>{product.productName}</h4>
            <h6>{product.category}</h6>
            <h3>${product.price} USD</h3>
            <h2>Product Status: {product.active ? "Active" : "Inactive"}</h2>
          </div>
          <ButtonGroup>
            <Button onClick={() => setShow(true)} variant="contained" color="error">Update</Button>
            {product.active == true ? <Button onClick={() => deactivateProduct()} variant="contained" color="error">Deactivate</Button>
              : < Button onClick={() => activateProduct()} variant="contained" color="error">Activate</Button>}
          </ButtonGroup>
        </div>


        <div style={{ display: show ? "block" : "none" }}>
          <Box>
            <h1>Update Product</h1>
            <FormControl sx={{ m: 1, minWidth: 120 }}>

              <TextField
                color="error"
                id="outlined-required"
                label="Product Name"
                defaultValue={productName}
                onChange={updateName}
              />
              <TextField
                color="error"
                id="outlined-required"
                label="Product Decription"
                defaultValue={productDescription}
                onChange={updateDescription}
              />
              <TextField
                color="error"
                id="outlined-required"
                label="Brand"
                defaultValue={brand}
                onChange={updateBrand}
              />
              <TextField
                color="error"
                id="outlined-required"
                label="Price"
                defaultValue={price}
                onChange={updatePrice}
              />
              <Select
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
              <label htmlFor="image">Image URL</label>
              <input id="image" onChange={(event) => {
                // @ts-ignore: Object is possibly 'null'.
                setSelectedImage((event.target as HTMLInputElement).files[0]!)
              }} type="file"></input>

            </FormControl>
            <ButtonGroup>
              <Button onClick={updateProduct} variant="contained" color="error">Update</Button>
              <Button onClick={() => setShow(false)} variant="contained" color="error">Cancel</Button>
            </ButtonGroup>
          </Box>
        </div>
      </Card>
    </Grid>
  );
};

export default SellerProductCard;