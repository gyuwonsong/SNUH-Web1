import { useState, useEffect } from "react";
import UserInput from "./UserInput.jsx";
import { BiBell, BiBellOff, BiCog } from "react-icons/bi";

// 엔터티 추출 함수
const extractEntities = (text) => {
    if (typeof text !== "string") {
        console.error("Invalid text format:", text);
        return [];
    }
    const regex = /\b(?:report|case|CK|MDM2|nodule)\b/gi;
    return text.match(regex) || [];
};

// LLM API 호출 함수
const getLLMResponse = async (inputText, entities) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`LLM Response: "${inputText}" with entities: ${entities.join(", ")}`);
        }, 1000); // 1초 딜레이
    });
};

const ChatSessionViewer = ({ session, onUserMessageSubmit }) => {
    // 엔터티 상태관리
    const [entities, setEntities] = useState([]);
    // 채팅 히스토리 상태관리
    const [chatHistory, setChatHistory] = useState([]);

    // session이 변경될 때 chatHistory 업데이트
    useEffect(() => {
        if (session) {
            setChatHistory(session.messages);
        }
    }, [session]);

    // 알림 상태 상태관리
    const [notificationStates, setNotificationStates] = useState({});

    // 알림 토글 함수
    const toggleNotifications = (sessionId) => {
        setNotificationStates((prev) => ({
            ...prev,
            [sessionId]: !prev[sessionId],
        }));
    };

    // 알림 활성화 여부
    const isNotificationsEnabled = notificationStates[session?.id] ?? true;

    // 사용자 메시지 전송 처리 함수
    const handleUserMessageSubmit = async (message) => {
        const { text } = message;  // 1. 객체에서 text를 추출
        if (!text) {
            console.error("No text in message:", message);
            return;
        }

        const extractedEntities = extractEntities(text);  // 2. 문자열로 처리
        setEntities(extractedEntities);

        setChatHistory((prev) => [...prev, { sender: "user", text }]);  // text만 저장

        const llmResponse = await getLLMResponse(text, extractedEntities);
        setChatHistory((prev) => [...prev, { sender: "bot", text: llmResponse }]);
        onUserMessageSubmit({ sender: "user", text });  // 3. user 메시지를 외부에 전달
    };

    return (
        <div className="h-full flex flex-col bg-popover p-4 rounded-lg shadow-md">
            <div className="flex flex-row justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{session?.title || "No Session Selected"}</h2>
                <div className="flex flex-row gap-6 mr-2">
                    <div onClick={() => toggleNotifications(session?.id)} className="cursor-pointer">
                        {isNotificationsEnabled ? (
                            <BiBell className="text-2xl" title="알림 활성화됨" />
                        ) : (
                            <BiBellOff className="text-2xl" title="알림 비활성화됨" />
                        )}
                    </div>
                    <BiCog className="text-2xl" />
                </div>
            </div>

            {/* 엔터티 리스트 */}
            <div className="flex overflow-x-auto space-x-2 p-2 bg-muted-light rounded-md mb-4">
                {entities.length > 0 && (
                    entities.map((entity, index) => (
                        <span key={index} className="bg-primary text-white rounded-full px-3 py-1 text-sm">
                            {entity}
                        </span>
                    ))
                )}
            </div>

            {/* 채팅 메시지 */}
            <div className="flex flex-col justify-between flex-1 overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-4 p-2">
                    {chatHistory.map((msg, index) => (
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
                <UserInput onSubmit={handleUserMessageSubmit} />
            </div>
        </div>
    );
};

export default ChatSessionViewer;
