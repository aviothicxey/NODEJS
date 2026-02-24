const express = require('express');
const fs = require('fs');

const app = express();

const DATA_FILE = "./data.json";

const readData = () =>{
    const data = fs.readFileSync(DATA_FILE, "utf-8"); 

return JSON.parse(data);
}

const writeData = (data) => { 

fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2)); 

}; 

/* ================= CRUD ================= */ 

/* CREATE user */ 

app.post("/users", (req, res) => { 

// {"name":"","email":"","role":""} 

const { name, email, role } = req.body; 

if (!name || !email || !role) { 

return res.status(400).json({ message: "All fields required" }); 

} 

const data = readData(); 

const newUser = { 

id: Date.now(), 

name, 

email, 

role 

}; 

data.users.push(newUser); 

writeData(data); 

res.status(201).json(newUser); 

}); 

/* READ all users */ 

app.get("/users", (req, res) => { 

const data = readData(); 

res.json(data.users); 

}); 

/* READ single user */ 

app.get("/users/:id", (req, res) => { 

const data = readData(); 

const user = data.users.find(u => u.id == req.params.id); 
if (!user) { 

return res.status(404).json({ message: "User not found" }); 

} 

res.json(user); 

}); 
/* UPDATE user */ 

app.put("/users/:id", (req, res) => { 

const { name, email, role } = req.body; 

const data = readData(); 
const index = data.users.findIndex(u => u.id == req.params.id); 
if (index === -1) { 

return res.status(404).json({ message: "User not found" }); 

} 

// data . users. req.id{5} . name , email , role 
data.users[index] = { 

...data.users[index], 

name: name ?? data.users[index].name, 

email: email ?? data.users[index].email, 

role: role ?? data.users[index].role 

}; 
writeData(data); 
res.json(data.users[index]); 
}); 
/* DELETE user */ 
app.delete("/users/:id", (req, res) => { 
const data = readData(); 
const filteredUsers = data.users.filter(u => u.id != req.params.id); 
if (filteredUsers.length === data.users.length) { 
return res.status(404).json({ message: "User not found" }); 
} 
data.users = filteredUsers; 
writeData(data); 
res.json({ message: "User deleted successfully" }); 

}); 
/* ================= SERVER ================= */ 
app.listen(3000, () => { 

console.log("CRUD server running on http://localhost:3000"); 

}); 

 
 

 