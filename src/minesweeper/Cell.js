import React from 'react';

const Cell = ({ isMine, isOpen, minesAround, isFlagged, onClick, onRightClick }) => (
    <div 
        className={`cell ${isOpen ? 'open' : ''} ${isFlagged ? 'flagged' : ''}`} 
        onClick={onClick}
        onContextMenu={(e) => {
            e.preventDefault();
            onRightClick();
        }}
    >
        {isOpen && (isMine ? '💣' : minesAround ? minesAround : '')}
        {!isOpen && isFlagged && '🚩'}
    </div>
);

export default Cell;