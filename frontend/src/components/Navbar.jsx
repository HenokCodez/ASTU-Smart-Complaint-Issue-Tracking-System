import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinks = {
        student: [
            { to: '/', label: 'Home' },
            { to: '/submit', label: 'New Complaint' },
            { to: '/my-complaints', label: 'My Complaints' }
        ],
        staff: [
            { to: '/', label: 'Home' },
            { to: '/assigned', label: 'Assigned Complaints' }
        ],
        admin: [
            { to: '/', label: 'Home' },
            { to: '/admin-dashboard', label: 'Dashboard' },
            { to: '/all-complaints', label: 'All Complaints' }
        ]
    };

    const links = navLinks[user?.role] || [];

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-10">
            <div className="max-w-5xl mx-auto flex justify-between items-center h-14 px-4 sm:px-6">
                <div className="flex items-center gap-6">
                    <h1 className="text-sm font-semibold text-neutral-900 tracking-tight">ASTU Complaints</h1>
                    <div className="hidden sm:flex items-center gap-4">
                        {links.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="text-xs text-neutral-500 hover:text-neutral-900 transition"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-xs text-neutral-400 hidden sm:inline">
                        {user?.name} · <span className="capitalize">{user?.role}</span>
                    </span>
                    <button
                        onClick={handleLogout}
                        className="text-xs text-neutral-500 hover:text-neutral-900 transition"
                    >
                        Sign out
                    </button>
                </div>
            </div>
            <div className="sm:hidden flex items-center gap-4 px-4 pb-2 overflow-x-auto">
                {links.map((link) => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className="text-xs text-neutral-500 hover:text-neutral-900 transition whitespace-nowrap"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default Navbar;
