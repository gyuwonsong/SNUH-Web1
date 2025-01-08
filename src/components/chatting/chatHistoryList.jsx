import { useState } from "react";

const ChatHistoryList = ({ chatSessions, onSelectSession }) => {
    // 선택된 채팅 세션 ID 상태관리
    const [selectedSessionId, setSelectedSessionId] = useState(null);

    // 채팅 세션 선택 처리 함수
    const handleSelectSession = (sessionId) => {
        setSelectedSessionId(sessionId);
        onSelectSession(sessionId);
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Chat Sessions</h2>
            <ul className="divide-y divide-border">
                {/* 채팅 세션 목록 */}
                {chatSessions.map((session) => (
                    <li
                        key={session.id}
                        className={`p-3 cursor-pointer transition-colors ${
                            selectedSessionId === session.id ? "bg-purple-100" : "hover:bg-purple-100"
                        }`}
                        onClick={() => handleSelectSession(session.id)}
                    >
                        <div className="font-medium text-foreground">{session.title}</div>
                        <div className="text-sm text-muted-foreground truncate">
                            {session.messages[0]?.text.substring(0, 30)}...
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatHistoryList;
