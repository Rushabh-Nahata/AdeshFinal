import { useEffect } from "react";
// import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
} from "../../store/products/getProducts";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { adminProductActions } from "../../store/products/adminProductSlice";
import { Box } from "@mui/material";

const ProductList = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.adminProduct
  );

  const deleteProductHandler = (id) => {
    deleteProduct(dispatch, id);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      clearErrors(dispatch);
    }

    if (deleteError) {
      alert.error(deleteError);
      clearErrors(dispatch);
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      navigateTo("/admin/dashboard");

      dispatch(adminProductActions.deleteProductReset());
    }

    getAdminProduct(dispatch);
  }, [dispatch, alert, navigateTo, error, deleteError, isDeleted]);

  return (
    <>
      <div className="dashboard">
        <SideBar />
        {/* <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div> */}

        <Box sx={{ width: "100%", minHeight: "91vh", marginTop: "9vh" }}>
          <table className="table orderlist-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.Stock}</td>
                  <td>
                    {"Rs. "}
                    {item.price}
                  </td>
                  <td>
                    <Link to={`/admin/product/${item._id}`}>
                      <EditIcon
                        sx={{
                          color: " rgba(0, 0, 0, 0.527)",
                          transition: "all 0.5s",
                          ":hover": {
                            color: "black",
                          },
                        }}
                      />
                    </Link>
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        deleteProductHandler(item._id);
                      }}
                    >
                      <DeleteIcon
                        sx={{
                          color: " rgba(0, 0, 0, 0.527) !important",
                          transition: "all 0.5s",
                          ":hover": {
                            color: "black",
                          },
                        }}
                      />
                    </Button>
                  </td>
                  <td>
                    <Link to={`/order/${item._id}`}>
                      {/* <LaunchIcon /> */}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </div>
    </>
  );
};

export default ProductList;
