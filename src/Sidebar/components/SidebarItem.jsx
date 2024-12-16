import React from "react";
import { Link } from "react-router-dom";

const SidebarItem = ({
  to,
  href,
  icon,
  text,
  badgeCount,
  isOpen,
  isActive,
  onClick,
  closeSubmenu,
  external,
}) => {
  const content = (
    <>
      <div className="img-container">
        <img src={icon} alt={text} className="icon-invert" />
      </div>
      <div className="sidebar-item-text-container">
        {isOpen && <span>{text}</span>}
        {badgeCount && (
          <span className={`badge ${isOpen ? "" : "collapsed-badge"}`}>
            {badgeCount}
          </span>
        )}
        <span className="tooltip-sidebar">{text}</span>
      </div>
    </>
  );

  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`sidebar-item ${isActive}`}
      onClick={closeSubmenu}
    >
      {content}
    </a>
  ) : (
    <Link
      to={to}
      className={`sidebar-item ${isActive}`}
      onClick={onClick || closeSubmenu}
    >
      {content}
    </Link>
  );
};

export default SidebarItem;
