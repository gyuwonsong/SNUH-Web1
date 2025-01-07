import { useState } from 'react';
import { RiSendPlaneFill } from "react-icons/ri";

const UserInput = ({ onSubmit }) => {
    const [inputText, setInputText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputText.trim()) {
            onSubmit(inputText);
            setInputText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-row relative items-center">
          <textarea
              className="bg-background w-full h-12 p-3 pr-16 rounded-2xl resize-none focus:ring-primary focus:outline-none"
              placeholder="Type your message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
          />
            <button
                type="submit"
                className="absolute right-1.5 top-1/2 py-2.5 px-6 transform -translate-y-1/2 bg-primary text-primary-foreground rounded-2xl"
            >
                <RiSendPlaneFill />
            </button>
        </form>

    );
};

export default UserInput;
