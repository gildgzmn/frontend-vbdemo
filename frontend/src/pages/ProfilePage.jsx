import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../css/ProfilePage.css";
import Profile from "../assets/profile.png";

const ProfilePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleBackButtonClick = () => {
    navigate("/data"); // Redirect back to DataPage
  };

  return (
    <div className="profile-page-container">
      <div className="profile-page">
        <header className="profile-header">
          <div className="profile-avatar-wrapper">
            <img src={Profile} alt="Profile" className="profile-avatar" />
          </div>
          <hr className="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent  dark:opacity-100" />
          <h1 className="header-pname">{`${user.firstName} ${user.middleName} ${user.lastName}`}</h1>
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
            <label>Address</label>
            <input
              type="text"
              value={`${user.brgyCode}, ${user.muniCode}, BATANGAS`}
              readOnly
              className="readonly-input"
            />
          </div>

          <div className="detail-section">
            <label>Age</label>
            <input
              type="text"
              value={user.age || "N/A"}
              readOnly
              className="readonly-input"
            />
          </div>

          <div className="detail-section">
            <label>Gender</label>
            <input
              type="text"
              value={user.gender || "N/A"}
              readOnly
              className="readonly-input"
            />
          </div>

          <div className="detail-section">
            <label>Registration Status</label>
            {isEditing ? (
              <select
                value={user.isVoter ? "Registered" : "Not Registered"}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    isVoter: e.target.value === "Registered",
                  }))
                }
                className="editable-input"
              >
                <option value="Registered">Registered</option>
                <option value="Not Registered">Not Registered</option>
              </select>
            ) : (
              <input
                type="text"
                value={user.isVoter ? "Registered" : "Not Registered"}
                readOnly
                className="readonly-input"
              />
            )}
          </div>

          <div className="detail-section">
            <label>Payment Status</label>
            {isEditing ? (
              <select
                value={user.vbFlag ? "Paid" : "Not Paid"}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    vbFlag: e.target.value === "Paid",
                  }))
                }
                className="editable-input"
              >
                <option value="Paid">Paid</option>
                <option value="Not Paid">Not Paid</option>
              </select>
            ) : (
              <input
                type="text"
                value={user.vbFlag ? "Paid" : "Not Paid"}
                readOnly
                className="readonly-input"
              />
            )}
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
        </section>

        <button onClick={handleBackButtonClick} className="back-button">
          Back to Residents List
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
