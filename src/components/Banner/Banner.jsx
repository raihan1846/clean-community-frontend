import React from 'react';

const Banner = () => {
    return (
        <div className="relative w-full">

            <div className="carousel w-full h-[550px] rounded-2xl overflow-hidden shadow-xl">

                {/* Slide 1 */}
                <div id="s1" className="carousel-item relative w-full">
                    <img
                        src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1800&q=80"
                        className="w-full object-cover"
                    />

                    {/* Gradient + Glass Content */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 flex items-center">
                        <div className="backdrop-blur-sm bg-white/10 p-8 md:p-12 rounded-2xl max-w-xl ml-8 md:ml-16 text-white">
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                                Stop the <span className="text-green-400">Garbage Crisis</span>
                            </h1>
                            <p className="mt-4 text-lg opacity-90">
                                Waste pollution is rising every day. Let’s build a cleaner and safer city together.
                            </p>
                            <button className="btn btn-success mt-6 px-8">Take Action</button>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="absolute left-5 right-5 top-1/2 flex justify-between">
                        <a href="#s3" className="btn btn-circle bg-white/30 border-none backdrop-blur-sm">❮</a>
                        <a href="#s2" className="btn btn-circle bg-white/30 border-none backdrop-blur-sm">❯</a>
                    </div>
                </div>

                {/* Slide 2 */}
                <div id="s2" className="carousel-item relative w-full">
                    <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80"
                        className="w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 flex items-center">
                        <div className="backdrop-blur-sm bg-white/10 p-8 md:p-12 rounded-2xl max-w-xl ml-8 md:ml-16 text-white">
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                                Community <span className="text-blue-300">Cleaning Mission</span>
                            </h1>
                            <p className="mt-4 text-lg opacity-90">
                                When people come together, neighborhoods become cleaner, safer, and beautiful.
                            </p>
                            <button className="btn btn-primary mt-6 px-8">Join Now</button>
                        </div>
                    </div>

                    <div className="absolute left-5 right-5 top-1/2 flex justify-between">
                        <a href="#s1" className="btn btn-circle bg-white/30 border-none backdrop-blur-sm">❮</a>
                        <a href="#s3" className="btn btn-circle bg-white/30 border-none backdrop-blur-sm">❯</a>
                    </div>
                </div>

                {/* Slide 3 */}
                <div id="s3" className="carousel-item relative w-full">
                    <img
                        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80"
                        className="w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 flex items-center">
                        <div className="backdrop-blur-sm bg-white/10 p-8 md:p-12 rounded-2xl max-w-xl ml-8 md:ml-16 text-white">
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                                Sustainability <span className="text-yellow-300">Starts Today</span>
                            </h1>
                            <p className="mt-4 text-lg opacity-90">
                                Planting trees, recycling waste, and smarter living can save the environment.
                            </p>
                            <button className="btn btn-warning mt-6 px-8">Get Started</button>
                        </div>
                    </div>

                    <div className="absolute left-5 right-5 top-1/2 flex justify-between">
                        <a href="#s2" className="btn btn-circle bg-white/30 border-none backdrop-blur-sm">❮</a>
                        <a href="#s1" className="btn btn-circle bg-white/30 border-none backdrop-blur-sm">❯</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;