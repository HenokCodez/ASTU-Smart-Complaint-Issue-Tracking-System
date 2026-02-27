import { useState, useEffect } from 'react';
import API, { BASE_URL } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

function MyComplaints() {
    const { user } = useAuth();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const res = await API.get('/complaints/my');
                setComplaints(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchComplaints();
    }, [user.token]);

    const statusColor = (status) => {
        if (status === 'Resolved') return 'bg-green-50 text-green-700';
        if (status === 'In Progress') return 'bg-amber-50 text-amber-700';
        return 'bg-neutral-100 text-neutral-600';
    };

    return (
        <div className="min-h-screen bg-neutral-50">
            <Navbar />
            <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
                <h2 className="text-xl font-semibold text-neutral-900 tracking-tight">My Complaints</h2>
                <p className="text-neutral-400 text-sm mt-1 mb-8">Track your submitted complaints</p>

                {loading ? (
                    <p className="text-sm text-neutral-400">Loading...</p>
                ) : complaints.length === 0 ? (
                    <p className="text-sm text-neutral-400">No complaints yet.</p>
                ) : (
                    <div className="space-y-3">
                        {complaints.map((c) => (
                            <div key={c._id} className="bg-white border border-neutral-200 rounded-2xl p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <h3 className="text-sm font-medium text-neutral-900 truncate">{c.title}</h3>
                                        <p className="text-xs text-neutral-400 mt-1">{c.category} · {new Date(c.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <span className={`text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap ${statusColor(c.status)}`}>
                                        {c.status}
                                    </span>
                                </div>
                                <p className="text-sm text-neutral-500 mt-3 line-clamp-2">{c.description}</p>
                                {c.remarks && (
                                    <p className="text-xs text-neutral-400 mt-3 pt-3 border-t border-neutral-100">
                                        <span className="font-medium text-neutral-500">Remarks:</span> {c.remarks}
                                    </p>
                                )}
                                {c.attachment && (
                                    <div className="mt-3 pt-3 border-t border-neutral-100">
                                        <a
                                            href={`${BASE_URL}/uploads/${c.attachment}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                                            </svg>
                                            View Attachment
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default MyComplaints;
