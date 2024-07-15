import { Box } from "@mui/material";
import "./Search.css";
import { useState} from "react";
import { useNavigate} from "react-router-dom";

function Search() {
  
  const [keyword, setKeyword] = useState("");
  const navigateTo = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
        navigateTo(`/products/${keyword}`);
    } else {
        navigateTo("/products");
    }
  };

  return (
    <Box className="search-holder" sx={{
      border:"2px solid black",
      width:"100%",
      display:"flex",
      alignItems:"center",
      justifyContent:"center"

    }}>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Box>
  );
}

export default Search;
