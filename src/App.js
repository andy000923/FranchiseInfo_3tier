import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [franchiseData, setFranchiseData] = useState([]);
  const [uniqueIndustries, setUniqueIndustries] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('http://localhost:3000/api/products');
        setFranchiseData([...res.data.products]);
        const industries = [...new Set(res.data.products.map(data => data.업종))];
        setUniqueIndustries(industries);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }

    fetchData();
  }, []);
  const selectedDataCount = franchiseData.filter(data => selectedIndustry === '' || data.업종 === selectedIndustry).length;
  
  return (
    <div className="app-container">
      <label className="label">
        하단 바를 통해 차리고 싶은 프랜차이즈의 업종 검색
        <select
          className="select"
          value={selectedIndustry}
          onChange={(e) => setSelectedIndustry(e.target.value)}
        >
          <option value="">모든 업종</option>
          {uniqueIndustries.map((industry, index) => (
            <option key={index} value={industry}>
              {industry}
            </option>
          ))}
        </select>
      </label>
      <p>선택한 업종에 해당하는 영업표지 개수: {selectedDataCount}</p>
      <div className="franchise-list">
        {franchiseData
          .filter(data => selectedIndustry === '' || data.업종 === selectedIndustry)
          .map((data, index) => (
            <div key={index} className="franchise-item">
              {data.영업표지}
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
