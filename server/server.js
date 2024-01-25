const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

// importing random word generator
const generateRandomWord = require('./random_word.js');

const app = express();
app.use(express.json());

// using cors as a middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));


// creating mysql connection
const mysql_connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "url_shortener"
});

// getting orignial url from frontend
app.post('/shortener', (req, res) => {
    // storing the original url
    const original_url = req.body.original_url;

    // sql query
    mysql_connection.query(
        'INSERT INTO links (original_url, shortened_url) VALUES (?, ?)',
        [original_url, generateRandomWord()],
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send("Link inserted!");
            };
    });

});

// testing
app.get('/:shortened_url', (req, res) => {
    const shortened_url = req.params.shortened_url;

    // query the database to find the original URL based on the shortened URL.
    mysql_connection.query(
        'SELECT original_url FROM links WHERE shortened_url = ?',
        [shortened_url],
        (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send("Internal Server Error");
            }else{
                // check if the shortened URL is found in the database
                if(result.length > 0){
                    const original_url = result[0].original_url;
                    // redirect to the original URL
                    res.redirect(original_url);
                }else{
                    // url not found
                    res.status(404).send("Not Found!");
                }
            }
        }
    );
});


app.get('/', (req, res) => {
    const original_url = req.body.original_url;

    // search for the shortened code equivalent to that original url
    mysql_connection.query(
        'SELECT shortened_url FROM links WHERE original_url = (?)',
        [original_url],
        (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }else{
                // check if the original url is found in the database
                if(result.length > 0){
                    const shortened_url = result[0].shortened_url;
                    // res.send(shortened_url);
                    // console.log(shortened_url);
                }else{
                    // url not found
                    res.status(404).send("Not Found");
                    console.log('error is ' + err);
                }
            }
        }
    );
});

// starting the server
app.listen('6969', () => {
    console.log('Server started!');
});