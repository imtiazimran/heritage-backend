import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
const app: Application = express()
import cors  from 'cors'
import globalErrorHandler from "./middlewares/errorHandler";


// routes
import userRoute from './modules/user/user.route'
import propertyRoute from './modules/property/property.route'

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


app.use('/api/v1/users',userRoute )
app.use('/api/v1/property',propertyRoute )


app.get('/', (req, res) => {
    res.send('heritage-server is running...')
})

app.use(globalErrorHandler)

app.all("*", (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "No route found"
    })
})

export default app