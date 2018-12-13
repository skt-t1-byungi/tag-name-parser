const test = require('ava')
const parse = require('.')

const m = (desc, input, expect) => test(desc, t => t.deepEqual(parse(input), expect))
const mn = (desc, input, expect) => test(desc, t => t.deepEqual(parse(input, { strict: false }), expect))

m('text only', 'hello', ['hello'])
m('tag only', '<a>hello</a>', [{ name: 'a', single: false, children: ['hello'] }])
m('text,tag',
    'hello<t>world</t>',
    ['hello', { name: 't', single: false, children: ['world'] }]
)
m('text,tag,text',
    'hello<t>world</t>~~',
    ['hello', { name: 't', single: false, children: ['world'] }, '~~']
)
m('text,tag,test,tag',
    'hello<t>world</t>~~<b>test</b>',
    [
        'hello',
        { name: 't', single: false, children: ['world'] },
        '~~',
        { name: 'b', single: false, children: ['test'] }
    ]
)
m('empty tag',
    'hello<t></t>~~<b></b>',
    [
        'hello',
        { name: 't', single: false, children: [] },
        '~~',
        { name: 'b', single: false, children: [] }
    ]
)
m('single tag',
    'hello<t/>world',
    [
        'hello',
        { name: 't', single: true },
        'world'
    ]
)
m('single tag with space',
    'hello<t/>world<test />',
    [
        'hello',
        { name: 't', single: true },
        'world',
        { name: 'test', single: true }
    ]
)
m('nested #1',
    'abc<a>def<b>ghi</b>jk<c/>mn</a>',
    [
        'abc',
        {
            name: 'a',
            single: false,
            children: [
                'def',
                {
                    name: 'b',
                    single: false,
                    children: [ 'ghi' ]
                },
                'jk',
                { name: 'c', single: true },
                'mn'
            ]
        }
    ]
)

m('nested #2',
    'hello <a>world<b>~</b><c/>!</a>',
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
    ])

mn('non-strict #1',
    '<a>invalid string<b>',
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
)

test('close tag err', t => {
    t.throws(() => parse('test<d></t>test'), '[tag-name-parser] Invalid close tag. ("</t>":7)')
    t.throws(() => parse('test<d><t>test'), '[tag-name-parser] Close tag ("<t>") is missing.')
})
