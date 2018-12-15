# tag-name-parser

[![npm](https://img.shields.io/npm/v/tag-name-parser.svg?style=flat-square)](https://www.npmjs.com/package/tag-name-parser)

A tag name parser that does not support attributes. Lightweight and fast when only need tag names.

## Install
```sh
npm i tag-name-parser
```

## Usage
```js
const parse = require('tag-name-parser')

parse(`hello <a>world<b>~</b><c/>!</a>`)
```
output:
```js
[
    'hello ',
    {
        name: 'a',
        single: false,
        children: [
            'world',
            {
                name: 'b',
                single: false,
                children: [
                    '~'
                ]
            },
            {
                name: 'c',
                single: true
            },
            '!'
        ]
    }
]
```

## Non-strict
If do not use strict option, it returns result without exception.
```js
parse('<a>invalid string<b>', {strict: false})
```
output:
```js
[
    {
        name: 'a',
        single: false,
        children: [
            'invalid string',
            {
                name: 'b',
                single: false,
                children: []
            }
        ]
    }
]
```

## Change tag bracket
```js
parse('hello[a]world[/a]', {tag: ['[', ']']})
```
output:
```js
{
    'hello',
    {
        name: 'a',
        single: false,
        children: [
            'world'
        ]
    }
}
```

## Benchmark
Each test 10,000 times. (bench-example.txt)

tag-name-parser|htmlparser2|parse5|sax|html-parse-stringify2
---|---|---|---|---
~175 ms|~592 ms|~2.67 s|~1.27 s|~887 ms

It does not claim to be better than other libraries through this benchmark.
The tag-name-parser has different purposes than other libraries.

## License
MIT
