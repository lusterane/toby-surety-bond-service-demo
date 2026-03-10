import { useParams } from "react-router-dom";
import { BondContext } from "../context/BondContext";
import { useContext } from "react";
export default function BondDetail() {
  const { id } = useParams();
  const { findBondById } = useContext(BondContext)!;
  const bond = findBondById(id!);
  return (
    <div>
      <h1>Bond Detail</h1>
      <p>{bond?.id}</p>
      <p>{bond?.principal.name}</p>
      <p>{bond?.obligee.name}</p>
      <p>{bond?.status}</p>
      <p>{bond?.bondAmount}</p>
      <p>{bond?.premium}</p>
      <p>{bond?.effectiveDate.toLocaleDateString()}</p>
      <p>{bond?.expirationDate.toLocaleDateString()}</p>
    </div>
  );
}
