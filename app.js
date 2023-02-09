const express = require('express');
const https = require('https');
const request =require('request');
const bodyParser = require('body-parser');



const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html')
})

app.post( '/', (req, res) => {
const firstName = req.body.fName
const lastName = req.body.lName
const email = req.body.email

let data = {
    members: [
        {
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }
    ]
};

const jsonData = JSON.stringify(data);

const url = 'https://us21.api.mailchimp.com/3.0/lists/972a3e278c';

const options = {
    method: "POST",
    auth: 'giovanni1:c6163ec59fa01c7eab8d9fc16ab6f730-us21'

}

const request = https.request(url, options, (response) => {
    
    if(response.statusCode === 200){
        res.sendFile(__dirname + '/success.html')
    } else {
        res.sendFile(__dirname + '/failure.html')
    }

    response.on('data',  (data) => {
            console.log(JSON.parse(data));

        });

    
       

});
    request.write(jsonData);
    request.end();
});

app.post('/failure', (res, req) =>{
    res.redirect('/')
});


app.listen(process.env.PORT || 3000, (response) =>{
    console.log('Server is running on port: 3000');
});


// apiKey c6163ec59fa01c7eab8d9fc16ab6f730-us21

// list ID 972a3e278c