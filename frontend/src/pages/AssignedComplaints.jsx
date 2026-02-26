import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

function AssignedComplaints() {
    const { user } = useAuth();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/complaints/assigned', {
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

    const handleUpdate = async (id, status, remarks) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/complaints/${id}`,
                { status, remarks },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            setComplaints(complaints.map((c) => c._id === id ? res.data : c));
        } catch (err) {
            console.error(err);
        }
    };

    const statusColor = (status) => {
        if (status === 'Resolved') return 'bg-green-50 text-green-700';
        if (status === 'In Progress') return 'bg-amber-50 text-amber-700';
        return 'bg-neutral-100 text-neutral-600';
    };

    return (
        <div className="min-h-screen bg-neutral-50">
            <Navbar />
            <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
                <h2 className="text-xl font-semibold text-neutral-900 tracking-tight">Assigned Complaints</h2>
                <p className="text-neutral-400 text-sm mt-1 mb-8">Manage complaints assigned to you</p>

                {loading ? (
                    <p className="text-sm text-neutral-400">Loading...</p>
                ) : complaints.length === 0 ? (
                    <p className="text-sm text-neutral-400">No complaints assigned.</p>
                ) : (
                    <div className="space-y-4">
                        {complaints.map((c) => (
                            <ComplaintCard
                                key={c._id}
                                complaint={c}
                                statusColor={statusColor}
                                onUpdate={handleUpdate}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

function ComplaintCard({ complaint, statusColor, onUpdate }) {
    const [status, setStatus] = useState(complaint.status);
    const [remarks, setRemarks] = useState(complaint.remarks || '');
    const [editing, setEditing] = useState(false);

    const handleSave = () => {
        onUpdate(complaint._id, status, remarks);
        setEditing(false);
    };

    return (
        <div className="bg-white border border-neutral-200 rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <h3 className="text-sm font-medium text-neutral-900 truncate">{complaint.title}</h3>
                    <p className="text-xs text-neutral-400 mt-1">
                        {complaint.category} · {complaint.studentId?.name} · {new Date(complaint.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap ${statusColor(complaint.status)}`}>
                    {complaint.status}
                </span>
            </div>

            <p className="text-sm text-neutral-500 mt-3">{complaint.description}</p>

            {complaint.attachment && (
                <div className="mt-3">
                    <a
                        href={`http://localhost:5000/uploads/${complaint.attachment}`}
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

            {complaint.assignedDepartment && (
                <p className="text-xs text-neutral-400 mt-2">
                    <span className="font-medium text-neutral-500">Department:</span> {complaint.assignedDepartment}
                </p>
            )}

            {complaint.assignedStaffId && (
                <p className="text-xs text-neutral-400 mt-1">
                    <span className="font-medium text-neutral-500">Staff In Charge:</span> {complaint.assignedStaffId.name}
                </p>
            )}
            {editing ? (
                <div className="mt-4 pt-4 border-t border-neutral-100 space-y-3">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 transition appearance-none"
                    >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                    <textarea
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        rows={2}
                        placeholder="Add remarks..."
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 transition resize-none"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-medium hover:bg-neutral-800 transition"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setEditing(false)}
                            className="px-4 py-2 bg-neutral-100 text-neutral-600 rounded-lg text-xs font-medium hover:bg-neutral-200 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
                    {complaint.remarks && (
                        <p className="text-xs text-neutral-400">
                            <span className="font-medium text-neutral-500">Remarks:</span> {complaint.remarks}
                        </p>
                    )}
                    <button
                        onClick={() => setEditing(true)}
                        className="text-xs text-neutral-500 hover:text-neutral-900 font-medium transition ml-auto"
                    >
                        Update
                    </button>
                </div>
            )}
        </div>
    );
}

export default AssignedComplaints;
