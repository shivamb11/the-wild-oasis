import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

import Stat from "./Stat.jsx";

import { formatCurrency } from "../../utils/helpers.js";

function Stats({ bookings, confirmedStays, cabins, numDays }) {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const checkins = confirmedStays.length;

  const nightsOccupied = confirmedStays.reduce(
    (acc, curr) => acc + curr.numNights,
    0
  );

  const occupation = nightsOccupied / (numDays * cabins.length);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Total bookings"
        value={numBookings}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Total sales"
        value={formatCurrency(sales)}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Total check ins"
        value={checkins}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Total occupation rate"
        value={Math.round(occupation * 100) + "%"}
        color="yellow"
      />
    </>
  );
}

export default Stats;
