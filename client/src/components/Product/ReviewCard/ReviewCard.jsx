/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import "./ReviewCard.css";
import profilePng from "../../images/bg2-min.jpg";

import { Rating } from "@mui/material";

function ReviewCard({ review }) {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          //    border: "2px solid red",
          alignItems: "center",
          justifyContent: "flex-start",
          marginTop: "2vh",
          marginBottom: "1vh",
        }}
      >
        <Box
          className="review-user-image-holder"
          sx={{
            display: "flex",
            // border: "2px solid   black",
            width: "6vh",
            height: "6vh",
            borderRadius: "50px",
            marginRight: "1vw",
          }}
        >
          <img src={profilePng} alt="User" />
        </Box>

        <Box
          className="review-content-holder"
          sx={{
            display: "flex",
            // border: "2px solid black",
            width: "65%",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <p>{review.name}</p>
          <Rating {...options} />
          <span>{review.comment}</span>
        </Box>
      </Box>
    </>
  );
}

export default ReviewCard;
