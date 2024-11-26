import React, { useState, useEffect, useRef} from "react";
import axios from "axios";
import './PropertyListPage.css'

const PropertyListPage = () => {
  const [properties, setProperties] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);  // For update form
  const [newProperty, setNewProperty] = useState({
    PropertyName: "",
    PImage: "",
    Location: "",
    PropertyType: "",
    DateOfPurchase: "",
  });
  const [propertyToUpdate, setPropertyToUpdate] = useState({
    id: "",
    PropertyName: "",
    PImage: "",
    Location: "",
    PropertyType: "",
    DateOfPurchase: "",
  });

  // Fetch properties from the server
  useEffect(() => {
    axios.get("http://localhost:3001/properties")
      .then((response) => setProperties(response.data))
      .catch((error) => console.error("Error fetching properties", error));
  }, []);

  // Show property details in popup
  const handleShowPopup = (property) => {
    setSelectedProperty(property);
    setShowPopup(true);
  };

  // Hide popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Delete property
  const handleDeleteProperty = (propertyId) => {
    axios.delete(`http://localhost:3001/properties/${propertyId}`)
      .then(() => {
        setProperties(properties.filter(property => property.id !== propertyId));
      })
      .catch((error) => console.error("Error deleting property", error));
  };
  const addPropertyRef = useRef(null);

  const handleAddProperty = () => {
    setShowAddForm(true);
    if (addPropertyRef.current) {
      addPropertyRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  

  const handleUpdateProperty = (property) => {
    setPropertyToUpdate(property); 
    setShowUpdateForm(true);  
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({
      ...newProperty,
      [name]: value,
    });
  };

  
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setPropertyToUpdate({
      ...propertyToUpdate,
      [name]: value,
    });
  };

  
  const handleSubmitForm = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/properties", newProperty)
      .then((response) => {
        console.log("Property added successfully:", response.data);
        setProperties([...properties, newProperty]);
        setShowAddForm(false); 
      })
      .catch((error) => {
        console.error("Error adding property", error);
        alert("Failed to add property.");
      });
  };

  
  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/properties/${propertyToUpdate.id}`, propertyToUpdate)
      .then((response) => {
        console.log("Property updated successfully:", response.data);
   
        setProperties(properties.map(property =>
          property.id === propertyToUpdate.id ? propertyToUpdate : property
        ));
        setShowUpdateForm(false); 
      })
      .catch((error) => {
        console.error("Error updating property", error);
        alert("Failed to update property.");
      });
  };

  return (
    <div>
      <button classname="addbtn" onClick={handleAddProperty}>Add Property</button>

      <div className="property-list">
        {properties.map((property) => (
          <div className="property-card" key={property.id}>
            <img src={property.PImage} alt={property.PropertyName} />
            <h2>{property.PropertyName}</h2>
            <div class="button-container">
            <button class="add-btn" onClick={() => handleShowPopup(property)}>Info</button>
            <button class="edit-btn" onClick={() => handleUpdateProperty(property)}>Update</button>
            <button class="delete-btn" onClick={() => handleDeleteProperty(property.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showPopup && selectedProperty && (
  <div className={`popup ${showPopup ? 'active' : ''}`}>
    <div className="popup-content">
      <button className="close-btn" onClick={handleClosePopup}>
        X
      </button>
      <h2>{selectedProperty.PropertyName}</h2>
      <img
        src={selectedProperty.PImage}
        alt={selectedProperty.PropertyName}
      />
      <div className="property-details">
        <p><strong>Location:</strong> {selectedProperty.Location}</p>
        <p><strong>Property Type:</strong> {selectedProperty.PropertyType}</p>
        <p><strong>Date of Purchase:</strong> {selectedProperty.DateOfPurchase}</p>
      </div>
    </div>
  </div>
)}

      <div className="add-property-form" ref={addPropertyRef}>
      {/* Show Add Property Form as a Popup */}
      {showAddForm && (
        <>
          <div className="add-property-form-overlay" onClick={() => setShowAddForm(false)} />
          <div className="add-property-form">
            <h2>Add New Property</h2>
            <form onSubmit={handleSubmitForm}>
              <div>
                <label>Property Name:</label>
                <input
                  type="text"
                  name="PropertyName"
                  value={newProperty.PropertyName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Image URL (PImage):</label>
                <input
                  type="text"
                  name="PImage"
                  value={newProperty.PImage}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Location:</label>
                <input
                  type="text"
                  name="Location"
                  value={newProperty.Location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Property Type:</label>
                <select
                  name="PropertyType"
                  value={newProperty.PropertyType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Commercial">Commercial</option>
                  <option value="hut">Hut</option>
                </select>
              </div>
              <div>
                <label>Date of Purchase:</label>
                <input
                  type="date"
                  name="DateOfPurchase"
                  value={newProperty.DateOfPurchase}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit">Add Property</button>
              <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
            </form>
          </div>
        </>
      )}
      </div>

      {/* Property Details Popup */}
      {showPopup && selectedProperty && (
        <div className={`popup ${showPopup ? 'active' : ''}`}>
          <div className="popup-content">
            <button className="close-btn" onClick={handleClosePopup}>
              X
            </button>
            <h2>{selectedProperty.PropertyName}</h2>
            <img
              src={selectedProperty.PImage}
              alt={selectedProperty.PropertyName}
            />
            <div className="property-details">
              <p>
                <strong>Location:</strong> {selectedProperty.Location}
              </p>
              <p>
                <strong>Property Type:</strong> {selectedProperty.PropertyType}
              </p>
              <p>
                <strong>Date of Purchase:</strong>{' '}
                {selectedProperty.DateOfPurchase}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Show Update Property Form as a Popup */}
      {showUpdateForm && (
        <>
          <div className="add-property-form-overlay" onClick={() => setShowUpdateForm(false)} />
          <div className="add-property-form">
            <h2>Update Property</h2>
            <form onSubmit={handleSubmitUpdate}>
              <div>
                <label>Property Name:</label>
                <input
                  type="text"
                  name="PropertyName"
                  value={propertyToUpdate.PropertyName}
                  onChange={handleUpdateChange}
                  required
                />
              </div>
              <div>
                <label>Image URL (PImage):</label>
                <input
                  type="text"
                  name="PImage"
                  value={propertyToUpdate.PImage}
                  onChange={handleUpdateChange}
                  required
                />
              </div>
              <div>
                <label>Location:</label>
                <input
                  type="text"
                  name="Location"
                  value={propertyToUpdate.Location}
                  onChange={handleUpdateChange}
                  required
                />
              </div>
              <div>
                <label>Property Type:</label>
                <select
                  name="PropertyType"
                  value={propertyToUpdate.PropertyType}
                  onChange={handleUpdateChange}
                  required
                >
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
              <div>
                <label>Date of Purchase:</label>
                <input
                  type="date"
                  name="DateOfPurchase"
                  value={propertyToUpdate.DateOfPurchase}
                  onChange={handleUpdateChange}
                  required
                />
              </div>
              <button type="submit">Update Property</button>
              <button type="button" onClick={() => setShowUpdateForm(false)}>Cancel</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyListPage;
