import {Router} from 'express';
import {config} from 'dotenv';
import {Configuration, OpenAIApi} from 'openai';

const router = Router();

config();

const configuration = new Configuration({
    organization: process.env.organization,
    apiKey: process.env.apiKey,
});


const openai = new OpenAIApi(configuration);

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/', async (req, res) => {
    const {message} = req.body;
    console.log(message)

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages:[
            {role: "user", content: "take the following text and add alot of randomness and variation but make sure it is still something that can be presented in a professional or school setting: "+ message},
        ],
    });
    
    console.log(completion.data.choices[0].message)
    res.json({completion: completion.data.choices[0].message});   
})

export default router;