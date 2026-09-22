import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import sneakLogo from "../../public/sneakIn-favicon.png"

function Footer() {
  return (
    <footer className="bg-white text-black">
      {/* ==================================================
          TOP FOOTER
      ================================================== */}

      <div className="border-t border-zinc-200">
        <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
            {/* ==================================================
                BRAND
            ================================================== */}

            <div className="lg:col-span-5">
              <h2 className="text-5xl font-black uppercase tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                SNEAK<span className="text-zinc-400">.IN</span>
              </h2>

              <p className="mt-7 max-w-md text-sm leading-6 text-zinc-500 sm:text-base">
                Footwear designed for everyday movement, effortless style, and
                every step ahead.
              </p>

              {/* Social */}

              <div className="mt-8 flex gap-3">
                {/* Instagram */}

                <a
                  href="https://www.instagram.com/muhammad.nishad_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white transition duration-300 hover:bg-zinc-800"
                >
                  <FaInstagram size={17} />
                </a>

                {/* Facebook */}

                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-300 bg-white text-black transition duration-300 hover:bg-black hover:text-white"
                >
                  <FaFacebookF size={16} />
                </a>

                {/* X */}

                <a
                  href="#"
                  aria-label="X"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-300 bg-white text-black transition duration-300 hover:bg-black hover:text-white"
                >
                  <FaXTwitter size={16} />
                </a>
              </div>
            </div>

            {/* ==================================================
                SHOP
            ================================================== */}

            <div className="lg:col-span-2">
              <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                Shop
              </h3>

              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    href="/products"
                    className="transition hover:text-zinc-500"
                  >
                    All Footwear
                  </a>
                </li>

                <li>
                  <a
                    href="/products?category=sneakers"
                    className="transition hover:text-zinc-500"
                  >
                    Sneakers
                  </a>
                </li>

                <li>
                  <a
                    href="/products?category=running"
                    className="transition hover:text-zinc-500"
                  >
                    Running Shoes
                  </a>
                </li>

                <li>
                  <a
                    href="/products?category=casual"
                    className="transition hover:text-zinc-500"
                  >
                    Casual Shoes
                  </a>
                </li>
              </ul>
            </div>

            {/* ==================================================
                CUSTOMER CARE
            ================================================== */}

            <div className="lg:col-span-2">
              <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                Support
              </h3>

              <ul className="space-y-4 text-sm">
                <li>
                  <a href="/profile" className="transition hover:text-zinc-500">
                    My Account
                  </a>
                </li>

                <li>
                  <a href="/orders" className="transition hover:text-zinc-500">
                    Track Orders
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:text-zinc-500">
                    Shipping & Delivery
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:text-zinc-500">
                    Returns & Refunds
                  </a>
                </li>
              </ul>
            </div>

            {/* ==================================================
                CONTACT
            ================================================== */}

            <div className="lg:col-span-3">
              <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                Get In Touch
              </h3>

              <div className="space-y-6 text-sm">
                {/* Email */}

                <div>
                  <p className="mb-1 text-xs uppercase tracking-[0.15em] text-zinc-400">
                    Email
                  </p>

                  <a
                    href="mailto:support@sneak.in"
                    className="transition hover:text-zinc-500"
                  >
                    support@sneak.in
                  </a>
                </div>

                {/* Phone */}

                <div>
                  <p className="mb-1 text-xs uppercase tracking-[0.15em] text-zinc-400">
                    Phone
                  </p>

                  <a
                    href="tel:+919778580349"
                    className="transition hover:text-zinc-500"
                  >
                    +91 9778580349
                  </a>
                </div>

                {/* Support */}

                <div>
                  <p className="mb-1 text-xs uppercase tracking-[0.15em] text-zinc-400">
                    Support Hours
                  </p>

                  <p className="leading-6 text-zinc-500">
                    Monday – Saturday
                    <br />
                    9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          LARGE BRAND STRIP
      ================================================== */}

      <div className="overflow-hidden border-y border-zinc-200">
        <div className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 lg:px-12">
          {/* <p className="select-none whitespace-nowrap text-[clamp(4rem,12vw,11rem)] font-black uppercase leading-none tracking-[-0.08em] text-zinc-100">
            SNEAK.IN
          </p> */}
          <img
            src={sneakLogo}
            alt="Sneak.in"
            className="h-22 w-auto object-contain"
          />
        </div>
      </div>

      {/* ==================================================
          BOTTOM FOOTER
      ================================================== */}

      <div className="mx-auto max-w-[1600px] px-5 py-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-5 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          {/* Copyright */}

          <p>© {new Date().getFullYear()} Sneak.in. All rights reserved.</p>

          {/* Legal */}

          <div className="flex flex-wrap gap-6">
            <a href="#" className="transition hover:text-black">
              Privacy Policy
            </a>

            <a href="#" className="transition hover:text-black">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
