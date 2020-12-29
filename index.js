const Discord = require('discord.js');
const client = new Discord.Client();
const { token, organization } = require('./config.json');
var fs = require('fs');
const { exec } = require("child_process");

client.once('ready', () => {

  console.log('Ready !');

});
const file = "./repos.json";
// read file sample.json file
fs.readFile(file,
  // callback function that is called when reading file is done
  function (err, data) {

    // Command exec
    exec("curl -H \"Accept: application / vnd.github.v3 + json\" https://api.github.com/orgs/" + organization + "/repos > repos.json", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });

    // json data
    var jsonData = data;

    // parse json
    var jsonParsed = JSON.parse(jsonData);

    // access elements
    console.log(jsonParsed[0].name);
    console.log(jsonParsed[1].name);
  });

client.login(token);