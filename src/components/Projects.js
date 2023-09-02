import React from 'react';
import Bubble from './Bubble';
import './project.css';

function Projects() {
    // Data for finished projects
    const projects = [
      { name: 'Website 1', link: 'https://cug-21-finalproject-finalproject-5cozkp.streamlit.app/', description: '"ViewCano" is an innovative application designed to offer a deep dive into the history of volcanic eruptions. At its core, the platform provides a user-centric experience that prioritizes interactivity and visual comprehension. Users are greeted with a captivating interface that showcases detailed maps, comprehensive charts, and engaging visuals, all meticulously curated to present the data in the most insightful manner.', status: 'completed' },
      { name: 'Website 2', link: 'https://main.d54kfw76dv89y.amplifyapp.com/', description: '"AnimalRegistry" is a straightforward and functional application, purpose-built to emphasize efficient data processing and backend deployment over aesthetic flourishes. Harnessing the power of React for its user interface, it seamlessly integrates with GraphQL to handle data queries, mutations, and subscriptions with ease.Utilizing AWS Amplify, the application ensures robust cloud infrastructure support, guaranteeing reliability and scalability. Users can effortlessly input animal details and retrieve them. Prioritizing user data security, "AnimalRegistry" features an authentication mechanism where users are emailed a unique login code upon each sign-in attempt.', status: 'completed' },
      { name: 'Website 3', link: 'https://dev.d3ujvjupico2yc.amplifyapp.com/', description: 'This is my first ever amplify hosted website. I followed a youtube totroial walking me through the AWS Console. This app simply assigns a Customer an ID and returns that customer from the backend. While the application may appear simple on the surface, its underlying architecture provided me with invaluable hands-on experience in navigating the AWS Console and leveraging the capabilities of Amplify. This project, humble in its scope but rich in learning opportunities, has laid a foundational stone in my exploration of cloud services and full-stack development.', status: 'completed' },
      { name: 'Website 4', description: 'A Financial tool used to empower the user. Providing realtime data on Commodities and other economic tradeables data to provide the user the real information on hown the econoomy is doing. Along with trades made by senators and members of congress. Whereby running machine learning models specically GRU and LSTM models to predict economic futures.', status: 'inProgress' },
      { name: 'Website 5', description: 'A chess app where users can play one another along with Ai to chess, we all know that a super computer would beat any chess player but I aim to develop an AI chess bot who can play and beat the best players in the world while running on a mere laptop :).', status: 'inProgress' },
      { name: 'Website 6', description: 'A polling app where the app onwer can design the poll, App was designed with flask and SQLite allowing the admin to select random images and poll these images to a userbase and view the results. Each photo can be assigned name and other descriptions ect. and will be shuffled at random.', status: 'inProgress' },
      // more projects
    ];
  
  const finishedProjects = projects.filter(project => project.status === 'completed');
  const inProgressProjects = projects.filter(project => project.status === 'inProgress');

  return (
    <div>
      <div className="bubbles-section">
        
        
          {finishedProjects.map((project, index) => (
            <Bubble key={index} {...project} />
          ))}
        
          {inProgressProjects.map((project, index) => (
            <Bubble key={index} {...project} />
          ))}
        
      </div>
    </div>
  );
}

export default Projects;