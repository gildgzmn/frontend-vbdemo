import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Logo from "../../assets/Seal_of_Batangas.png";
import { Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { Settings2Icon } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation(); // Get current route path

  // Animation variants
  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const mobileMenuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
  };

  // Scroll effect for header blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed w-full z-20 ${
        isScrolled ? "backdrop-blur-md bg-opacity-80" : ""
      } bg-gray-900 text-white`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 30 }}
      style={{ height: "80px" }}
    >
      <nav
        aria-label="Global"
        className="mx-auto max-w-7xl flex items-center justify-between px-4 lg:px-8 py-3"
      >
        <motion.div
          className="flex items-center justify-center h-full"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a href="/" className="flex items-center">
            <img
              alt="Seal of Batangas Province"
              src={Logo}
              className="h-14 w-14 mx-auto"
            />
          </a>
        </motion.div>

        {/* Desktop Links */}
        <motion.div
          className="hidden lg:flex space-x-8"
          initial="hidden"
          animate="visible"
          variants={linkVariants}
          transition={{ staggerChildren: 0.1, duration: 0.4 }}
        >
          <Link
            to="/"
            className={`text-sm font-medium flex items-center gap-2 p-4 ${
              location.pathname === "/" ? "text-blue-300 border-b-2 border-blue-300" : "hover:text-blue-300"
            }`}
          >
            <HomeIcon className="h-5 w-5" aria-hidden="true" /> HOME
          </Link>
          <Link
            to="/data"
            className={`text-sm font-medium flex items-center gap-2 p-4 ${
              location.pathname === "/data" ? "text-blue-300 border-b-2 border-blue-300" : "hover:text-blue-300"
            }`}
          >
            <ChartBarIcon className="h-5 w-5" aria-hidden="true" /> DATA
          </Link>
          <Link
            to="/utilities"
            className={`text-sm font-medium flex items-center gap-2 p-4 ${
              location.pathname === "/utilities" ? "text-blue-300 border-b-2 border-blue-300" : "hover:text-blue-300"
            }`}
          >
            <Settings2Icon className="h-5 w-5" aria-hidden="true" /> UTILITY
          </Link>
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-gray-300"
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <motion.div
          className="fixed inset-0 z-10 bg-gray-900 bg-opacity-100 p-8"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={mobileMenuVariants}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="flex items-center justify-between mb-6 border-b-2 border-white pb-5">
            <span className="text-lg font-semibold text-white">MENU</span>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-300"
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <motion.div className="space-y-4">
            {["/", "/data", "/utilities"].map((link, index) => (
              <motion.a
                key={link}
                href={link}
                className={`block text-base font-medium px-4 py-2 rounded flex items-center gap-4 ${
                  location.pathname === link ? "bg-blue-300 text-gray-900" : "text-white hover:bg-blue-300"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {link === "/" && (
                  <HomeIcon className="h-5 w-5" aria-hidden="true" />
                )}
                {link === "/data" && (
                  <ChartBarIcon className="h-5 w-5" aria-hidden="true" />
                )}
                {link === "/utilities" && (
                  <Settings2Icon className="h-5 w-5" aria-hidden="true" />
                )}
                {link === "/" ? "HOME" : link === "/data" ? "DATA" : "UTILITY"}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </Dialog>
    </motion.header>
  );
};

export default Navbar;
