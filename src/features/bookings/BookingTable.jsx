import BookingRow from "./BookingRow.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import Empty from "../../ui/Empty.jsx";
import Spinner from "../../ui/Spinner.jsx";
import Pagination from "../../ui/Pagination.jsx";

import { useBookings } from "./useBookings.js";

function BookingTable() {
  const { bookings, isLoading, count } = useBookings();

  if (isLoading) {
    return <Spinner />;
  }

  if (!bookings?.length) {
    return <Empty resourceName="bookings" />;
  }

  return (
    <Menus>
      <Table columns="1.6fr 1.8fr 2.2fr 1.4fr 1fr 3rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Menus>
          <Table.Body
            data={bookings}
            renderItem={(booking) => (
              <BookingRow key={booking.id} booking={booking} />
            )}
          />
        </Menus>

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
