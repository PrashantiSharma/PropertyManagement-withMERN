import React from 'react';
import './Styles.css';

const PropertyList = ({ properties }) => {
  return (
    <div className="property-list">
      {properties.map((property) => (
        <div key={property.id} className="property-item">
          <img
            src={property.propertyImage}
            alt={property.propertyName}
            className="property-image"
          />
          <h3>{property.propertyName}</h3>
          <p>Type: {property.propertyType}</p>
          <p>Address: {property.address}</p>
          <p>Date of Purchase: {property.dateOfPurchase}</p>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
