import React from 'react';


function About() {
  return (
    <div>
    <main>
    <section className="main-info">
          <h2 id="about-title">About</h2>
        <p id="about">
        <strong>CupOSugah</strong> is the opposite of what you might expect from a modern-day social media network. 
        <br/>
        <strong>CupOSugah</strong> keeps things between Locals only. 
        <br/>
        Join one of a handful of Neighbourhood-networks available near you. Keep up to date with local events, alerts, and service offerings (think local babysitters, offering your carpentry skills to nearby homeowners, or helping a local senior get groceries). Only interested in local Garage Sales and Arts & Craft Nights? Subscribe to one or more event categories and recieve updates right to your phone via SMS or to your email. Message other users about their postings for more information, and track neighbourhood events on our map. 
        <br/>
        <br/>
        <strong>CupOSugah: because sometimes, you just need a cup of sugar.</strong>  
        </p>
        <hr/>
        <div id="stacks">
          <h7>Application stack</h7>
          <div id="stacks-container">
            <div id="stacks-paragraph">
              <small>
              <h7>Front End</h7>
              <ul>
              <li>React</li>
              <li>Google maps javascript API</li>
              <li>Google geocoding API</li>
              <li>Cloudinary</li>
              <li>Material UI</li>
              <li>React bootstrap</li>
              </ul>
              </small>
            </div>
            <div id="stacks-paragraph">
              <small>
              <h7>Back End</h7>
              <ul>
              <li>Node.js</li>
              <li>Express</li>
              <li>Twillio API</li>
              <li>PostgreSQL</li>
              </ul>
              </small>
            </div>
          </div>
        </div>
    </section>
    <footer>
    <small>Made in <span role="img" aria-label="canada flag">🇨🇦</span></small><small>by Lighthouse Labs students with <span role="img" aria-label="heart">♥️</span> . CupOSugah 2020.</small>
    </footer>
    </main>
      
    </div>
  )
}

export default About
