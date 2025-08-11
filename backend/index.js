const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];
let nextId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  const newItem = { id: nextId++, name: req.body.name };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Item not found" });
  }

  items[index] = { ...items[index], ...updatedItem };
  res.json(items[index]);
});

app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter((item) => item.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
