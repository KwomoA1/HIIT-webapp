// http://127.0.0.1:8080/
import express from 'express';
const app = express();
app.use(express.static('client'));
app.listen(8080);
