const Groq = require('groq-sdk');

const chatWithBot = async (req, res) => {
    try {
        const { message } = req.body;

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            console.error('CHAT ERROR: GROQ_API_KEY is missing');
            return res.status(500).json({ message: 'API key not configured' });
        }

        const groq = new Groq({ apiKey });

        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }

        console.log('CHAT INFO: Fetching GROQ response for:', message.substring(0, 30));

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `You are the specialized ASTU Smart Complaint Assistant. 
                    
                    **Strict Constraints:**
                    1. **Only answer questions related to the ASTU Smart Complaint System or campus facilities** (Dorm, Internet, Cafeteria, Library, IT, etc.).
                    2. **If a question is off-topic** (e.g., religion, politics, generic coding, Bitcoin, etc.), politely respond: "I apologize, but I am only trained to assist with ASTU complaint-related issues. How can I help you with the system today?"
                    3. **System Accuracy:** 
                       - Students **CAN NOT** delete or edit a complaint once it is submitted.
                       - Students **CAN** track their status in "My Complaints".
                       - Admins assign tickets to Staff.
                    
                    **Formatting:**
                    - Always use Markdown (bolding, lists) to look professional (ChatGPT style).
                    - Be concise and friendly.`
                },
                {
                    role: 'user',
                    content: message
                }
            ],
            model: 'llama-3.3-70b-versatile',
        });

        const reply = chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't process that.";

        res.json({ reply });
    } catch (error) {
        console.error('CHAT ERROR:', error.message);
        res.status(500).json({
            message: 'Failed to get response',
            error: error.message
        });
    }
};

module.exports = { chatWithBot };
