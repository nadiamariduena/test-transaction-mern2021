import React from "react";
import StripeCheckout from "react-stripe-checkout";

const KEY = "pk_test_very long code";

const Pay = () => {
  const onToken = (token) => {
    console.log(token);
  };

  //
  //
  //
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
        amount={1000}
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
