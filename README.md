## STRIPE TEST

<br>
<br>

# 🍍

### This app will serve to test the transactions with stripe for the work in progress backend M E R N 2021, this is not the end application.

<br>
<br>
<br>

### Install the following

- With this we will be able to require the switch for the router

```javascript
npm i react-router-dom
```

<br>

#### Switch

- add it inside the App.js

```javascript
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
```

<br>

### Create 2 routes

- PAY
- SUCCESS

<br>

```javascript
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Pay from "./Pay";
import Success from "./Success";
//

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/pay">
          <Pay />
        </Route>
        {/*  */}
        <Route path="/success">
          <Success />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
```

<br>

#### PAY

```javascript
import React from "react";
import StripeCheckout from "react-stripe-checkout";

const Pay = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
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
    </div>
  );
};

export default Pay;
```

<br>

---

<br>

## INSTALL STRIPE

<br>

```javascript
npm install react-stripe-checkout
```

<br>

### Documentation

##### [react-stripe-checkout](https://www.npmjs.com/package/react-stripe-checkout)

<br>

#### Requirements

> **token and stripeKey** are **the only** required props, **everything else is optional** as per the stripe docs. See Checkout Docs. All props go through simple validation and are passed to stripe checkout, they're also documented in StripeCheckout.js

#### The payment

- As you can see in the documentation:

```javascript
onToken = (token) => {
  fetch("/save-stripe-token", {
    method: "POST",
    body: JSON.stringify(token),
  }).then((response) => {
    response.json().then((data) => {
      alert(`We are in business, ${data.email}`);
    });
  });
};
```

<br>

# 🍌

- When we are going to make a payment, stripe is going to return a token, and with this **token** we are going to make **payment requests** to our **nodejs server**.

<br>
<br>

## Lets use it

#### Go to the Pay.js

- import stripe
- **WRAP** the button with stripe component

```javascript
import React from "react";
import StripeCheckout from "react-stripe-checkout";

const Pay = () => {
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
      
      
      */}
      <StripeCheckout>
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
```

<br>
<br>

### Now add few properties to the STRIPE wrapper

<br>

- As you can see in the [Documentation](https://www.npmjs.com/package/react-stripe-checkout), we have all this properties

<br>

##### This will give you a default Stripe-style button which looks like this:

<br>

- our **company name:** name="Three Comma Co."
- if you notice, everything is inside the button.

<br>

```javascript
<StripeCheckout
  name="Three Comma Co." // the pop-in header title
  description="Big Data Stuff" // the pop-in header subtitle
  image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png" // the pop-in header image (default none)
  ComponentClass="div"
  panelLabel="Give Money" // prepended to the amount in the bottom pay button
  amount={1000000} // cents
  currency="USD"
  stripeKey="..."
  locale="zh"
  email="info@vidhub.co"
  // Note: Enabling either address option will give the user the ability to
  // fill out both. Addresses are sent as a second parameter in the token callback.
  shippingAddress
  billingAddress={false}
  // Note: enabling both zipCode checks and billing or shipping address will
  // cause zipCheck to be pulled from billing address (set to shipping if none provided).
  zipCode={false}
  alipay // accept Alipay (default false)
  bitcoin // accept Bitcoins (default false)
  allowRememberMe // "Remember Me" option (default true)
  token={this.onToken} // submit callback
  opened={this.onOpened} // called when the checkout popin is opened (no IE6/7)
  closed={this.onClosed} // called when the checkout popin is closed (no IE6/7)
  // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
  // you are using multiple stripe keys
  reconfigureOnUpdate={false}
  // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
  // useful if you're using React-Tap-Event-Plugin
  triggerEvent="onTouchTap"
>
  <button className="btn btn-primary">
    Use your own child component, which gets wrapped in whatever component you
    pass into as "ComponentClass" (defaults to span)
  </button>
</StripeCheckout>
```

<br>

#### 🔴

#### Important properties from the above code:

```javascript
        token={this.onToken}// submit callback
        stripeKey="..."
```

##### Since its sensitive data, we will have to create a function to handle it

## Lets grab the properties from stripe and add it to the button

```javascript
<StripeCheckout
  name="NOVE shop"
  image="https://avatars.githubusercontent.com/u/1486366?v=4"
  shippingAddress
  billingAddress
  description="Your total is 20 euros"
  amount={1000}
  token={this.onToken}
  stripeKey="..."
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
```

<br>

<br>

### For the code below we will need the 'pk' public key from STRIPE

```javascript
stripeKey = "...";
```

<br>

🔴 **remember:**

- You have to be in test mode to grab the keys otherwise it will grab the key for real payments

<br>

- Grab the **pk** key, as we already took the **sk** key to use in our main backend project.

<br>

- Add the **pk** key to the **.env** 👍, then take the variable and add it to the button: **stripeKey={process.env.KEY}**

- change this line **token={this.onToken}** for this: **token={onToken}**

<br>

```javascript
      <StripeCheckout
        name="NOVE shop"
        image="https://avatars.githubusercontent.com/u/1486366?v=4"
        shippingAddress
        billingAddress
        description="Your total is 20 euros"
        amount={1000}
        token={onToken}
        stripeKey={process.env.KEY} // ***   HERE  ***
      >
        <button
```

<br>

#### Now add the function related to the code below

```javascript
token = { onToken };
```

#### the function

```javascript
const onToken = (token) => {
  console.log(token); //it will show us the fake order inside the browser console
};
```

#### Test it in the browser ✋

```javascript
npm start
```

- change the url:

```javascript
http://localhost:3000/pay
// After ýou click in the button it will open in the browser, but if you click it again, it will open in another window, you can just refresh the page to prevent that when testing again.
```

<br>

#### Result

- the error makes allusion to the prop, remember that we removed it, this is how it was before: **token={this.onToken}**

```javascript
Warning: Failed prop type: The prop `stripeKey` is marked as required in `ReactStripeCheckout`, but its value is `undefined`.

```

> **Failed** because of the way i set the **KEY** inside the .env

[<img src="./src/img/test_failed_because_key.gif"/>]()

<br>

# 🐒

<br>

#### scroll to see the code ⤵️

> **SUCCESS** after i added the key inside the Pay.jsx (you shouldnt do that | only for testing purposes | never push to git when they key is visible like that), it worked!!

[<img src="./src/img/test_successful_because_key.gif"/>]()

<br>

##### this is the fake order

```javascript
Object
card: {id: 'card_1JzfK5OCdM1Odk10RJpF27O63r', object: 'card', address_city: 'Berlin', address_country: 'Germany', address_line1: 'nanana', …}
client_ip: "52.129.28.192"
created: 1637836640
email: "nnnnn@mail.com"
id: "tok_1JzfK2OCdM1Odlk0RJcxiVw5Bg"
livemode: false
object: "token"
type: "card"
used: false
[[Prototype]]: Object
```

<br>

---

<br>

### Before we progress more, lets see what we have:

```javascript
import React from "react";
import StripeCheckout from "react-stripe-checkout";

const KEY = "pk_test_very long code";


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
```

<br>
<br>

# :credit_card:

#### The reason why we didnt receive the payment in STRIPE, is because we haven't done yet the connection to the backend

<br>

> So to handle the backend connection, we can create an useEffect and whenever we have a **token**, we can just make backend server request

<br>

### 1. Create a useState

- import the useEffect and the useState

```javascript
import { useState, useEffect } from "react";

//
//
const [stripeToken, setStripeToken] = useState(null);
// set to (null) because we don't have a token in the beginning
//
```

<br>
<br>

#### So instead of console.log

```javascript
const onToken = (token) => {
  console.log(token);
};
```

<br>

#### we can set up the token here:

```javascript
const onToken = (token) => {
  // console.log(token);

  setStripeToken(token);
};
```

<br>
<br>

---

<br>

### For the next step we will need to install AXIOS

<br>

##### Install AXIOS

- we will need this

```javascript
npm i axios
```

<br>

> **What are Axios?** <br>
> Axios: Axios is a Javascript library used to make HTTP requests from node. js or XMLHttpRequests from the browser and it supports the Promise API that is native to JS ES6. It can be used intercept HTTP requests and responses and enables client-side protection against XSRF **(Cross-Site-Request-Forgery)**. It also has the ability to cancel requests.

<br>

#### 🔴

#### What is the difference between CSRF and XSRF?

- Cross-site scripting (or XSS) allows an attacker to execute arbitrary JavaScript within the browser of a victim user.

- Cross-site request forgery (or CSRF) allows an attacker to induce a victim user to perform actions that they do not intend to.

<br> <br>

**Why is Axios used?** <br> <br> Axios is a popular, promise-based HTTP client that sports an easy-to-use API and can be used in both the browser and Node. ... **Making HTTP requests to fetch or save data is one of the most common tasks a client-side** JavaScript application will need to do.

<br>
<br>

---

<br>

### Lets make the backend connection:

- start by integrating the axios request to the useEffect

```javascript
//
useEffect(() => {
  const makeRequest = async () => {
    try {
      //
      //
      const response = await axios.post(
        "http://localhost:3000/api/checkout/payment"
      );
      //So its going to return us the stripe response
      //
      //
    } catch (err) {
      console.log(err);
    }
  };
}, [stripeToken]);
//
//
```

### After this we will add the body and the token

- we will need to grab data from the **stripe.js** (the file is inside the main project app)

```javascript
// stripe.js
//
//
router.post("/payment", (req, res) => {
  //How i am going to charge my clients?
  stripe.charges.create(
    {
      //
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
      //https://stripe.com/docs/currencies
    },
    //
```

### add it like so

```javascript
const onToken = (token) => {
  // console.log(token);

  setStripeToken(token);
};

//
useEffect(() => {
  const makeRequest = async () => {
    try {
      //
      //
      const response = await axios.post(
        "http://localhost:3000/api/checkout/payment",

        {
          tokenId: stripeToken.id,
          amount: 2000,
        }
      );

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  //
  //if stripe token, then RUN this function
  stripeToken && makeRequest;

  //
}, [stripeToken]);
//
```

### At this point you will have some issue in the code due to this:

```javascript
stripeToken && makeRequest;
```

#### But lets try it anyway

- It didn't work

- add this and you will be able to see and test it

```javascript
if (stripeToken) {
  makeRequest();
}

//or

stripeToken && makeRequest();
```

# ✋ it worked but now i have this

```javascript

Error: Network Error
    at createError (createError.js:16)
    at XMLHttpRequest.handleError (xhr.js:117)
xhr.js:210 POST http://localhost:5000/api/checkout/payment net::ERR_CONNECTION_REFUSED

```

- the issue here was because i am using localhost 3000, and in the Pay.js i had localhost 5000, so replaced the 5000 for the 3000 and it worked

<br>

### I tested it again, now i have this error in the console

```javascript


xhr.js:210 POST http://localhost:3000/api/checkout/payment 404 (Not Found)

```

<br>

### Apparently it has to do with Cors

- so i added it like so:

> Inside the main project

<br>

```javascript
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
//
//

//
//---------------------
//      ROUTES
//---------------------
//
//
//
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");

dotenv.config();

mongoose
  .connect(process.env.MONGO_RAINBOW_URL)
  .then(() => console.log("DBConnection Successful"))
  .catch((err) => console.log("error"));
//
//
//---------------------
//      ROUTES
//---------------------
//
//
//

app.use(cors({ origin: true }));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
//
//---------------------
//      SERVER
//---------------------
//
app.listen(process.env.PORT || 3000, () => {
  console.log("Backend server is running!");
});
//
```

### but it didnt work, apparently because:

- You're getting a 404 because your axios call is going to your web app, not port 5000. You need to be more explicit in your axios url like this:

https://stackoverflow.com/questions/67090482/errorrequest-failed-with-status-code-404-at-createerror-createerror-js16-at

<br>

CORS considers the port as part of the origin, so localhost:5000 and localhost:8080 are considered different origins here.

You might want to consider something like this which will allow you to use the same origin/domain for both the frontend code and the API during development: https://vuejs-templates.github.io/webpack/proxy.html

<br>

Since the web page was not served from the localhost server on localhost:3000 and via the file explorer the origin is not the same as the server API origin, hence a cross-origin request is being attempted. The browser is stopping this attempt due to CORS Policy.

https://stackoverflow.com/questions/45975135/access-control-origin-header-error-using-axios
