import React from 'react';
import Header from '../components/Header';
import { NavLink } from "react-router-dom";
import Footer from '../components/Footer';
import "../styles/battle.css";

const Battle = () => {
    return (
        <div>
            <Header />
            <div className="container-section-battle">
                <div className='container-border-battle'>
                    <div className="container-text-battle-mobile">
                        <p className='text-battle'>Fight with 5 of your cards against 5 opposing players to try to win a maximum of <span className='text-battle-color'> Koins</span> in order to be able to <span className='text-battle-color'>strength then your roster!</span>
                        </p>

                        <div className="reward-battle">
                            <div className='container-title-battle'>
                                <h2 className='title-battle'>rewards</h2>
                            </div>
                            <p className='text-battle'>You win 10 xp + 20 Koins by battle</p>
                            <p className='text-battle'>3 win = 20 xp + 30 Koins</p>
                            <p className='text-battle'>5 win = 40 xp + 30 Koins</p>

                        </div>
                    </div>
                    <div className='container-info-battle'>
                        <div className="container-img-battle">
                            <h3 className='battle-mod'><span className='text-battle-color'>unknow</span> mod</h3>
                            <NavLink to="#" className="">
                                <img src="img/battle-section.png" alt="battle" className='img-battle' />
                            </NavLink>
                        </div>
                        <div className="container-text-battle-desktop">
                            <p className='text-battle'>Fight with 5 of your cards against 5 opposing players to try to win a maximum of <span className='text-battle-color'> Koins</span> in order to be able to <span className='text-battle-color'>strength then your roster!</span>
                            </p>

                            <div className="reward-battle">
                                <div className='container-title-battle'>
                                    <h2 className='title-battle'>rewards</h2>
                                </div>
                                <p className='text-battle'>You win 10 xp + 20 Koins by battle</p>
                                <p className='text-battle'>3 win = 20 xp + 30 Koins</p>
                                <p className='text-battle'>5 win = 40 xp + 30 Koins</p>

                            </div>
                        </div>
                        <div className="container-img-battle">
                            <h3 className='battle-mod'><span className='text-battle-color'>user</span> mod</h3>
                            <NavLink to="#" className="">
                                <img src="img/battle-section.png" alt="battle" className='img-battle' />
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Battle;