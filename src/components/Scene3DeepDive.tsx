import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Scene3DeepDive() {
    const quote1 = "I would recognize you in total darkness, were you mute and I deaf. I would recognize you in another lifetime entirely, in different bodies, different times. And I would love you in all of this, until the very last star in the sky burnt out into oblivion.";
    const quote2 = "And I'd choose you; in a hundred lifetimes, in a hundred worlds, in any version of reality, I'd find you and I'd choose you.";

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03, // Faster typing for longer quotes
                delayChildren: 0.5,
            }
        }
    };

    const letterVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.01 }
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-midnight relative">
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none"></div>

            <motion.div
                className="z-10 w-full max-w-4xl text-center space-y-12"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="flex justify-center text-crimson animate-pulse mb-8">
                    <Heart size={48} fill="currentColor" />
                </div>

                <div className="text-lg md:text-2xl leading-relaxed font-cinematic text-white/90 min-h-[300px]">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <p className="mb-8 italic text-electric tracking-wide">
                            {quote1.split("").map((char, i) => (
                                <motion.span key={`q1-${i}`} variants={letterVariants}>{char}</motion.span>
                            ))}
                        </p>
                        <p className="font-bold text-acid tracking-wide">
                            {quote2.split("").map((char, i) => (
                                <motion.span key={`q2-${i}`} variants={letterVariants}>{char}</motion.span>
                            ))}
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
