import { useParams } from "react-router-dom";
import { BondContext } from "../context/BondContext";
import { useContext } from "react";
export default function BondDetail() {
  const { id } = useParams();
  const bonds = useContext(BondContext);
  return (
    <div>
      <h1>Bond Detail</h1>
    </div>
  );
}
