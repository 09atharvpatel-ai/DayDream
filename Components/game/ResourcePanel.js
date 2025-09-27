import React from 'react';
import { motion } from 'framer-motion';
import { Users, Wheat, Coins, Sword } from 'lucide-react';

const resources = [
    { key: 'population', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/20', label: 'Population' },
    { key: 'food', icon: Wheat, color: 'text-green-400', bg: 'bg-green-500/20', label: 'Food' },
    { key: 'gold', icon: Coins, color: 'text-yellow-400', bg: 'bg-yellow-500/20', label: 'Gold' },
    { key: 'military', icon: Sword, color: 'text-red-400', bg: 'bg-red-500/20', label: 'Military' }
];

export default function ResourcePanel({ population, food, gold, military }) {
    const values = { population, food, gold, military };

    return (
        <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
            {resources.map(({ key, icon: Icon, color, bg, label }, index) => (
                <motion.div
                    key={key}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`${bg} backdrop-blur-sm rounded-xl p-4 border border-white/10`}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <Icon className={`w-5 h-5 ${color}`} />
                        <span className="text-gray-300 font-medium">{label}</span>
                    </div>
                    <div className="space-y-2">
                        <div className={`text-2xl font-bold ${color}`}>
                            {values[key]}
                        </div>
                        <div className="w-full bg-black/30 rounded-full h-2">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.max(0, Math.min(100, values[key]))}%` }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className={`h-2 rounded-full ${
                                    values[key] > 60 ? 'bg-green-500' :
                                    values[key] > 30 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                            />
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}