import React, { useState } from 'react';
import ChatHistoryList from './ChatHistoryList';
import ChatSessionViewer from './ChatSessionViewer';
import { dummyChatSessions } from '../../data/dummyChatSesstions.js';

const ChatUI = () => {
    const [chatSessions, setChatSessions] = useState(dummyChatSessions);
    const [selectedSession, setSelectedSession] = useState(null);

    const handleSelectSession = (sessionId) => {
        const session = chatSessions.find((s) => s.id === sessionId);
        setSelectedSession(session);
    };

    return (
        <div className="flex bg-background rounded-lg shadow-md w-full max-w-5xl h-[80vh]">
            {/* 왼쪽: 채팅 기록 목록 */}
            <div className="w-1/3 bg-background p-4 rounded-l-lg overflow-y-auto">
                <ChatHistoryList chatSessions={chatSessions} onSelectSession={handleSelectSession} />
            </div>

            {/* 오른쪽: 선택된 채팅 뷰어 */}
            <div className="w-2/3 p-4 rounded-r-lg">
                {selectedSession ? (
                    <ChatSessionViewer session={selectedSession} />
                ) : (
                    <p className="text-muted-foreground text-center">Select a chat session to view details</p>
                )}
            </div>
        </div>
    );
};

export default ChatUI;
