const Footer = () => {

    return (

        <footer className="footer" id="about">

            <div className="footer-container">

                {/* Brand */}

                <div className="footer-brand">

                    <h2>
                        SAFAR
                    </h2>

                    <p>
                        Your Journey, Simplified.
                    </p>

                    <span>
                        Making bus travel simple,
                        comfortable and secure.
                    </span>

                </div>

                {/* Contact */}

                <div className="footer-section">

                    <h3>
                        Contact
                    </h3>

                    <p>
                        support@safar.com
                    </p>

                    <p>
                        +91 98765 43210
                    </p>

                    <p>
                        India
                    </p>

                </div>

            </div>


            <div className="footer-bottom">

                <p>
                    © {new Date().getFullYear()} SAFAR.
                    All rights reserved.
                </p>

            </div>

        </footer>

    );

};


export default Footer;