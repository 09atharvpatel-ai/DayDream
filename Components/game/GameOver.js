import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Skull, RotateCcw, Trophy } from 'lucide-react';

export default function GameOver({ gameState, onRestart }) {
    const getGameOverMessage = () => {
        if (gameState.population <= 0) return "Your people have perished. The kingdom falls into ruin.";
        if (gameState.food <= 0) return "Famine consumes the land. Your reign ends in starvation.";
        if (gameState.gold <= 0) return "The treasury lies empty. Your kingdom crumbles into debt.";
        if (gameState.military <= 0) return "Without defenders, your realm falls to enemies.";
        return "Your reign has ended.";
    };

    const getScoreRating = (score) => {
        if (score >= 800) return { rating: "Legendary Ruler", color: "text-amber-400" };
        if (score >= 600) return { rating: "Great Monarch", color: "text-purple-400" };
        if (score >= 400) return { rating: "Competent Leader", color: "text-blue-400" };
        if (score >= 200) return { rating: "Struggling Ruler", color: "text-green-400" };
        return { rating: "Failed Sovereign", color: "text-red-400" };
    };

    const scoreRating = getScoreRating(gameState.final_score);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="max-w-2xl mx-auto mt-8"
        >
            <Card className="bg-black/80 backdrop-blur-lg border-2 border-red-500/30 text-center overflow-hidden">
                <div className="relative h-32 bg-gradient-to-r from-red-900/50 to-purple-900/50">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=20')] bg-cover bg-center opacity-20" />
                    <div className="relative z-10 flex items-center justify-center h-full">
                        <Skull className="w-16 h-16 text-red-400" />
                    </div>
                </div>

                <CardHeader className="pb-4">
                    <CardTitle className="text-3xl font-bold text-red-400 mb-2">
                        The Reign Ends
                    </CardTitle>
                    <p className="text-gray-300 text-lg italic">
                        {getGameOverMessage()}
                    </p>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-purple-900/30 rounded-lg p-4">
                            <div className="text-purple-400 text-sm font-medium">Years Ruled</div>
                            <div className="text-2xl font-bold text-white">{gameState.year - 1}</div>
                        </div>
                        <div className="bg-amber-900/30 rounded-lg p-4">
                            <div className="text-amber-400 text-sm font-medium">Events Survived</div>
                            <div className="text-2xl font-bold text-white">{gameState.events_survived}</div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-900/40 to-amber-900/40 rounded-xl p-6 border border-amber-500/30">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Trophy className="w-6 h-6 text-amber-400" />
                            <span className="text-amber-400 font-medium">Final Score</span>
                        </div>
                        <div className="text-4xl font-bold text-amber-400 mb-2">
                            {gameState.final_score.toLocaleString()}
                        </div>
                        <div className={`text-lg font-semibold ${scoreRating.color}`}>
                            {scoreRating.rating}
                        </div>
                    </div>

                    <div className="text-center text-gray-400 text-sm italic border-t border-gray-700 pt-4">
                        "Every crown bears the weight of the choices beneath it."
                    </div>

                    <Button
                        onClick={onRestart}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-6 text-lg font-semibold"
                    >
                        <RotateCcw className="w-5 h-5 mr-2" />
                        Rule Again
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
}