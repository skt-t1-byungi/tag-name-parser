type Node = string | {name: string, single: true} | {name: string, single: false, children: Node[]}

declare function parse(str:string, opts?: {strict?: boolean, tag?: [string, string]}): Node[]

export = parse
