import React, { useState } from 'react';
import AddPropertyForm from './AddPropertyForm';
import PropertyList from './PropertyList';

const PropertyManagement = () => {
  const [properties, setProperties] = useState([]);

  const handleAddProperty = (newProperty) => {
    setProperties((prevProperties) => [...prevProperties, newProperty]);
  };

  return (
    <div className="property-management">
      <h1>Manage Your Properties</h1>
      <AddPropertyForm onAddProperty={handleAddProperty} />
      <PropertyList properties={properties} />
    </div>
  );
};

export default PropertyManagement;
