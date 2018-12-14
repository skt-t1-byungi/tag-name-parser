module.exports = function parse (str, opts) {
    opts = opts || {}
    var strict = 'strict' in opts ? opts.strict : true
    var tag = 'tag' in opts ? opts.tag : ['<', '>']

    var re = new RegExp(e(tag[0]) + '(\\/)?(\\w+)\\s?(\\/)?' + e(tag[1]), 'g')
    var pos = 0
    var root = { children: [] }
    var current = root
    var stacks = [root]
    var matched

    while (matched = re.exec(str)) {
        var isClose = matched[1]
        var tagName = matched[2]
        var isSingle = matched[3]
        var len = matched[0].length
        var idx = matched.index

        if (pos !== idx) current.children.push(str.slice(pos, idx))
        pos = idx + len

        if (isClose) {
            if (current.name === tagName) {
                current = stacks.pop()
            } else if (strict) {
                throw new TypeError('[tag-name-parser] Invalid close tag. ("' + tag[0] + '/' + tagName + tag[1] + '":' + idx + ')')
            }
        } else {
            if (isSingle) {
                current.children.push({ name: tagName, single: true })
            } else {
                stacks.push(current)
                current.children.push(current = { name: tagName, single: false, children: [] })
            }
        }
    }

    if (pos < str.length) current.children.push(str.slice(pos))

    if (current !== root && strict) {
        throw new TypeError('[tag-name-parser] Close tag ("' + tag[0] + current.name + tag[1] + '") is missing.')
    }

    return root.children
}

function e (str) {
    return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}
