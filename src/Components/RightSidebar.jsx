import React from 'react';

const RightSidebar = ({ selectedNode, updateNode }) => {
  if (!selectedNode) {
    return (
      <div className="right-sidebar" style={{ padding: '1rem', width: '200px', borderLeft: '1px solid #ddd' }}>
        <p style={{ color: '#666', textAlign: 'center' }}>No node selected</p>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateNode(selectedNode.id, {
      [name]: name === 'executionTime' ? Math.max(0, Number(value)) : value,
    });
  };

  return (
    <div className="right-sidebar" style={{ padding: '1rem', width: '200px', borderLeft: '1px solid #ddd' }}>
      <h3 style={{ marginBottom: '1rem', color: '#333' }}>Edit Node Properties</h3>
      <form>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={selectedNode.data.name || ''}
            onChange={handleInputChange}
            style={{
              width: '70%',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label
            htmlFor="executionTime"
            style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}
          >
            Execution Time (ms):
          </label>
          <input
            type="number"
            id="executionTime"
            name="executionTime"
            value={selectedNode.data.executionTime || 0}
            onChange={handleInputChange}
            style={{
              width: '70%',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="type" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Type:
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={selectedNode.data.type || ''}
            onChange={handleInputChange}
            style={{
              width: '70%',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default RightSidebar;
