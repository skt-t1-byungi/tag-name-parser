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
Each test 10,000 times.

tag-name-parser|htmlparser2|parse5|sax|html-parse-stringify2
---|---|---|---|---
~85 ms|~243 ms|~1.34 s|~458 ms|~333 ms

The tag-name-parser has different purposes than other libraries. It does not claim to be more useful than other libraries through this benchmark.

## License
MIT
