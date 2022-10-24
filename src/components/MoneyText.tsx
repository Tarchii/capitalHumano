import React from 'react';

const MoneyText: React.FC<{ children: number }> = ({ children }) => {
    return <div style={{ textAlign: 'right' }}>${children}</div>
}

export default MoneyText;