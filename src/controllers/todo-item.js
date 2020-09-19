const items = [
  {
    id: '1',
    title: 'hello world',
    status: false,
  },
  {
    id: '2',
    title: 'dynamic routes',
    status: true,
  },
];

function readAll() {
  return items;
}

function createItem(item) {
  if (readItem(item.id)) {
    throw new Error(`item with id: ${item.id} already exists`);
  }

  items.push(item);
}

function readItem(id) {
  return items.find((item) => item.id === id);
}

function updateItem(id, newItem) {
  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error(`item with id: ${item.id} doesn't exists`);
  }

  items[index] = newItem;

  return newItem;
}

function deleteItem(id) {
  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error(`item with id: ${item.id} doesn't exists`);
  }

  items.splice(index, 1);
}

module.exports = {
  readAll,
  createItem,
  readItem,
  updateItem,
  deleteItem,
};
