import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import LogoImage from '../../images/LOGO_UOA COL2.png';
import './LogoNew.css';

const LogoNew = () => {
  return (
    <Navbar style={{ backgroundColor: '#EFEFEF' }} variant="light">
      <Container>
        <Navbar.Brand>
          <a href="/" style={{ color: 'black', textDecoration: 'none', cursor: 'pointer' }}>
            <img
              alt="Logo"
              src={LogoImage}
              width="20"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Εθνικόν και Καποδιστριακόν Πανεπιστήμιον Αθηνών
          </a>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default LogoNew;