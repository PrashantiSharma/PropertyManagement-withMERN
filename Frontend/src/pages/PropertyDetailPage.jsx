import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PropertyDetailPage.css';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/properties/${id}`)
      .then(response => setProperty(response.data))
      .catch(error => console.error('Error fetching property details:', error));
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <div className="property-details-page">
      <img src={property.propertyImage} alt={property.PropertyName} />
      <h2>{property.PropertyName}</h2>
      <p><strong>Type:</strong> {property.PropertyType}</p>
      <p><strong>Address:</strong> {property.Address}</p>
      <p><strong>Date of Purchase:</strong> {property.DateOfPurchase}</p>
    </div>
  );
};

export default PropertyDetailsPage;
