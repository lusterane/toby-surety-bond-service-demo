import { useState } from "react";
export default function Dashboard() {
  const [bonds, setBonds] = useState([]);
  return (
    <>
      <h1>Bond Portfolio</h1>
      <div>{bonds.length} bonds in portfolio</div>
    </>
  );
}
