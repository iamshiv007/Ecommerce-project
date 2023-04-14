import React, { Fragment, useState, useEffect } from "react";
import { Loader } from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { MetaData } from "../layout/MetaData";
import {
  AccountTree,
  AttachMoney,
  Description,
  Spellcheck,
  Storage,
} from "@mui/icons-material";
import { useAlert } from "react-alert";
import { clearErrors, createProduct } from "../../actions/productAction";
import { Button } from "@material-ui/core";
import { Sidebar } from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import './NewProduct.css'
import { useHistory } from "react-router-dom";

export const NewProduct = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully")
      history.push('/')
      dispatch({ type: NEW_PRODUCT_RESET })
    }
  }, [dispatch, error, alert, history, success])

  const createProductSubmitHandler = (e) => {
    e.preventDefault()

    const myForm = new FormData()

    myForm.set("name", name)
    myForm.set("price", price)
    myForm.set("description", description)
    myForm.set("category", category)
    myForm.set('stock', stock)

    images.forEach((image) => {
      myForm.append("images", image)
    })
    dispatch(createProduct(myForm))
  }

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files)

    files.forEach((file) => {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result])
          setImagesPreview((old) => [...old, reader.result])
        }
      }

      reader.readAsDataURL(file)
    })
  }

  return (

    <Fragment>
      {
        loading ?
          <Loader />
          :
          <Fragment>
            <MetaData title="Create Product" />
            <div className="dashboard">
              <Sidebar />
              <div className="newProductContainer">
                <form
                  encType="multipart/form-data"
                  className="createProductForm"
                  onSubmit={createProductSubmitHandler}
                >
                  <h1>Create Product</h1>

                  <div>
                    <Spellcheck />
                    <input
                      placeholder="Product Name"
                      required
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      value={name}
                    />
                  </div>

                  <div>
                    <AttachMoney />
                    <input
                      type="number"
                      placeholder="Price"
                      required
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div>
                    <Description />
                    <textarea
                      placeholder="Product Description"
                      required
                      value={description}
                      cols="30"
                      rows="1"
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>

                  <div>
                    <AccountTree />
                    <select onChange={(e) => setCategory(e.target.value)}>
                      <option value="">Select Category</option>
                      {categories.map((cate) => (
                        <option key={cate} value={cate}>
                          {cate}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Storage />
                    <input
                      type="number"
                      required
                      placeholder="Stock"
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>

                  <div id="createProductFormFile">
                    <input
                      type="file"
                      accept="images/*"
                      onChange={createProductImagesChange}
                      multiple
                      name="Avatar"
                    />
                  </div>

                  <div id="createProductFormImage">
                    {imagesPreview.map((image, index) => (
                      <img key={index} src={image} alt="Product Preview" />
                    ))}
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={loading ? true : false}
                  >
                    Create
                  </Button>
                </form>
              </div>
            </div>
          </Fragment>
      }
    </Fragment>
  );
};
