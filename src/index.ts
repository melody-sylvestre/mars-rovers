import { moveMarsRovers } from "./moveMarsRovers"

const express = require('express')

const app = express()
const port = 3000

app.use(express.json())

app.post('/moveMarsRovers', moveMarsRovers)

app.listen(port)