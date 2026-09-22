import { Link } from "react-router-dom";
import { ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import HeroImage from "../../../public/video/background.mp4"

function Hero() {
  const [muted, setMuted] = useState(true);

  return (
    <section className="relative h-[calc(100svh-72px)] min-h-[600px] w-full overflow-hidden bg-black">
      
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={HeroImage}
        autoPlay
        muted={muted}
        loop
        playsInline
        preload="metadata"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-end">
        <div className="mx-auto w-full max-w-[1600px] px-5 pb-12 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
          
          <div className="max-w-4xl text-white">
            
            {/* Small Label */}
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              Sneak.in — New Collection
            </p>

            {/* Main Heading */}
            <h1 className="max-w-4xl text-[clamp(3.8rem,9vw,9rem)] font-black uppercase leading-[0.82] tracking-[-0.06em]">
              Move
              <br />
              Different.
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-md text-sm leading-6 text-white/75 sm:text-base">
              Step into sneakers designed for everyday movement,
              effortless style, and your next adventure.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              
              <Link
                to="/products"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition duration-300 hover:bg-zinc-200"
              >
                Shop Sneakers

                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                to="/products"
                className="rounded-full border border-white/40 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:bg-white hover:text-black"
              >
                Explore Collection
              </Link>

            </div>
          </div>
        </div>
      </div>

      {/* Sound Button */}
      <button
        type="button"
        onClick={() => setMuted(!muted)}
        className="absolute bottom-6 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-md transition hover:bg-white hover:text-black sm:bottom-8 sm:right-8"
        aria-label={muted ? "Turn sound on" : "Turn sound off"}
      >
        {muted ? (
          <VolumeX size={18} />
        ) : (
          <Volume2 size={18} />
        )}
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 md:flex">
        <span className="text-[9px] font-semibold uppercase tracking-[0.3em]">
          Scroll
        </span>

        <div className="h-10 w-px bg-white/40" />
      </div>

    </section>
  );
}

export default Hero;