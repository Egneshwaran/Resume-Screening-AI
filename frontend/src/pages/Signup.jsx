import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    CheckCircle2,
    AtSign,
    Building2,
    User,
    Lock,
    ShieldCheck,
    ArrowRight,
    Loader2
} from 'lucide-react';
import authService from '../services/auth.service';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Basic Validations
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setLoading(true);
        try {
            await authService.signup({
                name: formData.name,
                email: formData.email,
                company: formData.company,
                password: formData.password
            });
            setSuccess(true);
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col lg:flex-row">
            {/* Left Side: AI Benefits Panel */}
            <div className="lg:w-1/2 bg-[#0a1128] p-8 lg:p-20 flex flex-col justify-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
                <div className="relative z-10 space-y-10">
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold">AI</div>
                            <span className="text-2xl font-bold tracking-tight">AI-Recruiter <span className="text-indigo-400">Pro</span></span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
                            Elevate your <span className="text-indigo-400">Hiring IQ</span> with Artificial Intelligence.
                        </h1>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="mt-1 p-1 bg-indigo-500/20 rounded-full text-indigo-400">
                                <CheckCircle2 size={20} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Smart Skill Extraction</h3>
                                <p className="text-slate-400 text-sm">Automatically parse resumes and identify top 1% talent using NLP.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="mt-1 p-1 bg-indigo-500/20 rounded-full text-indigo-400">
                                <CheckCircle2 size={20} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Explainable Candidate Ranking</h3>
                                <p className="text-slate-400 text-sm">Understand exactly why a candidate is ranked higher with AI insights.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="mt-1 p-1 bg-indigo-500/20 rounded-full text-indigo-400">
                                <CheckCircle2 size={20} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Predictive Skill Gap Analysis</h3>
                                <p className="text-slate-400 text-sm">Identify missing competencies before the interview stage.</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-white/5">
                        <p className="text-slate-500 text-sm">Used by high-growth startups and enterprise HR teams worldwide.</p>
                    </div>
                </div>
            </div>

            {/* Right Side: Signup Form */}
            <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-20 bg-slate-50">
                <div className="w-full max-w-lg bg-white rounded-3xl p-8 lg:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-slate-900">Start for Free</h2>
                        <p className="text-slate-500 mt-2">Create your HR account in less than 60 seconds.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 text-rose-600 text-sm animate-in fade-in">
                            <Lock size={18} className="shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {success ? (
                        <div className="text-center py-10 space-y-4">
                            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                                <ShieldCheck size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">Welcome Aboard!</h3>
                            <p className="text-slate-500">Your account has been created successfully. Redirecting to login...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="text" name="name" required placeholder="John Doe"
                                        value={formData.name} onChange={handleChange}
                                        className="w-full bg-slate-50 border-none rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Work Email</label>
                                <div className="relative">
                                    <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="email" name="email" required placeholder="john@company.com"
                                        value={formData.email} onChange={handleChange}
                                        className="w-full bg-slate-50 border-none rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Company</label>
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="text" name="company" required placeholder="Acme Inc."
                                        value={formData.company} onChange={handleChange}
                                        className="w-full bg-slate-50 border-none rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
                                    <input
                                        type="password" name="password" required placeholder="••••••••"
                                        value={formData.password} onChange={handleChange}
                                        className="w-full bg-slate-50 border-none rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Confirm</label>
                                    <input
                                        type="password" name="confirmPassword" required placeholder="••••••••"
                                        value={formData.confirmPassword} onChange={handleChange}
                                        className="w-full bg-slate-50 border-none rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit" disabled={loading}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 group"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={20} /> : (
                                        <>
                                            <span>Create Free Account</span>
                                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="mt-8 text-center">
                        <p className="text-sm text-slate-500">
                            Already have an account? {' '}
                            <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors">
                                Sign In here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
