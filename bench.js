const bench = require('nanobench')
const fs = require('fs')
const tagNameParser = require('.')
const htmlparser2 = require('htmlparser2')
const parse5 = require('parse5')
const sax = require('sax')
const stringify2 = require('html-parse-stringify2')
const fastXmlParser = require('fast-xml-parser')

const str = fs.readFileSync('./bench-example.txt', 'utf-8').trim()

bench('tag-name-parser', b => {
    b.start()
    for (let i = 0; i < 10000; i++) tagNameParser(str)
    b.end()
})

bench('htmlparser2', b => {
    b.start()
    for (let i = 0; i < 10000; i++) {
        const parser = new htmlparser2.Parser()
        parser.write(str)
        parser.end()
    }
    b.end()
})

bench('parse5', b => {
    b.start()
    for (let i = 0; i < 10000; i++) parse5.parseFragment(str)
    b.end()
})

bench('sax', b => {
    b.start()
    for (let i = 0; i < 10000; i++) {
        const parser = sax.parser()
        parser.write(str)
    }
    b.end()
})

bench('html-parse-stringify2', b => {
    b.start()
    for (let i = 0; i < 10000; i++) stringify2.parse(str)
    b.end()
})

bench('fast-xml-parser', b => {
    b.start()
    for (let i = 0; i < 10000; i++) {
        fastXmlParser.parse(str, {
            ignoreAttributes: true,
            ignoreNameSpace: true,
            parseNodeValue: false,
            trimValues: false
        })
    }
    b.end()
})
