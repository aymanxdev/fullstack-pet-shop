import StripeCheckout from "react-stripe-checkout";

const STRIPE_PUBLISHABLE = process.env.REACT_APP_STRIPE_PUBLISHABLE;

const onToken = (user, checkout) => (token) => checkout(user, token.id);

const Checkout = ({ amount, user, checkout }) => (
  <StripeCheckout
    amount={amount * 100}
    token={onToken(user, checkout)}
    currency="USD"
    stripeKey={STRIPE_PUBLISHABLE}
  />
);

export default Checkout;
