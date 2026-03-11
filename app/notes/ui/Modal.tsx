import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: (prev: boolean) => any;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => onClose(false)} // click outside closes
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking modal
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={() => onClose(false)}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
