async function getAllCategories() {
    const response = await fetch('http://localhost:3001/categories');
    return await response.json();
}

async function createCategory(data) {
    const response = await fetch(`http://localhost:3001/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await response.json();
}
async function updateCategory(data) {
    const response = await fetch(`http://localhost:3001/categories/` + data.id, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json' }
    });
    return await response.json();
}

export { getAllCategories, createCategory, updateCategory };
