import { useState, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

function AdminDashboard() {
    const { user } = useAuth();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const res = await API.get('/complaints/all');
                setComplaints(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchComplaints();
    }, [user.token]);

    if (loading) return (
        <div className="min-h-screen bg-neutral-50">
            <Navbar />
            <main className="max-w-5xl mx-auto px-4 py-10">
                <p className="text-sm text-neutral-400 font-medium">Loading statistics...</p>
            </main>
        </div>
    );

    // Calculate Stats
    const total = complaints.length;
    const resolved = complaints.filter(c => c.status === 'Resolved').length;
    const resolutionRate = total > 0 ? ((resolved / total) * 100).toFixed(1) : 0;

    // Categories Data
    const categories = ['Academic', 'Dormitory', 'Cafeteria', 'Library', 'IT', 'Other'];
    const categoryCounts = categories.map(cat => complaints.filter(c => c.category === cat).length);

    // Status Data
    const statuses = ['Open', 'In Progress', 'Resolved'];
    const statusCounts = statuses.map(s => complaints.filter(c => c.status === s).length);

    const categoryData = {
        labels: categories,
        datasets: [{
            label: 'Complaints by Category',
            data: categoryCounts,
            backgroundColor: [
                '#171717', '#404040', '#737373', '#a3a3a3', '#d4d4d4', '#e5e5e5'
            ],
            borderWidth: 0,
        }]
    };

    const statusData = {
        labels: statuses,
        datasets: [{
            label: 'Complaints by Status',
            data: statusCounts,
            backgroundColor: '#171717',
            borderRadius: 8,
        }]
    };

    return (
        <div className="min-h-screen bg-neutral-50">
            <Navbar />
            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
                <header className="mb-10">
                    <h2 className="text-2xl font-semibold text-neutral-900 tracking-tight">Admin Dashboard</h2>
                    <p className="text-neutral-400 text-sm mt-1">Complaint statistics overview</p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white border border-neutral-200 rounded-2xl p-6">
                        <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Total Complaints</p>
                        <p className="text-4xl font-semibold text-neutral-900 mt-2">{total}</p>
                    </div>
                    <div className="bg-white border border-neutral-200 rounded-2xl p-6">
                        <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Resolved</p>
                        <p className="text-4xl font-semibold text-neutral-900 mt-2">{resolved}</p>
                    </div>
                    <div className="bg-white border border-neutral-200 rounded-2xl p-6">
                        <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Resolution Rate</p>
                        <p className="text-4xl font-semibold text-neutral-900 mt-2">{resolutionRate}%</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-neutral-200 rounded-2xl p-6">
                        <h3 className="text-sm font-semibold text-neutral-900 mb-6">Complaints by Category</h3>
                        <div className="aspect-square max-h-64 mx-auto">
                            <Doughnut
                                data={categoryData}
                                options={{
                                    plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 10 } } } },
                                    maintainAspectRatio: false
                                }}
                            />
                        </div>
                    </div>

                    <div className="bg-white border border-neutral-200 rounded-2xl p-6">
                        <h3 className="text-sm font-semibold text-neutral-900 mb-6">Complaints by Status</h3>
                        <div className="aspect-video max-h-64 mx-auto">
                            <Bar
                                data={statusData}
                                options={{
                                    plugins: { legend: { display: false } },
                                    scales: { y: { beginAtZero: true, ticks: { stepSize: 1, font: { size: 10 } } }, x: { ticks: { font: { size: 10 } } } },
                                    maintainAspectRatio: false
                                }}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminDashboard;
