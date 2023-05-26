process.stdout.write('First Line\n')
process.stdout.write('Second Line\n')
process.stdout.write('Third Line\n')
process.stdout.write('Fourth Line\n')

setTimeout(() => {
    process.stdout.moveCursor(0, -3)
    process.stdout.clearLine(0)

    process.stdout.write('Third Line\n')
    process.stdout.write('Fourth Line\n')
}, 1000)

