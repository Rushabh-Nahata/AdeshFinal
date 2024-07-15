import { useEffect } from "react";
// import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";

import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../store/orders/orderAction";
import { adminOrderActions } from "../../store/orders/orderAdmin/adminOrderSlice";
import { Box } from "@mui/material";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.allOrders);


  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.adminOrder
  );

  const reversedData = orders.slice().reverse();

  const deleteOrderHandler = (id) => {
    deleteOrder(dispatch, id);
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
      alert.success("Order Deleted Successfully");
      navigateTo("/admin/orders");
      dispatch(adminOrderActions.deleteOrderReset());
    }

    getAllOrders(dispatch);
  }, [dispatch, alert, error, deleteError, isDeleted, navigateTo]);



  return (
    <>
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

          <Box sx={{ width: "100%", minHeight: "91vh", marginTop: "9vh" }}>
            <table className="table orderlist-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Paid At</th>
                  <th>Phone number</th>
                  <th>Professional Name</th>
                  <th>Professional Email</th>
                  <th>Items Qty</th>
                  <th>Amount</th>
                  <th>Actions</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {reversedData.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.paidAt}</td>
                    <td>{item.shippingInfo.phoneNo}</td>
                    <td>
                      {
                        item.orderItems.map((i, idx) => (
                          <div>
                            {i.proName}
                          </div>
                        ))
                      }

                    </td>
                    <td>
                      {
                        item.orderItems.map((i, idx) => (
                          <div>
                            {i.proEmail}
                          </div>
                        ))
                      }

                    </td>
                    <td>{item.orderItems.length}</td>
                    <td>
                      {" "}
                      {"Rs. "}
                      {item.totalPrice}
                    </td>
                    <td>
                      <Link to={`/admin/order/${item._id}`}>
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
                      <Button onClick={() => deleteOrderHandler(item._id)}>
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
                      <Link to={`/order/${item._id}`}></Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </div>


      </div>
    </>
  );
};

export default OrderList;
