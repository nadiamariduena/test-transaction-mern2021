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
