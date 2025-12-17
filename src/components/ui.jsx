import React from 'react'
import clsx from 'clsx'

export const Input = ({ label, className, ...props }) => (
    <div className="space-y-1">
        {label && <label className="text-sm font-medium text-slate-400">{label}</label>}
        <input
            className={clsx(
                "w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-slate-600 transition-all",
                className
            )}
            {...props}
        />
    </div>
)

export const Textarea = ({ label, className, ...props }) => (
    <div className="space-y-1">
        {label && <label className="text-sm font-medium text-slate-400">{label}</label>}
        <textarea
            className={clsx(
                "w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-slate-600 transition-all min-h-[100px]",
                className
            )}
            {...props}
        />
    </div>
)

export const Button = ({ children, variant = 'primary', className, ...props }) => {
    const variants = {
        primary: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/20",
        secondary: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700",
        ghost: "bg-transparent hover:bg-slate-800 text-slate-400 hover:text-slate-100"
    }
    return (
        <button
            className={clsx(
                "px-4 py-2 rounded-lg font-medium transition-all active:scale-95 flex items-center justify-center gap-2",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}
