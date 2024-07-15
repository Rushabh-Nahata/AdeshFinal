import { useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../store/products/getProducts";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";

import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { professional } from "../../../data/professional";

import SideBar from "./Sidebar";
import { useNavigate } from "react-router";
import { newProductActions } from "../../store/products/newProductSlice";

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const alert = useAlert();

  console.log("this is professional", professional);
  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [professionalPrice, setProfessionalPrice] = useState([]);
  const [professionalDesc, setProfessionalDesc] = useState([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Professional Services",
    "Home Services/Appliances",
    "Gift/Hampers",
    "Make Website"
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      clearErrors(dispatch);
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigateTo("/admin/dashboard");
      dispatch(newProductActions.newProductReset());
    }
  }, [dispatch, alert, error, success, navigateTo]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("professionalPrice", JSON.stringify(professionalPrice));
    myForm.set("professionalDesc", JSON.stringify(professionalDesc));
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    createProduct(dispatch, myForm);
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Product Price"
                required
                value={price}
                min={0}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            



            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>



            {professional &&
              professional.map((i, index) => {
                if(i.category === category){
                  return(
                    <>
                    <div key={index}>
                      <AttachMoneyIcon />
                      <input
                        type="number"
                        placeholder={`${i.name} price`}
                        required
                        min={0}
                        onChange={(e) =>
                          setProfessionalPrice((prev) => {
                            console.log(prev);
                            // Find the index of the item with the matching id
                            const itemIndex = prev.findIndex(
                              (item) => item.id === i.id
                            );
  
                            // Update the price if the item exists, otherwise add a new item
                            if (itemIndex !== -1) {
                              // Update the price at the found index
                              const updatedPrices = [...prev];
                              updatedPrices[itemIndex] = {
                                ...updatedPrices[itemIndex],
                                price: e.target.value,
                              };
                              return updatedPrices;
                            } else {
                              // Add a new item if the item does not exist
                              return [
                                ...prev,
                                {
                                  id: i.id,
                                  price: e.target.value,
                                },
                              ];
                            }
                          })
                        }
                      />
                    </div>

                    
                    <div>
                      <DescriptionIcon />
  
                      <textarea
                        placeholder="Professional Description"
                        onChange={(e) =>
                          setProfessionalDesc((prev) => {
                            console.log(prev);
                            // Find the index of the item with the matching id
                            const itemIndex = prev.findIndex(
                              (item) => item.id === i.id
                            );
  
                            // Update the price if the item exists, otherwise add a new item
                            if (itemIndex !== -1) {
                              // Update the price at the found index
                              const updatedDesc = [...prev];
                              updatedDesc[itemIndex] = {
                                ...updatedDesc[itemIndex],
                                description: e.target.value,
                              };
                              return updatedDesc;
                            } else {
                              // Add a new item if the item does not exist
                              return [
                                ...prev,
                                {
                                  id: i.id,
                                  description: e.target.value,
                                },
                              ];
                            }
                          })
                        }
                        cols="30"
                        rows="1"
                      ></textarea>
                    </div>
                  </>
                  )
                }
              })}




            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            {loading ? (
              <Button id="createProductBtn">Creating ...</Button>
            ) : (
              <Button
                id="createProductBtn"
                type="submit"
                disabled={loading ? true : false}
              >
                Create
              </Button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
