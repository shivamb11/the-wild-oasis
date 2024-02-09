import styled from "styled-components";

import Tag from "../../ui/Tag.jsx";
import Flag from "../../ui/Flag.jsx";
import CheckoutButton from "./CheckoutButton.jsx";
import CheckinButton from "./CheckinButton.jsx";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const {
    status,
    guests: { fullName, nationality, countryFlag },
    numNights,
    id,
  } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <Flag src={countryFlag} alt={`Flag of ${nationality}`} />

      <Guest>{fullName}</Guest>
      <div>{numNights} nights</div>

      {status === "unconfirmed" && <CheckinButton bookingId={id} />}
      {status === "checked-in" && (
        <CheckoutButton bookingId={id}></CheckoutButton>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
