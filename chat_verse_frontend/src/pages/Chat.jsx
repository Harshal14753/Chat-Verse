import React, { useContext, useEffect, useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdAddComment } from "react-icons/md";
import { useNavigate } from "react-router";
import { getUserChatRooms, getMessages, searchUserByPhoneNumber, createChatRoom, sendChatMessage } from "../services/UserService";
import UserContext from "../context/UserContext.jsx";
import { baseURL } from "../config/AxiosHelper.js";


function Chat() {

    const { user } = useContext(UserContext);
    const phoneNumber = user ? user.phoneNumber : null;

    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loadingRooms, setLoadingRooms] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const chatBoxRef = useRef(null);

    const [showNewChatModal, setShowNewChatModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const [searchError, setSearchError] = useState(null);

    const navigate = useNavigate();

    // Fetch chat rooms when userId is available
    useEffect(() => {
        if (!phoneNumber) return;
        setLoadingRooms(true);
        getUserChatRooms(Number(phoneNumber), user.password)
            .then(data => {
                setRooms(data);
                setLoadingRooms(false);
            })
            .catch(() => {
                setRooms([]);
                setLoadingRooms(false);
            });
        console.log("Fetched chat rooms (Chat)", rooms);
    }, [phoneNumber]);

    // Fetch messages when selectedRoom or userId changes
    useEffect(() => {
        if (selectedRoom) {
            setLoadingMessages(true);
            // fetch messages for the selected room (roomId is first argument)
            getMessages(selectedRoom.id)
                .then(data => {
                    const msgs = data || [];
                    setMessages(msgs);
                    // update lastMessage for this room using the last message in the list
                    if (msgs.length > 0) {
                        updateRoomLastMessage(selectedRoom.id, msgs[msgs.length - 1]);
                    }
                    setLoadingMessages(false);
                    
                    // Mark all unread messages from other users as READ
                    // Note: This will be handled via WebSocket in the next useEffect
                })
                .catch(() => {
                    setMessages([]);
                    setLoadingMessages(false);
                });
        } else {
            setMessages([]);
        }
    }, [selectedRoom]);


    // 1. Message loading useEffect moved down to avoid interruption
    // removed legacy/unused message loader (was referencing undefined vars)

    // 2. stompClient ko init karna koga
    // stompClient ko subscribe karne koga

    useEffect(() => {
        if (chatBoxRef.current) {
            // Smooth scroll to bottom whenever messages update
            try {
                chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
            } catch (e) {
                // fallback
                chatBoxRef.current.scroll({ top: chatBoxRef.current.scrollHeight });
            }
        }
    }, [messages])

    useEffect(() => {
        if (typeof SockJS === 'undefined' || typeof Stomp === 'undefined') return;
        if (!selectedRoom) return;

        // const sock = new SockJS('http://localhost:8083/chat');
        const sock = new SockJS(`${baseURL}/chat`);
        const client = Stomp.over(sock);
        let subscription;

        // build auth headers from localStorage so no interactive sign-in is required
        const headers = {};
        try {
            const storedPhone = localStorage.getItem('phoneNumber');
            const storedPassword = localStorage.getItem('password');
            if (storedPhone && storedPassword) {
                const encoded = btoa(`${storedPhone}:${storedPassword}`);
                headers['Authorization'] = `Basic ${encoded}`;
                console.log(`🔐 STOMP connecting with Basic Auth for phone: ${storedPhone}`);
            } else {
                console.warn('⚠️ No phone/password in localStorage for STOMP auth');
            }
        } catch (e) {
            console.error('⚠️ Error building STOMP auth headers:', e);
        }

        client.connect(headers, () => {
            console.log('✅ STOMP connected successfully with Basic Auth');
            // expose client for fallback send
            if (typeof window !== 'undefined') window.stompClient = client;
            try {
                subscription = client.subscribe(`/topic/room/${selectedRoom.id}`, (message) => {
                    console.log('📨 Message received from STOMP:', message.body);
                    try {
                        const newMessage = JSON.parse(message.body);
                        console.log('📨 Parsed message:', newMessage);

                        // Track if this is a new message or just a status update
                        let isNewMessage = false;
                        let isStatusUpdate = false;
                        
                        setMessages((prev) => {
                            if (!newMessage || !newMessage.id) {
                                isNewMessage = true;
                                return [...prev, newMessage];
                            }
                            
                            // Check if message already exists (status update)
                            const idx = prev.findIndex(m => String(m.id) === String(newMessage.id));
                            if (idx !== -1) {
                                // This is a status update for existing message
                                const updated = [...prev];
                                const oldStatus = updated[idx].status;
                                updated[idx] = { ...updated[idx], ...newMessage };
                                isStatusUpdate = true;
                                console.log(`🔄 Status update ${newMessage.id}: ${oldStatus} → ${newMessage.status}`);
                                return updated;
                            }
                            
                            // Try to find a temp optimistic message to replace
                            const tempIdx = prev.findIndex(m => 
                                String(m.id || '').startsWith('temp-') && 
                                m.content === newMessage.content && 
                                String(m.senderPhoneNumber) === String(newMessage.senderPhoneNumber)
                            );
                            if (tempIdx !== -1) {
                                const updated = [...prev];
                                updated[tempIdx] = newMessage;
                                console.log(`✅ Confirmed sent message ${newMessage.id} with status: ${newMessage.status}`);
                                return updated;
                            }
                            
                            // Truly new message from other user
                            isNewMessage = true;
                            console.log(`✨ New message ${newMessage.id} with status: ${newMessage.status}`);
                            return [...prev, newMessage];
                        });

                        // Update room's last message for preview (for both new messages and important status updates)
                        if (isNewMessage || (isStatusUpdate && newMessage.status === 'READ')) {
                            updateRoomLastMessage(selectedRoom.id, newMessage);
                        }

                        // Send acknowledgments only for NEW messages from other users
                        const isMine = String(newMessage.senderPhoneNumber) === String(phoneNumber);
                        if (isNewMessage && !isMine) {
                            const isViewing = document.hasFocus() && selectedRoom && String(selectedRoom.id) === String(newMessage.chatRoomId);
                            
                            try {
                                if (isViewing) {
                                    // User is actively viewing, mark as READ
                                    client.send(`/app/read/${selectedRoom.id}`, {},
                                        JSON.stringify({ messageIds: [newMessage.id], receiverPhoneNumber: phoneNumber })
                                    );
                                    console.log("🔵 Sent READ ack for:", newMessage.id);
                                } else if (newMessage.status === 'SENT') {
                                    // User received but not viewing, mark as DELIVERED
                                    client.send(`/app/delivered/${selectedRoom.id}`, {},
                                        JSON.stringify({ messageId: newMessage.id, receiverPhoneNumber: phoneNumber })
                                    );
                                    console.log("✓✓ Sent DELIVERED ack for:", newMessage.id);
                                }
                            } catch (err) {
                                console.warn("Failed to send acknowledgment:", err);
                            }
                        }
                    } catch (err) {
                        console.error('Malformed websocket message', err);
                    }
                });
                console.log(`✅ Subscribed to /topic/room/${selectedRoom.id}`);

                // Notify server that this user has selected this room (so backend can auto-mark as DELIVERED)
                try {
                    if (typeof phoneNumber !== 'undefined' && phoneNumber !== null) {
                        client.send(`/app/selectRoom/${selectedRoom.id}`, {}, JSON.stringify({ phoneNumber }));
                        console.log('📌 Sent selected-room notice to server for room', selectedRoom.id);
                    }
                } catch (selErr) {
                    console.warn('Failed to notify server of selected room', selErr);
                }

                // Mark all existing unread messages as READ via WebSocket
                try {
                    const unreadMessageIds = messages
                        .filter(m => String(m.senderPhoneNumber) !== String(phoneNumber) && m.status !== "READ")
                        .map(m => m.id);
                    
                    if (unreadMessageIds.length > 0) {
                        client.send(`/app/read/${selectedRoom.id}`, {},
                            JSON.stringify({ messageIds: unreadMessageIds, receiverPhoneNumber: phoneNumber })
                        );
                        console.log(`🔵 Sent READ acknowledgment for ${unreadMessageIds.length} existing messages`);
                    }
                } catch (readErr) {
                    console.warn('Failed to send READ for existing messages', readErr);
                }
            } catch (e) {
                console.error('STOMP subscribe failed', e);
            }
        }, (err) => {
            console.error('❌ STOMP connect error:', err);
        }); return () => {
            try {
                if (subscription) subscription.unsubscribe();
            } catch (e) { }
            try {
                // notify server that user left/deselected this room
                if (client && client.connected && typeof phoneNumber !== 'undefined' && phoneNumber !== null) {
                    try {
                        client.send(`/app/selectRoom/0`, {}, JSON.stringify({ phoneNumber }));
                        console.log('📌 Notified server to deselect room for phone:', phoneNumber);
                    } catch (e) {
                        console.warn('Failed to send deselect notice', e);
                    }
                }
            } catch (e) { }
            try {
                if (client && client.connected) client.disconnect();
            } catch (e) { }
            try {
                if (typeof window !== 'undefined' && window.stompClient) delete window.stompClient;
            } catch (e) { }
        };
    }, [selectedRoom]);

    // Message input state
    const [messageText, setMessageText] = useState("");

    // send message: use WebSocket exclusively for message sending
    const sendMessage = () => {
        if (!selectedRoom || !messageText || !messageText.trim()) return;
        
        const content = messageText.trim();
        
        // Check if WebSocket client is available
        if (!window.stompClient || !window.stompClient.connected) {
            console.error('❌ WebSocket not connected. Cannot send message.');
            alert('Connection lost. Please refresh the page.');
            return;
        }

        // optimistic UI update - show message immediately with SENT status
        const tempMsg = {
            id: `temp-${Date.now()}`,
            content,
            senderPhoneNumber: phoneNumber,
            chatRoomId: selectedRoom.id,
            timestamp: new Date().toISOString(),
            status: 'SENT'
        };
        setMessages(prev => [...prev, tempMsg]);
        setMessageText("");

        try {
            // Send message via WebSocket
            window.stompClient.send(
                `/app/sendMessage/${selectedRoom.id}`,
                {},
                JSON.stringify({
                    content,
                    senderPhoneNumber: phoneNumber,
                    chatRoomId: selectedRoom.id
                })
            );
            console.log('📤 Message sent via WebSocket');
        } catch (err) {
            console.error('❌ Failed to send message via WebSocket:', err);
            // Remove optimistic message on error
            setMessages(prev => prev.filter(msg => msg.id !== tempMsg.id));
            alert('Failed to send message. Please try again.');
        }
    }

    const stickyHeaderStyle = {
        padding: "0.8rem 1rem",
        borderBottom: "1px solid #222e35",
        color: "#ffffff",
        fontWeight: 700,
        fontSize: "1.2rem",
        letterSpacing: ".5px",
        background: "#2c2c2c",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 50,
    };

    const iconContainerStyle = {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
    };

    const iconStyle = {
        color: "#ffffff",
        fontSize: "1.5rem",
        cursor: "pointer",
        padding: "0.3rem",
        borderRadius: "4px",
        transition: "background 0.2s ease",
    };

    const handleProfileClick = (e) => {
        e.preventDefault();
        navigate("/profile");
    };

    const handleSearchUsers = (e) => {
        setSearchQuery(e.target.value);
        setSearchError(null);
        setSearchResults([]);
    };

    // Update a room's lastMessage in the rooms list
    const updateRoomLastMessage = (roomId, lastMessage) => {
        if (!roomId) return;
        setRooms(prev => prev.map(r => {
            if (r.id === roomId) {
                return { ...r, lastMessage };
            }
            return r;
        }));
    };

    const handleSearch = async () => {
        if (searchQuery.trim().length === 0) {
            setSearchError("Please enter a phone number");
            setSearchResults([]);
            return;
        }

        setSearching(true);
        setSearchError(null);
        try {
            const results = await searchUserByPhoneNumber(searchQuery);
            console.log("Search results:", results);

            // Ensure results is an array
            const resultsArray = Array.isArray(results) ? results : [results];

            // Filter out the current user from results
            const filteredResults = resultsArray.filter(user => user && user.phoneNumber !== phoneNumber);
            setSearchResults(filteredResults);
        } catch (error) {
            console.error("Search error:", error);
            setSearchError("Error searching users. Please try again.");
            setSearchResults([]);
        } finally {
            setSearching(false);
        }
    };

    const handleSelectUser = async (selectedUser) => {
        try {
            // Create the chat room
            const newRoom = await createChatRoom(phoneNumber, selectedUser.phoneNumber, user.password);

            // Refresh chat rooms
            const updatedRooms = await getUserChatRooms(Number(phoneNumber), user.password);
            setRooms(updatedRooms);

            // Select the new room
            setSelectedRoom(newRoom);

            // Close modal and reset search
            setShowNewChatModal(false);
            setSearchQuery("");
            setSearchResults([]);
        } catch (error) {
            console.error("Error creating chat room:", error);
            setSearchError("Error creating chat room. Please try again.");
        }
    };

    // Select a room and immediately load its messages (uses available vars)
    const handleRoomSelect = (room) => {
        setSelectedRoom(room);
        if (!room) return;
        setLoadingMessages(true);
        getMessages(room.id)
            .then(data => {
                const msgs = data || [];
                setMessages(msgs);
                if (msgs.length > 0) updateRoomLastMessage(room.id, msgs[msgs.length - 1]);
                setLoadingMessages(false);
            })
            .catch(err => {
                console.error('Error loading messages for room', room.id, err);
                setMessages([]);
                setLoadingMessages(false);
            });
    };

    const handleNewChatClick = () => {
        setShowNewChatModal(true);
        setSearchQuery("");
        setSearchResults([]);
        setSearchError(null);
    };

    // Helper: other participant in the selected room
    const otherUser = selectedRoom ? selectedRoom.users.find(u => String(u.phoneNumber) !== String(phoneNumber)) : null;

    const formatTime = (ts) => {
        if (!ts) return "";
        try {
            const d = new Date(ts);
            return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } catch (e) {
            return "";
        }
    };

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                background: "#0b141a",
                overflow: "hidden",
            }}
        >
            {/* Sidebar: Chat List */}
            <div
                style={{
                    width: "30vw",
                    minWidth: "30vw",
                    background: "#202c33",
                    borderRight: "1.5px solid #222e35",
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                    overflow: "hidden",
                }}
            >
                <div style={{
                    padding: "1.2rem 1.5rem",
                    borderBottom: "2px solid #222e35",
                    background: "#202c33",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                        <div style={{
                            width: "4px",
                            height: "32px",
                            background: "linear-gradient(180deg, #25d366 0%, #128c7e 100%)",
                            borderRadius: "4px",
                            boxShadow: "0 0 10px rgba(37, 211, 102, 0.4)"
                        }}></div>
                        <span style={{
                            color: "#ffffff",
                            fontWeight: 700,
                            fontSize: "1.4rem",
                            letterSpacing: "0.5px",
                            textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
                        }}>
                            Chats
                        </span>
                    </div>
                    <div style={iconContainerStyle}>
                        <MdAddComment
                            style={{
                                ...iconStyle, 
                                fontSize: "2.5rem",
                                transition: "all 0.3s ease",
                                cursor: "pointer",
                                padding: "0.5rem",
                                borderRadius: "50%",
                                background: "transparent"
                            }}
                            onMouseEnter={e => {
                                e.target.style.color = "#25d366";
                                e.target.style.transform = "scale(1.15) rotate(15deg)";
                                e.target.style.background = "rgba(37, 211, 102, 0.1)";
                            }}
                            onMouseLeave={e => {
                                e.target.style.color = "#aebac1";
                                e.target.style.transform = "scale(1) rotate(0deg)";
                                e.target.style.background = "transparent";
                            }}
                            onClick={handleNewChatClick}
                        />
                        <FaUserCircle
                            style={{
                                ...iconStyle, 
                                fontSize: "2.5rem",
                                transition: "all 0.3s ease",
                                cursor: "pointer",
                                padding: "0.5rem",
                                borderRadius: "50%",
                                background: "transparent"
                            }}
                            onMouseEnter={e => {
                                e.target.style.color = "#25d366";
                                e.target.style.transform = "scale(1.15)";
                                e.target.style.background = "rgba(37, 211, 102, 0.1)";
                            }}
                            onMouseLeave={e => {
                                e.target.style.color = "#aebac1";
                                e.target.style.transform = "scale(1)";
                                e.target.style.background = "transparent";
                            }}
                            onClick={handleProfileClick}
                        />
                    </div>
                </div>
                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                    className="hide-scrollbar"
                >
                    {loadingRooms ? (
                        <div style={{ color: "#aebac1", textAlign: "center", marginTop: 20 }}>Loading...</div>
                    ) : rooms.length === 0 ? (
                        <div style={{ color: "#aebac1", textAlign: "center", marginTop: 20 }}>No chat rooms</div>
                    ) : (
                        rooms.map((room) => (
                            <div
                                key={room.id}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem",
                                    padding: "1rem 1.2rem",
                                    borderBottom: "1px solid #222e35",
                                    cursor: "pointer",
                                    background: selectedRoom && selectedRoom.id === room.id ? "#222d33ff" : "transparent",
                                    color: "#d1d7db",
                                    transition: "background 0.2s, box-shadow 0.2s",
                                    position: "relative",
                                    boxShadow: "0 2px 8px rgba(32,44,51,0.07)",
                                }}
                                onClick={() => handleRoomSelect(room)}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = "#2d3c44ff";
                                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(37, 51, 59, 0.15)";
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = selectedRoom && selectedRoom.id === room.id ? "#222d33ff" : "transparent";
                                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(32,44,51,0.07)";
                                }}
                            >
                                <div
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: "50%",
                                        background: "#25d36633",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: 700,
                                        color: "#25d366",
                                        fontSize: "1.15rem",
                                        flexShrink: 0,
                                        boxShadow: "0 2px 8px rgba(32,44,51,0.15)",
                                    }}
                                >
                                    {user.phoneNumber == room.users[0].phoneNumber ? room.users[1].displayName[0].toUpperCase() : room.users[0].displayName[0].toUpperCase()}

                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}>
                                        {/* name of the other side user */}
                                        <span style={{ fontWeight: 600, color: "#25d366", fontSize: "1.08rem" }}>
                                            {user.phoneNumber == room.users[0].phoneNumber ? room.users[1].displayName : room.users[0].displayName}
                                        </span>
                                        {/* Optionally show last message time */}
                                    </div>
                                    
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            {/* Main Chat Area */}
            <div
                style={{
                    width: "70vw",
                    minWidth: "70vw",
                    background: "#111b21",
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                    position: "sticky",
                    top: 0,
                    right: 0,
                    zIndex: 2,
                }}
            >
                {/* Chat header */}
                {selectedRoom ? (
                    <div style={{
                        ...stickyHeaderStyle,
                        color: "#25d366",
                        background: "rgba(32,44,51,0.98)",
                        justifyContent: "flex-start"
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <div
                                style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: "50%",
                                    background: "#25d36633",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 700,
                                    color: "#25d366",
                                    fontSize: "1.3rem",
                                }}
                            >
                                {user.phoneNumber == selectedRoom.users[0].phoneNumber ? selectedRoom.users[1].displayName[0].toUpperCase() : selectedRoom.users[0].displayName[0].toUpperCase()}
                            </div>
                            <div>
                                <div style={{ fontWeight: 600, color: "#25d366" }}>
                                    {user.phoneNumber == selectedRoom.users[0].phoneNumber ? selectedRoom.users[1].displayName : selectedRoom.users[0].displayName}
                                </div>
                                {/* Optionally show online status or participants */}
                            </div>
                        </div>
                    </div>
                ) : null}
                {/* Chat messages */}
                <div
                    ref={chatBoxRef}
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: "2rem 1.5rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.2rem",
                        background: "linear-gradient(120deg, #111b21 80%, #222e35 100%)",
                        alignItems: selectedRoom ? "stretch" : "center",
                        justifyContent: selectedRoom ? "flex-start" : "center",
                    }}
                >
                    {selectedRoom ? (
                        loadingMessages ? (
                            <div style={{ color: "#aebac1", textAlign: "center" }}>Loading...</div>
                        ) : messages.length === 0 ? (
                            <div style={{ color: "#aebac1", textAlign: "center" }}>No messages in this room.</div>
                        ) : (
                            messages.map((msg, idx) => {
                                const isMine = String(msg.senderPhoneNumber) === String(phoneNumber);
                                const time = formatTime(msg.timestamp || msg.createdAt || msg.time);
                                
                                // Check if we need to show "Unread Messages" divider
                                // Show divider before the first unread message from other user
                                const showUnreadDivider = !isMine && 
                                    msg.status !== 'READ' && 
                                    (idx === 0 || messages.slice(0, idx).every(m => 
                                        String(m.senderPhoneNumber) === String(phoneNumber) || m.status === 'READ'
                                    ));
                                
                                return (
                                    <React.Fragment key={msg.id || idx}>
                                        {showUnreadDivider && (
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                margin: '1rem 0',
                                                gap: '1rem'
                                            }}>
                                                <div style={{
                                                    flex: 1,
                                                    height: '1px',
                                                    background: 'linear-gradient(to right, transparent, #ff6b6b, transparent)'
                                                }}></div>
                                                <span style={{
                                                    color: '#ff6b6b',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 600,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '1px',
                                                    whiteSpace: 'nowrap',
                                                    padding: '0.3rem 1rem',
                                                    background: '#1a2228',
                                                    borderRadius: '12px',
                                                    border: '1px solid #ff6b6b40'
                                                }}>
                                                    Unread Messages
                                                </span>
                                                <div style={{
                                                    flex: 1,
                                                    height: '1px',
                                                    background: 'linear-gradient(to left, transparent, #ff6b6b, transparent)'
                                                }}></div>
                                            </div>
                                        )}
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMine ? 'flex-end' : 'flex-start', gap: 6 }}>
                                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, maxWidth: '60%' }}>
                                                {!isMine && (
                                                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#25d36633', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#25d366', fontWeight: 700, flexShrink: 0 }}>
                                                        {otherUser && otherUser.displayName ? otherUser.displayName[0].toUpperCase() : String(msg.senderPhoneNumber || '')[0]}
                                                    </div>
                                                )}
                                                <div style={{
                                                    background: isMine ? '#25d366' : '#222e35',
                                                    color: isMine ? '#202c33' : '#fff',
                                                    borderRadius: isMine ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                                    padding: '0.85rem 1.2rem',
                                                    fontSize: '1.05rem',
                                                    wordBreak: 'break-word'
                                                }}>
                                                    {msg.content}
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', color: '#aebac1', marginTop: 4, alignSelf: isMine ? 'flex-end' : 'flex-start' }}>
                                                <span>{time}</span>
                                                {isMine && (
                                                    <div style={{ color: msg.status === 'READ' ? '#34b7f1' : msg.status === 'DELIVERED' ? '#9aa0a6' : '#ffffff', fontWeight: 'bold', letterSpacing: '1px' }}>
                                                        {msg.status === 'DELIVERED' || msg.status === 'READ' ? '✓✓' : '✓'}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                        )
                    ) : (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1.5rem',
                            textAlign: 'center',
                            padding: '2rem'
                        }}>
                            <div style={{
                                color: "#25d366",
                                fontSize: "2.8rem",
                                fontWeight: 700,
                                letterSpacing: '1px'
                            }}>
                                ChatVerse for Windows
                            </div>
                            <div style={{
                                color: "#aebac1",
                                fontSize: "1.15rem",
                                fontWeight: 400,
                                maxWidth: '500px',
                                lineHeight: '1.6'
                            }}>
                                Send and receive messages without interruption.
                            </div>
                        </div>
                    )}
                </div>
                {/* Chat input */}
                {selectedRoom && (
                    <div
                        style={{
                            padding: "1rem 1.5rem",
                            borderTop: "1px solid #222e35",
                            background: "#202c33",
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Type a message"
                            style={{
                                flex: 1,
                                padding: "0.85rem 1.2rem",
                                borderRadius: "24px",
                                border: "none",
                                background: "#111b21",
                                color: "#fff",
                                fontSize: "1.08rem",
                                outline: "none",
                            }}
                            value={messageText}
                            onChange={e => setMessageText(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && sendMessage()}
                        />
                        <button
                            style={{
                                background: "#25d366",
                                color: "#202c33",
                                border: "none",
                                borderRadius: "50%",
                                width: 44,
                                height: 44,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.3rem",
                                fontWeight: 700,
                                cursor: messageText && messageText.trim() ? "pointer" : "not-allowed",
                            }}
                            onClick={sendMessage}
                            disabled={!messageText || !messageText.trim()}
                        >
                            ➤
                        </button>
                    </div>
                )}
            </div>

            {/* New Chat Modal */}
            {showNewChatModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0, 0, 0, 0.7)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                    }}
                    onClick={() => setShowNewChatModal(false)}
                >
                    <div
                        style={{
                            background: "#202c33",
                            borderRadius: "12px",
                            padding: "2rem",
                            width: "90%",
                            maxWidth: "500px",
                            maxHeight: "70vh",
                            display: "flex",
                            flexDirection: "column",
                            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 style={{ color: "#25d366", marginBottom: "1.5rem", textAlign: "center" }}>
                            Start New Chat
                        </h2>

                        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
                            <input
                                type="text"
                                placeholder="Search by phone number"
                                value={searchQuery}
                                onChange={handleSearchUsers}
                                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                                style={{
                                    flex: 1,
                                    padding: "0.85rem 1.2rem",
                                    borderRadius: "8px",
                                    border: "1px solid #222e35",
                                    background: "#111b21",
                                    color: "#fff",
                                    fontSize: "1rem",
                                    outline: "none",
                                }}
                            />
                            <button
                                onClick={handleSearch}
                                disabled={searching}
                                style={{
                                    padding: "0.85rem 1.5rem",
                                    background: "#25d366",
                                    color: "#202c33",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontSize: "0.95rem",
                                    fontWeight: 600,
                                    cursor: searching ? "not-allowed" : "pointer",
                                    opacity: searching ? 0.6 : 1,
                                    transition: "background 0.2s, opacity 0.2s",
                                    whiteSpace: "nowrap",
                                }}
                                onMouseEnter={(e) => !searching && (e.currentTarget.style.background = "#1ead51")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "#25d366")}
                            >
                                {searching ? "Searching..." : "Search"}
                            </button>
                        </div>

                        {searchError && (
                            <div
                                style={{
                                    background: "#ff4444",
                                    color: "#fff",
                                    padding: "0.75rem 1rem",
                                    borderRadius: "6px",
                                    marginBottom: "1rem",
                                    fontSize: "0.9rem",
                                }}
                            >
                                {searchError}
                            </div>
                        )}

                        <div
                            style={{
                                flex: 1,
                                overflowY: "auto",
                                marginBottom: "1rem",
                            }}
                        >
                            {searching && (
                                <div style={{ color: "#aebac1", textAlign: "center", padding: "1rem" }}>
                                    Searching...
                                </div>
                            )}
                            {!searching && searchResults.length === 0 && searchQuery && (
                                <div style={{ color: "#aebac1", textAlign: "center", padding: "1rem" }}>
                                    No users found
                                </div>
                            )}
                            {!searching && searchResults.length > 0 && (
                                <div>
                                    {searchResults.map((result) => (
                                        <div
                                            key={result.phoneNumber}
                                            style={{
                                                padding: "1rem",
                                                background: "#111b21",
                                                borderRadius: "8px",
                                                marginBottom: "0.5rem",
                                                cursor: "pointer",
                                                border: "1px solid #222e35",
                                                transition: "background 0.2s, border 0.2s",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = "#1e2a2f";
                                                e.currentTarget.style.borderColor = "#25d366";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = "#111b21";
                                                e.currentTarget.style.borderColor = "#222e35";
                                            }}
                                            onClick={() => handleSelectUser(result)}
                                        >
                                            <div style={{ color: "#25d366", fontWeight: 600 }}>
                                                {result.displayName}
                                            </div>
                                            <div style={{ color: "#aebac1", fontSize: "0.9rem", marginTop: "0.25rem" }}>
                                                {result.phoneNumber}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setShowNewChatModal(false)}
                            style={{
                                padding: "0.85rem 1.5rem",
                                background: "#111b21",
                                color: "#25d366",
                                border: "1px solid #25d366",
                                borderRadius: "6px",
                                fontSize: "1rem",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "background 0.2s, color 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#25d366";
                                e.currentTarget.style.color = "#202c33";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#111b21";
                                e.currentTarget.style.color = "#25d366";
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chat;
