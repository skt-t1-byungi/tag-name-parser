export = parse

declare function parse(str:string, opts?: Options): Node[]

type Options = Partial<{strict: boolean, tag: [string, string]}>
type Node = string | {name: string, single: true} | {name: string, single: false, children: Node[]}
