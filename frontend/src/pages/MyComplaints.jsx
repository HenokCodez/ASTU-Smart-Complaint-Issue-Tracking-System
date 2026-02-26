import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

function MyComplaints() {
    const { user } = useAuth();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/complaints/my', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
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
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default MyComplaints;
