import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './Services.css'; // Optional: Create a CSS file for service-specific styles.

const ServicePage = () => {
  const [services, setServices] = useState([]);
  const [properties, setProperties] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({
    ServiceType: "",
    DateOfService: "",
    CostOfService: "",
    PropertyId: "", // Property link
  });
  const addServiceRef = useRef(null);

  // Fetch services from the server
  useEffect(() => {
    axios.get("http://localhost:3001/services")
      .then((response) => setServices(response.data))
      .catch((error) => console.error("Error fetching services", error));
  }, []);

  // Fetch properties for dropdown
  useEffect(() => {
    axios.get("http://localhost:3001/properties")
      .then((response) => setProperties(response.data))
      .catch((error) => console.error("Error fetching properties", error));
  }, []);

  const handleAddService = () => {
    setShowAddForm(true);
    if (addServiceRef.current) {
      addServiceRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({
      ...newService,
      [name]: value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/services", newService)
      .then((response) => {
        console.log("Service added successfully:", response.data);
        setServices([...services, response.data]); // Update list
        setShowAddForm(false);
      })
      .catch((error) => {
        console.error("Error adding service", error);
        alert("Failed to add service.");
      });
  };

  const handleDeleteService = (serviceId) => {
    axios.delete(`http://localhost:3001/services/${serviceId}`)
      .then(() => {
        setServices(services.filter(service => service.id !== serviceId));
      })
      .catch((error) => console.error("Error deleting service", error));
  };

  return (
    <div>
      <button className="addbtn" onClick={handleAddService}>Add Service</button>

      <div className="service-list">
        {services.map((service) => (
          <div className="service-card" key={service.id}>
            <h2>{service.ServiceType}</h2>
            <p><strong>Date:</strong> {service.DateOfService || "2024-11-29"}</p>
            <p><strong>Cost:</strong>  {service.CostOfService || "200"}</p>
            <p><strong>Property:</strong> {properties.find(p => p.id === service.PropertyId)?.PropertyName || "Farm"}</p>
            <button className="delete-btn" onClick={() => handleDeleteService(service.id)}>Delete</button>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="add-service-form" ref={addServiceRef}>
          <h2>Add New Service</h2>
          <form onSubmit={handleSubmitForm}>
            <div>
              <label>Service Type:</label>
              <select
                name="ServiceType"
                value={newService.ServiceType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="General Maintenance">General Maintenance</option>
              </select>
            </div>
            <div>
              <label>Date of Service:</label>
              <input
                type="date"
                name="DateOfService"
                value={newService.DateOfService}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Cost of Service:</label>
              <input
                type="number"
                name="CostOfService"
                value={newService.CostOfService}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Property:</label>
              <select
                name="PropertyId"
                value={newService.PropertyId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Property</option>
                {properties.map(property => (
                  <option key={property.id} value={property.id}>
                    {property.PropertyName}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">Add Service</button>
            <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ServicePage;
