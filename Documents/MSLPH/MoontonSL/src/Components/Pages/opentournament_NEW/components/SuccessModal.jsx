import React, { useState } from "react";

const SuccessModal = () => {
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 m-4">
    <div className="bg-neutral-900/90 p-8 rounded-lg border border-white/25 max-w-md text-center">
      <h2 className="text-white text-2xl font-bold mb-4">
        Registration Successful!
      </h2>
      <p className="text-gray-400 mb-6 text-base">
        Your team has been successfully registered for the tournament.
      </p>
      <p className="text-red-400 mb-6 text-sm">
        *Teams with unverified students on their roster will not be permitted to
        join the Open Tournament. Please ensure all members are verified to
        avoid disqualification.
      </p>
      <button
        onClick={() => setShowModal(false)}
        className="w-full p-3 bg-yellow-600 text-white font-bold rounded hover:bg-yellow-700 transition duration-300"
      >
        Close
      </button>
    </div>
  </div>;
};

export default SuccessModal;
