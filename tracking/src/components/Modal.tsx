import React from "react";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ visible, onClose, children }) => {
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export function GeneralModal({
  confirmationText,
  showForm,
  handleSubmit,
  handleForm,
  onClose,
}: {
  confirmationText: string;
  showForm: boolean;
  handleSubmit: () => void;
  handleForm?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
}) {
  return (
    <div>
      <p>{confirmationText}</p>
      {showForm && (
        <input
          type="text"
          placeholder="State The Reason"
          onChange={handleForm}
        ></input>
      )}

      <button onClick={handleSubmit} className="bg-green-500 text-white p-3">
        Yes
      </button>

      <button onClick={onClose} className="bg-red-500 text-white p-3">
        Cancel
      </button>
    </div>
  );
}
