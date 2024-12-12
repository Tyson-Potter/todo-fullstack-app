import React from "react";

const FilterBox = ({ filter, setFilter }) => {
  return (
    <div className="filter-box">
      <button
        className={`filter-button ${filter === "all" ? "active" : ""}`}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={`filter-button ${filter === "pending" ? "active" : ""}`}
        onClick={() => setFilter("pending")}
      >
        Pending
      </button>
      <button
        className={`filter-button ${filter === "completed" ? "active" : ""}`}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterBox;
