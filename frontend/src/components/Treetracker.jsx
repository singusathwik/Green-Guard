import React, { useState, useEffect } from 'react';
import { Input, Table, Spin, message, Popconfirm, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';


// Add delete handler
const handleDelete = async (treeId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/trees/${treeId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.success) {
      message.success('Tree deleted successfully');
      setTrees(prev => prev.filter(tree => tree._id !== treeId));
    } else {
      message.error(data.message || 'Failed to delete tree');
    }
  } catch (error) {
    message.error('Error deleting tree');
  }
};




const columns = [
  {
    title: 'Species',
    dataIndex: 'species',
    key: 'species'
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location'
  },
  {
    title: 'Planted By',
    dataIndex: ['plantedBy', 'username'],
    key: 'plantedBy',
    render: (text, record) => record.plantedBy?.username || 'Unknown'
  },
  {
    title: 'Delete',
    key: 'action',
    render: (_, record) => (
      <Popconfirm
        title="Are you sure to delete this tree?"
        onConfirm={() => handleDelete(record._id)}
        okText="Yes"
        cancelText="No"
      >
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
        />
      </Popconfirm>
    ),
  },
];

const TreeTracker = () => {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState('');

  // Keep existing fetch logic
  useEffect(() => {
    const fetchTrees = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/trees', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (data.success) setTrees(data.data);
        else message.error(data.message || 'Failed to fetch trees');
      } catch (error) {
        console.error('Fetch error:', error);
        message.error('Error fetching trees');
      } finally {
        setLoading(false);
      }
    };
    fetchTrees();
  }, []);

  // Filter logic remains the same
  const filteredTrees = trees.filter(tree =>
    tree.species.toLowerCase().includes(filterText.toLowerCase()) ||
    (tree.plantedBy?.username &&
      tree.plantedBy.username.toLowerCase().includes(filterText.toLowerCase()))
  );




  return (
    <div className="tree-tracker-wrapper">
      <h2>Tree Tracker</h2>
      <Input
        placeholder="Filter by species or planter"
        value={filterText}
        onChange={e => setFilterText(e.target.value)}
        style={{ marginBottom: 16, maxWidth: 400 }}
        allowClear
      />
      {loading ? (
        <Spin />
      ) : (
        <Table
          columns={columns}
          dataSource={filteredTrees}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
};

export default TreeTracker;
