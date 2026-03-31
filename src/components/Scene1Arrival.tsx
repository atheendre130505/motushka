import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Candy, Pizza, Coffee, Flame, Cherry, Martini } from 'lucide-react';

interface Scene1Props {
    onNext: () => void;
}

export default function Scene1Arrival({ onNext }: Scene1Props) {
    const [shattered, setShattered] = useState(false);

    // Background floating items configuration
    const floatingItems = [
        { Icon: Candy, color: "text-electric", size: 40, x: -150, y: -100, delay: 0 },
        { Icon: Pizza, color: "text-gold", size: 50, x: 200, y: -150, delay: 1 },
        { Icon: Flame, color: "text-crimson", size: 60, x: -250, y: 100, delay: 0.5 },
        { Icon: Coffee, color: "text-white", size: 45, x: 150, y: 150, delay: 1.5 },
        { Icon: Cherry, color: "text-acid", size: 35, x: -100, y: -250, delay: 2 },
        { Icon: Martini, color: "text-electric", size: 50, x: 300, y: 50, delay: 0.8 },
    ];

    // Center Hero Candy floating animation
    const candyVariants = {
        float: {
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        },
        shatter: {
            scale: [1, 1.5, 2],
            opacity: [1, 0.8, 0],
            rotate: 45,
            filter: ["blur(0px)", "blur(4px)", "blur(10px)"],
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 1.5, delay: 0.5, ease: "easeOut" }
        }
    };

    const handleCandyClick = () => {
        setShattered(true);
        // Move to next scene after reading the title
        setTimeout(() => {
            onNext();
        }, 4000); // Title stays for 4s before moving
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center relative bg-midnight overflow-hidden">

            {/* Background Floating Food */}
            {floatingItems.map((item, index) => (
                <motion.div
                    key={`bg-item-${index}`}
                    className={`absolute ${item.color} opacity-30`}
                    initial={{ x: item.x, y: item.y }}
                    animate={{
                        y: [item.y, item.y - 30, item.y],
                        x: [item.x, item.x + 20, item.x - 20, item.x],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 8 + Math.random() * 4,
                        repeat: Infinity,
                        delay: item.delay,
                        ease: "easeInOut"
                    }}
                >
                    <item.Icon size={item.size} strokeWidth={1.5} />
                </motion.div>
            ))}

            <AnimatePresence>
                {!shattered ? (
                    <motion.div
                        key="candy"
                        variants={candyVariants}
                        animate="float"
                        exit="shatter"
                        className="cursor-pointer text-electric hover:text-acid transition-colors duration-300 z-20 flex flex-col items-center"
                        onClick={handleCandyClick}
                        whileHover={{ scale: 1.1 }}
                        title="Click me"
                    >
                        <Candy size={100} strokeWidth={1.5} />
                        <p className="text-center mt-6 text-sm font-typewriter text-gray-400 animate-pulse bg-midnight/50 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                            Touch to open
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="title"
                        variants={titleVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-center justify-center z-20"
                    >
                        <h1 className="text-4xl md:text-6xl font-black tracking-widest text-center text-transparent bg-clip-text bg-gradient-to-r from-electric via-crimson to-gold drop-shadow-[0_0_15px_rgba(255,0,127,0.8)]">
                            6 MONTHS OF <br />
                            <span className="text-acid">MADNESS</span>
                        </h1>
                        <p className="mt-6 text-lg font-typewriter text-gray-400">Welcome to Chaos with Chabbumon</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
