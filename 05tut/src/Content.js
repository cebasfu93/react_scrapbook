import React from 'react';

const Content = () => {
    const handleNameChange = () => {
        const names = ['John', 'Jane', 'Doe'];
        const int = Math.floor(Math.random() * names.length);
        return names[int];
    }
    return (
        <div>
            <p>
                Hello {handleNameChange()}
            </p>
        </div>
    )
}

export default Content
