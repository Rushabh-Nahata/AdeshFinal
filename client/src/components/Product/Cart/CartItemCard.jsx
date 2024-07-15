/* eslint-disable react/prop-types */
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {

  const styles = {
    container: {
      color: 'red',
      padding: '2px',
    },
  };

  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <div className="cart-product-remove" style={styles.container}>
          <p onClick={() => deleteCartItems(item.product)}>Remove product</p>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
