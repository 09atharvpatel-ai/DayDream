import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Scroll } from 'lucide-react';

export default function EventCard({ event, onChoice, isLoading }) {
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [showConsequence, setShowConsequence] = useState(false);

    const handleChoice = async (choice) => {
        setSelectedChoice(choice);
        setShowConsequence(true);
        
        setTimeout(() => {
            onChoice(choice);
            setSelectedChoice(null);
            setShowConsequence(false);
        }, 2500);
    };

    return (
        <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -100, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="max-w-4xl mx-auto"
        >
            <Card className="bg-black/60 backdrop-blur-lg border-2 border-amber-500/30 overflow-hidden">
                {/* Event Image */}
                <div className="relative h-48 md:h-64 overflow-hidden">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                        <div className="flex items-center gap-2 text-amber-400 mb-2">
                            <Scroll className="w-5 h-5" />
                            <span className="text-sm font-medium">Royal Decree</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                            {event.title}
                        </h2>
                    </div>
                </div>

                <CardContent className="p-6">
                    <p className="text-gray-300 text-lg leading-relaxed mb-8 text-center italic">
                        "{event.description}"
                    </p>

                    {!showConsequence ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4"
                        >
                            <h3 className="text-amber-400 font-semibold text-center mb-6">
                                Choose your path:
                            </h3>
                            {event.choices.map((choice, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Button
                                        onClick={() => handleChoice(choice)}
                                        disabled={isLoading}
                                        className="w-full p-6 h-auto bg-gradient-to-r from-purple-900/50 to-blue-900/50 hover:from-purple-800/60 hover:to-blue-800/60 border border-purple-500/30 hover:border-purple-400/50 text-left transition-all duration-300"
                                    >
                                        <div className="text-white font-medium leading-relaxed">
                                            {choice.text}
                                        </div>
                                        <div className="flex gap-2 mt-2 text-xs">
                                            {Object.entries(choice.effects).map(([resource, value]) => (
                                                <span
                                                    key={resource}
                                                    className={`px-2 py-1 rounded-full font-medium ${
                                                        value > 0
                                                            ? 'bg-green-500/20 text-green-400'
                                                            : 'bg-red-500/20 text-red-400'
                                                    }`}
                                                >
                                                    {resource}: {value > 0 ? '+' : ''}{value}
                                                </span>
                                            ))}
                                        </div>
                                    </Button>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-8"
                        >
                            <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                            <div className="max-w-2xl mx-auto">
                                <p className="text-amber-400 font-bold text-xl mb-4">
                                    Your Choice Has Consequences...
                                </p>
                                <p className="text-gray-300 text-lg italic leading-relaxed">
                                    {selectedChoice?.consequence}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}