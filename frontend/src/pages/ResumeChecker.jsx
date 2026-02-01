import React, { useState } from 'react';
import {
    Upload,
    FileText,
    CheckCircle2,
    AlertCircle,
    TrendingUp,
    Layers,
    Target,
    Zap,
    ArrowLeft,
    Download,
    RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LandingNavbar from '../components/LandingNavbar';
import Footer from '../components/Footer';

const ResumeChecker = () => {
    const [file, setFile] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            analyzeResume(selectedFile);
        }
    };

    const analyzeResume = (file) => {
        setIsAnalyzing(true);
        // Simulate AI analysis delay
        setTimeout(() => {
            setResult({
                score: 85,
                atsCompatibility: 92,
                keywordRelevance: 78,
                formatting: 88,
                strengths: [
                    "Strong action verbs used throughout experience section",
                    "Clear and professional layout",
                    "Quantifiable achievements included",
                    "Relevant technical skills are highlighted"
                ],
                improvements: [
                    "Add more industry-specific keywords for better ATS matching",
                    "Expand on the Professional Summary to include a value proposition",
                    "Check for minor spacing inconsistencies in the education section"
                ],
                sections: [
                    { name: "Summary", score: 80, feedback: "Good, but could be more impactful." },
                    { name: "Skills", score: 95, feedback: "Excellent coverage of core and soft skills." },
                    { name: "Experience", score: 85, feedback: "Strong bullet points; good use of metrics." },
                    { name: "Education", score: 90, feedback: "Well structured and clearly presented." }
                ]
            });
            setIsAnalyzing(false);
        }, 3000);
    };

    const reset = () => {
        setFile(null);
        setResult(null);
    };

    return (
        <div className="min-h-screen bg-[#0f172a]">
            <LandingNavbar />

            <main className="pt-32 pb-20 max-w-7xl mx-auto px-4 lg:px-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/" className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-all">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-white">AI Resume Checker</h1>
                        <p className="text-slate-400">Evaluate and optimize your resume with advanced AI</p>
                    </div>
                </div>

                {!result && !isAnalyzing ? (
                    <div className="max-w-3xl mx-auto mt-12">
                        <div className="p-1 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10">
                            <label className="flex flex-col items-center justify-center w-full h-[400px] border-2 border-dashed border-white/10 rounded-[2.3rem] bg-[#1e293b]/50 hover:bg-[#1e293b] hover:border-indigo-500/50 transition-all cursor-pointer group">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                                        <Upload size={32} />
                                    </div>
                                    <p className="mb-2 text-xl font-bold text-white tracking-tight">
                                        Click to upload or drag and drop
                                    </p>
                                    <p className="text-sm text-slate-400">
                                        PDF, DOCX (Max. 10MB)
                                    </p>
                                </div>
                                <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.docx" />
                            </label>
                        </div>

                        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="flex items-center gap-3 text-slate-400">
                                <div className="p-2 rounded-lg bg-white/5 text-indigo-400"><Target size={18} /></div>
                                <span className="text-sm">ATS Optimized</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400">
                                <div className="p-2 rounded-lg bg-white/5 text-indigo-400"><Zap size={18} /></div>
                                <span className="text-sm">Instant Feedback</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400">
                                <div className="p-2 rounded-lg bg-white/5 text-indigo-400"><TrendingUp size={18} /></div>
                                <span className="text-sm">Scoring Analysis</span>
                            </div>
                        </div>
                    </div>
                ) : isAnalyzing ? (
                    <div className="max-w-3xl mx-auto mt-20 text-center">
                        <div className="relative inline-block mb-8">
                            <div className="w-24 h-24 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Cpu size={32} className="text-indigo-400 animate-pulse" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Analyzing Your Resume...</h2>
                        <p className="text-slate-400">Our AI is parsing your content and comparing it against 10,000+ industry standards.</p>

                        <div className="mt-12 space-y-4 max-w-sm mx-auto">
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 animate-progress"></div>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500 uppercase tracking-widest font-semibold">
                                <span>Extracting Text</span>
                                <span>Running NLP</span>
                                <span>Finalizing</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* Summary Column */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
                                <div className="relative inline-block mb-6">
                                    <svg className="w-32 h-32 transform -rotate-90">
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="58"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            className="text-white/5"
                                        />
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="58"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            strokeDasharray={364.4}
                                            strokeDashoffset={364.4 * (1 - result.score / 100)}
                                            className="text-indigo-500"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-4xl font-bold text-white">{result.score}</span>
                                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Score</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Overall Quality</h3>
                                <p className="text-slate-400 text-sm mb-6">Your resume is looking great! With a few tweaks, you can reach the top 5% of candidates.</p>
                                <button onClick={reset} className="w-full py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2">
                                    <RefreshCw size={16} /> Re-upload Resume
                                </button>
                            </div>

                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                                    <Layers size={18} className="text-indigo-400" /> Metric Breakdown
                                </h4>
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-slate-400">ATS Compatibility</span>
                                            <span className="text-white font-semibold">{result.atsCompatibility}%</span>
                                        </div>
                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500" style={{ width: `${result.atsCompatibility}%` }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-slate-400">Keyword Relevance</span>
                                            <span className="text-white font-semibold">{result.keywordRelevance}%</span>
                                        </div>
                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-amber-500" style={{ width: `${result.keywordRelevance}%` }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-slate-400">Formatting</span>
                                            <span className="text-white font-semibold">{result.formatting}%</span>
                                        </div>
                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-500" style={{ width: `${result.formatting}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Analysis Column */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                                                <CheckCircle2 size={16} />
                                            </div>
                                            Key Strengths
                                        </h4>
                                        <ul className="space-y-3">
                                            {result.strengths.map((s, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-slate-400">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                                                    {s}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                                                <AlertCircle size={16} />
                                            </div>
                                            Areas for Improvement
                                        </h4>
                                        <ul className="space-y-3">
                                            {result.improvements.map((s, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-slate-400">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                                                    {s}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                <h4 className="text-white font-bold mb-6">Section-wise Analysis</h4>
                                <div className="space-y-4">
                                    {result.sections.map((section, i) => (
                                        <div key={i} className="p-4 rounded-2xl bg-[#0f172a]/50 border border-white/5">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-semibold text-white">{section.name}</span>
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${section.score >= 90 ? 'bg-emerald-500' : section.score >= 80 ? 'bg-indigo-500' : 'bg-amber-500'}`}></div>
                                                    <span className="text-sm font-bold text-slate-300">{section.score}%</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-500">{section.feedback}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end gap-4">
                                <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2">
                                    <Download size={18} /> Export Report
                                </button>
                                <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-all">
                                    Optimize Now
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default ResumeChecker;
