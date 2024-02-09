import { Link } from "react-router-dom";

import Button from "../../ui/Button.jsx";

function CheckinButton({ bookingId }) {
  return (
    <Button
      size="small"
      $variation="primary"
      as={Link}
      to={`/checkin/${bookingId}`}
    >
      Check in
    </Button>
  );
}

export default CheckinButton;
