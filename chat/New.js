import React, { useState } from 'react';
import './chatApp.css';

function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [groups, setGroups] = useState({ 'Rajan Chat ': [] });
  const [selectedGroup, setSelectedGroup] = useState('Rajan Chat ');
  const [message, setMessage] = useState('');
  const [newGroup, setNewGroup] = useState('');

  const handleLogin = () => {
    if (username) setIsLoggedIn(true);
  };

  const handleCreateGroup = () => {
    if (newGroup && !groups[newGroup]) {
      setGroups({ ...groups, [newGroup]: [] });
      setSelectedGroup(newGroup);
      setNewGroup('');
      alert("succes fully create a new group")
    }
  };

  const handleSendMessage = () => {
    if (message && selectedGroup) {
      const newMessage = {
        username,
        text: message,
        timestamp: new Date().toLocaleTimeString(),
      };
      setGroups({
        ...groups,
        [selectedGroup]: [...groups[selectedGroup], newMessage],
      });
      setMessage('');
    }
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <div className="login-screen">
        <h2 style={{textAlign:"center",marginTop:'160px',paddingLeft:'60px'}}>Welcome to chat world</h2>
          <input
          className='ent-in'
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className='ent-btn' onClick={handleLogin}>Enter Chat</button>
        </div>
      ) : (
        <div className="chat-container">
          <div className="group-sidebar">
            <h2 style={{background:"#FEF9F2",paddingLeft:"20 px"}}>Rajan Group Chat</h2>
          {Object.keys(groups).map((group) => (
              <button
                key={group}
                className={selectedGroup === group ? 'active' : ''}
                onClick={() => setSelectedGroup(group)}
              >
                {group}
              </button>

            ))}
            <input
            className='group-update'
              type="text"
              placeholder="New group name"
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
            />
            <button onClick={handleCreateGroup}>Create Group</button>
          </div>

          <div className="chat-room">
            <h2><label style={{color:'#2E073F'}}>{selectedGroup }</label>- PAGE</h2>
            <div className="messages">
              {groups[selectedGroup].map((msg, index) => (
                <div key={index} className="message">
                  <strong style={{color:'#FFF4EA'}}>{msg.username} :<label style={{color:'#FCFAEE'}}>({msg.timestamp})</label>:</strong> <label style={{color:"#FFF5E4"}}>{msg.text}</label>
                </div>
              ))}
            </div>
            <input
            className='send-inp'
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <button onClick={handleSendMessage} className='send-btn'>Send</button>
          
          </div>
        
        </div>
      )}

    </div>

  );

}


export default App;
