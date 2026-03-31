import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function Scene4DateMap() {
    const locations = [
        { name: "NIMHANS Brain Museum", desc: "Where the craziness began. Our very first date.", color: "text-electric" },
        { name: "Baking a Pizza", desc: "Making a mess, but making it together.", color: "text-acid" },
        { name: "Chickpet", desc: "Navigating the crowds with you.", color: "text-gold" },
        { name: "And so on...", desc: "Making memories every single day.", color: "text-crimson" },
        { name: "Bengaluru", desc: "To be continued...", color: "text-white" }
    ];

    return (
        <div className="min-h-screen w-full py-24 px-8 bg-midnight relative overflow-hidden">
            <h2 className="text-4xl text-center font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-acid to-electric mb-20 drop-shadow-[0_0_10px_rgba(178,255,5,0.5)]">
                OUR ORBIT
            </h2>

            <div className="relative max-w-lg mx-auto">
                {/* The Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-electric via-crimson to-transparent transform -translate-x-1/2 opacity-30 shadow-[0_0_15px_rgba(255,0,127,1)]"></div>

                <div className="space-y-24">
                    {locations.map((loc, index) => (
                        <motion.div
                            key={index}
                            className={`relative flex items-center ${index % 2 === 0 ? 'justify-start text-right' : 'justify-end text-left'}`}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            <div
                                className={`w-1/2 ${index % 2 === 0 ? 'pr-10' : 'pl-10'} relative`}
                            >
                                <div className={`text-2xl md:text-3xl font-bold ${loc.color} drop-shadow-md mb-2`}>
                                    {loc.name}
                                </div>
                                <div className="text-gray-400 font-typewriter text-sm">
                                    {loc.desc}
                                </div>

                                {/* Orbiting effect */}
                                <motion.div
                                    className="absolute top-1/2"
                                    style={{ [index % 2 === 0 ? 'right' : 'left']: '-20px', translateY: '-50%' }}
                                    animate={{
                                        rotate: [0, 360],
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                >
                                    <MapPin size={24} className={loc.color} />
                                </motion.div>
                            </div>

                            {/* Center Dot */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10 border-2 border-midnight"></div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <motion.div
                className="mt-32 text-center pb-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                viewport={{ once: true }}
            >
                <div className="text-xl font-cinematic text-electric italic">
                    Here's to a lifetime of madness.<br />
                    <span className="font-bold text-2xl mt-4 block">Love, Chabbumon</span>
                </div>
            </motion.div>
        </div>
    );
}
