import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class RentParkingSpot extends Component {
    constructor() {
        super()
        this.state = {
            licensePlate: '',
            modelCar: '',
            date: '',
            time: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    // confirm with jolie
    handleSubmit(event) {
        event.preventDefault();
        console.log("handleSubmit");

        axios.post("/rent", {
            licensePlate: this.state.licensePlate,
            modelCar: this.state.modelCar,
            date: this.state.date,
            time: this.state.time
        })
        .then(response => {
            console.log('Renters info: ');
            console.log(response);
            if(response === 200) {
                console.log("Post Sent")
                this.setState({
                    redirectTo: "/"
                })
            }
        }).catch(error => {
            console.log("Post error: ");
            console.log(error);
        });
    };

    // React render function
    render() {
        if (this.state.redirectTo) {
            return <Redirct to={{ pathname: this.state.redirectTo }} />
        } else {
            <div className="rentParkingSpotForm">
                <h4>Rent A Parking Spot</h4>
                <form className="form-horizontal">
                    <div className="form-group">
                        <div className="col-1 col-ml-auto">
                            <label className="form-label" htmlFor="licensePlate">License Plate Number</label>
                        </div>
                        <div className="col-3 col-mr-auto">
                            <input className="form-input"
                                type="text"
                                id="licensePlate"
                                name="licensePlate"
                                placeholder="License Plate Number"
                                value={this.state.licensePlate}
                                onChange={this.handleChange}
                             />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-1 col-ml-auto">
                            <label className="form-label" htmlFor="carModel">Car Model</label>
                        </div>
                        <div className="col-3 col-mr-auto">
                            <input className="form-input"
                                type="text"
                                id="carModel"
                                name="carModel"
                                placeholder="Car Model"
                                value={this.state.carModel}
                                onChange={this.handleChange}
                             />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-1 col-ml-auto">
                            <label className="form-label" htmlFor="date">Date</label>
                        </div>
                        <div className="col-3 col-mr-auto">
                            <input className="form-input"
                                type="text"
                                id="date"
                                name="date"
                                placeholder="MM/DD/YYYY"
                                value={this.state.date}
                                onChange={this.handleChange}
                             />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-1 col-ml-auto">
                            <label className="form-label" htmlFor="time">Time</label>
                        </div>
                        <div className="col-3 col-mr-auto">
                            <input className="form-input"
                                type="text"
                                id="time"
                                name="time"
                                placeholder="HH:MM"
                                value={this.state.time}
                                onChange={this.handleChange}
                             />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-7"></div>
                            <button className="btn btn-primary col-1 col-mr-auto" 
                                onClick={this.handleSubmit}
                                type="submit">
                                Submit
                            </button>
                    </div>
                </form>
            </div>
        }
    }
}

export default RentParkingSpot;