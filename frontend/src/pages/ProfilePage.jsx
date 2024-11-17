import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import "../css/ProfilePage.css";

const ProfilePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user || null);

  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`/api/residents/${id}`); // Adjust API path
          const data = await response.json();
          setUser(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUser();
    }
  }, [id, user]);

  const [isEditing, setIsEditing] = useState(false);
  const [newPhone, setNewPhone] = useState(user?.mobileNum || "");

  if (!user) return <p>Loading...</p>;

  const handleEditClick = () => setIsEditing(true);
  const handleSaveClick = () => {
    setIsEditing(false);
    setUser((prev) => ({ ...prev, mobileNum: newPhone }));
  };
  const handleCancelClick = () => {
    setIsEditing(false);
    setNewPhone(user.mobileNum);
  };

  return (
    <div className="profile-page-container">
      <div className="profile-page">
        <header className="profile-header">
          <div className="profile-avatar-wrapper">
            <img
              src={user.profileImage || "default-avatar.png"}
              alt={`${user.firstName} ${user.lastName}`}
              className="profile-avatar"
            />
          </div>
          <h2 className="profile-name">{`${user.firstName} ${user.middleName} ${user.lastName}`}</h2>
        </header>

        <section className="profile-details">
          <div className="detail-section">
            <label>Full Name</label>
            <input
              type="text"
              value={`${user.firstName} ${user.middleName} ${user.lastName}`}
              readOnly
              className="readonly-input"
            />
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
                  <button onClick={handleSaveClick} className="save-button">
                    Save
                  </button>
                  <button onClick={handleCancelClick} className="cancel-button">
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={user.mobileNum || "N/A"}
                  readOnly
                  className="readonly-input"
                />
                <button onClick={handleEditClick} className="edit-button">
                  Edit
                </button>
              </>
            )}
          </div>

          <div className="detail-section">
            <label>Address</label>
            <input
              type="text"
              value={`${user.brgyCode} ${user.muniCode}`}
              readOnly
              className="readonly-input"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
