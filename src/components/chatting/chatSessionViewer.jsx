import UserInput from "./UserInput.jsx";

const ChatSessionViewer = ({ session, onUserMessageSubmit }) => {
    return (
        <div className="h-full flex flex-col bg-popover p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">{session.title}</h2>
            {/* 메시지 리스트 + 입력창을 하나의 flex 컨테이너로 */}
            <div className="flex flex-col justify-between flex-1 overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-4 p-2">
                    {session.messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`p-3 rounded-lg max-w-md ${
                                    msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                                }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                <UserInput onSubmit={onUserMessageSubmit} />
            </div>
        </div>
    );
};

export default ChatSessionViewer;
