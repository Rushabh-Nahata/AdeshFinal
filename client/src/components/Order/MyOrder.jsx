import { useEffect } from "react";
import "./MyOrder.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../store/orders/orderAction";
import Loader from "../../components/layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import LaunchIcon from "@mui/icons-material/Launch";
import { Box } from "@mui/material";

const MyOrder = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    if (error) {
      alert.error(error);
      clearErrors(dispatch);
    }

    myOrders(dispatch);
  }, [dispatch, alert, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "91vh",
            marginTop: { xs: "7vh", sm: "7vh", md: "25vh" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // border: "2px solid black", 
          }}
        >
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Status</th>
                <th>Professional Name</th>
                <th>Professional Email</th>
                <th>Items Qty</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.orderStatus}</td>
                  <td>
                    {
                      order.orderItems.map((i, idx) => (
                        <div>
                          {i.proName}
                        </div>
                      ))
                    }

                  </td>
                  <td>
                    {
                      order.orderItems.map((i, idx) => (
                        <div>
                          {i.proEmail}
                        </div>
                      ))
                    }

                  </td>
                  <td>{order.orderItems.length}</td>
                  <td>
                    {"Rs. "}
                    {order.totalPrice}
                  </td>
                  <td>
                    {/* Add your action buttons or components here */}

                    <Link to={`/order/${order._id}`}>
                      <LaunchIcon sx={{ color: "black" }} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      )}
    </>
  );
};

export default MyOrder;
