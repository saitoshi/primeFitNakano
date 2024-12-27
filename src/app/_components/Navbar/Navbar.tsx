'use client';
import Link from 'next/link';
import './style.css';
import { useMedia } from 'react-use';
import React, { useState, CSSProperties } from 'react';

const NavBar = () => {
  const [open, setOpen] = useState<boolean>(false);

  const isDesktop = useMedia('(min-width: 768px)', true);

  const closeSideMenu = () => setOpen(!open);

  const openSideMenu = () => setOpen(true);

  /** Unique Nav */
  const deskNavBar: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const deskNavLinks: CSSProperties = {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  const deskNavLinksList: CSSProperties = {
    marginLeft: '10px',
    color: '#fff',
    fontStyle: 'italics',
    fontWeight: '900',
    fontFamily: 'Barlow Condensed',
    fontSize: '20px',
  };

  const desktopNavLogo: CSSProperties = {
    maxWidth: 'max-content',
    width: '100%',
    height: 'auto',
    maxHeight: '90px',
    display: 'flex',
  };

  const mobileNavLogo: CSSProperties = {
    maxWidth: 'max-content',
    width: '100%',
    height: 'auto',
    maxHeight: '100px',
    display: 'flex',
    padding: '10px 0',
  };

  const menuItems = [
    {
      menu: 'HOME',
      link: '/',
    },
    {
      menu: 'SERVICE',
      link: '/service',
    },
    {
      menu: 'BLOG',
      link: '/blog',
    },
    {
      menu: 'LOCATION',
      link: '/location',
    },
    {
      menu: 'CONTACT',
      link: '/contact',
    },
    {
      menu: 'FAQ',
      link: '/faq',
    },
  ];

  return (
    <>
      {isDesktop ? (
        <div id='navMenu' style={deskNavBar}>
          <Link href='/'>
            <img
              style={desktopNavLogo}
              src='/image/mainLogo.png'
              alt='primeFitLogo'
            />
          </Link>
          <ul className='navLinks' style={deskNavLinks}>
            {menuItems.map((item) => (
              <li key={item.menu}>
                <Link
                  style={deskNavLinksList}
                  className='sideMenuLinks'
                  key={item.menu}
                  href={item.link}>
                  {item.menu}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div id='navMenu' style={deskNavBar}>
          <Link href='/'>
            <img
              style={mobileNavLogo}
              src='/image/mainLogo.png'
              alt='primeFitLogo'
            />
          </Link>
          <div id='sideMenuButton'>
            {open ? (
              <div id='sideNav'>
                <p className='closeButton' onClick={() => closeSideMenu()}>
                  &times;
                </p>
                {menuItems.map((item) => (
                  <Link
                    className='sideMenuLinks'
                    key={item.menu}
                    href={item.link}>
                    {item.menu}
                  </Link>
                ))}
                <hr />
                <span>特定商取引法に基づく表記 | ©︎ Prime Fit Nakano</span>
              </div>
            ) : (
              <div className='menu-btn__burger'>
                <p onClick={() => openSideMenu()}>&#8801;</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
