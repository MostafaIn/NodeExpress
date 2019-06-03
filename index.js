const express = require('express');
const app = express();
const path = require('path');
const logger = require('./middleware/logger');
//init middleware
app.use(logger);



// app.get('/',(req,res)=>{
//     res.send('<h1>this is me. my name is mostafa</h1>');
// })

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is started on port ${PORT}`));