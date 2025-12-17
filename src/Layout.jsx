import React from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import { FlaskConical, ClipboardList, BarChart3, MessageSquareText, Settings } from 'lucide-react'
import clsx from 'clsx'

const NavItem = ({ to, icon: Icon, label, isActive }) => (
    <Link
        to={to}
        className={clsx(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
            isActive
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/20"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
        )}
    >
        <Icon size={20} className={clsx("transition-transform group-hover:scale-110", isActive && "animate-pulse-subtle")} />
        <span className="font-medium tracking-wide">{label}</span>
    </Link>
)

const Layout = () => {
    const location = useLocation()

    return (
        <div className="flex h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col p-6 shadow-xl z-10">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg">
                        <FlaskConical className="text-white" size={24} />
                    </div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Secretary
                    </h1>
                </div>

                <nav className="flex-1 space-y-2">
                    <NavItem to="/" icon={FlaskConical} label="Design" isActive={location.pathname === '/'} />
                    <NavItem to="/process" icon={ClipboardList} label="Process" isActive={location.pathname === '/process'} />
                    <NavItem to="/results" icon={BarChart3} label="Results" isActive={location.pathname === '/results'} />
                    <div className="my-6 border-t border-slate-800/50" />
                    <NavItem to="/chat" icon={MessageSquareText} label="Assistant" isActive={location.pathname === '/chat'} />
                </nav>

                <div className="mt-auto pt-6 border-t border-slate-800">
                    <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-300 w-full rounded-lg hover:bg-slate-900 transition-colors">
                        <Settings size={20} />
                        <span className="text-sm">Settings</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950">
                <div className="p-8 max-w-7xl mx-auto h-full">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default Layout
