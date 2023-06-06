const HaveToSignupModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContainer">
        <img
          className="modal-poster"
          src={require("../images/strain_lighthouse.jpg")}
        />

        <h3 class="title">You have to sign up first! </h3>
      </div>
    </div>
  );
};

export default HaveToSignupModal;
