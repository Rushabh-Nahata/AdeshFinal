import { Box, Divider, Slider, Typography, styled } from "@mui/material";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../../store/products/getProducts";
import Loader from "../../layout/Loader/Loader";
import ProductCard from "../../Home/ProductCard";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useParams } from "react-router";
import Pagination from "react-js-pagination";

const categories = [
  "Professional Services",
  "Home Services/Appliances",
  "Gift/Hampers",
  "Make Website"
];

const CustomSlider = styled(Slider)`
  width: 90%;
  margin-left: 5px;
  
  .MuiSlider-rail {
    background-color: #ccc;
    height: 4px;
    border-radius: 2px;
  }
  
  .MuiSlider-track {
    background-color: #2196f3;
    height: 4px;
    border-radius: 2px;
  }
  
  .MuiSlider-thumb {
    width: 16px;
    height: 16px;
    margin-top: -6px;
    margin-left: -8px;
    background-color: #2196f3;
    border: 2px solid #fff;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease-in-out;
    
    &:hover {
      background-color: #0d47a1;
    }
  }
`;

function Products() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 85000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const { loading, error, products, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const keyword = params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    getProduct(dispatch, keyword, currentPage, price, category, ratings);
  }, [dispatch, error, alert, keyword, currentPage, price, category, ratings]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box
            sx={{
              width: "100%",
              minHeight: "91vh",
              // border: "2px solid black",
              display: "flex",
              alignItems: { xs: "center", sm: "flex-start" },
              justifyContent: "center",
              marginTop: "9vh",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Box
              className="product-filter-container"
              sx={{
                // border: "2px solid black",
                minHeight: { xs: "30vh", sm: "100vh" },
                width: { xs: "90%", sm: "12%" },
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              <Box
                className="price-filter-container"
                sx={{
                  // border: "1px solid black",
                  width: "90%",
                  marginTop: "1.5vh",
                }}
              >

                <Divider orientation="horizontal" />
              </Box>

              <Box
                className="category-filter-container"
                sx={{
                  // border: "1px solid black",
                  width: "90%",
                  marginTop: "1.5vh",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "0.9rem",
                    marginBottom: "0.5vh",
                  }}
                >
                  Categories
                </Typography>

                <ul className="categoryBox">
                  {categories.map((category) => (
                    <li
                      className="category-link"
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>

                <Divider orientation="horizontal" />
              </Box>
              <Box
                className="category-filter-container"
                sx={{
                  // border: "1px solid black",
                  width: "90%",
                  marginTop: "1.5vh",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "0.9rem",
                    marginBottom: "0.5vh",
                  }}
                >
                  Ratings above
                </Typography>

                <CustomSlider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                  size="small"
                  sx={{
                    color: "rgb(48 48 48)",
                    width: "90%",
                    marginLeft: "5px",
                  }}
                />

                <Divider orientation="horizontal" />
              </Box>
            </Box>
            <Box
              sx={{
                // border: "2px solid black",
                width: "87%",
                minHeight: "88vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  // border: "2px solid red",
                  width: "100%",
                  height: "2vh",
                  display: "flex",
                  alignItems: "center",
                }}
              >
              </Box>

              <Box
                className="home-products-holder-container"
                sx={{
                  // border: "2px solid red",
                  width: "100%",
                  minHeight: "70vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  flexWrap: "wrap",
                  // marginTop:"5vh"
                }}
              >
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </Box>

              {productsCount > resultPerPage ? (
                <Box
                  sx={{
                    // border: "2px solid red",
                    width: "100%",
                    minHeight: "10vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "3vh",
                  }}
                >
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText=">>"
                    prevPageText="<<"
                    firstPageText="First"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </Box>
              ) : (
                <></>
              )}
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default Products;
