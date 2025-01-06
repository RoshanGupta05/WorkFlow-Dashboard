import React, { useState, useEffect } from 'react';
import LeftSidebar from './Components/LeftSidebar';
import Canvas from './Components/Canvas';
import RightSidebar from './Components/RightSidebar';
import Analytics from './Components/Analytics';

const App = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSaved, setIsSaved] = useState(true);

  // Save workflow to localStorage
  const saveWorkflow = () => {
    const workflow = { nodes, edges };
    localStorage.setItem('workflow', JSON.stringify(workflow));
    setIsSaved(true);
    alert('Workflow saved successfully!');
  };

  // Load workflow from localStorage
  const loadWorkflow = () => {
    const savedWorkflow = JSON.parse(localStorage.getItem('workflow'));
    if (savedWorkflow) {
      const updatedEdges = savedWorkflow.edges.map((edge, index) => ({
        ...edge,
        id: edge.id || `edge-${edge.source}-${edge.target}-${index}`,
      }));
      setNodes(savedWorkflow.nodes);
      setEdges(updatedEdges);
      alert('Workflow loaded successfully!');
    } else {
      alert('No saved workflow found!');
    }
  };

  // Export workflow as JSON
  const exportWorkflow = () => {
    const workflow = { nodes, edges };
    const blob = new Blob([JSON.stringify(workflow, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'workflow.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Import workflow from JSON file
  const importWorkflow = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const workflow = JSON.parse(e.target.result);
          if (workflow.nodes && workflow.edges) {
            const updatedEdges = workflow.edges.map((edge, index) => ({
              ...edge,
              id: edge.id || `edge-${edge.source}-${edge.target}-${index}`,
            }));
            setNodes(workflow.nodes);
            setEdges(updatedEdges);
            alert('Workflow imported successfully!');
          } else {
            throw new Error('Invalid workflow structure');
          }
        } catch (error) {
          console.error('File parsing error:', error);
          alert('Failed to import workflow. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  // Handle edge connections
  const onConnect = (params) => {
    const newEdge = {
      ...params,
      id: `edge-${params.source}-${params.target}-${+new Date()}`,
      animated: true,
      arrowHeadType: 'arrow', // Add directional arrow
    };

    setEdges((prevEdges) => [...prevEdges, newEdge]);

    // Update nodes with connection metadata
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === params.source) {
          return {
            ...node,
            data: {
              ...node.data,
              outgoing: (node.data.outgoing || 0) + 1,
            },
          };
        } else if (node.id === params.target) {
          return {
            ...node,
            data: {
              ...node.data,
              incoming: (node.data.incoming || 0) + 1,
            },
          };
        }
        return node;
      })
    );

    setIsSaved(false);
  };

  // Highlight flow paths on node click
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    setEdges((prevEdges) =>
      prevEdges.map((edge) =>
        edge.source === node.id || edge.target === node.id
          ? { ...edge, style: { stroke: '#FF5733', strokeWidth: 2 } }
          : { ...edge, style: { stroke: '#000', strokeWidth: 1 } }
      )
    );
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!isSaved) {
        event.preventDefault();
        event.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isSaved]);

  return (
    <div className="app-container" style={{ display: 'flex', height: '100vh', width: '100%' }}>
      <LeftSidebar
        saveWorkflow={saveWorkflow}
        loadWorkflow={loadWorkflow}
        exportWorkflow={exportWorkflow}
        importWorkflow={importWorkflow}
      />
      <Canvas
        nodes={nodes}
        edges={edges}
        setNodes={setNodes}
        setEdges={setEdges}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
      />
      <RightSidebar
        selectedNode={selectedNode}
        updateNode={(id, data) => {
          if (!id || !data) return;
          setNodes((prev) =>
            prev.map((node) =>
              node.id === id ? { ...node, data: { ...node.data, ...data } } : node
            )
          );
        }}
      />
      <Analytics nodes={nodes} onNodeHighlight={(nodeId) => console.log(nodeId)} />
    </div>
  );
};

export default App;
