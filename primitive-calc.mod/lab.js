function doExpr(expr, cur, deep) {
    // for expr = undefined | null | 0 | '' | false
    if (!expr) return cur

    deep = deep || 0

    expr = expr.trim()
    if (expr.length === 0) return cur

    let op = false
    const ch = expr.charAt(0)

    switch(ch) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
            op = ch
            break
    }

    if (op) expr = expr.substring(1, expr.length).trim()

    const rval = parseInt(expr)
    if (isNaN(rval)) throw 'Error: number is expected!'
    expr = expr.substring(('' + rval).length, expr.length)

    switch(op) {
        case '+': cur = cur + rval; break;
        case '-': cur = cur - rval; break;
        case '*': cur = cur * rval; break;
        case '/': cur = cur / rval; break;
        case '%': cur = cur % rval; break;
        default:
            if (deep > 0) throw 'Error: operator expected!'
            cur = rval;
    }

    return doExpr(expr, cur, deep + 1)
}

async function init() {
    print('Welcome to Calc!')

    let cycle = true
    while(cycle) {
        try {
            const expr = await input()

            if (expr.trim() === 'exit') {
                cycle = false
            } else {
                const res = doExpr(expr, 0)
                print('= ' + res)
            }

        } catch (e) {
            print(e)
        }
    }
    print('Bye!')
}
