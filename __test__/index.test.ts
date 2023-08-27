import { roversOutput } from '../src/interfaces'
const request = require('supertest')
import app from '../src/app'

describe('Check the output from the API against pre-defined case from challenge description', () => {
    test('Test case from challenge description', async() => {
        const testInput: string = '5 5\n 1 2 N\n LMLMLMLMM \n 3 3 E \n MMRMMRMRRM'
        const expectedResult: roversOutput = {
            message: "Rover #1: Instructions complete. Rover #2: Instructions complete. ",
            finalRoverPositions: ["1 3 N","5 1 E"]           
        }
        const APIresponse = await request(app)
            .post('/')
            .set({'Content-Type': 'text/plain'}).send(testInput)
        expect(APIresponse.statusCode).toEqual(200)
        expect(APIresponse.body).toEqual(expectedResult)
    })
    test("Test to show that rovers don't go over the edges of the plateau", async() => {
        const testInput: string = '10 20\n 9 2 E\n MMM'
        const expectedResult: roversOutput = {
            message: "Rover #1: Reached the limit of the plateau. Stopping the execution of the instructions. ",
            finalRoverPositions: ["9 2 E"]           
        }
        const APIresponse = await request(app)
            .post('/')
            .set({'Content-Type': 'text/plain'}).send(testInput)
        expect(APIresponse.statusCode).toEqual(400)
        expect(APIresponse.body).toEqual(expectedResult)
    })
    test("Test to show that rovers don't collide.", async() => {
        const testInput: string = '100 100 \n 50 50 W \n MMM \n 47 50 E\n   '
        const expectedResult: roversOutput = {
            message: "Rover #1: Another rover is in the way. Stopping the execution of the instructions. Rover #2: Instructions complete. ",
            finalRoverPositions: ["50 50 W", "47 50 E"]           
        }
        const APIresponse = await request(app)
            .post('/')
            .set({'Content-Type': 'text/plain'}).send(testInput)
        expect(APIresponse.statusCode).toEqual(400)
        expect(APIresponse.body).toEqual(expectedResult)
    })
    test("Test to show that incorrect input is detected - e.g. initial rover position outside the limits of the plateau", async() => {
        const testInput: string = '5 5 \n 3 2 W \n MMM \n 47 50 E\n MM   '
        const expectedResult: roversOutput = {
            message: "Rover #2: Incorrect position. Rover positions must have the format X Y [NSWE] (e.g '1 3 N') with 0 <= X <= 5 and  0 <= Y <= 5. Both number must be integers. ",
            finalRoverPositions: []           
        }
        const APIresponse = await request(app)
            .post('/')
            .set({'Content-Type': 'text/plain'}).send(testInput)
        expect(APIresponse.statusCode).toEqual(400)
        expect(APIresponse.body).toEqual(expectedResult)
    })  
})