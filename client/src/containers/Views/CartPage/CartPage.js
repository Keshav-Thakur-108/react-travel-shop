import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getCartItems,
  removeCartItem,
  onSuccessBuy,
} from "../../../store/actions/user_actions";
import UserCardBlock from "./Sections/UserCardBlock";
import axios from "axios";
import Paypal from "../../../components/Utilities/Paypal";

import { Result, Empty } from "antd";

function CartPage(props) {
  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);
  const [ShowSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    let cartItems = [];
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });
        dispatch(getCartItems(cartItems, props.user.userData.cart));
      }
    }
  }, [props.user.userData]);

  useEffect(() => {
    if (props.user.cartDetail && props.user.cartDetail.length > 0)
      calculateTotal(props.user.cartDetail);
  }, [props.user.cartDetail]);

  const calculateTotal = (cartDetail) => {
    let total = 0;
    cartDetail.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });
    setTotal(total);
    setShowTotal(true);
  };
  const removeFromCart = (productId) => {
    dispatch(removeCartItem(productId)).then((response) => {
      if (response.payload.cartDetail.length <= 0) {
        setShowTotal(false);
      } else {
        calculateTotal(response.payload.cartDetail);
      }
    });
  };

  const transactionSuccess = (data) => {
    let variables = {
      cartDetail: props.user.cartDetail,
      paymentData: data,
    };
    axios.post("/api/users/successBuy", variables).then((response) => {
      if (response.data.success) {
        setShowSuccess(true);
        setShowTotal(false);
        dispatch(
          onSuccessBuy({
            cart: response.data.cart,
            cartDetail: response.data.cartDetail,
          })
        );
      } else {
        alert("Failed to buy it");
      }
    });
  };
  const transactionError = () => {};
  const transactionCancelled = () => {
    console.log("Transaction cancelled");
  };
  return (
    <div
      style={{
        width: "85%",
        margin: "3rem auto",
      }}
    >
      <h1>My Cart</h1>
      <div>
        <UserCardBlock
          products={props.user.cartDetail}
          removeItem={removeFromCart}
        />

        {ShowTotal ? (
          <div
            style={{
              marginTop: "3rem",
            }}
          >
            <h2>Total amount: ${Total}</h2>
          </div>
        ) : ShowSuccess ? (
          <Result status="success" title="Successfully Purchased" />
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <br />
            <Empty description={false} />
            <p>No items in the cart</p>
          </div>
        )}
      </div>

      {ShowTotal && (
        <Paypal
          toPay={Total}
          onSuccess={transactionSuccess}
          transactionError={transactionError}
          transactionCancelled={transactionCancelled}
        />
      )}
    </div>
  );
}

export default CartPage;
