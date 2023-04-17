import React, { useState } from "react";
import './App.css'
const FieldTypes = {
  STRING: "string",
  NUMBER: "number",
  BOOLEAN: "boolean",
  OBJECT: "object"
};

const App = () => {
  const [data, setData] = useState([{ name: "", type: FieldTypes.STRING }]);
  const [nestedData, setNestedData] = useState([]);

  const handleNameChange = (event, index) => {
    const newData = [...data];
    newData[index].name = event.target.value;
    setData(newData);
  };

  const handleTypeChange = (event, index) => {
    const newData = [...data];
    newData[index].type = event.target.value;
    setData(newData);
  };

  const handleAddField = () => {
    const newData = [...data];
    newData.push({ name: "", type: FieldTypes.STRING });
    setData(newData);
  };

  const handleDeleteField = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleAddNestedField = (index) => {
    const newNestedData = [...nestedData];
    newNestedData[index] = newNestedData[index] || [];
    newNestedData[index].push({ name: "", type: FieldTypes.STRING });
    setNestedData(newNestedData);
  };

  const handleDeleteNestedField = (parentIndex, index) => {
    const newNestedData = [...nestedData];
    newNestedData[parentIndex].splice(index, 1);
    setNestedData(newNestedData);
  };
  

  const handleSave = () => {
    console.log({ data, nestedData });
  };

  const renderField = (field, index, parentIndex = null) => {
    return (
      <div className="field" key={index}>
        <input
          className="field-input"
          type="text"
          value={field.name}
          onChange={(event) =>
            parentIndex !== null
              ? handleNestedNameChange(event, parentIndex, index)
              : handleNameChange(event, index)
          }
          placeholder="Field name"
        />
        <select
          className="field-select"
          value={field.type}
          onChange={(event) =>
            parentIndex !== null
              ? handleNestedTypeChange(event, parentIndex, index)
              : handleTypeChange(event, index)
          }
        >
          <option value={FieldTypes.STRING}>String</option>
          <option value={FieldTypes.NUMBER}>Number</option>
          <option value={FieldTypes.BOOLEAN}>Boolean</option>
          <option value={FieldTypes.OBJECT}>Object</option>
        </select>
        {field.type === FieldTypes.OBJECT && (
          <div>
            <button onClick={() => handleAddNestedField(index)}>+</button>
            {nestedData[index]?.map((nestedField, nestedIndex) =>
              renderField(nestedField, nestedIndex, index)
            )}
          </div>
        )}
        {parentIndex === null && (
          <button onClick={() => handleDeleteField(index)}>-</button>
        )}
        {parentIndex !== null && (
          <button onClick={() => handleDeleteNestedField(parentIndex, index)}>
            -
          </button>
        )}
      </div>
    );
  };
  
  
  const handleNestedNameChange = (event, parentIndex, index) => {
    const newNestedData = [...nestedData];
    newNestedData[parentIndex][index].name = event.target.value;
    setNestedData(newNestedData);
  };

  const handleNestedTypeChange = (event, parentIndex, index) => {
    const newNestedData = [...nestedData];
    newNestedData[parentIndex][index].type = event.target.value;
    setNestedData(newNestedData);
    };
    
    return (
    <div className="App">
    {data.map((field, index) => renderField(field, index))}
    <button onClick={handleAddField}>Add Field</button>
    <button onClick={handleSave}>Save</button>
    </div>
    );
    };
    
    export default App;