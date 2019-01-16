import React from "react";
import { Footer } from "react-materialize";

const AppFooter = () => {
  return (
    <Footer
      copyrights="&copy;2019 Carter Bartlett"
      links={
        <ul>
          <li>
            <a className="white-text" href="#">Dummy Link</a>
          </li>
          <li>
            <a className="white-text" href="#">Dummy Link</a>
          </li>
          <li>
            <a className="white-text" href="#">Dummy Link</a>
          </li>
          <li>
            <a className="white-text" href="#">Dummy Link</a>
          </li>
        </ul>
      }
      className='teal'
    >
      <h5 className="white-text">Footer Content</h5>
      <p className="white-text">
        Here is where I would put some footer content if I had any on hand,
        unfortunately, current I do not so this is just a blank space
      </p>
    </Footer>
  );
};

export default AppFooter;
