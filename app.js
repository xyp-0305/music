'use strict'
const express = require('express')
const path = require('path')
const http = require('http')
const xtpl = require('xtpl')

const app = express()
const file = path.join(__dirname, 'index.html')
const domain = 'http://127.0.0.1:3000'

app.use(express.static('static'))

app.get('/', (req, res) => {

    const query = http.get(domain + '/json/music.json', (response) => {
        response.on('data', (result) => {
            const data = JSON.parse(result.toString())
            // 渲染html文件
            xtpl.renderFile(file, { musicList: data }, (err, content) => {
                res.setHeader('Content-Type', 'text/html;charset=utf-8')
                if (err) {
                    console.log(err)
                }
                res.send(content)
            })
        })
    })
    query.end()
})

app.listen('3000', '127.0.0.1', (err) => {
    if (err) {
        console.log(err)
    }
    console.log('server start success')
})