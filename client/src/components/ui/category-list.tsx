"use client";
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

// Define the type for a single category item
export interface Category {
    id: string | number;
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    featured?: boolean;
}

// Define the props for the CategoryList component
export interface CategoryListProps {
    title: string;
    subtitle?: string;
    categories: Category[];
    headerIcon?: React.ReactNode;
    className?: string;
}

export const CategoryList = ({
    title,
    subtitle,
    categories,
    headerIcon,
    className,
}: CategoryListProps) => {
    const [hoveredItem, setHoveredItem] = useState<string | number | null>(null);

    // Fallback for missing categories if needed, but for now we expect them to be passed
    const displayCategories = categories || [];

    return (
        <div className={cn("w-full bg-transparent text-foreground py-16 px-4 md:px-8", className)}>
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12 md:mb-16">
                    {headerIcon && (
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/80 to-primary mb-6 text-primary-foreground shadow-lg shadow-primary/20">
                            {headerIcon}
                        </div>
                    )}
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">
                        {title}
                    </h1>
                    {subtitle && (
                        <h2 className="text-xl md:text-2xl font-medium text-muted-foreground mt-4">{subtitle}</h2>
                    )}
                </div>

                {/* Categories List */}
                <div className="space-y-4">
                    {displayCategories.map((category) => (
                        <div
                            key={category.id}
                            className="relative group"
                            onMouseEnter={() => setHoveredItem(category.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                            onClick={category.onClick}
                        >
                            <div
                                className={cn(
                                    "relative overflow-hidden border rounded-2xl transition-all duration-300 ease-in-out cursor-pointer",
                                    // Hover state styles
                                    hoveredItem === category.id
                                        ? 'h-32 border-primary/50 shadow-xl shadow-primary/10 bg-primary/5 dark:bg-primary/10'
                                        : 'h-24 border-border bg-card hover:border-primary/30'
                                )}
                            >
                                {/* Corner brackets that appear on hover */}
                                {hoveredItem === category.id && (
                                    <>
                                        <div className="absolute top-3 left-3 w-6 h-6">
                                            <div className="absolute top-0 left-0 w-4 h-0.5 bg-primary" />
                                            <div className="absolute top-0 left-0 w-0.5 h-4 bg-primary" />
                                        </div>
                                        <div className="absolute bottom-3 right-3 w-6 h-6">
                                            <div className="absolute bottom-0 right-0 w-4 h-0.5 bg-primary" />
                                            <div className="absolute bottom-0 right-0 w-0.5 h-4 bg-primary" />
                                        </div>
                                    </>
                                )}

                                {/* Content */}
                                <div className="flex items-center justify-between h-full px-6 md:px-8">
                                    <div className="flex-1 flex flex-col justify-center">
                                        <h3
                                            className={cn(
                                                "font-bold transition-all duration-300",
                                                category.featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl',
                                                hoveredItem === category.id ? 'text-primary' : 'text-foreground'
                                            )}
                                        >
                                            {category.title}
                                        </h3>
                                        {category.subtitle && (
                                            <p
                                                className={cn(
                                                    "mt-1 transition-all duration-300 text-sm md:text-base line-clamp-1",
                                                    hoveredItem === category.id ? 'text-foreground/80 opacity-100' : 'text-muted-foreground opacity-80'
                                                )}
                                            >
                                                {category.subtitle}
                                            </p>
                                        )}
                                    </div>

                                    {/* Icon appears on the right on hover (or always visible but styled differently) */}
                                    {category.icon && (
                                        <div className={cn(
                                            "transition-all duration-300 transform",
                                            hoveredItem === category.id
                                                ? 'text-primary scale-110 opacity-100'
                                                : 'text-muted-foreground/50 scale-100 opacity-50'
                                        )}>
                                            {category.icon}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
