import React, { useState, useRef, useEffect, useContext } from 'react';
import './ChatBot.css';
import axios from 'axios';
import ChatMessage from './ChatMessage';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets'; // reuse existing assets folder

const ChatBot = () => {
    const {url} = useContext(StoreContext);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hey! Tell me your mood or diet preference and I'll suggest something 🍽️" }
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { sender: 'user', text: input };
  setMessages(prev => [...prev, userMessage]);
  setInput('');
  setLoading(true);

  try {
    const response = await axios.post(url + "/api/chatbot/recommend", { message: input });

    if (response.data.success) {
      const botMessage = {
        sender: 'bot',
        text: response.data.replyText,
        recommendationIds: response.data.recommendations.map(r => r.id)
      };
      setMessages(prev => [...prev, botMessage]);
    } else {
      setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, something went wrong. Try again?" }]);
    }
  } catch (err) {
    console.error(err);
    setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, something went wrong. Try again?" }]);
  } finally {
    setLoading(false);
  }
};

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chatbot-wrapper">
      {isOpen && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <p>Food Assistant 🤖</p>
            <span onClick={() => setIsOpen(false)}>✕</span>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg} />
            ))}
            {loading && <p className="chat-typing">typing...</p>}
            <div ref={chatEndRef}></div>
          </div>

          <div className="chatbot-input-area">
            <input
              type="text"
              placeholder="I want something spicy and cheap..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}

      <div className="chatbot-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '💬'}
      </div>
    </div>
  );
};

export default ChatBot;