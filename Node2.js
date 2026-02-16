// const prompt= require('prompt-sync')();
// const name= prompt('What is your name?');
// console.log(Welcome, ${name} !);

// let prompt= require('prompt-sync')();
// const num= parseInt(prompt('Enter any number: '));
// for (let i=0; i<=10; i++){
//     console.log(${num} X ${i}= ${num*i});
// } 

// readfile
// var fs= require("fs");
// function readData(err,data){
//     console.log(data);
// }
// fs.readFile('data.json','utf8',readData);

// writefile
// var fs= require("fs");
// var writeStream= fs.createWriteStream("Sample.txt");
// writeStream.write("Hi, This is a simple text file. \n");
// writeStream.write("ThankYou.");
// writeStream.end();

// appending to text file
// var fs= require('fs');
// var data="\nAdd this line to the file.";
// fs.appendFile('Sample.txt',data,'utf8',
//     function(err){
//         if (err) throw eror;
//         else
//             console.log("Data is appended to file successfully.");
//     }
// );

// read file sync
// const fs= require('fs');
// var filename='Sample.txt';
// const data= fs.readFileSync(filename,{encoding: 'utf8'});
// console.log(data);

// either add encoding or use toString() function
// const fs= require('fs');
// var filename='Sample.txt';
// const data= fs.readFileSync(filename);
// console.log(data.toString());

// synchronous example
// const fs= require('fs');
// const data= fs.readFileSync("Sample.txt","utf8");
// console.log(data);
// console.log("Prints after reading data");

// asynchronous example
// const fs= require('fs');
// function readFile(err,data){
//     console.log(data);
// }
// fs.readFile("sample.txt","utf8", readFile);
// console.log("Prints after reading data"); 

// ask a number and write its table into new file
let prompt = require('prompt-sync')();
var fs = require('fs');

var writeStream = fs.createWriteStream("Table.txt");

const num = parseInt(prompt('Enter any number: '));

for (let i = 0; i <= 10; i++) {
    writeStream.write(`${num} X ${i} = ${num * i}\n`);
}

writeStream.end();