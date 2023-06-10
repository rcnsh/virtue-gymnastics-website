import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsCalendarEvent, BsSearch } from "react-icons/bs";
import { FaHome, FaQuestion, FaInfo, FaPeace } from "react-icons/fa"; // Import additional icons
import styles from "../styles/Titlebar.module.css";
import Image from "next/image";
import { BiParty } from "react-icons/bi";
import { MdRememberMe } from "react-icons/md";
import Fade from "react-reveal/Fade";

const Titlebar = () => {
  const { register, handleSubmit } = useForm();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <section className={styles.titlebar}>
      <div className={styles.hamburger} onClick={handleMenuToggle}>
        <div className={`${styles.line} ${isMenuOpen ? styles.open : ""}`} />
        <div className={`${styles.line} ${isMenuOpen ? styles.open : ""}`} />
        <div className={`${styles.line} ${isMenuOpen ? styles.open : ""}`} />
      </div>
      <div className={styles.logo}>
        <Image
          src={"/virtue-icon.png"}
          alt={"Virtue Icon"}
          width={215}
          height={92}
        />
      </div>
      {isSearchOpen && (
        <form className={styles.searchForm} onSubmit={handleSubmit(onSubmit)}>
          <button
            type="submit"
            className={styles.searchButton}
            onClick={handleSearchToggle}
          >
            <BsSearch />
            <span className={styles.searchButtonText}>Search</span>
          </button>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search"
            {...register("search")}
          />
        </form>
      )}
      {!isSearchOpen && (
        <button className={styles.searchButton} onClick={handleSearchToggle}>
          <BsSearch />
          <span className={styles.searchButtonText}>Search</span>
        </button>
      )}
      {isMenuOpen && (
        <Fade duration={500}>
          <div className={styles.hamburgerMenuDropdown}>
            <ul className={styles.menuList}>
              <li className={styles.menuItem}>
                <a href="#" className={styles.menuLink}>
                  <FaHome className={styles.menuIcon} />
                  Home
                </a>
              </li>
              <li className={styles.menuItem}>
                <a href="#" className={styles.menuLink}>
                  <BsCalendarEvent className={styles.menuIcon} />
                  Events/Camps
                </a>
              </li>
              <li className={styles.menuItem}>
                <a href="#" className={styles.menuLink}>
                  <FaQuestion className={styles.menuIcon} />
                  FAQS
                </a>
              </li>
              <li className={styles.menuItem}>
                <a href="#" className={styles.menuLink}>
                  <BiParty className={styles.menuIcon} />
                  Parties
                </a>
              </li>
              <li className={styles.menuItem}>
                <a href="#" className={styles.menuLink}>
                  <FaInfo className={styles.menuIcon} />
                  About us
                </a>
              </li>
              <li className={styles.menuItem}>
                <a href="#" className={styles.menuLink}>
                  <MdRememberMe className={styles.menuIcon} />
                  Member Info
                </a>
              </li>
              <li className={styles.menuItem}>
                <a href="#" className={styles.menuLink}>
                  <FaPeace className={styles.menuIcon} />
                  Welfare
                </a>
              </li>
            </ul>
          </div>
        </Fade>
      )}
    </section>
  );
};

export default Titlebar;
