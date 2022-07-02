import React from 'react';
import "../css/Footer.css";

const Footer = () => {
    return (
        <div className="main-footer">
            <div className="">
                <div className="row">
                    {/* column1 */}
                    <div className="col">
                        <h4>Ecommerce DevOps INC</h4>
                        <ul className="list-unstyled">
                            <li>999-123-4567</li>
                            <li>Tampa, Florida</li>
                            <li>123 Main Street</li>
                        </ul>
                    </div>
                    {/* column2 */}
                    <div className="col">
                        <h4>Creators of Website</h4>
                        <ul className="list-unstyled">
                            <li>Jeremy Bushay</li>
                            <li>Kalon Penagraph</li>
                            <li>Jermaine Roberts</li>
                            <li>Jack Rosen</li>
                            <li>Joshua Mobbley</li>
                        </ul>
                    </div>
                    {/* column3 */}
                    <div className="col">
                        <h4>Project Roles</h4>
                        <ul className="list-unstyled">
                            <li>Fearless Leader</li>
                            <li>Github Master</li>
                            <li>Trello Board King</li>
                            <li>Standup Recorder</li>
                            <li>Project Peon</li>
                        </ul>
                    </div>

                </div>
                <hr />
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} Ecommerce DevOps INC | All Rights Reserved | Terms of Service | Privacy
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer;