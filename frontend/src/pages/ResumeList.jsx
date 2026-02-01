import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, Clock } from 'lucide-react';

const ResumeList = () => {
    const [isUploading, setIsUploading] = useState(false);
    const resumes = [
        { id: 1, name: 'John Doe', email: 'john@example.com', skills: 'Python, SQL, AWS', score: 85, status: 'Shortlisted' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', skills: 'Java, Spring, React', score: 72, status: 'Pending' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Candidates</h1>
                    <p className="text-slate-400">View and upload resume data.</p>
                </div>
            </div>

            <div className="glass-card p-10 border-dashed border-2 border-slate-700 flex flex-col items-center justify-center space-y-4 hover:border-indigo-500/50 transition-colors cursor-pointer">
                <div className="p-4 bg-indigo-500/10 rounded-full">
                    <Upload className="text-indigo-400" size={32} />
                </div>
                <div className="text-center">
                    <p className="font-semibold">Click to upload or drag and drop</p>
                    <p className="text-sm text-slate-400">PDF, DOCX up to 10MB</p>
                </div>
            </div>

            <div className="glass-card overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-slate-400 text-sm uppercase">
                        <tr>
                            <th className="px-6 py-4 font-medium">Candidate</th>
                            <th className="px-6 py-4 font-medium">Skills</th>
                            <th className="px-6 py-4 font-medium">Score</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {resumes.map(resume => (
                            <tr key={resume.id} className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium">{resume.name}</div>
                                    <div className="text-xs text-slate-500">{resume.email}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {resume.skills.split(',').map(s => (
                                            <span key={s} className="bg-white/5 px-2 py-0.5 rounded text-xs">{s.trim()}</span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-indigo-400 font-bold">{resume.score}%</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${resume.status === 'Shortlisted' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                                        }`}>
                                        {resume.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResumeList;
