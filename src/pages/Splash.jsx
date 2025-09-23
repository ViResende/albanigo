import { Link } from "react-router-dom";
import hero from "../assets/albanigo_hero.png";

export default function Splash() {
    return (
        <div
            className="relative h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${hero})` }}
        >
            {/* overlays */}
            <div className="absolute inset-0 bg-splash/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* content */}
            <div className="relative z-10 flex h-full items-center justify-center">
                <div className="text-center text-white px-4">
                    <h1 className="text-6xl md:text-7xl font-extrabold drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
                        AlbaniGo
                    </h1>
                    <p className="mt-4 text-lg md:text-xl opacity-95">
                        Learning Albanian has never been so fun
                    </p>

                    <div className="mt-8 flex gap-4 justify-center">
                        <Link to="/login">
                            <button className="bg-white/95 text-splash px-6 py-2 rounded-lg font-semibold hover:bg-white">
                                Log In
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="border border-white/60 px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-splash">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}





