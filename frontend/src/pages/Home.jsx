import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Home() {
    const { user } = useAuth();

    const quickLinks = {
        student: [
            { to: '/submit', label: 'Submit Complaint', desc: 'Report a new issue' },
            { to: '/my-complaints', label: 'My Complaints', desc: 'Track your submissions' }
        ],
        staff: [
            { to: '/assigned', label: 'Assigned Complaints', desc: 'View and update tickets' }
        ],
        admin: [
            { to: '/admin-dashboard', label: 'Admin Dashboard', desc: 'View complaint statistics' },
            { to: '/all-complaints', label: 'All Complaints', desc: 'Manage all tickets' }
        ]
    };

    const links = quickLinks[user?.role] || [];

    return (
        <div className="min-h-screen bg-neutral-50">
            <Navbar />
            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
                <h2 className="text-2xl font-semibold text-neutral-900 tracking-tight">
                    Welcome, {user?.name}
                </h2>
                <p className="text-neutral-400 text-sm mt-1">
                    You are logged in as <span className="capitalize font-medium text-neutral-500">{user?.role}</span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="bg-white border border-neutral-200 rounded-2xl p-6 hover:border-neutral-300 hover:shadow-sm transition group"
                        >
                            <h3 className="text-sm font-medium text-neutral-900 group-hover:text-neutral-700">
                                {link.label}
                            </h3>
                            <p className="text-xs text-neutral-400 mt-1">{link.desc}</p>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Home;
