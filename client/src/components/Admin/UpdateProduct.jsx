import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetail,
} from "../../store/products/getProducts";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./Sidebar";
import { useNavigate, useParams } from "react-router";
import { adminProductActions } from "../../store/products/adminProductSlice";
import { professional } from "../../../data/professional";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();
  const navigateTo = useNavigate();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.adminProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [professionalPrice, setProfessionalPrice] = useState([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const productId = params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      getProductDetail(dispatch, productId);
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setProfessionalPrice(product.professionalPrice)
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
      console.log(professionalPrice)
    }
    if (error) {
      alert.error(error);
      clearErrors(dispatch);
    }

    if (updateError) {
      alert.error(updateError);
      clearErrors(dispatch);
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigateTo("/admin/products");
      dispatch(adminProductActions.updateProductReset());
    }
  }, [
    dispatch,
    alert,
    error,
    isUpdated,
    productId,
    product,
    updateError,
    navigateTo,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("professionalPrice", JSON.stringify(professionalPrice));
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    updateProduct(dispatch, productId, myForm);
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update</h1>

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
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>


            {professionalPrice &&
              professionalPrice.map((i, index) => {
                return(
                  <div key={index}>
                  <AttachMoneyIcon />
                  <input
                    type="number"
                    placeholder={`${professional[index].name} price`}
                    required
                    min={0}
                    value={i.price}
                    onChange={(e) =>
                      setProfessionalPrice((prev) => {
                        console.log(prev)
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
                 )
              })}




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
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
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
              Confirm
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
