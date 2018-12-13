const test = require('ava')
const parse = require('.')

const m = (desc, input, expect) => test(desc, t => t.deepEqual(parse(input), expect))

m('text only', 'hello', ['hello'])
m('flat tag #1',
    'hello<t>world</t>',
    ['hello', { name: 't', single: false, children: ['world'] }]
)
m('flat tag #2',
    'hello<t>world</t>~~',
    ['hello', { name: 't', single: false, children: ['world'] }, '~~']
)
m('flat tag #3',
    'hello<t>world</t>~~<b>test</b>',
    [
        'hello',
        { name: 't', single: false, children: ['world'] },
        '~~',
        { name: 'b', single: false, children: ['test'] }
    ]
)
m('flat tag #4',
    'hello<t></t>~~<b></b>',
    [
        'hello',
        { name: 't', single: false, children: [] },
        '~~',
        { name: 'b', single: false, children: [] }
    ]
)
m('single tag #1',
    'hello<t/>world',
    [
        'hello',
        { name: 't', single: true },
        'world'
    ]
)
m('single tag #2',
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
