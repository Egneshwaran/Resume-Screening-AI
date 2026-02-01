import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, LayoutDashboard, LogOut } from 'lucide-react';
import authService from '../services/auth.service';

const LandingNavbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isAuthenticated = authService.isAuthenticated();

    const handleLogout = () => {
        authService.logout();
        navigate('/');
        window.location.reload();
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Resume Checker', href: '/resume-checker', internal: true },
        { name: 'Resume Screening', href: '/admin/jobs', internal: true },
        { name: 'Features', href: '#features', internal: false },
        { name: 'How It Works', href: '#how-it-works', internal: false },
        { name: 'Dashboard', href: isAuthenticated ? '/admin' : '/', internal: true },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0f172a]/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'
            }`}>
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">AI</div>
                        <span className="text-xl font-bold gradient-text">RecruitAI</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            link.internal ? (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ) : (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors"
                                >
                                    {link.name}
                                </a>
                            )
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden lg:flex items-center gap-4">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/admin"
                                    className="flex items-center gap-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border border-indigo-500/20"
                                >
                                    <LayoutDashboard size={18} /> Go to Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border border-rose-500/20"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2"
                                >
                                    Start Free <ArrowRight size={16} />
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-slate-300"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-[#1e293b] border-b border-white/5 p-4 animate-in slide-in-from-top duration-300">
                    <div className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            link.internal ? (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-slate-300 hover:text-white font-medium p-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ) : (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-slate-300 hover:text-white font-medium p-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            )
                        ))}
                        <div className="h-[1px] bg-white/5 my-2"></div>
                        {isAuthenticated ? (
                            <div className="flex flex-col gap-3">
                                <Link
                                    to="/admin"
                                    className="bg-indigo-600 text-white text-center py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <LayoutDashboard size={18} /> Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-rose-500/10 text-rose-400 text-center py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                                >
                                    <LogOut size={18} /> Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-slate-300 hover:text-white font-medium p-2 text-center"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-indigo-600 text-white text-center py-3 rounded-xl font-semibold"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Start Free
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default LandingNavbar;
