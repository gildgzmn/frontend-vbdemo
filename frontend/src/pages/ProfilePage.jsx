import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../css/ProfilePage.css"; 

const ProfilePage = ({ data }) => {
  const { id } = useParams(); // Access the ID from the URL params
  const user = data.find((user) => user.id === parseInt(id)); // Find the user by ID

  const [isEditing, setIsEditing] = useState(false);
  const [newPhone, setNewPhone] = useState(user?.mobileNum || "");

  if (!user) return <p>User not found</p>;  

  const handleEditClick = () => setIsEditing(true);
  const handleSaveClick = () => {
    setIsEditing(false);
    user.mobileNum = newPhone; 
  };
  const handleCancelClick = () => {
    setIsEditing(false);
    setNewPhone(user.mobileNum); 
  };

  return (
    <div className="profile-page">
      <header className="header">
        <img src={user.profileImage || "default-avatar.png"} alt={`${user.firstName} ${user.lastName}'s avatar`} className="profile-avatar" />
        <h2>{`${user.firstName} ${user.middleName} ${user.lastName}`}</h2>
      </header>

      <section className="profile-details">
        <div className="detail-section">
          <label>Full Name</label>
          <input type="text" value={`${user.firstName} ${user.middleName} ${user.lastName}`} readOnly className="readonly-input" />
        </div>
        <div className="detail-section">
          <label>Phone</label>
          {isEditing ? (
            <>
              <input
                type="text"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="editable-input"
              />
              <div className="button-group">
                <button onClick={handleSaveClick} className="save-button">Save</button>
                <button onClick={handleCancelClick} className="cancel-button">Cancel</button>
              </div>
            </>
          ) : (
            <>
              <input type="text" value={user.mobileNum || "N/A"} readOnly className="readonly-input" />
              <button onClick={handleEditClick} className="edit-button">Edit</button>
            </>
          )}
        </div>
        <div className="detail-section">
          <label>Address</label>
          <input type="text" value={`${user.brgyCode} ${user.muniCode}`} readOnly className="readonly-input" />
        </div>
      </section>

      <footer className="footer">
        <p>© Copyright 2024</p>
      </footer>
    </div>
  );
};

export default ProfilePage;
