import  express  from "express";
import mysql from 'mysql';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"Rom@n2053",
  database:"tes"
})

app.get('/', (req,res) => {
  res.json('Hello');
})

app.get('/books', (req,res) => {
  const q = 'SELECT * FROM tes.books;'
  db.query(q,(err,data) => {
    if(data) return res.send(data)
    return res.send(err)
  })
  
})
let count = 0
app.post('/books', (req,res) => {
  const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)"
  
  const values = [
    
    req.body.title,
    req.body.desc,
    req.body.cover,
  ];
  
  db.query(q,[values],(err,data) => {
    if(data) return res.send('Book has been created')
    return res.send(err)
  })
  
})

app.delete('/books/:id',(req,res) => {
  const bookId = req.params.id

  const q = 'DELETE FROM books WHERE id = ?'

  db.query(q,[bookId],(err,data) => {
    if(data) return res.send('Book has been deleted')
    return res.send(err)
  })
})

app.put('/books/:id',(req,res) => {
  const bookI = req.params.id
  console.log(bookI)
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
  ]

  db.query(q, [...values,bookI], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
})

app.listen(8800, () => {
  console.log('x')
})