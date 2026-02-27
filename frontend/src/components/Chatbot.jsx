import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../context/AuthContext';

function Chatbot() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([
        { role: 'bot', text: 'Hello! I am your ASTU assistant. How can I help you with your complaints today?' }
    ]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chat]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const userMsg = { role: 'user', text: message };
        setChat((prev) => [...prev, userMsg]);
        setMessage('');
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:5000/api/chat',
                { message: userMsg.text },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            setChat((prev) => [...prev, { role: 'bot', text: res.data.reply }]);
        } catch (err) {
            console.error('Chatbot error:', err.response?.data || err.message);
            setChat((prev) => [...prev, { role: 'bot', text: 'Sorry, I am having trouble connecting right now.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen ? (
                <div className="bg-white border border-neutral-200 rounded-2xl shadow-xl w-80 sm:w-96 flex flex-col overflow-hidden max-h-[500px]">
                    {/* Header */}
                    <div className="bg-neutral-900 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="font-medium text-sm">ASTU Assistant</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50 min-h-[300px]">
                        {chat.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${msg.role === 'user'
                                    ? 'bg-neutral-900 text-white rounded-tr-none'
                                    : 'bg-white border border-neutral-200 text-neutral-800 rounded-tl-none'
                                    }`}>
                                    {msg.role === 'bot' ? (
                                        <div className="markdown-container">
                                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                                        </div>
                                    ) : (
                                        msg.text
                                    )}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-neutral-200 px-4 py-2 rounded-2xl rounded-tl-none">
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                        <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} className="p-4 bg-white border-t border-neutral-100 flex gap-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your question..."
                            className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 transition"
                        />
                        <button
                            type="submit"
                            disabled={loading || !message.trim()}
                            className="bg-neutral-900 text-white p-2 rounded-xl hover:bg-neutral-800 disabled:opacity-50 transition"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                            </svg>
                        </button>
                    </form>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-neutral-900 text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform duration-200 active:scale-95"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                    </svg>
                </button>
            )}
        </div>
    );
}

export default Chatbot;
