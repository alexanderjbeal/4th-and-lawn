import React, { Component } from 'react'
import API from "./../../utils/API";
import { Link } from "react-router-dom";
import GoogleApiWrapper from "../GoogleMap";

class CardParkingSpot extends Component {

	state = {
        parkingspots: [],
    };

	componentDidMount() {
        this.loadParkingSpots();
    }

    loadParkingSpots = () => {
        API.getParkingSpots()
        .then(response => this.setState({ 
            parkingspots: response.data
        }))
        .catch(err => console.log(err));
    };


render() {
	return (
		<div>
		    {this.state.parkingspots.length ? (
                <div className="parking-container">
                    {this.state.parkingspots.map(parkingspot => (
                        <div className="col-1-of-3">
                            <div className="parking-card">
                                <div className="parking-card__side parking-card__side--front">

                                    <div className="parking-card__picture">
                                        <div className="parking-card__picture--1">&nbsp;</div>
                                    </div>

                                    <div className="parking-card__game-details">
                                        <div className="col-1-of-1">
                                            <span className="parking-details parking-details--sub" key={parkingspot._id}>{parkingspot.address}</span>
                                        </div>
                                        <div className="col-1-of-1">
                                            <span className="parking-details parking-details--sub">Available spots: {parkingspot.availablespots}</span>                                            </div>
                                        <div className="col-1-of-1">
                                            <span className="parking-details parking-details--sub"></span>                             
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Link to={"/rentthisspot/" + parkingspot._id}>
                                <input
                                    className="btn btn--form"
                                    type="submit"
                                    value="Reserve"
                                    onClick={this.handleSubmit}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
            <h3>No Results to Display</h3>
            )}
            <div><GoogleMap /></div>
		</div>

	)
}
}

export default CardParkingSpot
