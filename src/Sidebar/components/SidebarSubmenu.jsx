import React from "react";
import { Link } from "react-router-dom";

const SidebarSubmenu = ({ items, isOpen }) => {
  return (
    <div className="submenu">
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.to}
          className={`submenu-item ${item.isActive ? "active" : ""}`}
        >
          <p>{item.text}</p>
        </Link>
      ))}
    </div>
  );
};

export default SidebarSubmenu;
