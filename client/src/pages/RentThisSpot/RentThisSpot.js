import React, { Component } from "react";
import './../../App.css';
import RentParkingSpot from "./../../components/Rent-Parking-Spot-Form";
import Popup from 'reactjs-popup';
import GoogleMap from './../../components/GoogleMap/GoogleMap';
import axios from 'axios';

class RentThisSpot extends Component {
    state = {
        parkingspots: []
    };

    componentDidMount() {
        this.getParkingSpot();
    }

    getParkingSpot = () => {
        axios.get("/api/" + window.location.pathname)
        .then(response => {
            this.setState({ 
            parkingspots: response.data
            }) 
            console.log(response.data)
        })
        .catch(err => console.log(err));
    };

    render() {
        return (
            <section className="section-renter">

                <div className="row">
                    <div className="col-1-of-3">
                        <div className="header-renter">
                            <div className="header-renter__background">
                                <p className="renter--title">
                                    {this.state.parkingspots.address}
                                </p>
                                <h1 className="heading-primary">
                                    <span className="heading-primary--page">
                                    Game day parking made easy
                                    </span>
                                </h1>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-2-of-3">
                        <div className="header-renter">
                            <div className="header-renter__background-image"></div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-1-of-3">
                        <div className="data-renter">
                            <div className="data-renter__background">
                                <div className="data-renter__cta">
                                    <span className="renter--title center">Price</span>
                                    <span className="renter--value-xl center">${this.state.parkingspots.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-1-of-3">
                    <div className="data-renter">
                        <div className="data-renter__background">
                            <div className="data-renter__cta">
                                <span className="renter--title center">Spots</span>
                                <span className="renter--value-xl center">{this.state.parkingspots.availablespots}</span>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-1-of-3">
                        <div className="data-renter">
                            <div className="data-renter__background">
                                <div className="data-renter__cta">
                                    <span className="renter--title center">Distance</span>
                                    <span className="renter--value-xl center">N/A</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-1-of-1">
                        <h3 className="heading-primary">
                            <span className="heading-primary--page">Location</span>
                        </h3>
                        <GoogleMap />
                    </div>
                </div>

                
                <div className="footer-reservation">
                    <div className="row">
                        <div className="col-3-of-4">
                        <p className="renter--title">
                            {this.state.parkingspots.address}
                        </p>
                        </div>
                    
                        <div className="col-1-of-4">
                        <Popup trigger={<span className="btn btn--rent">Reserve Spot</span>} modal>
                            {close => (
                              <div className="modal">
                                <a href="#" className="popup__close" onClick={close}>
                                  &times;
                                </a>
                                <RentParkingSpot />
                                  <button
                                    className="button"
                                    onClick={() => {
                                      console.log('modal closed')
                                      close()
                                    }}
                                  >
                                  </button>
                              </div>
                            )}
                          </Popup>
                        </div>
                    </div>
                    
                </div>
            </section>
        );
    }
}

export default RentThisSpot;



