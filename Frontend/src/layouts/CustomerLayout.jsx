import {
  Outlet,
  Link,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";

const CustomerLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Periksa apakah pengguna mencoba mengakses halaman selain home
  const isAccessingOtherPages = location.pathname !== "/customer/home";

  // Jika mencoba mengakses halaman lain dan tidak memiliki token, arahkan ke login
  if (isAccessingOtherPages && !token) {
    return <Navigate to="/login" replace />;
  }

  // Jika memiliki token, validasi token


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    localStorage.removeItem("cart");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md py-2" : "bg-[#2E8B57] py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <img
                src="/images/restoping.png"
                alt="Restoping Logo"
                className={`h-12 transition-all duration-300 ${
                  scrolled ? "h-8" : "h-10"
                }`}
              />
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/customer/home"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/customer/home")
                    ? scrolled
                      ? "text-[#2E8B57] font-semibold"
                      : "text-[#F5F5DC] font-semibold"
                    : scrolled
                    ? "text-gray-700 hover:text-[#2E8B57]"
                    : "text-white hover:text-[#F5F5DC]"
                }`}
              >
                Home
              </Link>
              <Link
                to="/customer/menus"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/customer/menus")
                    ? scrolled
                      ? "text-[#2E8B57] font-semibold"
                      : "text-[#F5F5DC] font-semibold"
                    : scrolled
                    ? "text-gray-700 hover:text-[#2E8B57]"
                    : "text-white hover:text-[#F5F5DC]"
                }`}
              >
                Menu
              </Link>
              <Link
                to="/customer/order"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/customer/order")
                    ? scrolled
                      ? "text-[#2E8B57] font-semibold"
                      : "text-[#F5F5DC] font-semibold"
                    : scrolled
                    ? "text-gray-700 hover:text-[#2E8B57]"
                    : "text-white hover:text-[#F5F5DC]"
                }`}
              >
                Orders
              </Link>
              <Link
                to="/customer/profile"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/customer/profile")
                    ? scrolled
                      ? "text-[#2E8B57] font-semibold"
                      : "text-[#F5F5DC] font-semibold"
                    : scrolled
                    ? "text-gray-700 hover:text-[#2E8B57]"
                    : "text-white hover:text-[#F5F5DC]"
                }`}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className={`ml-4 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  scrolled
                    ? "bg-[#2E8B57] text-white hover:bg-[#3AA76D]"
                    : "bg-white text-[#2E8B57] hover:bg-gray-100"
                }`}
              >
                Logout
              </button>
            </nav>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md ${
                  scrolled
                    ? "text-gray-700 hover:text-[#2E8B57]"
                    : "text-white hover:text-[#F5F5DC]"
                } focus:outline-none`}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div
            className={`md:hidden ${scrolled ? "bg-white" : "bg-[#2E8B57]"}`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/customer/home"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/customer/home")
                    ? scrolled
                      ? "bg-gray-100 text-[#2E8B57] font-semibold"
                      : "bg-[#3AA76D] text-white font-semibold"
                    : scrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-[#3AA76D]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/customer/menus"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/customer/menus")
                    ? scrolled
                      ? "bg-gray-100 text-[#2E8B57] font-semibold"
                      : "bg-[#3AA76D] text-white font-semibold"
                    : scrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-[#3AA76D]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Menu
              </Link>
              <Link
                to="/customer/order"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/customer/order")
                    ? scrolled
                      ? "bg-gray-100 text-[#2E8B57] font-semibold"
                      : "bg-[#3AA76D] text-white font-semibold"
                    : scrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-[#3AA76D]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Orders
              </Link>
              <Link
                to="/customer/profile"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/customer/profile")
                    ? scrolled
                      ? "bg-gray-100 text-[#2E8B57] font-semibold"
                      : "bg-[#3AA76D] text-white font-semibold"
                    : scrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-[#3AA76D]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  scrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-[#3AA76D]"
                }`}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow py-24 mt-header-height">
        {" "}
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <img
                  src="/images/restoping.png"
                  alt="Restoping Logo"
                  className="h-25 mr-3 size-40"
                />
              </div>
              <p className="text-gray-300 text-sm">
                Your favorite food delivered fast and fresh.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/customer/home"
                    className="text-gray-300 hover:text-white text-sm"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/customer/menus"
                    className="text-gray-300 hover:text-white text-sm"
                  >
                    Menu
                  </Link>
                </li>
                <li>
                  <Link
                    to="/customer/order"
                    className="text-gray-300 hover:text-white text-sm"
                  >
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/customer/profile"
                    className="text-gray-300 hover:text-white text-sm"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                Contact Us
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>123 Food Street, Cityville 56789</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>(123) 456-7890</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>support@restoping.com</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                Newsletter
              </h3>
              <p className="text-gray-300 text-sm">
                Subscribe to our newsletter for the latest updates and offers.
              </p>
              <form className="mt-2 sm:flex sm:max-w-md">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  required
                  className="appearance-none min-w-0 w-full bg-white border border-transparent rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white focus:placeholder-gray-400"
                  placeholder="Enter your email"
                />
                <div className="mt-2 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full bg-[#2E8B57] border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-[#3AA76D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[#2E8B57]"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-700 pt-8">
            <p className="text-gray-400 text-xs text-center">
              &copy; {new Date().getFullYear()} Restoping. All rights reserved.
            </p>
            <div className="mt-2 flex justify-center space-x-6 text-xs">
              <Link to="/privacy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white">
                Terms of Service
              </Link>
              <Link to="/faq" className="text-gray-400 hover:text-white">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CustomerLayout;
