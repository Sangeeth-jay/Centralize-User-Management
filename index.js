const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const cors = require('cors');

dotenv.config();

const port = process.env.PORT || 3002;
const app = express();
const dbUrl= 'mongodb+srv://sangeethjayawarna:0F8EAut7zwQDzbsj@cluster0.k7siy.mongodb.net/UserDB?retryWrites=true&w=majority&appName=Cluster0';

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//connect mongodb
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connecion error'));
db.once('open', function () {
    console.log("Connected to MongoDB");
});

app.get('/', (req, res) => {
    res.send('Server running');
})

const userRouter = require('./routes/userRoutes');
app.use('/users', userRouter);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
