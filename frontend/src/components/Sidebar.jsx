import React, { useState } from 'react';
import {
    LayoutDashboard,
    Briefcase,
    FileUser,
    BarChart3,
    Settings,
    Trophy,
    Menu,
    X,
    LogOut,
    User,
    Zap
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

const NavItem = ({ to, icon, label, isOpen }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${isActive
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
        >
            <div className={`${isActive ? 'text-white' : 'group-hover:text-indigo-400'}`}>
                {icon}
            </div>
            {isOpen && <span className="font-medium whitespace-nowrap">{label}</span>}
        </Link>
    );
};

const Sidebar = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <>
            {/* Mobile Overlay */}
            {!isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(true)}
                ></div>
            )}

            <aside className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20 -left-full lg:left-0'
                } bg-[#1e293b] border-r border-white/5 flex flex-col`}>

                {/* Logo Area */}
                <div className={`p-6 flex items-center ${isOpen ? 'justify-between' : 'justify-center'}`}>
                    {isOpen && <Link to="/" className="text-xl font-bold gradient-text">AI-Recruiter</Link>}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-lg hover:bg-white/5 text-slate-400 lg:hidden"
                    >
                        <X size={20} />
                    </button>
                    {!isOpen && <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">AI</div>}
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto no-scrollbar">
                    <NavItem to="/admin" icon={<LayoutDashboard size={20} />} label="Overview" isOpen={isOpen} />
                    <NavItem to="/admin/new-screening" icon={<Zap size={20} />} label="AI Screening" isOpen={isOpen} />
                    <NavItem to="/admin/jobs" icon={<Briefcase size={20} />} label="Job Roles" isOpen={isOpen} />
                    <NavItem to="/admin/resumes" icon={<FileUser size={20} />} label="Resume Bank" isOpen={isOpen} />
                    <NavItem to="/admin/analytics" icon={<BarChart3 size={20} />} label="Analytics" isOpen={isOpen} />
                    <div className="pt-4 mt-4 border-t border-white/5">
                        <NavItem to="/admin/settings" icon={<Settings size={20} />} label="Settings" isOpen={isOpen} />
                    </div>
                </nav>

                {/* Footer / User Profile in Sidebar */}
                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 p-3 text-slate-400 hover:text-rose-400 transition-colors rounded-xl hover:bg-rose-400/10`}
                    >
                        <LogOut size={20} />
                        {isOpen && <span className="font-medium">Logout</span>}
                    </button>
                </div>
            </aside>
        </>
    );
};


export default Sidebar;
