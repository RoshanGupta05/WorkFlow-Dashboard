import React from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  Handle,
} from 'react-flow-renderer';

// Default Node with Handles
const DefaultNode = ({ data }) => {
  return (
    <div
      style={{
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#fff',
        textAlign: 'center',
      }}
    >
      <Handle
        type="target"
        position="top"
        style={{ background: '#555' }}
      />
      <div>{data.label}</div>
      <Handle
        type="source"
        position="bottom"
        style={{ background: '#555' }}
      />
    </div>
  );
};

const Canvas = ({ nodes, edges, setNodes, setEdges, onConnect, onNodeClick, nodeTypes, edgeTypes }) => {
  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = event.target.getBoundingClientRect();
    const nodeType = event.dataTransfer.getData('application/reactflow');

    if (!nodeType) return;

    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode = {
      id: `${+new Date()}`,
      type: 'default', // Default type for nodes
      position,
      data: { label: nodeType, name: '', executionTime: 0, type: 'default' },
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleNodesChange = (changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  };

  const handleEdgesChange = (changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  };

  return (
    <div
      style={{ flex: 1, height: '100%' }}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick} // Handle node click
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Canvas;
