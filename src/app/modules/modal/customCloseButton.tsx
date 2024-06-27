import React from 'react'

interface CustomCloseButtonProps {
  onClick: () => void
}

const CustomCloseButton: React.FC<CustomCloseButtonProps> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Close"
    style={{
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#000',
      position: 'absolute',
      top: '10px',
      right: '10px',
      cursor: 'pointer',
    }}
  >
    ×
  </button>
)

export default CustomCloseButton
