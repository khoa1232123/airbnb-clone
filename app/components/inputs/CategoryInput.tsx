"use client";
import React from "react";
import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
};

const CategoryInput = ({ icon: Icon, label, onClick, selected }: Props) => {
  return (
    <div
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black duration-300 cursor-pointer ${
        selected ? "border-black" : "border-neutral-200"
      }`}
      onClick={() => onClick(label)}
    ><Icon size={30} />
    <div className="font-semibold">{label}</div></div>
  );
};

export default CategoryInput;
