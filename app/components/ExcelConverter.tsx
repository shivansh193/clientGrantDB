"use client";
import { useState, ChangeEvent, useEffect } from 'react';
import * as XLSX from 'xlsx';

// Card component to display each grant
const GrantCard = ({ grant }: { grant: { [key: string]: any } }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm mb-4 bg-white">
      <h3 className="text-lg font-semibold">{grant.Name || 'Untitled Grant'}</h3>
      <p className="text-gray-600">
        <strong>Industry:</strong> {grant.Industry || 'N/A'}
      </p>
      <p className="text-gray-600">
        <strong>Description:</strong> {grant.Brief || 'No description available.'}
      </p>
      <p className="text-gray-600">
        <strong>Deadline:</strong> {grant.Applications || 'N/A'}
      </p>
    </div>
  );
};

export default function ExcelUploader() {
  const [jsonData, setJsonData] = useState<unknown[] | null>(null);
  const [jsonLen, setJsonLen] = useState(0);
  const [filteredData, setFilteredData] = useState<unknown[] | null>(null);
  const [industry, setIndustry] = useState<string>(''); // Default empty string to allow all data initially
  const [industries, setIndustries] = useState<string[]>([]);
  const sheetUrl = 'https://docs.google.com/spreadsheets/d/1jSOPtcEd93Yfn4hQ88sX9Dn3L6OhtzJdVIlWbwl9OYk/export?format=xlsx';

  const downloadAndProcessSheet = async () => {
    if (!sheetUrl) return;

    try {
      const response = await fetch(sheetUrl);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert the sheet to JSON
        const json = XLSX.utils.sheet_to_json(worksheet) as unknown[];
        setJsonData(json);
        console.log(json)
        setFilteredData(json); // Initialize with all data
        setJsonLen(json.length);

        // Extract unique industries
        const extractedIndustries = new Set<string>();
        json.forEach((item) => {
          const row = item as { Industry?: string };
          if (row.Industry) {
            extractedIndustries.add(row.Industry);
          }
        });
        setIndustries(Array.from(extractedIndustries));
      };

      reader.readAsArrayBuffer(blob);
    } catch (error) {
      console.error('Error fetching or processing the Google Sheet:', error);
    }
  };

  useEffect(() => {
    downloadAndProcessSheet();
  }, []);

  const industryFilter = (industry: string) => {
    if (!jsonData) return;
  
    const filtered = jsonData.filter((item) => {
      const row = item as { [key: string]: any };
      // Check if the 'Industry' field exists and matches the selected industry
      return industry === '' || (row.Industry && row.Industry.toLowerCase() === industry.toLowerCase());
    });
  
    setFilteredData(filtered);
    console.log('Filtered Data:', filtered);
  };
  
  const handleIndustryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setIndustry(e.target.value);
    industryFilter(e.target.value);
  };

  const handleRemoveFilter = () => {
    setIndustry('');
    setFilteredData(jsonData); // Reset to show all data
  };

  return (
    <div>
      <div className="mb-4">
        <select onChange={handleIndustryChange} value={industry} className="p-2 border rounded">
          <option value="">All Industries</option> {/* Option to reset filter */}
          {industries.map((ind, index) => (
            <option key={index} value={ind}>
              {ind}
            </option>
          ))}
        </select>
        <button
          onClick={handleRemoveFilter}
          className="ml-4 p-2 border rounded bg-red-500 text-white"
        >
          Remove Filter
        </button>
      </div>
      
      <div>
        <h4 className="text-xl font-bold mb-4">Grants:</h4>
        <div>
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((grant: any) => (
              <GrantCard grant={grant as { [key: string]: any }} />
            ))
          ) : (
            <p>No grants available for the selected industry.</p>
          )}
        </div>
      </div>
    </div>
  );
}
