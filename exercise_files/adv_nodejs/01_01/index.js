
// function hideString (str, done) {
//     process.nextTick(() => {
//         done(str.replace(/[a-zA-Z]/g, 'X'));
//     });
// }

// var hidden = hideString("Hello World", (hidden) => {
//     console.log(hidden);
// });

// // console.log(hidden);

// console.log('end');


//? Time out callback

// function delay (seconds, callback) {
//     setTimeout(callback, seconds * 1000)
// }

// console.log('starting delays')
// delay(2, () => {
//     console.log('2 seconds');
//     delay(1, () => {
//         console.log("3 seconds");
//         delay(1, () => {
//             console.log("4 seconds");
//         });
//     });
// });



//? Basic promise

// var delay = (seconds) => new Promise((resolves, rejects) => {
//     setTimeout(() => {
//         resolves('the long delay has ended')
//     }, seconds * 1000);
// });

// delay(1)
//     .then(console.log)
//     .then(() => 42)
//     .then((number) => console.log(`hello world: ${number}`));

// console.log('en first tick');



// ? basic promise - handling error

// var delay = (seconds) => new Promise((resolves, rejects) => {

//     if (seconds > 3) {
//         rejects(new Error(`${seconds} is too longg!`))
//     }

//     // throw new Error('rgh')

//     setTimeout(() => {
//         resolves('the long delay has ended')
//     }, seconds * 1000);
// });

// delay(4)
//     .then(console.log)
//     .then(() => 42)
//     .then((number) => console.log(`hello world: ${number}`))
//     .catch((error) => console.log(`error: ${error.message}`));

// console.log('end first tick');