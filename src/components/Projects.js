import React from 'react';
import Bubble from './Bubble';
import './project.css';

function Projects() {
  const links = [
    { name: 'Website 1', link: 'https://cug-21-finalproject-finalproject-5cozkp.streamlit.app/', description: '"ViewCano" is an innovative application designed to offer a deep dive into the history of volcanic eruptions. At its core, the platform provides a user-centric experience that prioritizes interactivity and visual comprehension. Users are greeted with a captivating interface that showcases detailed maps, comprehensive charts, and engaging visuals, all meticulously curated to present the data in the most insightful manner.' },
    { name: 'Website 2', link: 'https://main.d54kfw76dv89y.amplifyapp.com/', description: '"SimpleAnimalRegistry" is a straightforward and functional application, purpose-built to emphasize efficient data processing and backend deployment over aesthetic flourishes. Harnessing the power of React for its user interface, it seamlessly integrates with GraphQL to handle data queries, mutations, and subscriptions with ease.Utilizing AWS Amplify, the application ensures robust cloud infrastructure support, guaranteeing reliability and scalability. Users can effortlessly input animal details and retrieve them, thanks to the apps clean and intuitive UI. Prioritizing user data security, "SimpleAnimalRegistry" features an authentication mechanism where users are emailed a unique login code upon each sign-in attempt.' },
    { name: 'Website 3', link: 'https://dev.d3ujvjupico2yc.amplifyapp.com/', description: 'Description for Website 3' },
  ];

  return (
    <div className="bubbles-container">
      {links.map((site, index) => (
        <Bubble key={index} {...site} />
      ))}
    </div>
  );
}

export default Projects;