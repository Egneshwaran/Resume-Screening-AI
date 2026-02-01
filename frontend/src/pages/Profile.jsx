import React, { useState, useEffect } from 'react';
import { User, Mail, Building, Shield, Calendar, MapPin, Edit, CheckCircle, Loader2 } from 'lucide-react';
import authService from '../services/auth.service';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/auth/me');
                setProfile(response.data);
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError("Failed to load profile details.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-indigo-500" size={32} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="glass-card p-8 text-center">
                <p className="text-rose-400">{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">Account Profile</h1>
                <p className="text-slate-400 mt-1">Manage your professional identity and account settings</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-card p-8 flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 p-[3px] mb-6 shadow-xl shadow-indigo-500/20">
                            <div className="w-full h-full rounded-[13px] bg-[#1e293b] flex items-center justify-center">
                                <User size={40} className="text-indigo-400" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-white">{profile?.fullName || 'Full Name'}</h2>
                        <p className="text-indigo-400 font-medium">{profile?.role} Account</p>

                        <div className="mt-8 w-full space-y-4 pt-8 border-t border-white/5">
                            <div className="flex items-center gap-3 text-slate-400 text-sm">
                                <Mail size={16} className="text-slate-500" />
                                <span>{profile?.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400 text-sm">
                                <Building size={16} className="text-slate-500" />
                                <span>{profile?.companyName || 'Not Specified'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6">
                        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest mb-4">Account Security</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Shield size={16} className="text-emerald-500" />
                                    <span className="text-xs text-slate-400 font-medium">Two-Factor Auth</span>
                                </div>
                                <span className="text-[10px] bg-slate-800 text-slate-500 px-2 py-0.5 rounded uppercase font-bold text-xs">Disabled</span>
                            </div>
                            <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold transition-all text-slate-300">
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>

                {/* Detail Sections */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-card p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-bold text-white">Identity Information</h3>
                            <button className="p-2 rounded-lg hover:bg-white/5 text-slate-500 hover:text-indigo-400 transition-all flex items-center gap-2 text-xs font-bold">
                                <Edit size={14} /> Edit Details
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2 block">Username / ID</label>
                                <p className="text-slate-200 font-medium">{profile?.username}</p>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2 block">Primary Email</label>
                                <div className="flex items-center gap-2">
                                    <p className="text-slate-200 font-medium">{profile?.email}</p>
                                    <CheckCircle size={14} className="text-emerald-500" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2 block">Company Affiliation</label>
                                <p className="text-slate-200 font-medium">{profile?.companyName || 'Not provided'}</p>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2 block">Account Level</label>
                                <div className="inline-flex items-center px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-md gap-2">
                                    <Shield size={12} className="text-indigo-400" />
                                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter">{profile?.role} Access</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-8">
                        <h3 className="text-lg font-bold text-white mb-6">Usage Statistics</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                <p className="text-2xl font-bold text-white">124</p>
                                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-1">Jobs Posted</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                <p className="text-2xl font-bold text-white">2.8k</p>
                                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-1">Resumes Screened</p>
                            </div>
                            <div className="p-4 bg-indigo-600/10 rounded-xl border border-indigo-500/10">
                                <p className="text-2xl font-bold text-indigo-400">98%</p>
                                <p className="text-[10px] text-indigo-500 uppercase font-bold tracking-wider mt-1">AI Accuracy Score</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
