import React from "react";
import Boutton from "../components/Boutton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InputDefault from "../components/InputDefault";
import "../styles/bugReport.css";

const BugReport = () => {
    return (
        <div>
            <Header />
            <div className="section-container-bug">
                <div className="conatiner-border-bug">
                    <div className="container-title-bug">
                        <h2>Bug report</h2>
                        <img src="/img/BugReport.png" alt="" className="img-bug-report" />
                    </div>
                    <div className="conatainer-form-bug">
                        <InputDefault
                            label="Your Pseudo"
                            type="text"
              /*value=''*/ placeholder="Your new password"
                            className="title-form"
                        />
                        <div className="container-text-area-bug">
                            <div className="container-text-area-label-bug">
                                <label label="bug-area">Have you see a problem ?</label>
                                <textarea id='bug-area' name='bug-area'>

                                </textarea>
                            </div>
                        </div>
                    </div>
                    <Boutton
                        // url="/ChangePictureProfil"
                        name="send"
                        text="send"
                        className="button-change-picture-user"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BugReport;
