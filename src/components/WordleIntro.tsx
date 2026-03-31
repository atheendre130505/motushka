import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Unlock } from 'lucide-react';

interface WordleIntroProps {
    onUnlock: () => void;
}

const TARGET_WORD = 'FATTU';
const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

const KEYBOARD_ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
];

export default function WordleIntro({ onUnlock }: WordleIntroProps) {
    const [guesses, setGuesses] = useState<string[]>([]);
    const [currentGuess, setCurrentGuess] = useState('');
    const [isGameOver, setIsGameOver] = useState(false);
    const [showError, setShowError] = useState(false);

    const onKeyPress = useCallback((key: string) => {
        if (isGameOver) return;

        if (key === 'ENTER') {
            if (currentGuess.length !== WORD_LENGTH) {
                setShowError(true);
                setTimeout(() => setShowError(false), 1000);
                return;
            }
            const newGuesses = [...guesses, currentGuess];
            setGuesses(newGuesses);
            if (currentGuess === TARGET_WORD) {
                setIsGameOver(true);
                setTimeout(() => onUnlock(), 2500); // Wait for win animation
            } else if (newGuesses.length >= MAX_GUESSES) {
                setIsGameOver(true);
                // Let them re-try or auto-unlock anyway for romantic reasons? 
                // Let's reset the board so they HAVE to guess it
                setTimeout(() => {
                    setGuesses([]);
                    setCurrentGuess('');
                    setIsGameOver(false);
                }, 2000);
            }
            setCurrentGuess('');
        } else if (key === 'BACKSPACE') {
            setCurrentGuess(prev => prev.slice(0, -1));
        } else if (currentGuess.length < WORD_LENGTH && /^[A-Z]$/.test(key)) {
            setCurrentGuess(prev => prev + key);
        }
    }, [currentGuess, guesses, isGameOver, onUnlock]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') onKeyPress('ENTER');
            else if (e.key === 'Backspace') onKeyPress('BACKSPACE');
            else {
                const key = e.key.toUpperCase();
                if (/^[A-Z]$/.test(key)) onKeyPress(key);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onKeyPress]);

    const getLetterStatus = (letter: string, index: number, guess: string) => {
        const targetLetters = TARGET_WORD.split('');
        const guessLetters = guess.split('');

        // First pass for exact matches
        if (guess[index] === TARGET_WORD[index]) return 'correct';

        // Check for present letters
        let targetCount = targetLetters.filter(l => l === letter).length;
        let correctCount = 0;
        for (let i = 0; i < WORD_LENGTH; i++) {
            if (targetLetters[i] === guessLetters[i] && targetLetters[i] === letter) correctCount++;
        }

        let remainingTarget = targetCount - correctCount;

        if (remainingTarget > 0) {
            let placedBefore = 0;
            for (let i = 0; i <= index; i++) {
                if (guessLetters[i] === letter && guessLetters[i] !== targetLetters[i]) placedBefore++;
            }
            if (placedBefore <= remainingTarget) return 'present';
        }

        return 'absent';
    };

    const getKeyColor = (key: string) => {
        let status = 'bg-gray-800';
        for (let guess of guesses) {
            for (let i = 0; i < guess.length; i++) {
                if (guess[i] === key) {
                    const lStatus = getLetterStatus(key, i, guess);
                    if (lStatus === 'correct') return 'bg-acid text-black';
                    if (lStatus === 'present' && status !== 'bg-acid text-black') status = 'bg-gold text-black';
                    if (lStatus === 'absent' && status === 'bg-gray-800') status = 'bg-gray-900 border-gray-700';
                }
            }
        }
        return status;
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-midnight overflow-hidden px-4 py-8">
            <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-electric via-crimson to-gold drop-shadow-[0_0_10px_rgba(255,0,127,0.5)] mb-8 tracking-widest text-center">
                GUESS THE WORD
            </h1>

            <AnimatePresence>
                {showError && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-20 bg-white text-black px-4 py-2 rounded font-bold font-cinematic z-50"
                    >
                        Not enough letters
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid gap-2 mb-8">
                {Array.from({ length: MAX_GUESSES }).map((_, rowIndex) => {
                    const guess = guesses[rowIndex] || (rowIndex === guesses.length ? currentGuess : '');
                    const isSubmitted = rowIndex < guesses.length;

                    return (
                        <div key={rowIndex} className="flex gap-2 justify-center">
                            {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
                                const letter = guess[colIndex] || '';
                                let bgColor = 'bg-transparent border-gray-600';

                                if (isSubmitted) {
                                    const status = getLetterStatus(letter, colIndex, guess);
                                    if (status === 'correct') bgColor = 'bg-acid border-acid text-black';
                                    else if (status === 'present') bgColor = 'bg-gold border-gold text-black';
                                    else bgColor = 'bg-gray-900 border-gray-800 text-gray-500';
                                } else if (letter) {
                                    bgColor = 'border-gray-400';
                                }

                                return (
                                    <motion.div
                                        key={colIndex}
                                        initial={isSubmitted ? { rotateX: 90 } : { scale: letter ? 1.1 : 1 }}
                                        animate={isSubmitted ? { rotateX: 0 } : { scale: 1 }}
                                        transition={isSubmitted ? { delay: colIndex * 0.1, duration: 0.4 } : { duration: 0.1 }}
                                        className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center border-2 text-2xl sm:text-3xl font-bold uppercase rounded ${bgColor}`}
                                    >
                                        {letter}
                                    </motion.div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>

            <div className="w-full max-w-lg space-y-2 mt-4 sm:mt-12 px-2 z-20">
                {KEYBOARD_ROWS.map((row, i) => (
                    <div key={i} className="flex justify-center gap-1 sm:gap-2">
                        {row.map(key => {
                            const isSpecial = key === 'ENTER' || key === 'BACKSPACE';
                            return (
                                <button
                                    key={key}
                                    onClick={() => onKeyPress(key)}
                                    className={`
                    ${isSpecial ? 'px-2 sm:px-4 text-xs sm:text-sm' : 'w-8 sm:w-10 text-sm sm:text-base'} 
                    h-12 sm:h-14 rounded font-bold transition-all active:scale-95 flex items-center justify-center
                    ${getKeyColor(key)} 
                    ${!isSpecial && getKeyColor(key) === 'bg-gray-800' ? 'hover:bg-gray-700' : ''}
                  `}
                                >
                                    {key === 'BACKSPACE' ? '⌫' : key}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {guesses.includes(TARGET_WORD) && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 bg-midnight/90 backdrop-blur-sm z-40 flex items-center justify-center flex-col text-electric"
                    >
                        <Unlock size={64} className="mb-4 animate-bounce text-acid" />
                        <h2 className="text-3xl text-center font-cinematic font-bold">Word Unlocked!</h2>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
