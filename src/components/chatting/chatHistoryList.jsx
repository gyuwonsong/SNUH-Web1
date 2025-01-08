const ChatHistoryList = ({ chatSessions, onSelectSession }) => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Chat Sessions</h2>
            <ul className="divide-y divide-border">
                {chatSessions.map((session) => (
                    <li
                        key={session.id}
                        className="p-3 cursor-pointer hover:bg-purple-100 transition-colors"
                        onClick={() => onSelectSession(session.id)}
                    >
                        <div className="font-medium text-foreground">{session.title}</div>
                        <div className="text-sm text-muted-foreground truncate">
                            {session.messages[0].text.substring(0, 30)}...
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatHistoryList;
