import React from "react";
import {Spacer} from "@nextui-org/react";
import {CustomCard} from "./CustomeCard";

export default function LoadingCard() {
  return (
    <div className="flex">
      <CustomCard />
      <Spacer x={4} />
      <CustomCard />
      <Spacer x={4} />
      <CustomCard />
    </div>
  );
}
