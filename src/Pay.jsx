import { useState, useEffect } from "react";

import StripeCheckout from "react-stripe-checkout";

const axios = require("axios");

const KEY =
  "pk_test_51JrMq0CdM1Odk0RJfHsJPW4taGQUROuQ6g9u3fCch9QU8eHNfuSrh0mGh89PF5g3IO3SPaJBsV2qzHo5Yo6An1qo00zicCUq2p";

const Pay = () => {
  //
  //
  const [stripeToken, setStripeToken] = useState(null);
  // set to (null) because we dont have a token in the beginning
  //
  //
  const onToken = (token) => {
    // console.log(token);

    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:9000/api/checkout/payment",

          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        );

        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    stripeToken && makeRequest();
    //
  }, [stripeToken]);

  //
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 
      
              STRIPE BUTTON 
      
       amount={1000} the 2 last ceros are cents

         token={this.onToken}
         this above is linked to the function we 
         are going to create
      */}

      <StripeCheckout
        name="NOVE shop"
        image="https://avatars.githubusercontent.com/u/1486366?v=4"
        shippingAddress
        billingAddress
        description="Your total is 20 euros"
        //allowRememberMe={false}
        data-allow-remember-me="false"
        amount={2000}
        token={onToken}
        stripeKey={KEY}
      >
        <button
          style={{
            border: "none",
            width: "120",
            borderRadius: "5",
            padding: "20px",
            backgroundColor: "black",
            color: "white",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          PAY NOW
        </button>
      </StripeCheckout>
    </div>
  );
};

export default Pay;
