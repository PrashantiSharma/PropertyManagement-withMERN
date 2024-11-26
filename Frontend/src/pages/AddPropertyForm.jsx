import React, { useState } from 'react';
import './Styles.css';

const AddPropertyForm = ({ onAddProperty }) => {
  const [propertyName, setPropertyName] = useState('');
  const [propertyType, setPropertyType] = useState('House');
  const [address, setAddress] = useState('');
  const [dateOfPurchase, setDateOfPurchase] = useState('');
  const [propertyImage, setPropertyImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!propertyName || !address || !dateOfPurchase || !propertyImage) {
      alert('Please fill out all fields.');
      return;
    }

    // Create a new property object
    const newProperty = {
      id: Date.now(),
      propertyName,
      propertyType,
      address,
      dateOfPurchase,
      propertyImage: URL.createObjectURL(propertyImage), // Create a preview URL for the image
    };

    onAddProperty(newProperty);

    // Reset the form
    setPropertyName('');
    setPropertyType('House');
    setAddress('');
    setDateOfPurchase('');
    setPropertyImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="add-property-form">
      <label>
        Property Name:
        <input
          type="text"
          value={propertyName}
          onChange={(e) => setPropertyName(e.target.value)}
          required
        />
      </label>

      <label>
        Property Type:
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
          <option value="Commercial">Commercial</option>
        </select>
      </label>

      <label>
        Address:
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        ></textarea>
      </label>

      <label>
        Date of Purchase:
        <input
          type="date"
          value={dateOfPurchase}
          onChange={(e) => setDateOfPurchase(e.target.value)}
          required
        />
      </label>

      <label>
        Property Image/Logo:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPropertyImage(e.target.files[0])}
          required
        />
      </label>

      <button type="submit">Add Property</button>
    </form>
  );
};

export default AddPropertyForm;
