import prisma from "@/app/libs/prismadb";

type Props = {
  listingId?: string;
  userId?: string;
  authorId?: string;
};

export default async function getReservations(params: Props) {
  try {
    const { authorId, listingId, userId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }
    if (authorId) {
      query.listing = { userId: authorId };
    }
    if (userId) {
      query.userId = userId;
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
