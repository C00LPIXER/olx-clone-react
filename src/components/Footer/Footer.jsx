import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="w-100% h-60 bg-[#E6EBEC] py-5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div>
            <h4 className="font-bold text-lg text-gray-800 mb-3">
              POPULAR LOCATIONS
            </h4>
            <ul className="text-sm space-y-2 text-gray-600">
              <li>Kolkata</li>
              <li>Mumbai</li>
              <li>Chennai</li>
              <li>Pune</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg text-gray-800 mb-3">
              TRENDING LOCATIONS
            </h4>
            <ul className="text-sm space-y-2 text-gray-600">
              <li>Bhubaneshwar</li>
              <li>Hyderabad</li>
              <li>Chandigarh</li>
              <li>Nashik</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg text-gray-800 mb-3">ABOUT US</h4>
            <ul className="text-sm space-y-2 text-gray-600">
              <li>Tech@OLX</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg text-gray-800 mb-3">OLX</h4>
            <ul className="text-sm space-y-2 text-gray-600">
              <li>Blog</li>
              <li>Help</li>
              <li>Sitemap</li>
              <li>Legal & Privacy Information</li>
              <li>Vulnerability Disclosure Program</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg text-gray-800 mb-3">FOLLOW US</h4>
            <div className="flex space-x-4 mb-3">
              <FaFacebookF className="text-gray-600 hover:text-blue-500" />
              <FaInstagram className="text-gray-600 hover:text-pink-500" />
              <FaTwitter className="text-gray-600 hover:text-blue-400" />
            </div>
            <div className="space-y-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="w-36"
              />
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="w-36"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-23 w-100% h-50 bg-[#012F35]">
        <div className="flex pt-10 items-center justify-between">
          <img
            width={110}
            src="https://statics.olx.in/external/base/img/cartrade/logo/cartrade_tech.svg?v=1"
            alt=""
          />
          <img
            width={110}
            src="https://statics.olx.in/external/base/img/cartrade/logo/olx.svg?v=1"
            alt=""
          />
          <img
            width={110}
            src="https://statics.olx.in/external/base/img/cartrade/logo/carwale.svg?v=1"
            alt=""
          />
          <img
            width={110}
            src="https://statics.olx.in/external/base/img/cartrade/logo/bikewale.svg?v=1"
            alt=""
          />
          <img
            width={110}
            src="https://statics.olx.in/external/base/img/cartrade/logo/cartrade.svg?v=1"
            alt=""
          />
          <img
            width={110}
            src="https://statics.olx.in/external/base/img/cartrade/logo/mobility.svg?v=1"
            alt=""
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[white] text-sm">Help - Sitemap</p>
          <p className="text-[white] text-sm">All rights reserved © 2006-2025 OLX</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
