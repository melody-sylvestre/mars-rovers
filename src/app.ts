import express, {Application} from 'express'
import { moveMarsRovers } from './moveMarsRovers'

const app: Application = express()
app.use(express.text())
app.use("/", moveMarsRovers)

export default app