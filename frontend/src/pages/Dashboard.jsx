import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler
} from 'chart.js';
import {
    Users,
    CheckCircle,
    XCircle,
    Clock,
    Zap,
    Download,
    TrendingUp,
    FileText,
    Target,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    ChevronRight,
    ExternalLink,
    MoreHorizontal,
    Loader2,
    Activity,
    Briefcase,
    ShieldCheck,
    BarChart3,
    LayoutDashboard,
    Gauge,
    History,
    ChevronDown,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';
import authService from '../services/auth.service';
import exportService from '../services/export.service';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler
);

const StatCard = ({ icon: Icon, label, value, trend, trendUp, color, description }) => {
    return (
        <div className="glass-card p-6 flex flex-col justify-between hover-scale group min-h-[160px]">
            <div className="flex justify-between items-start">
                <div className={`p-3 rounded-xl ${color} bg-opacity-10 transition-colors group-hover:bg-opacity-20`}>
                    {Icon && <Icon size={24} className={color} />}
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trendUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                        {trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {trend}
                    </div>
                )}
            </div>
            <div className="mt-4">
                <div className="text-slate-400 text-sm font-medium">{label}</div>
                <div className="text-3xl font-bold mt-1 tracking-tight text-white">{value}</div>
                <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-wider font-semibold">{description}</p>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const user = authService.getCurrentUser();
    const location = useLocation();
    const navigate = useNavigate();
    const [exportLoading, setExportLoading] = useState(false);
    const [showExportOptions, setShowExportOptions] = useState(false);
    const [activeTab, setActiveTab] = useState(location.pathname.includes('analytics') ? 'analytics' : 'overview');

    // Sync tab state with URL changes (e.g. from Sidebar)
    useEffect(() => {
        if (location.pathname.includes('analytics')) {
            setActiveTab('analytics');
        } else {
            setActiveTab('overview');
        }
    }, [location.pathname]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'analytics') {
            navigate('/admin/analytics');
        } else {
            navigate('/admin');
        }
    };

    const handleExport = async (format) => {
        setExportLoading(true);
        setShowExportOptions(false);
        try {
            if (format === 'pdf') {
                await exportService.exportPdf();
            } else {
                await exportService.exportExcel();
            }
        } catch (error) {
            console.error("Export failed:", error);
            alert("Failed to export results. Please try again.");
        } finally {
            setExportLoading(false);
        }
    };

    // HR Specific Mock Data
    const stats = [
        { icon: Users, label: "Total Applicants", value: "1,248", trend: "12%", trendUp: true, color: "text-indigo-400", description: "Across 12 open roles" },
        { icon: CheckCircle, label: "Qualified/Shortlisted", value: "342", trend: "8.4%", trendUp: true, color: "text-emerald-400", description: "Ready for interview" },
        { icon: XCircle, label: "Rejected by AI", value: "612", trend: "2.1%", trendUp: false, color: "text-rose-400", description: "Below 60% match score" },
        { icon: Clock, label: "Awaiting Review", value: "294", trend: "new", trendUp: true, color: "text-amber-400", description: "Pending manual check" },
    ];

    const topCandidates = [
        { name: "John Cooper", role: "Sr. Java Developer", score: 96, status: "Shortlisted", avatar: "JC" },
        { name: "Sarah Miller", role: "Product Designer", score: 92, status: "Under Review", avatar: "SM" },
        { name: "Alex Rivera", role: "Full Stack Dev", score: 89, status: "Shortlisted", avatar: "AR" },
        { name: "Elena Gilbert", role: "Data Scientist", score: 87, status: "Screening", avatar: "EG" },
        { name: "Marcus Wright", role: "DevOps Engineer", score: 84, status: "Rejected", avatar: "MW" },
    ];

    const barData = {
        labels: ['Java Tech', 'UI/UX', 'Cloud Ops', 'Data Sci', 'Frontend', 'Backend'],
        datasets: [{
            label: 'Avg Match Score',
            data: [78, 85, 72, 88, 81, 75],
            backgroundColor: 'rgba(99, 102, 241, 0.4)',
            borderColor: '#6366f1',
            borderWidth: 2,
            borderRadius: 6,
        }]
    };

    const doughnutData = {
        labels: ['High Match', 'Medium Match', 'Low Match'],
        datasets: [{
            data: [45, 35, 20],
            backgroundColor: ['#10b981', '#6366f1', '#f43f5e'],
            borderWidth: 0,
            hoverOffset: 10,
        }]
    };

    const skillData = {
        labels: ['Java/Spring', 'React/Next.js', 'AWS/Cloud', 'Python/AI', 'UI Design', 'SQL/NoSQL'],
        datasets: [{
            label: 'Skill Match Demand',
            data: [92, 88, 76, 82, 65, 70],
            backgroundColor: 'rgba(168, 85, 247, 0.4)',
            borderColor: '#a855f7',
            borderWidth: 2,
            borderRadius: 6,
        }]
    };

    const recentActivity = [
        { id: 1, type: 'upload', user: 'Sarah Miller', action: 'uploaded 15 new resumes', role: 'Product Designer', time: '10 mins ago' },
        { id: 2, type: 'screen', user: 'AI System', action: 'completed screening', role: 'Sr. Java Developer', time: '25 mins ago' },
        { id: 3, type: 'hire', user: 'Marcus Wright', action: 'moved to interview', role: 'DevOps Engineer', time: '1 hour ago' },
        { id: 4, type: 'reject', user: 'AI System', action: 'flagged low match', role: 'Data Scientist', time: '2 hours ago' },
    ];

    const statusHighlights = [
        { label: "Active Job Roles", value: "12", icon: Briefcase, color: "text-blue-400" },
        { label: "AI Screening Status", value: "Active", icon: ShieldCheck, color: "text-emerald-400" },
        { label: "System Accuracy", value: "98.4%", icon: Target, color: "text-purple-400" },
    ];

    const performanceMetrics = [
        { label: "Screening Accuracy", value: "98%", subValue: "+1.2% from last month", icon: ShieldCheck, color: "text-emerald-400" },
        { label: "Avg Match Score", value: "76.4%", subValue: "Across all applicants", icon: Gauge, color: "text-indigo-400" },
        { label: "Time Saved/Recruit", value: "148h", subValue: "Vs manual screening", icon: Clock, color: "text-amber-400" },
    ];

    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: '#1e293b',
                padding: 12,
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 13 },
                displayColors: false,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.1)'
            }
        }
    };

    const barOptions = {
        ...commonOptions,
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(255, 255, 255, 0.05)' },
                ticks: { color: '#64748b', font: { size: 11 } }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#64748b', font: { size: 11 } }
            }
        }
    };

    const doughnutOptions = {
        ...commonOptions,
        cutout: '75%',
        plugins: {
            ...commonOptions.plugins,
            legend: {
                display: true,
                position: 'bottom',
                labels: { color: '#94a3b8', boxWidth: 12, padding: 20 }
            }
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">
                        {activeTab === 'overview' ? 'Recruitment Overview' : 'Talent Analytics & Insights'}
                    </h1>
                    <p className="text-slate-400 mt-1 flex items-center gap-2">
                        Welcome back, <span className="text-indigo-400 font-semibold">{user?.username || 'HR Manager'}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                        Smart screening is active for all open roles
                    </p>
                </div>
            </div>

            {/* Dashboard Tabs */}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-2xl w-fit border border-white/5">
                <button
                    onClick={() => handleTabChange('overview')}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                >
                    <LayoutDashboard size={18} />
                    Overview
                </button>
                <button
                    onClick={() => handleTabChange('analytics')}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'analytics' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                >
                    <BarChart3 size={18} />
                    Analytics & Insights
                </button>
            </div>

            {
                activeTab === 'overview' ? (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Quick Actions & Stats */}
                        <div className="flex flex-col xl:flex-row gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 flex-1 gap-6">
                                {stats.map((stat, idx) => (
                                    <StatCard key={idx} {...stat} />
                                ))}
                            </div>

                            <div className="xl:w-80 glass-card p-6 flex flex-col justify-center gap-3 bg-indigo-600/5 border-indigo-500/20">
                                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                                    <Zap size={14} /> Quick Actions
                                </h3>
                                <button className="w-full px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all text-sm font-bold flex items-center justify-center gap-2 group">
                                    <Zap size={18} className="group-hover:animate-pulse" /> Run AI Screening
                                </button>
                                <div className="relative">
                                    <button
                                        onClick={() => setShowExportOptions(!showExportOptions)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-sm font-bold flex items-center justify-center gap-2"
                                    >
                                        <Download size={18} /> Export Results
                                    </button>
                                    {showExportOptions && (
                                        <div className="absolute right-0 bottom-full mb-2 w-full bg-slate-900 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                                            <button
                                                onClick={() => handleExport('excel')}
                                                className="w-full px-4 py-3 text-left text-xs font-bold text-slate-300 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
                                            >
                                                <FileText size={16} className="text-emerald-400" /> excel (.xlsx)
                                            </button>
                                            <button
                                                onClick={() => handleExport('pdf')}
                                                className="w-full px-4 py-3 text-left text-xs font-bold text-slate-300 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2 border-t border-white/5"
                                            >
                                                <FileText size={16} className="text-rose-400" /> pdf (.pdf)
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Recent Activity Panel */}
                            <div className="lg:col-span-2 glass-card overflow-hidden">
                                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                                            <Activity size={20} />
                                        </div>
                                        <h3 className="text-lg font-bold text-white">Recent Activity</h3>
                                    </div>
                                    <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                                        View All <ChevronRight size={14} />
                                    </button>
                                </div>
                                <div className="p-6 space-y-6">
                                    {recentActivity.map((activity) => (
                                        <div key={activity.id} className="flex items-start gap-4 group">
                                            <div className={`mt-1 w-2 h-2 rounded-full ${activity.type === 'upload' ? 'bg-indigo-500' : activity.type === 'screen' ? 'bg-emerald-500' : activity.type === 'hire' ? 'bg-purple-500' : 'bg-rose-500'} ring-4 ring-white/5 shadow-[0_0_12px_rgba(99,102,241,0.3)]`}></div>
                                            <div className="flex-1 border-b border-white/5 pb-6 last:border-0 last:pb-0">
                                                <div className="flex justify-between items-start mb-1">
                                                    <p className="text-slate-200 font-semibold group-hover:text-white transition-colors">
                                                        <span className="text-indigo-400">{activity.user}</span> {activity.action}
                                                    </p>
                                                    <span className="text-[10px] font-bold text-slate-500 uppercase">{activity.time}</span>
                                                </div>
                                                <p className="text-sm text-slate-500 flex items-center gap-2">
                                                    <Briefcase size={14} /> {activity.role}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Status Highlights */}
                            <div className="space-y-6">
                                <div className="glass-card p-6">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">System Status</h3>
                                    <div className="space-y-6">
                                        {statusHighlights.map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-2.5 rounded-xl bg-white/5 ${item.color}`}>
                                                        <item.icon size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-500 uppercase">{item.label}</p>
                                                        <p className="text-lg font-bold text-white">{item.value}</p>
                                                    </div>
                                                </div>
                                                {item.label === "AI Screening Status" && (
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="glass-card p-6 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border-indigo-500/20">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/40">
                                            <ShieldCheck size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg">Smart Screening Active</h4>
                                            <p className="text-sm text-slate-400 mt-1 leading-relaxed">System is currently processing 14 pending resumes with bias elimination filters.</p>
                                            <button className="mt-4 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 text-xs font-bold rounded-lg transition-all border border-indigo-500/30">
                                                View Progress
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Performance Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {performanceMetrics.map((metric, idx) => (
                                <div key={idx} className="glass-card p-6 flex items-center gap-6">
                                    <div className={`p-4 rounded-2xl bg-white/5 ${metric.color}`}>
                                        <metric.icon size={28} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{metric.label}</p>
                                        <div className="flex items-baseline gap-2 mt-1">
                                            <h4 className="text-3xl font-bold text-white">{metric.value}</h4>
                                            <span className={`text-[10px] font-bold ${metric.color === 'text-rose-400' ? 'text-rose-400' : 'text-emerald-400'}`}>
                                                {metric.subValue}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Charts Section */}
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                            <div className="xl:col-span-2 glass-card p-8 min-h-[400px] flex flex-col">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h3 className="text-lg font-bold text-white uppercase tracking-wider text-xs">Role Match Quality</h3>
                                        <p className="text-slate-400 text-sm">Average AI score across different departments</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1.5 bg-white/5 rounded-lg text-[10px] font-bold text-slate-400 hover:text-white transition-colors">7D</button>
                                        <button className="px-3 py-1.5 bg-indigo-600 rounded-lg text-[10px] font-bold text-white">30D</button>
                                    </div>
                                </div>
                                <div className="flex-1 min-h-0">
                                    <Bar data={barData} options={barOptions} />
                                </div>
                            </div>

                            <div className="glass-card p-8 flex flex-col items-center">
                                <div className="w-full text-left mb-8">
                                    <h3 className="text-lg font-bold text-white uppercase tracking-wider text-xs">Talent Pool Assessment</h3>
                                    <p className="text-slate-400 text-sm">Overall distribution of candidate suitability</p>
                                </div>
                                <div className="flex-1 w-full relative min-h-[220px]">
                                    <Doughnut data={doughnutData} options={doughnutOptions} />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-12">
                                        <span className="text-3xl font-bold text-white">1,248</span>
                                        <span className="text-[10px] text-slate-500 uppercase font-bold">Total analyzed</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                            {/* Skill Demand Analysis */}
                            <div className="glass-card p-8 flex flex-col">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-lg font-bold text-white uppercase tracking-wider text-xs">Skill Demand & Gaps</h3>
                                        <p className="text-slate-400 text-sm">Top matched skills vs emerging missing trends</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                                        <TrendingUp size={20} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-2 min-h-[300px]">
                                        <Bar data={skillData} options={barOptions} />
                                    </div>
                                    <div className="space-y-6">
                                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Trending Missing Skills</h4>
                                        <div className="space-y-4">
                                            {[
                                                { skill: 'Docker/K8s', trend: '+18%', gap: 'Critical' },
                                                { skill: 'GraphQL', trend: '+12%', gap: 'Moderate' },
                                                { skill: 'PyTorch', trend: '+15%', gap: 'Critical' },
                                                { skill: 'TensorFlow', trend: '+8%', gap: 'Emerging' },
                                            ].map((item, idx) => (
                                                <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-colors">
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-200">{item.skill}</p>
                                                        <p className="text-[10px] text-slate-500 font-medium">Demand Index: {item.trend}</p>
                                                    </div>
                                                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${item.gap === 'Critical' ? 'bg-rose-500/10 text-rose-400' : item.gap === 'Moderate' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                                                        {item.gap}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Top Candidates Ranking */}
                            <div className="glass-card overflow-hidden">
                                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Top Candidate Rankings</h3>
                                        <p className="text-xs text-slate-500 font-medium">Auto-ranked based on skill matching AI</p>
                                    </div>
                                    <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400 transition-all">
                                        <Filter size={18} />
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <tbody className="divide-y divide-white/5">
                                            {topCandidates.map((candidate, i) => (
                                                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                                                {candidate.avatar}
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-slate-200 group-hover:text-white transition-colors text-sm">{candidate.name}</div>
                                                                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{candidate.role}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col gap-1.5 w-32 ml-auto lg:ml-0">
                                                            <div className="flex justify-between text-[10px] font-bold">
                                                                <span className="text-slate-500 uppercase tracking-tighter">AI Match</span>
                                                                <span className="text-indigo-400">{candidate.score}%</span>
                                                            </div>
                                                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                                <div className="h-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" style={{ width: `${candidate.score}%` }}></div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="p-2 rounded-lg hover:bg-white/5 text-slate-500 hover:text-white transition-all">
                                                            <ExternalLink size={18} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Reports & Insights Footer */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 glass-card p-6 border-indigo-500/10">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Detailed Analytics Report</h4>
                                    <p className="text-sm text-slate-500">Download complete historical screening data and AI performance trends.</p>
                                </div>
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <button
                                    onClick={() => handleExport('excel')}
                                    className="flex-1 md:flex-none px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs font-bold flex items-center justify-center gap-2"
                                >
                                    <Download size={16} /> Download CSV
                                </button>
                                <button
                                    onClick={() => handleExport('pdf')}
                                    className="flex-1 md:flex-none px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-all text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
                                >
                                    <FileText size={16} /> Generate PDF
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default Dashboard;
