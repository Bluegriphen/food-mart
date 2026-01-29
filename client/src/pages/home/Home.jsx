import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import { useState } from "react";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import ChatBot from "../../components/Chatbot/Chatbot";
// ...existing code...
const Home = () => {
  const [category, setCategory] = useState("All");
  const [showChatBot, setShowChatBot] = useState(false);

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />

      <button
        className="chatbot-toggle"
        aria-label={showChatBot ? "Close chat" : "Open chat"}
        onClick={() => setShowChatBot((s) => !s)}
      >
        {showChatBot ? (
          // close (X) icon
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          // chat bubble icon
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {showChatBot && (
        <div className="chatbot-panel" role="dialog" aria-modal="false">
          <ChatBot onClose={() => setShowChatBot(false)} />
        </div>
      )}
    </div>
  );
};

export default Home;
// ...existing code...
