import { getCurrentUser, getListings } from "../actions";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";

type Props = {};

const PropertiesPage = async (props: Props) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties"
        />
      </ClientOnly>
    );
  }

  return <ClientOnly>
    <PropertiesClient listings={listings} currentUser={currentUser} />
  </ClientOnly>;
};

export default PropertiesPage;
