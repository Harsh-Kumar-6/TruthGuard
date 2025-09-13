import React, { useState, useRef } from 'react';
import { Send, MessageCircle, User, Bot } from 'lucide-react';

const QnAUI = () => {
  const containerRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'question',
      text: 'What is React?',
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      type: 'answer',
      text: 'React is a popular JavaScript library for building user interfaces, particularly web applications. It was developed by Facebook and allows developers to create reusable UI components and manage application state efficiently.',
      timestamp: '10:31 AM'
    },
    {
      id: 3,
      type: 'question',
      text: 'How do React hooks work?',
      timestamp: '10:35 AM'
    },
    {
      id: 4,
      type: 'answer',
      text: 'React hooks are functions that let you use state and other React features in functional components. The most common hooks are useState for managing state and useEffect for side effects.',
      timestamp: '10:36 AM'
    }
  ]);
  
  const [newQuestion, setNewQuestion] = useState('');

  const handleSubmit = () => {
    if (newQuestion.trim()) {
      const question = {
        id: Date.now(),
        type: 'question',
        text: newQuestion,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, question]);
      setNewQuestion('');
      
      setTimeout(() => {
        const answer = {
          id: Date.now() + 1,
          type: 'answer',
          text: 'Thank you for your question! This is a sample answer from the AI assistant.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, answer]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-transparent" ref={containerRef}>
      <style jsx>{`
        .qna-container {
          font-family: sans-serif;
          max-width: 100%;
        }
        
        .header-section {
          max-width: 1024px;
          margin: 0 auto;
          padding: 64px 20px;
          color: white;
          text-align: center;
        }
        
        .header-section p {
          margin-bottom: 16px;
        }
        
        .header-section h1 {
          margin-bottom: 24px;
          font-size: 44px;
          font-weight: bold;
        }
        
        .header-section .description {
          margin-bottom: 24px;
          font-size: 18px;
          line-height: 32px;
        }
        
        .main-layout {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .chat-container {
          background: linear-gradient(to bottom, rgba(30, 58, 138, 0.1), rgba(147, 51, 234, 0.1));
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          margin-bottom: 2rem;
        }
        
        .chat-header {
          padding: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
        }
        
        .chat-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 24px;
          font-weight: bold;
          color: #1e3a8a;
          margin-bottom: 8px;
        }
        
        .chat-subtitle {
          font-size: 16px;
          color: #64748b;
        }
        
        .messages-area {
          height: 400px;
          overflow-y: auto;
          padding: 24px;
        }
        
        .message {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
        }
        
        .message.question {
          justify-content: flex-end;
        }
        
        .message.answer {
          justify-content: flex-start;
        }
        
        .message-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .avatar-user {
          background: #3b82f6;
          color: white;
        }
        
        .avatar-bot {
          background: #10b981;
          color: white;
        }
        
        .message-content {
          max-width: 60%;
          padding: 12px 16px;
          border-radius: 16px;
          position: relative;
        }
        
        .content-question {
          background: #3b82f6;
          color: white;
        }
        
        .content-answer {
          background: rgba(255,255,255,0.9);
          color: #374151;
          border: 1px solid rgba(0,0,0,0.1);
        }
        
        .message-text {
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 4px;
        }
        
        .message-time {
          font-size: 12px;
          opacity: 0.7;
        }
        
        .input-section {
          padding: 24px;
          background: rgba(255,255,255,0.05);
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        
        .input-container {
          display: flex;
          gap: 12px;
        }
        
        .input-field {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid rgba(0,0,0,0.2);
          border-radius: 12px;
          background: rgba(255,255,255,0.9);
          font-size: 16px;
          outline: none;
          transition: all 0.3s ease;
        }
        
        .input-field:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .send-button {
          padding: 12px 20px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }
        
        .send-button:hover {
          background: #2563eb;
          transform: translateY(-1px);
        }
        
        .stats-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 24px;
        }
        
        .stat-card {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
        }
        
        .stat-number {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 8px;
        }
        
        .stat-label {
          font-size: 14px;
          opacity: 0.8;
        }
        
        .stat-questions .stat-number {
          color: #3b82f6;
        }
        
        .stat-answers .stat-number {
          color: #10b981;
        }
        
        .stat-rate .stat-number {
          color: #8b5cf6;
        }
        
        @media (max-width: 768px) {
          .header-section h1 {
            font-size: 32px;
          }
          
          .header-section .description {
            font-size: 16px;
          }
          
          .chat-title {
            font-size: 20px;
          }
          
          .messages-area {
            height: 300px;
            padding: 16px;
          }
          
          .message-content {
            max-width: 80%;
          }
          
          .input-section {
            padding: 16px;
          }
          
          .stats-section {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
      
      <header className="header-section">
        <h1>AI Q&A Assistant</h1>
        <div className="description">
          Ask any question and get intelligent responses powered by AI technology.
        </div>
      </header>
      
      <div className="main-layout">
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-title">
              <MessageCircle size={24} />
              Question & Answer
            </div>
            <div className="chat-subtitle">
              Interactive AI conversation interface
            </div>
          </div>
          
          <div className="messages-area">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message ${message.type}`}
              >
                {message.type === 'answer' && (
                  <div className="message-avatar avatar-bot">
                    <Bot size={20} />
                  </div>
                )}
                
                <div className={`message-content content-${message.type}`}>
                  <div className="message-text">{message.text}</div>
                  <div className="message-time">{message.timestamp}</div>
                </div>
                
                {message.type === 'question' && (
                  <div className="message-avatar avatar-user">
                    <User size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="input-section">
            <div className="input-container">
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question here..."
                className="input-field"
              />
              <button
                onClick={handleSubmit}
                className="send-button"
              >
                <Send size={16} />
                Send
              </button>
            </div>
          </div>
        </div>
        
        <div className="stats-section">
          <div className="stat-card stat-questions">
            <div className="stat-number">
              {messages.filter(m => m.type === 'question').length}
            </div>
            <div className="stat-label">Questions Asked</div>
          </div>
          
          <div className="stat-card stat-answers">
            <div className="stat-number">
              {messages.filter(m => m.type === 'answer').length}
            </div>
            <div className="stat-label">Answers Provided</div>
          </div>
          
          <div className="stat-card stat-rate">
            <div className="stat-number">100%</div>
            <div className="stat-label">Response Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QnAUI;