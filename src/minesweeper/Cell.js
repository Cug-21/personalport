import React from 'react';

const Cell = ({ isMine, isOpen, minesAround, onClick }) => (
    <div 
        className={`cell ${isOpen ? 'open' : ''}`} 
        onClick={onClick}
    >
        {isOpen && (isMine ? '💣' : minesAround ? minesAround : '')}
    </div>
);
export default Cell;