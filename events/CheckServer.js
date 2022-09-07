module.exports = {
    name: 'CheckServer',
    once: true,
    execute(text) {
        //call a checkserver event every 5 seconds
        setInterval(function() {
            console.log(text);
        }, 1000);
    },
};