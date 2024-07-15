import React, { useState } from 'react'
import { Box, Divider, Slider, Typography } from "@mui/material";
// import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../store/products/getProducts";
// import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useParams } from "react-router";
import Pagination from "react-js-pagination";
// import Profile from "../../../public/Profile.png"
import "./service.css";

const ServicesDisplay = ({ categories }) => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const params = useParams();

    const [flag, setFlag] = useState(false)


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
        <div>

            {!flag ? <div className="services-container">
                {categories.map((category) => (
                    <div className="services-box" key={category.name}
                        onClick={() => {
                            setCategory(category.name);
                            setFlag(true);
                        }
                        }>
                        <div className="services-image">
                            <img src={category.src} alt={category.name} />
                        </div>
                        <div className="services-image-name">
                            <p>{category.name}</p>
                        </div>
                    </div>
                ))}
            </div> :

                <Box className="back-button-down"
                    sx={{
                        // border: "6px solid red",
                        // width: "100%",
                        // minHeight: "70vh",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                    <Box
                        className="home-products-holder-container"
                        sx={{
                            // border: "6px solid red",
                            width: "100%",
                            minHeight: "50vh",
                            display: "flex",
                            // flexDirection: "column",
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
                    <Box className="home-products-back-button-align">

                        <button onClick={() => { setFlag(false) }} className="button-27" role="button">
                            <span className="text">Back</span>
                        </button>

                    </Box>
                </Box>


            }

            {/* <>
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

            </> */}

        </div >
    )
}

export default ServicesDisplay