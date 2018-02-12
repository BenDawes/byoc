import React, { Component } from 'react';
 
import { Locations } from '../../api/locations';
import { BrowserRouter as Router, Link } from 'react-router-dom';

// Location component - represents a single location
export default class LocationListEntry extends Component {

	constructor(props) {
		super(props);
		this.toggleState = this.toggleState.bind(this);
		this.deleteLocation = this.deleteLocation.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			mode: "default",
			name: this.props.location.name,
			latitude: this.props.location.location.latitude,
      longitude: this.props.location.location.longitude,
			properties: this.props.location.properties,
		}
	}

  toggleState(e) {
  	e.preventDefault();
  	let { mode } = this.state;
  	if(mode === "edit") {
  		this.handleSubmit(e);
  		this.setState({mode: "default"});
  		return;
  	} else if(mode === "default") {
  		this.setState({mode: "edit"})
  		return;
  	}  	
  }


  handleSubmit(e) {
    e.preventDefault();

    let { name, latitude, longitude, accepts_own_containers } = this.state;

    accepts_own_containers = accepts_own_containers === "on";

    let properties = {
      accepts_own_containers: {
        text: "Accepts Own Containers",
        value: accepts_own_containers,
      }
    }

    let location = {latitude: parseFloat(latitude), longitude: parseFloat(longitude)};

    Meteor.call('locations.update',this.props.location._id,name,location,properties)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  deleteLocation(_id) {
    Meteor.call('locations.delete',_id);
  }

  render() {
  	let readOnly =
  		<div className="location-data">
  			<p>{this.state.name}</p>
        <button className="delete location" onClick={(e) => this.deleteLocation(this.props.location._id)}>
          Delete
        </button>
        <button className={(this.state.mode === "default" ? "edit" : "save") + " location"} onClick={this.toggleState}>
          Edit
        </button>
        <Link to={`/location/${this.props.location._id}`}>
          View
        </Link>
      </div>
  	let editMode = (
      <form className="edit-location">
        <input
          type="text"
          name="name"
          value={this.state.name}
          placeholder="Location name..."
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="latitude"
          value={this.state.latitude}
          placeholder="Latitude..."
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="longitude"
          value={this.state.longitude}
          placeholder="Longitude..."
          onChange={this.handleChange}
        />
        <input
          type="checkbox"
          name="accepts_own_containers"
          value={this.state.accepts_own_containers}
          placeholder="Longitude..."
          onChange={this.handleChange}
        />
        <button className={(this.state.mode === "default" ? "edit" : "save") + " location"} onClick={this.toggleState}>
          Save
        </button>
      </form>
    )
    return (
      <li>
      	<div className="location row">
      		{this.state.mode === "default" 
      			? readOnly
      			: editMode}
      	</div>
      </li>
    );
  }
}