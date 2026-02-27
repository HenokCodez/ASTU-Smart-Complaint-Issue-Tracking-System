import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

function SubmitComplaint() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Academic'
    });
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('category', formData.category);
            if (file) data.append('attachment', file);

            await API.post('/complaints', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/my-complaints');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50">
            <Navbar />
            <main className="max-w-xl mx-auto px-4 sm:px-6 py-10">
                <h2 className="text-xl font-semibold text-neutral-900 tracking-tight">New Complaint</h2>
                <p className="text-neutral-400 text-sm mt-1 mb-8">Describe your issue below</p>

                {error && <p className="text-red-500 text-sm mb-6">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="Title"
                        className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition"
                    />

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="Describe your complaint..."
                        className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition resize-none"
                    />

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition appearance-none"
                    >
                        <option value="Academic">Academic</option>
                        <option value="Dormitory">Dormitory</option>
                        <option value="Cafeteria">Cafeteria</option>
                        <option value="Library">Library</option>
                        <option value="IT">IT</option>
                        <option value="Other">Other</option>
                    </select>

                    <div>
                        <label className="block text-xs text-neutral-400 mb-2">Attachment (optional)</label>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                            className="w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-neutral-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-neutral-800 active:scale-[0.98] transition-all disabled:opacity-40"
                    >
                        {loading ? 'Submitting...' : 'Submit Complaint'}
                    </button>
                </form>
            </main>
        </div>
    );
}

export default SubmitComplaint;
