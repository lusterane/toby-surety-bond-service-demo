import { useState } from "react";
export default function Dashboard() {
  const [bonds, setBonds] = useState([]);
  return (
    <>
      <h1>Bond Portfolio</h1>
      <div>{bonds.length} bonds in portfolio</div>
      {/* {bonds.map((bond) => (
        <div key={bond.id}>
          <h2>{bond.name}</h2>
          <p>{bond.description}</p>
        </div>
      ))} */}
    </>
  );
}
