import React from 'react';



function Resume() {
    return (
        <div className="Resume">
            <iframe 
                src="/resume.pdf" 
                width="100%" 
                height="500px"
                title="Resume">
            </iframe>
        </div>
    );
}

export default Resume;