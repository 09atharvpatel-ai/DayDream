import React, { useState, useEffect } from 'react';
import { GameState } from '@/entities/GameState';
import { User } from '@/entities/User';
import { motion, AnimatePresence } from 'framer-motion';

import GameHeader from '../components/game/GameHeader';
import ResourcePanel from '../components/game/ResourcePanel';
import EventCard from '../components/game/EventCard';
import GameOver from '../components/game/GameOver';
import Tutorial from '../components/game/Tutorial';

const GAME_EVENTS = [
    {
        id: 1,
        title: "The Great Famine",
        description: "Harsh winter has destroyed crops. Your people are starving, but neighboring kingdoms offer help at a steep price.",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
        choices: [
            {
                text: "Sacrifice half our gold reserves to buy food",
                effects: { food: 40, gold: -50 },
                consequence: "The treasury empties, but your people eat tonight."
            },
            {
                text: "Force rationing - some will starve for the greater good",
                effects: { population: -30, food: 20 },
                consequence: "Families mourn their lost, but resources are preserved."
            },
            {
                text: "Send military to raid neighboring farms",
                effects: { food: 30, military: -20 },
                consequence: "Soldiers die in battle, but return with stolen grain."
            }
        ]
    },
    {
        id: 2,
        title: "The Plague Spreads",
        description: "A deadly disease ravages your kingdom. The royal physician suggests extreme measures to contain the outbreak.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
        choices: [
            {
                text: "Quarantine infected districts - sacrifice the few for the many",
                effects: { population: -25, gold: -10 },
                consequence: "Infected areas burn. The screams echo through the night."
            },
            {
                text: "Spend all medical resources on treatment",
                effects: { gold: -40, population: -10 },
                consequence: "The treasury bleeds as heavily as the people."
            },
            {
                text: "Evacuate the healthy, abandon the sick",
                effects: { population: -35, military: -15 },
                consequence: "Soldiers refuse orders. Some things are too cruel, even for war."
            }
        ]
    },
    {
        id: 3,
        title: "Enemy at the Gates",
        description: "A massive army surrounds your capital. They demand tribute or threaten total destruction of your kingdom.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
        choices: [
            {
                text: "Pay tribute - sacrifice pride for peace",
                effects: { gold: -60, food: -20 },
                consequence: "Your crown grows heavy with shame, but war is avoided."
            },
            {
                text: "Fight to the last soldier",
                effects: { military: -50, population: -20 },
                consequence: "Heroes fall like autumn leaves. Glory demands blood."
            },
            {
                text: "Negotiate - offer them your citizens as labor",
                effects: { population: -40, gold: 20 },
                consequence: "Chains rattle as families are torn apart for gold."
            }
        ]
    },
    {
        id: 4,
        title: "The False Prophet",
        description: "A charismatic leader claims divine power, splitting your people's loyalty. Civil war threatens to tear the kingdom apart.",
        image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=80",
        choices: [
            {
                text: "Execute the prophet publicly",
                effects: { population: -15, military: -25 },
                consequence: "Blood stains the execution block. Martyrdom is a dangerous thing."
            },
            {
                text: "Bribe the prophet's followers with gold",
                effects: { gold: -45, population: 10 },
                consequence: "Gold buys temporary loyalty, but principles remain for sale."
            },
            {
                text: "Flee the capital with loyalists",
                effects: { population: -30, food: -25, military: -20 },
                consequence: "Exile tastes bitter, but sometimes retreat preserves tomorrow."
            }
        ]
    },
    {
        id: 5,
        title: "The Dragon's Demand",
        description: "An ancient dragon awakens, demanding tribute of gold and livestock. Refusing means facing its terrible wrath.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
        choices: [
            {
                text: "Give the dragon everything it demands",
                effects: { gold: -70, food: -40 },
                consequence: "The dragon's appetite knows no bounds. Your people watch their future disappear into its maw."
            },
            {
                text: "Rally heroes to slay the beast",
                effects: { military: -60, gold: -30 },
                consequence: "Brave souls march to their doom. Some fights are worth dying for."
            },
            {
                text: "Offer the dragon rule over distant provinces",
                effects: { population: -50, military: 20 },
                consequence: "Screams from the borderlands echo in your nightmares."
            }
        ]
    }
];

export default function Game() {
    const [gameState, setGameState] = useState(null);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [showTutorial, setShowTutorial] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const currentUser = await User.me();
            setUser(currentUser);
        } catch (error) {
            console.log('User not logged in');
        }
    };

    const startNewGame = async () => {
        setIsLoading(true);
        const newGame = await GameState.create({
            player_name: user?.full_name || "Anonymous Ruler",
            population: 100,
            food: 100,
            gold: 100,
            military: 100,
            year: 1,
            events_survived: 0,
            is_game_over: false,
            final_score: 0
        });
        setGameState(newGame);
        setCurrentEvent(getRandomEvent());
        setShowTutorial(false);
        setIsLoading(false);
    };

    const getRandomEvent = () => {
        return GAME_EVENTS[Math.floor(Math.random() * GAME_EVENTS.length)];
    };

    const makeChoice = async (choice) => {
        if (!gameState || gameState.is_game_over) return;

        setIsLoading(true);

        const newState = {
            population: Math.max(0, gameState.population + (choice.effects.population || 0)),
            food: Math.max(0, gameState.food + (choice.effects.food || 0)),
            gold: Math.max(0, gameState.gold + (choice.effects.gold || 0)),
            military: Math.max(0, gameState.military + (choice.effects.military || 0)),
            year: gameState.year + 1,
            events_survived: gameState.events_survived + 1
        };

        // Check for game over conditions
        const isGameOver = newState.population <= 0 || newState.food <= 0 || 
                          newState.gold <= 0 || newState.military <= 0;

        if (isGameOver) {
            const finalScore = Math.floor(
                (newState.events_survived * 100) + 
                (newState.population + newState.food + newState.gold + newState.military) / 4
            );
            
            await GameState.update(gameState.id, {
                ...newState,
                is_game_over: true,
                final_score: finalScore
            });
        } else {
            await GameState.update(gameState.id, newState);
        }

        // Reload game state
        const updatedGame = await GameState.get(gameState.id);
        setGameState(updatedGame);

        if (!isGameOver) {
            setTimeout(() => {
                setCurrentEvent(getRandomEvent());
                setIsLoading(false);
            }, 2000);
        } else {
            setCurrentEvent(null);
            setIsLoading(false);
        }
    };

    if (showTutorial) {
        return <Tutorial onStart={startNewGame} isLoading={isLoading} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1920&q=20')] bg-cover bg-center opacity-10" />
            
            <div className="relative z-10">
                <GameHeader gameState={gameState} />
                
                <div className="container mx-auto px-4 py-8">
                    {gameState && (
                        <ResourcePanel
                            population={gameState.population}
                            food={gameState.food}
                            gold={gameState.gold}
                            military={gameState.military}
                        />
                    )}

                    <AnimatePresence mode="wait">
                        {gameState?.is_game_over ? (
                            <GameOver 
                                gameState={gameState} 
                                onRestart={() => {
                                    setGameState(null);
                                    setShowTutorial(true);
                                }}
                            />
                        ) : currentEvent && !isLoading && (
                            <EventCard
                                key={currentEvent.id}
                                event={currentEvent}
                                onChoice={makeChoice}
                                isLoading={isLoading}
                            />
                        )}
                    </AnimatePresence>

                    {isLoading && !gameState?.is_game_over && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-center items-center py-20"
                        >
                            <div className="text-center">
                                <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                                <p className="text-gray-300 text-lg">The consequences unfold...</p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}