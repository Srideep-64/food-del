import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './ChatBot.css';

const ChatMessage = ({ message }) => {
  const { food_list, url } = useContext(StoreContext);

  // message = { sender: 'user' | 'bot', text: string, recommendationIds?: string[] }

  const recommendedItems = message.recommendationIds
    ? food_list.filter(item => message.recommendationIds.includes(item._id))
    : [];

  return (
    <div className={`chat-message ${message.sender}`}>
      <p className="chat-bubble">{message.text}</p>

      {recommendedItems.length > 0 && (
        <div className="chat-food-cards">
          {recommendedItems.map(item => (
            <div className="chat-food-card" key={item._id}>
              <img src={item.image} alt={item.name} />
              <div className="chat-food-card-info">
                <p className="chat-food-name">{item.name}</p>
                <p className="chat-food-price">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;