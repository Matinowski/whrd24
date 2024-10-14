// /utils/fetchPoints.js
const fetchPoints = async () => {
    const response = await fetch('/api/points');
    if (!response.ok) {
      throw new Error('Error fetching points');
    }
    return response.json();
  };
  
  export default fetchPoints;
  