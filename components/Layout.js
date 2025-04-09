import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { RiMenu4Line } from 'react-icons/ri';
import { TfiClose } from 'react-icons/tfi';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { Footer } from './Footer';

const list = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.3,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
};

const item = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 100 },
};

export const Layout = ({ children, title }) => {
  const [active, setActive] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setActive(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <>
      <Head>
        <title>{title ? title + ' - STCEC' : 'STCEC'}</title>
      </Head>

      <div className="flex flex-col">
        <header className="bg-main-olive text-white sticky top-0 z-50">
          <nav
            className={`flex items-center py-5 px-5 z-30 ${active ? 'text-white' : ''}`}
            style={{ justifyContent: 'space-between', maxWidth: '5xl', margin: '0 auto' }}
          >
            <div className="flex items-center">
              <Link href={'/#home'} className="sm:text-lg font-bold z-30 mr-4">
                STCEC
              </Link>
            </div>

            <div className="hidden md:flex space-x-6 uppercase">
              <Link href={'/#home'} className="navlinks">
                Home
              </Link>

              <Link href={'/#about'} className="navlinks">
                About Us
              </Link>

              <Link href={'simplepage'} className="navlinks">
                Doctrinal Statement
              </Link>

              <Link href={'gallery'} className="navlinks">
                Gallery
              </Link>

              <Link href={'/#contact'} className="navlinks">
                Contact Us
              </Link>
            </div>

            <div className="md:hidden z-30">
              {!active && (
                <RiMenu4Line onClick={() => setActive(!active)} className="text-2xl cursor-pointer" />
              )}
              {active && (
                <TfiClose onClick={() => setActive(!active)} className="w-5 h-5" />
              )}
            </div>
          </nav>

          {active && (
            <>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={list}
                ref={wrapperRef}
                className="fixed top-0 bottom-0 left-0 right-0 bg-[#81BFCB] pb-5 md:hidden flex flex-col space-y-8 uppercase items-center justify-center z-20 font-semibold"
              >
                <motion.div variants={item}>
                  <Link href={'/#home'} onClick={() => setActive(!active)} className={`navlinks !text-white text-2xl`}>
                    Home
                  </Link>
                </motion.div>

                <motion.div variants={item}>
                  <Link href={'/#about'} onClick={() => setActive(!active)} className={`navlinks !text-white text-2xl`}>
                    About
                  </Link>
                </motion.div>

                <motion.div variants={item}>
                  <Link href={'simplepage'} onClick={() => setActive(!active)} className={`navlinks !text-white text-2xl`}>
                    Doctrinal Statement
                  </Link>
                </motion.div>

                <motion.div variants={item}>
                  <Link href={'/gallery'} onClick={() => setActive(!active)} className={`navlinks !text-white text-2xl`}>
                    Gallery
                  </Link>
                </motion.div>

                <motion.div variants={item}>
                  <Link href={'/#contact'} onClick={() => setActive(!active)} className={`navlinks !text-white text-2xl`}>
                    Contact Us
                  </Link>
                </motion.div>
              </motion.div>
            </>
          )}
        </header>

        <main>{children}</main>

        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};