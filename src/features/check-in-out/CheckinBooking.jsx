import { useEffect, useState } from "react";
import styled from "styled-components";

import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner.jsx";
import Checkbox from "../../ui/Checkbox.jsx";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking.js";
import { formatCurrency } from "../../utils/helpers.js";
import { useSettings } from "../settings/useSettings.js";
import { useCheckin } from "./useCheckin.js";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading: isLoadingBooking } = useBooking();
  const { checkinMutate, isChecking } = useCheckin();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  const moveBack = useMoveBack();

  useEffect(
    function () {
      if (booking?.isPaid) setConfirmPaid(true);
    },
    [booking]
  );

  if (isLoadingBooking || isLoadingSettings) {
    return <Spinner />;
  }
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakFastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkinMutate({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          isPaid: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkinMutate({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((state) => !state);
              setConfirmPaid(false);
            }}
          >
            Want to add breakfast add for{" "}
            {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((state) => !state)}
          disabled={confirmPaid}
          id="confirm"
        >
          I agree that {guests.fullName} has paid the full amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isChecking}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack} disabled={isChecking}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
