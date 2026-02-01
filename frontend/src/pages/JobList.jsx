import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, ChevronRight } from 'lucide-react';

const JobList = () => {
    const navigate = useNavigate();
    const jobs = [
        { id: 1, title: 'Senior Java Developer', department: 'Backend', location: 'Remote', applicants: 24, skills: 'Java, Spring Boot, MySQL' },
        { id: 2, title: 'Full Stack Engineer', department: 'Product', location: 'NYC', applicants: 15, skills: 'React, Node.js, AWS' },
        { id: 3, title: 'Data Scientist', department: 'AI/ML', location: 'Bangalore', applicants: 42, skills: 'Python, PyTorch, SQL' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Job Roles</h1>
                    <p className="text-slate-400">Manage open positions and view rankings.</p>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    <Plus size={20} />
                    <span>Post New Job</span>
                </button>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search jobs..."
                    className="w-full bg-[#1e293b] border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
            </div>

            <div className="grid gap-4">
                {jobs.map(job => (
                    <div key={job.id} onClick={() => navigate(`/rankings/${job.id}`)} className="glass-card p-6 flex items-center justify-between hover:border-indigo-500/50 hover:bg-white/[0.02] transition-all cursor-pointer group">
                        <div className="space-y-1">
                            <h3 className="text-xl font-semibold group-hover:text-indigo-400 transition-colors">{job.title}</h3>
                            <div className="flex gap-4 text-sm text-slate-400">
                                <span>{job.department}</span>
                                <span>•</span>
                                <span>{job.location}</span>
                                <span>•</span>
                                <span className="text-indigo-400 font-medium">{job.applicants} Applicants</span>
                            </div>
                            <div className="mt-2 flex gap-2">
                                {job.skills.split(',').map(skill => (
                                    <span key={skill} className="bg-white/5 px-2 py-0.5 rounded text-xs text-slate-300">{skill.trim()}</span>
                                ))}
                            </div>
                        </div>
                        <ChevronRight className="text-slate-500 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobList;
