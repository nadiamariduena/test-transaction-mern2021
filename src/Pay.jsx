import { useState, useEffect } from "react";
import { useHistory } from "react-router";

import StripeCheckout from "react-stripe-checkout";

const axios = require("axios");

const KEY =
  // already obsolete, i killed it before making the repo PUBLIC
  "pk_test_51JrMq0CdM1Odk0RJfHsJPW4taGQUROuQ6g9u3fCch9QU8eHNfuSrh0mGh89PF5g3IO3SPaJBsV2qzHo5Yo6An1qo00zicCUq2p";

const Pay = () => {
  //
  //
  const [stripeToken, setStripeToken] = useState(null);
  // set to (null) because we dont have a token in the beginning
  //
  const history = useHistory();
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
        //
        //
        //this below is the successful operation
        console.log(res.data);
        //
        //e are adding the history under the success transaction
        // so that i will redirect the user only after the transaction
        // has been accepted
        history.push("/success");
        //
      } catch (err) {
        console.log(err);
      }
    };

    stripeToken && makeRequest();
    //
    //
  }, [stripeToken, history]);

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
If there is a STRIPE token show "Processing please wait", but if 
there is not token, show the button


REMEMBER, this {stripeToken is being returned after client payment, 
  and after this token we are sending our backend server request:

        const res = await axios.post(
          "http://localhost:9000/api/checkout/payment",

          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        );

        AND AFTER the server request, it will return us the data, like so:

         console.log(res.data);

*/}

      {stripeToken ? (
        <span>Processing. Please wait...</span>
      ) : (
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
      )}
    </div>
  );
};

export default Pay;
