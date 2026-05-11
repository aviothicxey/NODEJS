const express = require('express');
const connection = require('./config/db');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/add-emp', (req, res) => {
    res.render('addEmp');
});

app.post('/add-emp', async (req, res) => {
    const {name, username, age, email, doj, password} = req.body;

    try{
        await connection.query(
            'INSERT INTO employees (name, username, age, email, doj, password) VALUES ($1, $2, $3, $4, $5, $6)',
            [name, username, age, email, doj, password]
        );
        res.redirect('/add-emp');
    }catch (error){
        console.error('Error adding employee:', error);
        res.status(500).send('Error adding employee');
    }
    
});

app.get('/employees', async (req, res) => {
    try {
        const result = await connection.query(
            'SELECT id, name, username, age, email, doj FROM employees ORDER BY id'
        );
        res.render('viewEmployees', { employees: result.rows });
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).send('Error fetching employees');
    }
});

app.get('/delete-emp/:id', async (req, res) => {
    await connection.query('DELETE FROM employees WHERE id = $1', [req.params.id]);
    res.redirect('/employees');
});

app.get('/edit-emp/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const result = await connection.query('SELECT * FROM employees WHERE id = $1', [id]);
        if(result.rows.length > 0){
            res.render('editEmp', {employee: result.rows[0]});
        }else{
            res.status(404).send('Employee not found');
        }
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).send('Error fetching employee');
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});