import { useState, useEffect } from 'react';
import Scene1Arrival from './components/Scene1Arrival';
import Scene2Tease from './components/Scene2Tease';
import Scene3DeepDive from './components/Scene3DeepDive';
import Scene4DateMap from './components/Scene4DateMap';

function App() {
    const [introComplete, setIntroComplete] = useState(false);

    useEffect(() => {
        // If we want to unlock scroll after intro
        if (introComplete) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }, [introComplete]);

    return (
        <div className="relative bg-midnight text-white font-cinematic">
            {/* Global Film Grain */}
            <div className="grainy-overlay"></div>

            {/* Main Container */}
            <div className="relative z-10 w-full">
                {!introComplete ? (
                    <Scene1Arrival onNext={() => setIntroComplete(true)} />
                ) : (
                    <div className="flex flex-col">
                        {/* Intro is done, show the scrollable experience */}
                        <div className="min-h-screen flex items-center justify-center p-8 bg-black/40">
                            <h1 className="text-4xl text-center md:text-6xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-electric via-crimson to-gold drop-shadow-[0_0_15px_rgba(255,0,127,0.8)]">
                                6 MONTHS OF <br />
                                <span className="text-acid">MADNESS</span>
                            </h1>
                        </div>
                        <Scene2Tease />
                        <Scene3DeepDive />
                        <Scene4DateMap />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
