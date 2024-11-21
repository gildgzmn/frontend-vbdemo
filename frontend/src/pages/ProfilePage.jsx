import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../css/ProfilePage.css";
import Profile from "../assets/profile.png";
import { updateResident } from "../services/apiService";

const Modal = ({ isOpen, onClose, onConfirm, message, showActions = true }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <p>{message}</p>
        {showActions && (
          <div className="modal-buttons">
            <button onClick={onConfirm} className="confirm-button">
              Confirm
            </button>
            <button onClick={onClose} className="cancel2-button">
              Cancel
            </button>
          </div>
        )}
        {!showActions && (
          <button onClick={onClose} className="close-button">
            Close
          </button>
        )}
      </div>
    </div>
  );
};

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
  const [isModalOpen, setIsModalOpen] = useState(false); // Confirmation modal
  const [feedbackModal, setFeedbackModal] = useState({
    isOpen: false,
    message: "",
  }); // Feedback modal
  const [updatedUser, setUpdatedUser] = useState(null); // Temporary user data for confirmation

  if (!user) return <p>Loading...</p>;

  const handleEditClick = () => setIsEditing(true);
  const handleSaveClick = () => {
    const updatedUserData = {
      ...user,
      mobileNum: newPhone,
      voter: user.voter,
      vbFlag: user.vbFlag,
    };
    setUpdatedUser(updatedUserData); // Save changes temporarily
    setIsModalOpen(true); // Open the modal
  };

  const handleConfirmSave = async () => {
    setIsModalOpen(false);
    setIsEditing(false);

    try {
      const response = await updateResident(updatedUser);
      setUser(response.data || updatedUser); // Update user data
      setFeedbackModal({
        isOpen: true,
        message: "Resident's profile has been updated successfully!",
      });
    } catch (error) {
      setFeedbackModal({
        isOpen: true,
        message:
          "An error occurred while updating the profile. Please try again.",
      });
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewPhone(user.mobileNum);
    setUser((prevUser) => ({
      ...prevUser,
      voter: location.state?.user?.voter || prevUser.voter,
      vbFlag: location.state?.user?.vbFlag || prevUser.vbFlag,
    }));
  
  };

  const handleBackButtonClick = () => {
    navigate("/data"); // Redirect back to DataPage
  };

  return (
    <div className="profile-page-container">
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSave}
        message="Are you sure you want to save these changes?"
      />

      <Modal
        isOpen={feedbackModal.isOpen}
        onClose={() => setFeedbackModal({ isOpen: false, message: "" })}
        message={feedbackModal.message}
        showActions={false}
      />

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
                value={user.voter ? "Registered" : "Not Registered"}
                onChange={(e) => {
                  setUser((prev) => {
                    const updatedUser = {
                      ...prev,
                      voter: e.target.value === "Registered",
                    };
                    console.log("Updated User:", updatedUser); // Debug log
                    return updatedUser;
                  });
                }}
                className="editable-input"
              >
                <option value="Registered">Registered</option>
                <option value="Not Registered">Not Registered</option>
              </select>
            ) : (
              <input
                type="text"
                value={user.voter ? "Registered" : "Not Registered"}
                readOnly
                className="readonly-input"
              />
            )}
          </div>

          <div className="detail-section">
            <label>Recruitment Status</label>
            {isEditing ? (
              <select
                value={user.vbFlag ? "Recruited" : "Not Yet"}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    vbFlag: e.target.value === "Recruited",
                  }))
                }
                className="editable-input"
              >
                <option value="Recruited">Recruited</option>
                <option value="Not Yet">Not Yet</option>
              </select>
            ) : (
              <input
                type="text"
                value={user.vbFlag ? "Recruited" : "Not Yet"}
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
