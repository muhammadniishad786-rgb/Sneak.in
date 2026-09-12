import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>

            <h2 className="text-2xl font-bold text-white tracking-tight">
              Sneak<span className="text-blue-400">.in</span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-400 max-w-xs">
              Step into confidence with footwear designed for your everyday
              journey. Discover your style and make every step count.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">

              {/* Instagram */}
              <a
                href="https://www.instagram.com/muhammad.nishad_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-gray-950 transition"
              >
                <FaInstagram size={18} />
              </a>

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-gray-950 transition"
              >
                <FaFacebookF size={17} />
              </a>

              {/* X */}
              <a
                href="#"
                aria-label="X"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-gray-950 transition"
              >
                <FaXTwitter size={17} />
              </a>

            </div>

          </div>


          {/* Shop */}
          <div>

            <h3 className="text-white font-semibold text-lg mb-5">
              Shop
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <a
                  href="/products"
                  className="hover:text-white transition"
                >
                  All Footwear
                </a>
              </li>

              <li>
                <a
                  href="/products?category=sneakers"
                  className="hover:text-white transition"
                >
                  Sneakers
                </a>
              </li>

              <li>
                <a
                  href="/products?category=running"
                  className="hover:text-white transition"
                >
                  Running Shoes
                </a>
              </li>

              <li>
                <a
                  href="/products?category=casual"
                  className="hover:text-white transition"
                >
                  Casual Shoes
                </a>
              </li>

            </ul>

          </div>


          {/* Customer Care */}
          <div>

            <h3 className="text-white font-semibold text-lg mb-5">
              Customer Care
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <a
                  href="/profile"
                  className="hover:text-white transition"
                >
                  My Account
                </a>
              </li>

              <li>
                <a
                  href="/orders"
                  className="hover:text-white transition"
                >
                  Track Orders
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  Shipping & Delivery
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  Returns & Refunds
                </a>
              </li>

            </ul>

          </div>


          {/* Contact */}
          <div>

            <h3 className="text-white font-semibold text-lg mb-5">
              Get In Touch
            </h3>

            <div className="space-y-4 text-sm">

              {/* Email */}
              <div>

                <p className="text-gray-500 text-xs uppercase tracking-wider">
                  Email
                </p>

                <a
                  href="mailto:support@sneak.in"
                  className="text-gray-300 hover:text-white transition"
                >
                  support@sneak.in
                </a>

              </div>


              {/* Phone */}
              <div>

                <p className="text-gray-500 text-xs uppercase tracking-wider">
                  Phone
                </p>

                <a
                  href="tel:+919778580349"
                  className="text-gray-300 hover:text-white transition"
                >
                  +91 9778580349
                </a>

              </div>


              {/* Support */}
              <div>

                <p className="text-gray-500 text-xs uppercase tracking-wider">
                  Support
                </p>

                <p className="text-gray-400">
                  Monday – Saturday
                  <br />
                  9:00 AM – 6:00 PM
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* Bottom Footer */}
      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Sneak.in. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">

            <a
              href="#"
              className="hover:text-white transition"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="hover:text-white transition"
            >
              Terms & Conditions
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
