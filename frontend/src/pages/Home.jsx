import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Home() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-neutral-50">
            <nav className="bg-white/80 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto flex justify-between items-center h-14 px-4 sm:px-6">
                    <h1 className="text-sm font-semibold text-neutral-900 tracking-tight">ASTU Complaints</h1>
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
            </nav>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
                <h2 className="text-2xl font-semibold text-neutral-900 tracking-tight">
                    Welcome, {user?.name}
                </h2>
                <p className="text-neutral-400 text-sm mt-1">Here's an overview of your complaints.</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                    <div className="bg-white border border-neutral-200 rounded-2xl p-5">
                        <p className="text-xs text-neutral-400 font-medium uppercase tracking-wide">Total</p>
                        <p className="text-3xl font-semibold text-neutral-900 mt-2">0</p>
                    </div>
                    <div className="bg-white border border-neutral-200 rounded-2xl p-5">
                        <p className="text-xs text-neutral-400 font-medium uppercase tracking-wide">Pending</p>
                        <p className="text-3xl font-semibold text-neutral-900 mt-2">0</p>
                    </div>
                    <div className="bg-white border border-neutral-200 rounded-2xl p-5">
                        <p className="text-xs text-neutral-400 font-medium uppercase tracking-wide">Resolved</p>
                        <p className="text-3xl font-semibold text-neutral-900 mt-2">0</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;
