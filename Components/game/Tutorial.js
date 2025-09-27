import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Users, Wheat, Coins, Sword, Scroll } from 'lucide-react';

export default function Tutorial({ onStart, isLoading }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            {/* Background */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1920&q=30')] bg-cover bg-center opacity-20" />
            
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-4xl mx-auto"
            >
                <Card className="bg-black/70 backdrop-blur-lg border-2 border-amber-500/30 overflow-hidden">
                    {/* Header */}
                    <div className="relative h-40 bg-gradient-to-r from-amber-900/50 to-purple-900/50">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=20')] bg-cover bg-center opacity-30" />
                        <div className="relative z-10 flex items-center justify-center h-full">
                            <div className="text-center">
                                <Crown className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                                <h1 className="text-4xl md:text-5xl font-bold text-amber-400">
                                    The Last Kingdom
                                </h1>
                                <p className="text-gray-300 text-lg mt-2">
                                    Where Sacrifices Must Be Made
                                </p>
                            </div>
                        </div>
                    </div>

                    <CardContent className="p-8 space-y-8">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-white mb-4">
                                Welcome, Future Ruler
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                Your kingdom teeters on the edge of collapse. Every decision demands sacrifice. 
                                Can you preserve your realm when every choice costs something precious?
                            </p>
                        </div>

                        {/* Resources Explanation */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-amber-400 font-semibold text-xl flex items-center gap-2">
                                    <Scroll className="w-5 h-5" />
                                    Manage Your Resources
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { icon: Users, label: 'Population', desc: 'The heart of your kingdom', color: 'text-blue-400' },
                                        { icon: Wheat, label: 'Food', desc: 'Sustenance for survival', color: 'text-green-400' },
                                        { icon: Coins, label: 'Gold', desc: 'Power through wealth', color: 'text-yellow-400' },
                                        { icon: Sword, label: 'Military', desc: 'Strength against threats', color: 'text-red-400' }
                                    ].map(({ icon: Icon, label, desc, color }) => (
                                        <div key={label} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                            <Icon className={`w-5 h-5 ${color}`} />
                                            <div>
                                                <div className={`font-medium ${color}`}>{label}</div>
                                                <div className="text-gray-400 text-sm">{desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-purple-400 font-semibold text-xl">
                                    The Rules of Survival
                                </h3>
                                <div className="space-y-3 text-gray-300">
                                    <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
                                        <div className="font-medium text-purple-400 mb-1">Balance is Key</div>
                                        <div className="text-sm">Let any resource reach zero and your reign ends</div>
                                    </div>
                                    <div className="p-3 bg-red-900/20 rounded-lg border border-red-500/30">
                                        <div className="font-medium text-red-400 mb-1">Every Choice Costs</div>
                                        <div className="text-sm">No decision comes without sacrifice</div>
                                    </div>
                                    <div className="p-3 bg-amber-900/20 rounded-lg border border-amber-500/30">
                                        <div className="font-medium text-amber-400 mb-1">Survive & Thrive</div>
                                        <div className="text-sm">The longer you rule, the greater your legacy</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center pt-6 border-t border-gray-700">
                            <p className="text-gray-400 italic mb-6">
                                "The crown is heavy with the weight of impossible choices..."
                            </p>
                            
                            <Button
                                onClick={onStart}
                                disabled={isLoading}
                                className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-black font-bold py-4 px-8 text-lg"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                                        Preparing Your Kingdom...
                                    </>
                                ) : (
                                    <>
                                        <Crown className="w-5 h-5 mr-2" />
                                        Begin Your Reign
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}