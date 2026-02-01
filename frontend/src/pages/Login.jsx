import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, AlertCircle, Loader2 } from 'lucide-react';
import authService from '../services/auth.service';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect if already logged in - HR user should go to dashboard
        if (authService.isAuthenticated()) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }

        setLoading(true);
        try {
            await authService.login(username, password);
            navigate('/admin', { replace: true });
            window.location.reload(); // Force refresh to ensure all layouts (Sidebar/Navbar) pick up new auth state
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid username or password.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
            <div className="w-full max-w-md animate-in fade-in duration-500">
                {/* Brand Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-4">
                        <span className="text-2xl font-bold text-white">AI</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">AI-Recruiter</h1>
                    <p className="text-slate-400 mt-1">Smart Talent Selection System</p>
                </div>

                {/* Login Card */}
                <div className="glass-card p-8 border border-white/10 shadow-2xl">
                    <h2 className="text-xl font-semibold text-white mb-6">Staff Login</h2>

                    {error && (
                        <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-400 text-sm animate-in slide-in-from-top-2">
                            <AlertCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 ml-1">Username</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                                    <User size={20} />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs font-medium px-1">
                            <label className="flex items-center gap-2 text-slate-500 cursor-pointer hover:text-slate-400 transition-colors">
                                <input type="checkbox" className="rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-500/20" />
                                Remember me
                            </label>
                            <Link to="/forgot-password" size="sm" className="text-indigo-400 hover:text-indigo-300 transition-colors">Forgot password?</Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 group mt-2"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all">
                                        <Loader2 size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center space-y-3">
                        <p className="text-sm text-slate-500">
                            New recruiter? {' '}
                            <Link to="/signup" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
                                Create a Free Account
                            </Link>
                        </p>
                        <p className="text-xs text-slate-600">
                            System authorized access only. <br />
                            Contact IT for administrative credentials.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
