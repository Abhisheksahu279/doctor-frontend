
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend/assets";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        {/* Left Section */}
        <div>
          <img
            className="mb-5 w-40 cursor-pointer"
            src={assets.logo}
            alt="Logo"
            onClick={() => handleNavigation("/")}
          />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Book doctor appointments easily and manage your health online with
            our platform.
          </p>
        </div>

        {/* Center Section */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">

            <li className="cursor-pointer hover:text-black"
              onClick={() => handleNavigation("/")}>
              Home
            </li>

            <li className="cursor-pointer hover:text-black"
              onClick={() => handleNavigation("/about")}>
              About us
            </li>

            <li className="cursor-pointer hover:text-black"
              onClick={() => handleNavigation("/contact")}>
              Contact us
            </li>
            
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">

            <li>
              <a
                href="tel:+12124567890"
                className="hover:text-black"
              >
                +1-212-456-7890
              </a>
            </li>

            <li>
              <a
                href="mailto:prescript@gmail.com"
                className="hover:text-black"
              >
                prescript@gmail.com
              </a>
            </li>

          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center text-gray-600">
          © {new Date().getFullYear()} Prescript - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;