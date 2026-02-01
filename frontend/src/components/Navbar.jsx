import React, { useState } from 'react';
import { Bell, Search, User, Menu, ChevronDown, LogOut, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

const Navbar = ({ toggleSidebar }) => {
    const currentUser = authService.getCurrentUser();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <header className="h-20 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-30 px-4 lg:px-8">
            <div className="h-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-white/5 text-slate-400 lg:hidden"
                    >
                        <Menu size={24} />
                    </button>
                    <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl w-64 lg:w-96 focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all">
                        <Search size={18} className="text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search resumes, jobs..."
                            className="bg-transparent border-none focus:ring-0 text-sm w-full text-slate-200 placeholder:text-slate-500"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3 lg:gap-6">
                    <button className="relative p-2 rounded-xl hover:bg-white/5 text-slate-400 transition-colors">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#0f172a]"></span>
                    </button>

                    <div className="h-8 w-[1px] bg-white/10 hidden sm:block"></div>

                    <div className="relative">
                        <div
                            className="flex items-center gap-3 pl-2 cursor-pointer group"
                            onClick={() => setShowUserMenu(!showUserMenu)}
                        >
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-slate-200">{currentUser?.username || 'Guest user'}</p>
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider">{currentUser?.role || 'Basic'} Access</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 p-[2px]">
                                <div className="w-full h-full rounded-[10px] bg-[#1e293b] flex items-center justify-center">
                                    <User size={20} className="text-indigo-400" />
                                </div>
                            </div>
                            <ChevronDown size={16} className={`text-slate-500 group-hover:text-slate-300 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                        </div>

                        {showUserMenu && (
                            <div className="absolute right-0 mt-3 w-56 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl z-[60] py-2 animate-in fade-in slide-in-from-top-2">
                                <Link
                                    to="/admin/profile"
                                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                                    onClick={() => setShowUserMenu(false)}
                                >
                                    <User size={16} className="text-indigo-400" />
                                    Your Profile
                                </Link>
                                <Link
                                    to="/admin/settings"
                                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                                    onClick={() => setShowUserMenu(false)}
                                >
                                    <Settings size={16} className="text-slate-500" />
                                    Account Settings
                                </Link>
                                <div className="h-[1px] bg-white/5 my-1 mx-2"></div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-rose-400 hover:bg-white/5 transition-colors"
                                >
                                    <LogOut size={16} />
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
