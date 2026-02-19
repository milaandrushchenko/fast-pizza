import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    navigate(`/orders/${searchTerm}`);
    setSearchTerm("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search orders..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
}
