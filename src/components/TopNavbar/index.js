import React from 'react';

const TopNavbar = function () {
  return (
    <div id="sticky-wrapper" className="sticky-wrapper">
      <nav className="navbar navbar-expand-md bg-faded cripto_nav">
        <div className="container">

          <a className="navbar-brand" href="#">
            <img src="images/logo.svg" className="logo-swaptracker" alt="logo" />
          </a>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="https://swaptracker.io/#header-05" className="nav-link">Home</a>
              </li>
              <li className="nav-item">
                <a href="https://bit.ly/SWPTpcs" target="_blank" className="nav-link" rel="noreferrer">Buy Now</a>
              </li>
              <li className="nav-item">
                <a href="#" target="_blank" className="nav-link active" rel="noreferrer">Staking</a>
              </li>
              <li className="nav-item">
                <a href="https://swaptracker.io/#features" className="nav-link"> Features</a>
              </li>
              <li className="nav-item">
                <a href="https://swaptracker.io/#roadmap_05" className="nav-link">Roadmap</a>
              </li>
              <li className="nav-item">
                <a href="https://swaptracker.io/#tokenomics" className="nav-link">Tokenomics</a>
              </li>
              <li className="nav-item">
                <a
                  href="https://www.swaptracker.io/pdf/litepaper-swaptracker.pdf"
                  target="_blank"
                  className="nav-link"
                  rel="noreferrer"
                >
                  Litepaper
                </a>
              </li>
              <li className="nav-item">
                <a href="https://swaptracker.io/#team_membar_02" className="nav-link">Team</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TopNavbar;
