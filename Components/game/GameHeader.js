
import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Calendar } from 'lucide-react';

export default function GameHeader({ gameState }) {
    return (
        <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-black/40 backdrop-blur-sm border-b border-amber-500/30"
        >
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-full flex items-center justify-center">
                            <Crown className="w-6 h-6 text-black" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-amber-400">
                                The Last Kingdom
                            </h1>
                            <p className="text-gray-300 text-sm">
                                {gameState?.player_name ? `Ruler: ${gameState.player_name}` : 'Prepare to Rule'}
                            </p>
                        </div>
                    </div>
                    
                    {gameState && (
                        <div className="text-right">
                            <div className="flex items-center gap-2 text-amber-400 mb-1">
                                <Calendar className="w-4 h-4" />
                                <span className="font-bold">Year {gameState.year}</span>
                            </div>
                            <p className="text-gray-300 text-sm">
                                Events Survived: {gameState.events_survived}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </motion.header>
    );
}