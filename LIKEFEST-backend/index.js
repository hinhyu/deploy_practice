const http=require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const server = createServer(app);
//const bodyParser = require('body-Parser');
const PORT = 3001;

let corsOptions = {
    origin : "http://3.39.123.152",
    credentials: true
};

app.use(express.json());
app.use(cors(corsOptions));

const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//라우터
const boardRouter = require('./routes/Board');
const noticeRouter = require('./routes/Notice');

app.use(express.static("uploads"));

app.use("/board", boardRouter);
app.use("/notice", noticeRouter);

app.use(cors())
db.sequelize.sync().then(() => {
    server.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
});

