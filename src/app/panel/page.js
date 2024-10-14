"use client";
import React, { useEffect, useState } from "react";

export default function PointsManager() {
  const [points, setPoints] = useState([]);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Fetch initial data from the API
    const fetchPoints = async () => {
      try {
        const response = await fetch("/api/points");
        const data = await response.json();
        setPoints(data);
      } catch (error) {
        console.error("Error fetching points:", error);
      }
    };

    fetchPoints();

    // Set up WebSocket connection
    const socket = new WebSocket("ws://localhost:3000/api/points/socket");

    // Handle incoming WebSocket messages (updated points)
    socket.onmessage = (event) => {
      const updatedPoints = JSON.parse(event.data);
      setPoints(updatedPoints);
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []);

  // Function to handle checkbox changes for selected points
  const handleCheckboxChange = (pointId) => {
    setSelectedPoints((prevSelected) =>
      prevSelected.includes(pointId)
        ? prevSelected.filter((id) => id !== pointId)
        : [...prevSelected, pointId]
    );
  };

  // Function to handle the active state input
  const handleActiveChange = async (event) => {
    const newActive = event.target.value === "true";

    // Update local state
    setIsActive(newActive);

    try {
      // Send updated point data to the server for each selected point
      const promises = selectedPoints.map((pointId) =>
        fetch("/api/points", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: pointId, active: newActive }),
        })
      );

      // Wait for all updates to finish
      const responses = await Promise.all(promises);

      if (responses.every((response) => response.ok)) {
        console.log("Points updated successfully!");
        // Update local state after successful updates
        setPoints((prevPoints) =>
          prevPoints.map((point) =>
            selectedPoints.includes(point.id)
              ? { ...point, active: newActive }
              : point
          )
        );
      } else {
        console.error("Failed to update some points.");
      }
    } catch (error) {
      console.error("Error updating points:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-8 py-2 flex flex-col">
      <h1 className="text-2xl font-bold text-white mb-4 text-center">
        Zmiana statusu punktów
      </h1>
      <div className="flex flex-col items-center">
        <div className="mb-4 w-96">
          {points.map((point) => (
            <div key={point.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`point-${point.id}`}
                checked={selectedPoints.includes(point.id)}
                onChange={() => handleCheckboxChange(point.id)}
                className="mr-2"
              />
              <label htmlFor={`point-${point.id}`} className="text-white">
                {point.number}
              </label>
            </div>
          ))}
        </div>
        {selectedPoints.length > 0 && (
          <div className="flex items-center bg-gray-800 text-white p-4 rounded-lg mb-4 w-96">
            <label className="mr-4">Aktywny:</label>
            <select
              value={isActive ? "true" : "false"}
              onChange={handleActiveChange}
              className="bg-gray-700 text-white rounded-lg p-2"
            >
              <option value="true">Tak</option>
              <option value="false">Nie</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
