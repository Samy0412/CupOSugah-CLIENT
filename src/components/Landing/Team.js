import React from 'react';

//Material UI
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

function Team() {
  return (
    <div>
      <div>
    <main>
    <section className="main-info">
          <h2 id="about-title">Team</h2>
          <p><strong>CupOSugah </strong>was born as a capstone project for Lighthouse Labs' web development bootcamp. To learn as much as possible, all three team members worked on both back and front end development. The original project was built in only 10 days, however, I (Samantha) made significant modifications following the bootcamp to redesign the site and add new functionalities. </p>
          <div className="team-container">
            <div className="student-container">
              <img src="/images/users/john.jpg" alt="John Saputo" className="team-picture"/>
              <h4>John Saputo</h4>
              <div id="brand-icons">
                <a href="https://github.com/jsaputo1" target="blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
                <a href="https://www.linkedin.com/in/john-saputo-09a53b7b/?originalSubdomain=ca" target="blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} size="2x"/> 
                </a>            
              </div>
              <Accordion  className="accordion">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                <h7>Tasks</h7>
                </AccordionSummary>
                <AccordionDetails>
                <ul >
                <li>Server side creation</li>
                <li>Database feeding</li>
                <li>Back end routes</li>
                <li>Registration form</li>
                <li>Select neighbourhood page</li>
                <li>Messaging system </li>
                <li>Main navigation bar</li>
                <li>Landing page</li>
              </ul>
                </AccordionDetails>
              </Accordion>
              
              
            </div>
            <div className="student-container">
              <img src="/images/users/Sam.jpg" alt="Samantha Gadet" className="team-picture"/>
              <h4>Samantha Gadet</h4>
              <div id="brand-icons">
                <a href="https://github.com/Samy0412" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
                <a href="https://www.linkedin.com/in/samantha-gadet/?locale=en_US" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} size="2x"/> 
                </a>            
              </div>
              <Accordion  className="accordion">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                <h7>Tasks</h7>
                </AccordionSummary>
                <AccordionDetails>
                <ul>
                <li>Client side structure and React router set up</li>
                <li>Database feeding</li>
                <li>Login and authentication</li>
                <li>Google map geocoding</li>
                <li>Map page + popup cards</li>
                <li>Calendar page + form</li>
                <li>Home page</li>
              </ul>
                </AccordionDetails>
              </Accordion>
              <Accordion  className="accordion">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                <h7>Extras</h7>
                </AccordionSummary>
                <AccordionDetails>
                <ul>
                <li>Create neighbourhood with google drawing library</li>
                <li>Upload of pictures with cloudinary</li>
                <li>Complete redesign and polishing of the entire application, especially landing page, registration process and Messaging app</li>
                <li>About page</li>
                <li>Team page</li>
              </ul>
                </AccordionDetails>
              </Accordion > 
            </div>
            <div className="student-container">
              <img src="/images/users/graham.jpeg" alt="Graham Mothersill" className="team-picture"/>
              <h4>Graham Mothersill</h4>
              <div id="brand-icons">
                <a href="https://github.com/GrandMothersill" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
                <a href="https://www.linkedin.com/in/graham-mothersill-5b95113b/?originalSubdomain=ca" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} size="2x"/> 
                </a>            
              </div>
              <Accordion className="accordion">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                <h7>Tasks</h7>
                </AccordionSummary>
                <AccordionDetails>
                <ul>
                <li>Database creation</li>
                <li>Database feeding</li>
                <li>Back end routes</li>
                <li>Account page + forms</li>
                <li>SMS notification system with Twillio </li>
                <li>Services page + form</li>
                <li>Alerts page + form</li>
              </ul>
                </AccordionDetails>
              </Accordion>
             
            </div>
            </div>
    </section>
    <footer>
    <small>Made in <span role="img" aria-label="canada flag">🇨🇦</span></small><small>by Lighthouse Labs students with <span role="img" aria-label="heart">♥️</span> . CupOSugah 2020.</small>
    </footer>
    </main>
      
    </div>
    </div>
  )
}

export default Team
