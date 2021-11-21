import { Button } from 'react-bootstrap';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const appointment_id = props.appointment_id
  console.log(appointment_id)

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/successful/" + appointment_id,
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form>
      <PaymentElement />
      <br/>
      <Button onClick={handleSubmit} style={{backgroundColor:"purple"}}>Submit</Button>
    </form>
  )
};

export default CheckoutForm;