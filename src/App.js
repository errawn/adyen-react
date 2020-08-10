import React, { useEffect } from 'react';

function App() {
  function handleOnChange(state, component) {
    // console.log(state.isValid); // True or false. Specifies if all the information that the shopper provided is valid.
    // console.log(state.data); // Provides the data that you need to pass in the `/payments` call.
    // console.log(component); // Provides the active component instance that called this event.
  }

  // submit to server
  function handleOnSubmit(state, component) {
    // state.isValid // True or false. Specifies if all the information that the shopper provided is valid.
    // state.data; // Provides the data that you need to pass in the `/payments` call.
    // component; // Provides the active component instance that called this event.
    // console.log(state);
    // console.log(JSON.stringify(state.data));
    fetch('http://localhost:3000/api/v1/subscriptions', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state.data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  }

  // fetch payment methods
  useEffect(() => {
    fetch('http://localhost:3000/api/v1/subscriptions/payment-methods')
      .then((res) => res.json())
      .then((result) => {
        if (result.paymentMethods) {
          const configuration = {
            showPayButton: true,
            hasHolderName: true,
            paymentMethodsResponse: result.paymentMethods,
            originKey:
              'pub.v2.8015955072461405.aHR0cDovL2xvY2FsaG9zdDozMDAx.UZo1kabKF3hnuUNqQ426tapeQHonYaUCQxynndET-Hs',
            locale: 'en-US',
            environment: 'test',
            amount: {
              // Optional. Used to display the amount in the Pay Button.
              value: 1000,
              currency: 'PHP',
            },
            onChange: handleOnChange,
            onSubmit: handleOnSubmit,
          };

          const checkout = new window.AdyenCheckout(configuration);
          checkout.create('card').mount('#component-container');
        }
      });
  }, []);

  return <div id="component-container" style={{ margin: 20 }} />;
}

export default App;
