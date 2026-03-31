import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hand, Pizza } from 'lucide-react';

export default function Scene2Tease() {
    const [isStolen, setIsStolen] = useState(false);
    const [showQuote, setShowQuote] = useState(false);

    const handleSteal = () => {
        setIsStolen(true);
        setTimeout(() => {
            setShowQuote(true);
        }, 1000);
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-midnight">
            <motion.div
                className="w-full max-w-md text-center mb-16"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h2 className="text-3xl font-bold text-electric mb-4">
                    The "Annoyance"
                </h2>
                <p className="text-gray-400 font-typewriter text-sm">
                    You call me an annoyance, but...
                </p>
            </motion.div>

            <div className="h-48 relative w-full flex justify-center">
                {!showQuote ? (
                    <div className="relative cursor-pointer" onClick={handleSteal}>
                        {!isStolen ? (
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="text-gold"
                            >
                                <Pizza size={80} strokeWidth={1.5} />
                                <p className="mt-4 text-gray-400 font-typewriter text-sm animate-pulse">Guard the pizza</p>
                            </motion.div>
                        ) : null}

                        <motion.div
                            initial={{ x: 300, y: -50, opacity: 0 }}
                            animate={isStolen ? { x: 0, y: 0, opacity: 1 } : {}}
                            transition={{ duration: 0.5 }}
                            className="absolute top-0 right-0 text-gray-300"
                            style={{ display: isStolen ? 'block' : 'none' }}
                        >
                            <Hand size={100} strokeWidth={1} />
                        </motion.div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center"
                    >
                        <p className="text-3xl font-cinematic text-acid font-bold">
                            "You can steal my food, but you already stole my heart."
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
