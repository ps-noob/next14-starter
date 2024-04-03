"use client";
import { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/NavLink";
import Image from "next/image";

const links = [
  {
    title: "HomePage",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Blog",
    path: "/blog",
  },
];

const Links = () => {
  const [open, setOpen] = useState(false);
  const sesssion = true;
  const isAdmin = true;
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => {
          return <NavLink item={link} key={link.title} />;
        })}
        {sesssion ? (
          isAdmin && (
            <>
              <NavLink item={{ title: "Admin", path: "/admin" }} />
              <button className={styles.logout}>Logout</button>
            </>
          )
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
      {/* <button className={styles.mobileButton} onClick={() => setOpen((prev) => !prev)}>Menu</button> */}

      <Image
        className={styles.mobileButton}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => {
            return <NavLink item={link} key={link.title} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Links;
