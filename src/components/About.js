

import React, { useState } from 'react';
import './about.css';

function About() {
  const [showSection, setShowSection] = useState(null);

  const handleSectionClick = (section) => {
    setShowSection(showSection === section ? null : section);
  };

  return (
    <><><div className="section-header" onClick={() => handleSectionClick('part1')}>
      <h3>Part 1</h3>
      {showSection === 'part1' && <p>As a senior at Bentley University, I have always been thrilled by opportunities to challenge myself. For most of my life, I've challenged myself on the lacrosse field to become a better player and teammate. This led me to work on my skill set independently, whether it was lifting weights, running, practicing stick work, or anything else.</p>}
    </div><div className="section-header" onClick={() => handleSectionClick('part2')}>
        <h3>Part 2</h3>
        {showSection === 'part2' && <p>Lacrosse has always been a way for me to challenge myself to be the best version I could possibly be. Technology has fulfilled that role as I have gotten older. The work ethic that lacrosse instilled in me still burns, yet now I focus not only on my athletic skills but also on my mental skills.</p>}
      </div></><div className="section-header" onClick={() => handleSectionClick('part3')}>
        <h3>Part 3</h3>
        {showSection === 'part3' && <p>While I enjoy working on side programming projects to continue to learn more about the deep rabit hole that is technology. I also enjoyed building my reef tank and a few tropical terrariums and continued to maintain these projects to this day.</p>}
      </div></>
  );
}

export default About;