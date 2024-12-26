const express = require('express');
var dotenv = require('dotenv');
const morgan = require('morgan');
const chalk = require('chalk')
const multer = require('multer');
const cookieParser = require('cookie-parser');

const connectMongoDB = require('./src/config/database.config')
const handleError = require('./src/middlewares/handleError');
const verifyToken = require('./src/middlewares/verifyToken');
const authorized  = require('./src/middlewares/authorized');
const handleResponse  = require('./src/middlewares/handleResponse');

const userRoute = require("./src/route/UserRoute");
const authRoute = require("./src/route/AuthRoute");
const authorRoute = require("./src/route/AuthorRoute");
const bookRoute = require("./src/route/BookRoute");
const penaltyReceiptRoute = require("./src/route/PenaltyReceiptRoute");
const readerRoute = require("./src/route/ReaderRoute");
const loanTicketRoute = require("./src/route/LoanTicketRoute");
const returnTicketRoute = require("./src/route/ReturnTicketRoute");
const reportBookBorrowByTypeRoute = require("./src/route/ReportBookBorrowByTypeRoute");
const reportBookReturnRoute = require("./src/route/ReportBookReturnRoute");
const homeRoute = require("./src/route/HomeRoute");
const RuleRoute = require("./src/route/RuleRoute");

var env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });
const port = process.env.PORT;



const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('public'));

const customMorgan = (tokens, req, res) => {
    const time = chalk.yellow(tokens.date(req, res, 'clf'));
    const method = chalk.green(tokens.method(req, res));
    const url = chalk.green(tokens.url(req, res));
    const status = chalk.green(tokens.status(req, res));

    return `${time} Method:${method} Url:${url} status:${status} `;
};

app.use(morgan(customMorgan));

app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }))

app.use("/auth",authRoute,handleResponse)
app.use("/user",verifyToken,authorized,userRoute,handleResponse)
app.use("/author",verifyToken,authorized,authorRoute,handleResponse)
app.use("/book",verifyToken,authorized,bookRoute,handleResponse)
app.use("/penalty-receipt",verifyToken,authorized,penaltyReceiptRoute,handleResponse)
app.use("/reader",verifyToken,authorized,readerRoute,handleResponse)
app.use("/loan-ticket",verifyToken,authorized,loanTicketRoute,handleResponse)
app.use("/report-book-borrow",verifyToken,authorized,reportBookBorrowByTypeRoute,handleResponse)
app.use("/report-book-return",verifyToken,authorized,reportBookReturnRoute,handleResponse)
app.use("/return-ticket",verifyToken,authorized,returnTicketRoute,handleResponse)
app.use("/rules",verifyToken,authorized,RuleRoute,handleResponse)
app.use("/",verifyToken,homeRoute)

app.use(handleError)

const start = async ()=>{
    try {
        await connectMongoDB(process.env.URL)
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    } catch (error) {
        console.log(error)
    }
}
start()

