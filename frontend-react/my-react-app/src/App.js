import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [editItemName, setEditItemName] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await fetch('http://localhost:3000/items');
    const data = await response.json();
    setItems(data);
  };

  const addItem = async () => {
    await fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newItemName }),
    });
    setNewItemName('');
    fetchItems();
  };

  const updateItem = async (id) => {
    await fetch(`http://localhost:3000/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: editItemName }),
    });
    setEditItemId(null);
    setEditItemName('');
    fetchItems();
  };

  const deleteItem = async (id) => {
    await fetch(`http://localhost:3000/items/${id}`, {
      method: 'DELETE',
    });
    fetchItems();
  };

  return (
    <div className="App">
      <h1>CRUD App with React</h1>
      <div>
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="New Item Name"
        />
        <button onClick={addItem}>Add Item</button>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {editItemId === item.id ? (
              <input
                type="text"
                value={editItemName}
                onChange={(e) => setEditItemName(e.target.value)}
              />
            ) : (
              item.name
            )}
            {editItemId === item.id ? (
              <button onClick={() => updateItem(item.id)}>Save</button>
            ) : (
              <button onClick={() => { setEditItemId(item.id); setEditItemName(item.name); }}>Edit</button>
            )}
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
