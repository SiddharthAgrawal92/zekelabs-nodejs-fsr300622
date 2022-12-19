console.log(`child process cloned here with pid: ${process.pid}`);

process.on('message', msg => {
    // console.log(`Value received from parent process : ${msg}`);
    //do some task
    let result = findFactors(msg);
    process.send(result);
    setTimeout(() => {
        process.exit(1);
    }, 1000);
});

const findFactors = (number) => {
    if (number < 1 || number == 1) return false;

    const factors = [];
    for (let index = 2; index < number; index++) {
        if (number % index === 0) {
            factors.push(index);
        }
    }
    return { number: number, factors: factors };
} 