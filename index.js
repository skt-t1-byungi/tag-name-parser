module.exports = function parse (str, opts) {
    opts = opts || { strict: true }

    var re = /<(\/)?(\w+)\s?(\/)?>/g
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
            } else if (opts.strict) {
                throw new TypeError('[tag-name-parser] Invalid close tag. ("</' + tagName + '>":' + idx + ')')
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
    if (stacks.length > 1 && opts.strict) {
        throw new TypeError('[tag-name-parser] Close tag ("<' + current.name + '>") is missing.')
    }

    return root.children
}
