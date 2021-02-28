async function start() {
    return await Promise.resolve('my async is working');
}
start().then(console.log);
class Util {
    static id = Date.now();
}
console.log('Util id:', Util.id);
