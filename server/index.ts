const cors = require('cors');
const express = require('express');
const app = express();

const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true // 允许携带 cookies
};
app.use(cors(corsOptions));

app.get('/', (req: any, res: { send: (arg0: string) => void }) => {
    res.send('Hello World!');
});

app.get(
    '/api/test',
    (
        req: any,
        res: {
            status: (arg0: number) => {
                (): any;
                new (): any;
                send: { (arg0: { data: string; code: number; msg: string }): void; new (): any };
            };
        }
    ) => {
        res.status(200).send({
            data: 'Test API Response',
            code: 200,
            msg: ''
        });
    }
);

app.listen(8000, () => {
    console.log('Server is running at http://localhost:8000');
});
