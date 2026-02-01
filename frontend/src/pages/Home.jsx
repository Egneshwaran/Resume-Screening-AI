import React from 'react';
import { Link } from 'react-router-dom';
import {
    FileText,
    ShieldCheck,
    Zap,
    BarChart3,
    Target,
    Users,
    ArrowRight,
    CheckCircle2,
    Cpu,
    Search,
    ChevronRight,
    PlayCircle
} from 'lucide-react';
import LandingNavbar from '../components/LandingNavbar';
import Footer from '../components/Footer';

import authService from '../services/auth.service';

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-white/[0.07] transition-all group">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
            <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-400 leading-relaxed text-sm">
            {description}
        </p>
    </div>
);

const StepCard = ({ number, title, description, isLast }) => (
    <div className="relative group">
        {!isLast && (
            <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-gradient-to-r from-indigo-500/50 to-transparent z-0 -translate-x-8"></div>
        )}
        <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-[#1e293b] border-2 border-indigo-500/30 flex items-center justify-center text-2xl font-bold text-white mb-6 group-hover:border-indigo-500 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all">
                {number}
            </div>
            <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
            <p className="text-slate-400 text-sm max-w-[200px]">{description}</p>
        </div>
    </div>
);

const Home = () => {
    const isAuthenticated = authService.isAuthenticated();
    const ctaLink = isAuthenticated ? "/admin" : "/signup";
    const ctaText = isAuthenticated ? "Go to Dashboard" : "Get Started for Free";

    return (
        <div className="min-h-screen bg-[#0f172a] selection:bg-indigo-500/30">
            <LandingNavbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full -z-10"></div>
                <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full -z-10"></div>

                <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-medium mb-8 animate-fade-in">
                        <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                        Trusted by 500+ Hiring Managers
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-8 tracking-tight leading-[1.1]">
                        Screen Smarter, Hire <br />
                        <span className="gradient-text">Faster with AI</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-12 leading-relaxed">
                        The ultimate AI-powered recruitment platform. Whether you're a job seeker looking for the perfect resume or a recruiter screening thousands of candidates.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            to={ctaLink}
                            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 group"
                        >
                            {ctaText}
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2">
                            <PlayCircle size={20} className="text-indigo-400" />
                            Watch Demo
                        </button>
                    </div>

                    {/* App Preview Mockup */}
                    <div className="mt-20 relative max-w-5xl mx-auto">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-20"></div>
                        <div className="relative bg-[#1e293b] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
                                alt="Dashboard Preview"
                                className="w-full h-auto opacity-70"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] via-transparent to-transparent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-indigo-400 font-semibold tracking-wider uppercase text-sm mb-4">Core Capabilities</h2>
                        <h3 className="text-3xl lg:text-5xl font-bold text-white mb-6">Built for Modern Recruitment</h3>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Powerful tools to help job seekers stand out and recruiters find the perfect match in seconds, not hours.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Zap}
                            title="Instant ATS Analysis"
                            description="Get real-time feedback on how your resume performs against Applicant Tracking Systems."
                        />
                        <FeatureCard
                            icon={Target}
                            title="Smart Job Matching"
                            description="AI-driven matching scores that connect the right candidates with the right opportunities."
                        />
                        <FeatureCard
                            icon={Cpu}
                            title="NLP Deep Insights"
                            description="Extract meaningful skills and experience patterns using advanced Natural Language Processing."
                        />
                        <FeatureCard
                            icon={ShieldCheck}
                            title="Bias-Free Screening"
                            description="Ensure fair evaluation using AI models focused purely on skills and achievements."
                        />
                        <FeatureCard
                            icon={BarChart3}
                            title="Analytics Dashboard"
                            description="Track your application progress and screening pipeline with beautiful visual reports."
                        />
                        <FeatureCard
                            icon={Users}
                            title="Team Collaboration"
                            description="Invite hiring managers and peers to review and shortlist candidates together."
                        />
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-24 bg-white/[0.02] border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-indigo-400 font-semibold tracking-wider uppercase text-sm mb-4">The Process</h2>
                        <h3 className="text-3xl lg:text-5xl font-bold text-white mb-6">How RecruitAI Works</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                        <StepCard
                            number="01"
                            title="Upload Content"
                            description="Upload resumes or job descriptions in PDF or DOCX format."
                        />
                        <StepCard
                            number="02"
                            title="AI Parsing"
                            description="Our AI extracts text, skills, and experience with high precision."
                        />
                        <StepCard
                            number="03"
                            title="Smart Analysis"
                            description="Advanced NLP models analyze content for relevance and quality."
                        />
                        <StepCard
                            number="04"
                            title="Get Results"
                            description="Receive actionable insights or ranked candidate profiles."
                            isLast={true}
                        />
                    </div>

                    <div className="mt-20 flex justify-center">
                        <div className="p-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 inline-block">
                            <div className="bg-[#0f172a] rounded-[14px] px-12 py-8 text-center max-w-3xl">
                                <h4 className="text-2xl font-bold text-white mb-4">Ready to optimize your hiring?</h4>
                                <p className="text-slate-400 mb-8">Join thousands of companies using AI to build their dream teams.</p>
                                <Link to={ctaLink} className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all">
                                    {isAuthenticated ? "Open Dashboard" : "Create Free Account"} <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
