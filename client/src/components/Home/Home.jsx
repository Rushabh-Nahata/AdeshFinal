import { Box, Button, Typography } from "@mui/material";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import "./Home.css";
import { getProduct } from "../../store/products/getProducts";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import bgImg from "../images/min2-min.jpg";
// import Footer from "../layout/Footer/Footer";
// import ServicesProvided from "./ServicesProvided";
import ServicesDisplay from "./ServicesDisplay";
import ProfessionalServices from "../../../src/assets/professional-services.png"
import HomeAppliances from "../../../src/assets/house-cleaning.png"
import GiftBox from "../../../src/assets/gift-box.png"
// import Easy from "../../../src/assets/easy.png"
import MakeWebsite from "../../../src/assets/documentation.png"

const categories = [
  {
    src: ProfessionalServices,
    name: 'Professional Services',
  },
  {
    src: HomeAppliances,
    name: 'Home Services/Appliances',
  },

  {
    src: GiftBox,
    name: 'Gift/Hampers',
  },
  {
    src: MakeWebsite,
    name: 'Make Website',
  },

];

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    getProduct(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, error, alert]);

  return (
    <Box>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box
            className="home-products-container"
            id="home-products"
            sx={{
              // border: "2px solid yellow",
              minHeight: "90vh",
              width: "100%",
              // display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "2vh"
            }}
          >

            <Box
              className="home-products-header-container"
              sx={{
                // border: "2px solid black",
                width: "100%",
                height: "fit-content",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                marginBottom: "1vh",
                marginTop: "2vh",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "2.1vh", sm: "2.7vh", md: "4vh", lg: "4vh" },
                  fontWeight: "600",
                  fontFamily: "Montserrat",
                }}
              >
                {/* Services Provided */}
              </Typography>
            </Box>

            <Box
              className="home-products-holder-container"
              sx={{
                // border: "5px solid blue",
                width: "100%",
                // display: "flex",
                // alignItems: "center",
                // justifyContent: "space-evenly",
                // flexWrap: "wrap",
              }}
            >
              {/* {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))} */}
              <ServicesDisplay categories={categories} />
            </Box>

          </Box>

          <Box
            className="home-footer-container"
            sx={{
              width: "100%",
              height: "2vh",
              backgroundColor: "black",
            }}
          >
            {/* <Footer /> */}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Home;
