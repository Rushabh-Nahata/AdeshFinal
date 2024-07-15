import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Rating,
  emphasize,
} from "@mui/material";
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail, newReview } from "../../store/products/getProducts";
import { useParams } from "react-router";
import ReviewCard from "./ReviewCard/ReviewCard";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { addItemsToCart } from "../../store/carts/cartActions";
import { productReviewActions } from "../../store/products/productReviewSlice";
import { professional } from "../../../data/professional";

// import store from "../../store/store";

function ProductDetails() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();
  // eslint-disable-next-line no-unused-vars

  // console.log(store.getState().carts.cartItems)
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [activePro, setActivePro] = useState("");
  const [activeProPrice, setActiveProPrice] = useState();
  const [activeProData, setActiveProData] = useState();

  console.log("thisis product", product);
  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  // Use useEffect to react to changes in productDetails
  useEffect(() => {
    if (product && product.professionalPrice && product.professionalPrice.length > 0) {
      setActivePro(product.professionalPrice[0].id);
    }
  }, [product]);

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    addItemsToCart(dispatch, params.id, quantity, activeProPrice, activeProData);
    alert.success("Item Added To Cart");
  };

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    value: product.ratings,
    size: "large",
    readOnly: true,
    precision: 0.5,
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", params.id);

    newReview(dispatch, myForm);

    setOpen(false);
  };


  useEffect(() => {
    product?.professionalPrice?.forEach(element => {
      if (element.id === activePro) {
        setActiveProPrice(element.price)
      }
    });
  }, [activePro])
  useEffect(() => {
    professional?.forEach(element => {
      if (element.id === activePro) {
        setActiveProData({
          name: element.name,
          email: element.email
        })
      }
    });
  }, [activePro])




  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    if (reviewError) {
      return alert.error(reviewError);
    }

    if (success) {
      alert.success("Review submitted successfully !");

      dispatch(productReviewActions.newReviewReset());
    }
    getProductDetail(dispatch, params.id);
  }, [dispatch, params.id, error, alert, quantity, reviewError, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            // border: "2px solid red",
            width: "100%",
            height: { xs: "140vh", sm: "91vh" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "5vh",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box
            className="product-detail-image-container"
            sx={{
              // border: "2px solid black",
              height: { xs: "25%", sm: "90%" },
              width: { xs: "75%", sm: "40%" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Carousel
              sx={{
                width: { xs: "45%", sm: "63%" },
                // height: "80vh",
                // border: "2px solid black",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={item.url}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>
          </Box>

          <Box
            className="product-detail-info-container"
            sx={{
              // border: "2px solid black",
              width: { xs: "90%", sm: "65%" },
              height: "70%",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "flex-start",
            }}
          >
            <Box
              className="product-info-section-one"
              sx={{
                // border: "2px solid black",
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                height: { xs: "70%", sm: "100%" },
                width: { xs: "100%", sm: "50%" },
                justifyContent: "space-evenly",
              }}
            >
              <Box
                className="product-header-container"
                sx={
                  {
                    // border: "2px solid black",
                  }
                }
              >
                <h2>{product.name}</h2>
              </Box>
              <Box
                className="product-description-container"
                sx={{
                  // border: "2px solid black",
                  fontSize: "1.95vh",
                  fontWeight: "600",
                  color: "#303030bd",
                }}
              >
                <p>{product.description}</p>
              </Box>
              {/* <Divider orientation="horizontal" flexItem />
              <Box
                className="product-ratings-container"
                sx={{
                  // border: "2px solid black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.7vh",
                  fontWeight: "500",
                  color: "#303030bd",
                }}
              >
                <Rating {...options} /> <p> ({product.numOfReviews} Reviews)</p>
              </Box> */}

              <Divider orientation="horizontal" flexItem />

              <Box
                className="product-price-container"
                sx={{
                  // border: "2px solid black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {product.professionalPrice.map((i, indx) => (
                  <>{i.id === activePro ? <h2 key={indx}>Rs. {i.price}</h2> : null}</>
                ))}
              </Box>
              <Divider orientation="horizontal" flexItem />

              <div className="detailsBlock-3-1">
                <div className="professionalDiv">
                  {professional &&
                    professional.map((i, index) => {
                      if (i.category === product.category) {
                        return (
                          <img
                            key={index}
                            src={i.avatar}
                            className="professionalImg"
                            alt=""
                            onClick={() => setActivePro(i.id)}
                          />
                        )
                      }
                    })}
                </div>
                {/* count to add to cart */}
                {/* <div className="detailsBlock-3-1-1">
                  <button
                    onClick={() => {
                      decreaseQuantity();
                    }}
                  >
                    -
                  </button>
                  <input
                    readOnly
                    type="number"
                    value={quantity}
                    placeholder={quantity}
                  />
                  <button
                    onClick={() => {
                      increaseQuantity();
                    }}
                  >
                    +
                  </button>
                </div> */}
                <button
                  disabled={product.Stock < 1 ? true : false}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </div>
              <Divider orientation="horizontal" flexItem />

              <Box
                sx={{
                  // border: "2px solid black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.8vh",
                  color: "#303030bd",
                  fontWeight: "500",
                }}
              >
                <p>
                  Status : {product.Stock === 0 ? "Out of Stock" : "In Stock"}
                </p>
              </Box>
              <Divider orientation="horizontal" flexItem />

              <Box
                className="product-warranty-container"
                sx={{
                  // border: "2px solid black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.8vh",
                  color: "#303030bd",
                  fontWeight: "500",
                }}
              >
                <p>
                  <span>Note : </span>We assure the authenticity and quality of
                  our products
                </p>
              </Box>
            </Box>
            <Divider orientation="vertical" flexItem />

            <Box className="proDescription">
              <Box sx={{
                // border: "2px solid black",
                margin: "20px 10px",
              }}>
                <div className="proDescriptionDiv">
                  <h2>Description:</h2>
                  {
                    product.professionalDesc.map((i, index) => (
                      <>
                        <>{i.id === activePro ? <p> {i.description}</p> : null}</>
                      </>
                    ))
                  }
                </div>
              </Box>
              <Box
                className="reviews-container"
                sx={{
                  // border: "2px solid black",
                  height: { xs: "50%", sm: "100%" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: { xs: "100%", sm: "%" },
                }}
              >
                <Box
                  sx={{
                    // border: "2px solid black",
                    height: "95%",
                    width: "90%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    className="reviews-header-container"
                    sx={{
                      // border: "2px solid black",
                      fontWeight: "600",
                      color: "#303030bd",
                      fontSize: "2vh",
                      width: "100%",
                      marginBottom: "2vh",
                    }}
                  >
                    Reviews
                    <button
                      onClick={submitReviewToggle}
                      className="submitReview"
                    >
                      Submit Review
                    </button>
                  </Box>

                  <Box
                    className="review-holder"
                    sx={{
                      // border: "2px solid black",
                      width: "100%",
                      height: "100%",
                      overflowY: "scroll",
                    }}
                  >
                    <Dialog
                      aria-labelledby="simple-dialog-title"
                      open={open}
                      onClose={submitReviewToggle}
                    >
                      <DialogTitle>Submit Review</DialogTitle>
                      <DialogContent className="submitDialog">
                        <Rating
                          onChange={(e) => setRating(e.target.value)}
                          value={rating}
                          size="large"
                        />

                        <textarea
                          className="submitDialogTextArea"
                          cols="30"
                          rows="5"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={submitReviewToggle} color="secondary">
                          Cancel
                        </Button>
                        <Button onClick={reviewSubmitHandler} color="primary">
                          Submit
                        </Button>
                      </DialogActions>
                    </Dialog>
                    {product.reviews && product.reviews[0] ? (
                      <Box>
                        {product.reviews &&
                          product.reviews.map((review) => (
                            <ReviewCard key={review._id} review={review} />
                          ))}
                      </Box>
                    ) : (
                      "No reviews yet !"
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default ProductDetails;
