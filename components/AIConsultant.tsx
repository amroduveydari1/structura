
import React, { useState, useRef, useEffect } from 'react';
import { getProjectConsultation } from '../services/geminiService';

const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMsg = message.trim();
    setMessage('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getProjectConsultation(userMsg);
    setChatHistory(prev => [...prev, { role: 'ai', text: response || 'I am sorry, something went wrong.' }]);
    setIsLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[60] bg-amber-600 hover:bg-amber-700 text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all group overflow-hidden"
      >
        {isOpen ? (
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        ) : (
          <div className="relative">
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          </div>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-4 left-4 md:left-auto md:right-8 z-50 w-auto md:w-[400px] h-[70vh] md:h-[500px] bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
          <div className="p-4 bg-zinc-800 border-b border-zinc-700 flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-widest">Structura AI</h3>
              <p className="text-zinc-400 text-[10px] md:text-xs">Architectural Consultant</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="md:hidden text-zinc-500 hover:text-white">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.length === 0 && (
              <div className="text-center py-10">
                <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <p className="text-zinc-400 text-sm px-4">Ask about your next project, technical specs, or sustainability benchmarks.</p>
              </div>
            )}
            {chatHistory.map((chat, idx) => (
              <div key={idx} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] px-4 py-3 rounded-lg text-sm leading-relaxed ${
                  chat.role === 'user' 
                    ? 'bg-amber-600 text-white rounded-br-none' 
                    : 'bg-zinc-800 text-zinc-300 rounded-bl-none'
                }`}>
                  {chat.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 px-4 py-2 rounded-lg text-zinc-500 text-[10px] animate-pulse">
                  Analyzing architectural parameters...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-zinc-800 border-t border-zinc-700">
            <div className="relative">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message Structura AI..."
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-2 h-8 w-8 bg-amber-600 rounded-md flex items-center justify-center text-white disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIConsultant;
