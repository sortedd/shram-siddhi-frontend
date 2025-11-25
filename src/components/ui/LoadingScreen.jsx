import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
    // Brick variants for the stacking animation
    const brickVariants = {
        hidden: { y: -50, opacity: 0 },
        visible: (i) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.2,
                duration: 0.5,
                type: "spring",
                stiffness: 120
            }
        })
    };

    const containerVariants = {
        exit: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.5 }
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit="exit"
            variants={containerVariants}
        >
            <div className="relative w-32 h-32 mb-8">
                {/* Construction Animation: Stacking Bricks */}
                <div className="flex flex-col items-center justify-end h-full space-y-1">
                    {/* Top Brick */}
                    <motion.div
                        custom={2}
                        variants={brickVariants}
                        initial="hidden"
                        animate="visible"
                        className="w-12 h-6 bg-primary rounded-sm shadow-md"
                    />
                    {/* Middle Row */}
                    <div className="flex space-x-1">
                        <motion.div
                            custom={1}
                            variants={brickVariants}
                            initial="hidden"
                            animate="visible"
                            className="w-12 h-6 bg-secondary rounded-sm shadow-md"
                        />
                        <motion.div
                            custom={1.5}
                            variants={brickVariants}
                            initial="hidden"
                            animate="visible"
                            className="w-12 h-6 bg-secondary rounded-sm shadow-md"
                        />
                    </div>
                    {/* Bottom Row */}
                    <div className="flex space-x-1">
                        <motion.div
                            custom={0}
                            variants={brickVariants}
                            initial="hidden"
                            animate="visible"
                            className="w-12 h-6 bg-accent rounded-sm shadow-md"
                        />
                        <motion.div
                            custom={0.5}
                            variants={brickVariants}
                            initial="hidden"
                            animate="visible"
                            className="w-12 h-6 bg-accent rounded-sm shadow-md"
                        />
                        <motion.div
                            custom={0.8}
                            variants={brickVariants}
                            initial="hidden"
                            animate="visible"
                            className="w-12 h-6 bg-accent rounded-sm shadow-md"
                        />
                    </div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="text-center"
            >
                <h2 className="text-2xl font-heading font-bold text-primary mb-2">
                    Shram Siddhi
                </h2>
                <p className="text-muted-foreground font-caption animate-pulse">
                    Building the Future...
                </p>
            </motion.div>
        </motion.div>
    );
};

export default LoadingScreen;
