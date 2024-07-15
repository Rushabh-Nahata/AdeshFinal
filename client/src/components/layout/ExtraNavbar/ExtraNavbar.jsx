import React from 'react'
import "./ExtraNavbar.css"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const ExtraNavbar = () => {
    return (
        <>
            <div className="ExtraNavbar">
                <div className="ExtraNavbar-box">
                    <div className="ExtraNavbar-box-left">
                        <div className="ExtraNavbar-box-email">
                            <a href="mailto:karwadenge@gmail.com"> karwadenge@gmail.com</a>
                        </div>
                        <div className="ExtraNavbar-box-phone">
                            <a href="tel:9420443369"> 9420443369</a>.
                        </div>
                    </div>

                    <div className="ExtraNavbar-box-right">
                        <div className="ExtraNavbar-box-social">
                            <div className="ExtraNavbar-box-social-facebook">

                                <>
                                    <a href="https://www.facebook.com/people/Karwadenge/61560996119699/?mibextid=ZbWKwL"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >   <div className="ExtraNavbar-box-social-facebook"><FacebookIcon />
                                            Facebook</div>
                                    </a></>
                                <>

                                    <a href="https://x.com/Karwadenge_?t=ylrG0H7OmNAW29AARDy6sQ&s=09"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >    <div className="ExtraNavbar-box-social-facebook">
                                            <TwitterIcon /> Twitter
                                        </div>
                                    </a></>

                                <>

                                    <a href="https://www.instagram.com/karwadenge/?igsh=eWduZ3JxYjN5N3dm"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >  <div className="ExtraNavbar-box-social-facebook">
                                            <InstagramIcon />Instragram
                                        </div>
                                    </a></>







                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ExtraNavbar