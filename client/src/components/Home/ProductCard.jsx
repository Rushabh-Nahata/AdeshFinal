/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

function ProductCard({ product }) {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
    size: "small",
  };
  return (
    <Link className="product-card" to={`/product/${product._id}`}>
      <Box
        sx={{
          border: "2px solid #e7e3e3",
          width: { xs: "40vw", sm: "27vw", md: "40vh" },
          // height: { xs: "40vh" },
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "flex-start",
          flexDirection: "column",
          height: { xs: "34vh", sm: "54vh", md: "55vh" },
          marginRight: "1vw",
          marginLeft: "1vw",
          marginBottom: "2vh",
          borderRadius: "1px",
          transition: "top ease 8s",
          position: "relative",
          ":hover": {
            top: "-10px",
          },
        }}
      >
        <Box
          className="product-card-image-holder"
          sx={{
            // border: "2px solid black",
            width: "100%",
            height: "70%",
            overflow: "hidden",
            marginBottom: "0.6vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid #e7e3e3",
            paddingBottom: "1vh",
          }}
        >
          <img
            src={product.images[0].url}
            alt={product.name}
            style={{ width: "80%", height: "100%", objectFit: "contain" }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            height: "30%",
            // border: "2px solid red",
            justifyContent: "space-evenly",
          }}
        >
          <Box
            sx={{
              // border: "2px solid black",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              color: "black",
              fontWeight: "700",
              fontSize: { xs: "0.6rem", sm: "1.1rem" },
            }}
          >
            <p>{product.name}</p>
          </Box>
          <Box
            sx={{
              // border: "2px solid black",
              width: "95%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              color: "black",
              fontSize: { xs: "0.6rem", sm: "0.8rem" },
              fontWeight: "500",
            }}
          >
            <Rating {...options} />
            <span>({product.numOfReviews})</span>
          </Box>

          <Box
            sx={{
              // border: "2px solid black",
              fontWeight: "500",
              color: "black",
              fontSize: { xs: "0.7rem", sm: "1rem" },
            }}
          >
            <span>Rs {product.price}</span>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}

export default ProductCard;
