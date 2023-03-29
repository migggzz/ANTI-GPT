import {config} from 'dotenv';
import {Configuration, OpenAIApi} from 'openai';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';


config();

const configuration = new Configuration({
    organization: process.env.organization,
    apiKey: process.env.apiKey,
});


const openai = new OpenAIApi(configuration);


const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(express.static("public"));

// app.get('/', async (req, res) => {

//     const completion = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages:[
//             {role: "user", content: "Hello"},
//         ],
//     });
    
//     res.json(completion.data.choices[0].message);

// });

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.use('/', viewsRouter);

// app.post('/', async (req, res) => {
//     const {message} = req.body;

//     const completion = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages:[
//             {role: "user", content: message},
//         ],
//     });
    
//     res.json(completion.data.choices[0].message);   
// })

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



