import "./About.css";
import { Typography, Avatar } from "@material-ui/core";
// import home from "../../../src/assets/Homephoto.png"../src/
import Aadesh from "../../assets/aadesh.jpg"
import Comfort from "../../../src/assets/Homephoto.png"
import Door from "../../../src/assets/box.png"
import Easy from "../../../src/assets/easy.png"
import Conv from "../../../src/assets/convenience.png"


const About = () => {

  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>


      <div className="aboutSectionContainer">
        <Typography component="h1">Motive of Karwadenge</Typography>

        <div className="about-main">

          <div className="about-box">
            <div className="about-image">
              <img src={Comfort} alt="WhatsApp" />
            </div>
            <div className="about-username">
              Comfort
            </div>
          </div>


          <div className="about-box">
            <div className="about-image">
              <img src={Door} alt="WhatsApp" />
            </div>
            <div className="about-username">
              Door to Door Service
            </div>
          </div>


          <div className="about-box">
            <div className="about-image">
              <img src={Conv} alt="WhatsApp" />
            </div>
            <div className="about-username">
              Convenience
            </div>
          </div>


          <div className="about-box">
            <div className="about-image">
              <img src={Easy} alt="WhatsApp" />
            </div>
            <div className="about-username">
              Easy to Use
            </div>
          </div>

        </div>






        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={Aadesh}
              alt="Founder"
            />
            <Typography component="h2">Aadesh Munot</Typography>
            <Typography>Founder & CEO</Typography>

          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h4">
              Welcome to <b>Karwadenge</b>, your trusted provider of
              diverse services. From technology solutions to financial
              guidance, creative design, and logistical support, we offer
              a comprehensive range of expertise to meet your needs. With
              a focus on excellence and customer satisfaction, our
              experienced team delivers tailored solutions that exceed
              expectations. Whether you're a small startup or a large
              corporation, we provide scalable services designed to
              align with your goals. Partner with us to experience
              reliable, efficient, and innovative solutions that
              set us apart. Choose <b>Karwadenge</b> for all your
              service needs and unlock the potential for success.

            </Typography>

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
