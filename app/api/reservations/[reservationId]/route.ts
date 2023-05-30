import { getCurrentUser } from "@/app/actions";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

type Props = {
  reservationId?: string;
};

export async function DELETE(request: Request, { params }: { params: Props }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid ID");
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservation);
}
