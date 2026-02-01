import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Info, AlertCircle, CheckCircle2, XCircle, Download } from 'lucide-react';

const Rankings = () => {
    const { jobId } = useParams();
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const rankings = [
        {
            id: 1, name: 'Alice Walker', score: 94,
            skillsMatched: ['Java', 'Spring Boot', 'SQL'],
            missing: ['Docker'],
            explanation: 'Excellent match for core technical requirements. High experience relevance in backend systems.',
            experience: '5 Years', education: 'M.Tech CSE'
        },
        {
            id: 2, name: 'Bob Martin', score: 82,
            skillsMatched: ['Java', 'SQL'],
            missing: ['Spring Boot', 'Docker'],
            explanation: 'Good foundation but lacks Spring Boot experience which is mandatory for this role.',
            experience: '3 Years', education: 'B.E CSE'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Candidate Rankings</h1>
                    <p className="text-slate-400">Job ID: #{jobId} - Senior Java Developer</p>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    <Download size={20} />
                    <span>Export Shortlist</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {rankings.map((cand, idx) => (
                        <div
                            key={cand.id}
                            onClick={() => setSelectedCandidate(cand)}
                            className={`glass-card p-6 cursor-pointer border-2 transition-all ${selectedCandidate?.id === cand.id ? 'border-indigo-500 bg-indigo-500/5' : 'border-transparent'
                                }`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center font-bold text-indigo-400">
                                        #{idx + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">{cand.name}</h3>
                                        <p className="text-sm text-slate-400">{cand.education} • {cand.experience}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-indigo-400">{cand.score}%</div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider">Match Score</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-6">
                    {selectedCandidate ? (
                        <div className="glass-card p-6 sticky top-8 animate-in fade-in slide-in-from-right-4 duration-300">
                            <h3 className="text-xl font-bold mb-4">AI Analysis: {selectedCandidate.name}</h3>

                            <div className="space-y-6">
                                <section>
                                    <h4 className="text-sm font-semibold text-slate-400 uppercase mb-3 flex items-center gap-2">
                                        <CheckCircle2 size={16} className="text-emerald-400" /> Matches
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCandidate.skillsMatched.map(s => (
                                            <span key={s} className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm">{s}</span>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <h4 className="text-sm font-semibold text-slate-400 uppercase mb-3 flex items-center gap-2">
                                        <XCircle size={16} className="text-rose-400" /> Skill Gaps
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCandidate.missing.map(s => (
                                            <span key={s} className="bg-rose-500/10 text-rose-400 px-3 py-1 rounded-full text-sm">{s}</span>
                                        ))}
                                    </div>
                                </section>

                                <section className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <h4 className="text-sm font-semibold text-indigo-400 uppercase mb-2 flex items-center gap-2">
                                        <Info size={16} /> Explainable AI (XAI)
                                    </h4>
                                    <p className="text-slate-300 text-sm leading-relaxed italic">
                                        "{selectedCandidate.explanation}"
                                    </p>
                                </section>

                                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-colors">
                                    Contact Candidate
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="glass-card p-10 text-center text-slate-500 flex flex-col items-center justify-center h-64">
                            <AlertCircle size={48} className="mb-4 opacity-20" />
                            <p>Select a candidate to view AI ranking explanation and skill gap analysis.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Rankings;
