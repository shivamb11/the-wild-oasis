import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout.js";

function CheckoutButton({ bookingId }) {
  const { checkoutMutate, isCheckout } = useCheckout();

  return (
    <Button
      $variation="primary"
      size="small"
      onClick={() => checkoutMutate(bookingId)}
      disabled={isCheckout}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
