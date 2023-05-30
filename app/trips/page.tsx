import { getCurrentUser } from "../actions";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import TripClient from "./TripClient";

type Props = {};

const TripsPage = async (props: Props) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you haven't reserved any trips"
        />
      </ClientOnly>
    );
  }

  return <ClientOnly>
    <TripClient reservations={reservations} currentUser={currentUser} />
  </ClientOnly>;
};

export default TripsPage;
