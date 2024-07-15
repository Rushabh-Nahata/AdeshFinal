import "./Contact.css";
import Email from "./Contact_photos/gmail.png";
import Location from "./Contact_photos/map.png";
import Phone from "./Contact_photos/telephone.png";
import WhatsApp from "./Contact_photos/whatsapp.png";
import Instagram from "./Contact_photos/instagram.png";
import { Link } from 'react-router-dom';

const Contact = () => {

  const url = `https://wa.me/${+919420443369}`;
  const url2 = `https://www.instagram.com/karwadenge/?igsh=eWduZ3JxYjN5N3dm`;
  const url3 = 'https://maps.app.goo.gl/EXXK6toC4BcCpukH6'

  return (
    <div className="contactContainer">
      <div className="contact-main">

        <div className="contact-box">
          <Link to={url}>

            <div className="contact-image">
              <img src={WhatsApp} alt="WhatsApp" />
            </div>
            <div className="contact-username">
              WhatsApp
            </div>
          </Link>
        </div>


        <div className="contact-box">
          <Link to={url2}>
            <div className="contact-image">
              <img src={Instagram} alt="WhatsApp" />
            </div>
            <div className="contact-username">
              Instagram
            </div>
          </Link>
        </div>


        <div className="contact-box">
          <Link to={url3}>
            <div className="contact-image">
              <img src={Location} alt="Location" />
            </div>
            <div className="contact-username">
              Location
            </div>
          </Link>
        </div>


        <div className="contact-box">
          <a href="tel:+919420443369">
            <div className="contact-image">
              <img src={Phone} alt="Phone" />
            </div>
            <div className="contact-username">
              Phone
            </div>
          </a>
        </div>


        <div className="contact-box">
          <a href="mailto:karwadenge@gmail.com">
            <div className="contact-image">
              <img src={Email} alt="Email" />
            </div>
            <div className="contact-username">
              Email
            </div>
          </a>
        </div>



      </div>
    </div>
  );
};

export default Contact;
