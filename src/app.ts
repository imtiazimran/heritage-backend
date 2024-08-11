import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
const app: Application = express()
import cors  from 'cors'


// routes
import userRoute from './modules/user/user.route'


app.use(
    cors(
        //     {
        //     origin: [
        //         'http://localhost:5173',

        //     ],
        //     methods: "GET,POST,PUT,PATCH,DELETE",
        //     credentials: true,
        // }
    )
);

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api/v1',userRoute )


app.get('/', (req, res) => {
    res.send('heritage-server is running...')
})


app.all("*", (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "No route found"
    })
})

export default app