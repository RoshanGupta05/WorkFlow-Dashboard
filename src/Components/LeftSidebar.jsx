import React from 'react';

const LeftSidebar = ({
  saveWorkflow,
  loadWorkflow,
  exportWorkflow,
  importWorkflow,
}) => {
  const handleDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="left-sidebar"
      style={{
        padding: '1rem',
        width: '220px',
        borderRight: '1px solid #ddd',
        height: '100vh',
        overflowY: 'auto',
        backgroundColor: '#fefefe',
        display: 'flex',
        flexDirection: 'column',
        // gap: '1.5rem',
      }}
    >
      <h3 style={{ marginBottom: '1rem', color: '#333' }}>Node Types</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {['Start Node', 'Task Node', 'Decision Node', 'End Node'].map(
          (nodeType) => (
            <button
              key={nodeType}
              draggable
              onDragStart={(event) => handleDragStart(event, nodeType)}
              style={nodeButtonStyles}
              aria-label={`Drag ${nodeType}`}
            >
              Add {nodeType}
            </button>
          )
        )}
      </div>

      <h3 style={{ marginTop: '1rem', color: '#333' }}>Workflow Actions</h3>
      <button
        onClick={saveWorkflow}
        style={{ ...workflowButtonStyles, backgroundColor: '#4CAF50' }}
        aria-label="Save Workflow"
      >
        Save Workflow
      </button>
      <button
        onClick={loadWorkflow}
        style={{ ...workflowButtonStyles, backgroundColor: '#2196F3' }}
        aria-label="Load Workflow"
      >
        Load Workflow
      </button>
      <button
        onClick={exportWorkflow}
        style={{ ...workflowButtonStyles, backgroundColor: '#FF9800' }}
        aria-label="Export Workflow"
      >
        Export Workflow
      </button>
      <label
        htmlFor="import-file"
        style={{
          ...workflowButtonStyles,
          backgroundColor: '#9C27B0',
          display: 'block',
          textAlign: 'center',
          cursor: 'pointer',
        }}
        aria-label="Import Workflow"
      >
        Import Workflow
        <input
          id="import-file"
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={importWorkflow}
        />
      </label>
    </div>
  );
};

const sharedButtonStyles = {
  padding: '0.75rem 1rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  color: 'white',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
};

const nodeButtonStyles = {
  ...sharedButtonStyles,
  backgroundColor: '#fff',
  color: '#333',
  cursor: 'grab',
  border: '1px solid #ddd',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const workflowButtonStyles = {
  ...sharedButtonStyles,
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
};

const hoverEffectStyles = {
  ':hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
  },
};

export default LeftSidebar;
