# tag-name-parser
A tag parser that does not support attributes. Lightweight and fast.

[![npm](https://flat.badgen.net/npm/v/tag-name-parser)](https://www.npmjs.com/package/tag-name-parser)

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

## Non-strict mode
If strict is false, the result is returned without error.

```js
parse('<a>invalid<b>', {strict: false})
```
output:
```js
[
    {
        name: 'a',
        single: false,
        children: [
            'invalid',
            {
                name: 'b',
                single: false,
                children: []
            }
        ]
    }
]
```

## Change tag brackets.
```js
parse('hello [a]world[/a]', {tag: ['[', ']']})
```
output:
```js
{
    'hello ',
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

tag-name-parser|htmlparser2|parse5|sax|html-parse-stringify2|fast-xml-parser
---|---|---|---|---|---
**~184 ms**|~609 ms|~2.67 s|~1.41 s|~910 ms|~529 ms

> It is fast because it does not provide much. 😜

## License
MIT
