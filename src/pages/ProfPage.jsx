import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/Profpage.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Typography } from '@mui/material';

const ProfPage = () => {
  const navigate = useNavigate();
  const { professorID } = useParams();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showAnonymousChat, setShowAnonymousChat] = useState(true);
  const [isChatVisible, setIsChatVisible] = useState(false); // State to toggle chat visibility
  const [isAnimating, setIsAnimating] = useState(false); // State to track animation
  const chatBoxRef = useRef(null); // Ref for the chat box

  const professors = {
    MUF1100: {
      name: "Aarav Reddy",
      email: "aarav.reddy@university.edu",
      facultyID: "MUF1100",
      department: "Mathematics",
      officeHours: "Mon-Fri, 2:00 PM - 4:00 PM",
      location: "Cabin 2, First floor, ECSOE",
      courses: [
        { id: "MA1101", name: "Calculus I" },
        { id: "MA2201", name: "Linear Algebra" },
      ],
    },
  };

  const professor = professors[professorID];
  if (!professor) return <div className="profile-container">Professor not found.</div>;

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const message = {
      text: newMessage,
      sender: isAnonymous ? 'Anonymous' : 'You',
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleChatToggle = () => {
    setIsChatVisible(!isChatVisible);
    setIsAnimating(true); // Start animation
    console.log('isChatVisible:', !isChatVisible); // Debugging
    if (!isChatVisible) {
      setTimeout(() => {
        chatBoxRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100); // Delay to ensure the chat box is rendered
    }
  };

  const filteredMessages = messages.filter(
    (msg) => (showAnonymousChat && msg.sender === 'Anonymous') || (!showAnonymousChat && msg.sender === 'You')
  );

  return (
    <div className="profile-container">
      <div className="profile-inner-box">
        <div className="profile-header">
          <div className="profile-icon">
            <AccountCircleIcon style={{ fontSize: 200, color: '#89CFF0' }} />
          </div>
          <div className="profile-details">
            <h2>{professor.name}</h2>
            <p><strong>Faculty ID:</strong> {professor.facultyID}</p>
            <p><strong>Email:</strong> {professor.email}</p>
            <p><strong>Department:</strong> {professor.department}</p>
            <p><strong>Office Hours:</strong> {professor.officeHours}</p>
            <p><strong>Location:</strong> {professor.location}</p>
          </div>
        </div>
      </div>

      {/* Courses Box */}
      <div className="bigger-container">
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5" gutterBottom fontFamily={"Plus Jakarta Sans"}>
            Courses Taught
          </Typography>
          {professor.courses.length === 0 ? (
            <Typography
              sx={{ fontSize: "1.2rem", fontWeight: "bold", color: "white", fontFamily: "Plus Jakarta Sans" }}
            >
              No Courses Assigned
            </Typography>
          ) : (
            <Box
              sx={{
                textAlign: "left",
                display: "inline-block",
                background: "rgba(0, 0, 0, 0.4)",
                padding: "20px",
                borderRadius: "15px",
                width: "100%",
                maxWidth: "1300px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                height: "180px",
              }}
            >
              <ul style={{ margin: 0, padding: 0, listStyleType: "none" }}>
                {professor.courses.map((course, index) => (
                  <li
                    key={index}
                    className="backlog-item"
                    style={{ cursor: 'pointer', padding: '10px 0' }}
                  >
                    {course.name} ({course.id})
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </Box>
      </div>

      {/* Chat Toggle Button */}
      <div className="chat-toggle-button">
        <button onClick={handleChatToggle}>
          {isChatVisible ? 'Hide Chat' : `Chat with ${professor.name}`}
        </button>
      </div>

      {/* Chat Section */}
      {(isChatVisible || isAnimating) && (
        <div
          ref={chatBoxRef}
          className={`chat-box ${isChatVisible ? 'slide-in-left' : 'slide-out-left'}`}
          onAnimationEnd={() => {
            if (!isChatVisible) {
              setIsAnimating(false); // Stop rendering the chat box after the animation ends
            }
          }}
        >
          <h3 className="chat-name">Chat with {professor.name}</h3>
          <div className="chat-inner-box">
            <div className="chat-messages">
              {filteredMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message ${
                    msg.sender === 'You' || msg.sender === 'Anonymous'
                      ? 'sent'
                      : msg.sender === professor.name
                      ? 'professor'
                      : 'received'
                  }`}
                >
                  <div className="message-bubble">
                    {msg.sender !== 'You' && msg.sender !== 'Anonymous' && (
                      <strong>{msg.sender}: </strong>
                    )}
                    {msg.text}
                    <span className="timestamp">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="chat-controls">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <div className="chat-options">
                <label>
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={() => setIsAnonymous(!isAnonymous)}
                  />
                  Send as Anonymous
                </label>
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </div>
          </div>
          <div className="chat-toggle">
            <button
              className={showAnonymousChat ? 'active' : ''}
              onClick={() => setShowAnonymousChat(true)}
            >
              Anonymous Chat
            </button>
            <button
              className={!showAnonymousChat ? 'active' : ''}
              onClick={() => setShowAnonymousChat(false)}
            >
              Non-Anonymous Chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfPage;