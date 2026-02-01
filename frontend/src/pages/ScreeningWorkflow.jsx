import React, { useState } from 'react';
import {
    FileText,
    Upload,
    ListChecks,
    Zap,
    CheckCircle2,
    Users,
    ArrowRight,
    Plus,
    X,
    MessageSquare,
    ClipboardList
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ScreeningWorkflow = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [jobData, setJobData] = useState({ title: '', description: '', skills: '' });
    const [resumes, setResumes] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleAddJob = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setResumes([...resumes, ...files]);
    };

    const removeResume = (index) => {
        setResumes(resumes.filter((_, i) => i !== index));
    };

    const startScreening = () => {
        setIsProcessing(true);
        // Simulate processing
        setTimeout(() => {
            setIsProcessing(false);
            navigate('/admin/rankings/101'); // Navigate to a mock ranking page
        }, 4000);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Progress Header */}
            <div className="flex items-center justify-between px-4">
                {[
                    { id: 1, label: 'Job Description', icon: ClipboardList },
                    { id: 2, label: 'Upload Resumes', icon: Upload },
                    { id: 3, label: 'Review & Run', icon: Zap },
                ].map((s) => (
                    <div key={s.id} className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${step >= s.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-white/5 text-slate-500'
                            }`}>
                            <s.icon size={20} />
                        </div>
                        <span className={`text-sm font-bold hidden md:block ${step >= s.id ? 'text-white' : 'text-slate-500'}`}>
                            {s.label}
                        </span>
                        {s.id < 3 && <div className="hidden lg:block w-20 h-[1px] bg-white/10 mx-4"></div>}
                    </div>
                ))}
            </div>

            {/* Step 1: Job Description */}
            {step === 1 && (
                <div className="glass-card p-8 lg:p-12 space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Define Job Requirements</h2>
                        <p className="text-slate-400">Our AI needs context to screen candidates effectively.</p>
                    </div>

                    <form onSubmit={handleAddJob} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-300">Job Title</label>
                            <input
                                required
                                type="text"
                                placeholder="e.g. Senior Frontend Developer"
                                className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-200"
                                value={jobData.title}
                                onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-300">Key Skills (comma separated)</label>
                            <input
                                required
                                type="text"
                                placeholder="e.g. React, Tailwind, TypeScript"
                                className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-200"
                                value={jobData.skills}
                                onChange={(e) => setJobData({ ...jobData, skills: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-300">Detailed Description</label>
                            <textarea
                                required
                                rows={6}
                                placeholder="Paste the full job description here..."
                                className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-200 resize-none"
                                value={jobData.description}
                                onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 group">
                            Next: Upload Resumes <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>
            )}

            {/* Step 2: Resume Upload */}
            {step === 2 && (
                <div className="glass-card p-8 lg:p-12 space-y-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Upload Candidate Resumes</h2>
                            <p className="text-slate-400">You can upload multiple files at once.</p>
                        </div>
                        <button onClick={() => setStep(1)} className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">
                            Back to JD
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/10 rounded-3xl bg-[#0f172a] hover:bg-white/5 hover:border-indigo-500/50 transition-all cursor-pointer group">
                                <div className="flex flex-col items-center justify-center text-center px-4">
                                    <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                                        <Plus size={32} />
                                    </div>
                                    <p className="text-white font-bold mb-1">Click to add resumes</p>
                                    <p className="text-xs text-slate-500">Attach up to 50 files (PDF, DOCX)</p>
                                </div>
                                <input type="file" multiple className="hidden" onChange={handleFileUpload} accept=".pdf,.docx" />
                            </label>
                        </div>

                        <div className="space-y-3 max-h-[256px] overflow-y-auto pr-2 no-scrollbar">
                            {resumes.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-600 border border-white/5 rounded-3xl bg-[#0f172a]/50">
                                    <FileText size={48} className="mb-2 opacity-20" />
                                    <p className="text-sm font-medium">No files uploaded yet</p>
                                </div>
                            ) : (
                                resumes.map((file, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl group animate-in slide-in-from-right-2">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                                                <FileText size={18} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-200 truncate max-w-[200px]">{file.name}</p>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase">{(file.size / 1024).toFixed(1)} KB</p>
                                            </div>
                                        </div>
                                        <button onClick={() => removeResume(i)} className="p-2 text-slate-500 hover:text-rose-400 transition-colors">
                                            <X size={18} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => setStep(3)}
                        disabled={resumes.length === 0}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 group"
                    >
                        Next: Review & Finish <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            )}

            {/* Step 3: Review & Run */}
            {step === 3 && (
                <div className="glass-card p-8 lg:p-12 space-y-8 text-center">
                    {!isProcessing ? (
                        <>
                            <div className="w-20 h-20 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 mx-auto mb-6">
                                <Zap size={40} />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Ready to Analyze?</h2>
                            <p className="text-slate-400 max-w-xl mx-auto mb-10">
                                You have defined requirements for <span className="text-indigo-400 font-bold">{jobData.title}</span> and uploaded <span className="text-indigo-400 font-bold">{resumes.length} resumes</span>. Our AI will now rank them based on relevance and skill match.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-12">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left">
                                    <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Target Skills</p>
                                    <p className="text-sm text-slate-200 font-bold truncate">{jobData.skills}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left">
                                    <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Total Candidates</p>
                                    <p className="text-sm text-slate-200 font-bold">{resumes.length} Files</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button onClick={() => setStep(2)} className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold transition-all">
                                    Back to Upload
                                </button>
                                <button onClick={startScreening} className="flex-[2] py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold shadow-xl shadow-indigo-600/20 transition-all">
                                    Start AI Screening
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="py-12">
                            <div className="relative inline-block mb-8">
                                <div className="w-24 h-24 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Zap size={32} className="text-indigo-400 animate-pulse" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Analyzing Profiles...</h2>
                            <p className="text-slate-400 animate-pulse">Running NLP models and calculating match scores</p>

                            <div className="mt-12 space-y-4 max-w-sm mx-auto">
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 animate-progress"></div>
                                </div>
                                <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-widest font-black">
                                    <span>Parsing</span>
                                    <span>Ranking</span>
                                    <span>Finalizing</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ScreeningWorkflow;
