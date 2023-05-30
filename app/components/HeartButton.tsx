"use client";
import React, { useState } from "react";
import { SafeUser } from "../types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavorite";

type Props = {
  listingId: string;
  currentUser?: SafeUser | null;
};

const HeartButton = ({ listingId, currentUser }: Props) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 duration-300 cursor-pointer"
    >
      <AiOutlineHeart
        className="fill-white absolute -top-[2px] -right-[2px]"
        size={28}
      />
      <AiFillHeart
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
        size={24}
      />
    </div>
  );
};

export default HeartButton;
