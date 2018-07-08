import { checkData } from '../src/functions/checkData'
import JSONdata from './allMovies/allMovies.json'

const fetch = require('node-fetch')

test('checking "checkData" function. Return "true" when film is saved in databse', () => {
    
const apiKey = "&apikey=c81aa435"
let title = 'The Lord of the Rings: The Fellowship of the Ring';

let movies = JSONdata 

const action = checkData(movies, title)

expect(action).toEqual(true)
    
})

