const { inspect } = require('util')
const express = require('express')

const PORT = Number(process.env.PORT) || 3000

process.on('unhandledRejection', (/* err */) => {
    console.error('Encountering unhandledRejection ---------')
})

const app = express()
    // Sync
    .get('/1', (req, res) => {
        throw new Error('Sync Error')
        res.status(200).send('Hello world from @shqld')
    })
    // async/await
    .get('/2', async (req, res) => {
        throw new Error('Async Error')
        res.status(200).send('Hello world from @shqld')
    })
    // catched async/await
    .get('/3', async (req, res, next) => {
        try {
            throw new Error('Async Error')
            res.status(200).send('Hello world from @shqld')
        } catch (err) {
            next(err)
        }
    })
    // Promise
    .get('/4', (req, res) => {
        return new Promise((resolve, reject) => {
            reject(new Error('Async Error'))
        }).then(() => {
            res.status(200).send('Hello world from @shqld')
        })
    })
    // catched Promise
    .get('/5', (req, res, next) => {
        return new Promise((resolve, reject) => {
            reject(new Error('Async Error'))
        })
            .then(() => {
                res.status(200).send('Hello world from @shqld')
            })
            .catch((err) => {
                next(err)
            })
    })
    .use((err, req, res, next) => {
        console.error('Handled error ---------')
        console.log(err)
        res.status(500).send('Error occured')
    })
    .listen(PORT, () => {
        console.log('Server listening at http://localhost:%s', PORT)
    })
