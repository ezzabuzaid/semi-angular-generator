const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

/**
 * 
 * @param {String} value change the first char to Cabital latter 
 */
const letterAtOneToUpperCase = (value) => value.charAt(0).toUpperCase() + value.slice(1);
/**
 * 
 * @param  {...any} selectedPath join path to with setted base path 
 */
const pathToFolder = (...selectedPath) => path.join(process.cwd(), ...selectedPath);
/**
 * 
 * @param {*} an object contain final folder path, file name and it's content 
 * @param {*} cb a function that will invoked directly after the file writed correctly
 */
const writeFile = ({ folderPath, fileName, content }, cb) => {
  // * split last chunk from folderPath, it's the folder that contain the file
  const inFolderPath = folderPath.split('\\').slice(-1).join('');
  console.log(inFolderPath);
  // * write the created file to the recived path
  mkdirp(folderPath, (err) => {
    fs.writeFile(path.join(folderPath, fileName), content, cb);
  });

}

function objectToArray(object) {
 return Object.keys(object)
    .reduce((acc, curr) => {
      acc.push(object[curr]);
      return acc;
    }, []);
}

module.exports = {
  letterAtOneToUpperCase,
  writeFile,
  pathToFolder,
  objectToArray
}

// public static handleize(text): string
// {
//     return text.toString().toLowerCase()
//                .replace(/\s+/g, '-')           // Replace spaces with -
//                .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
//                .replace(/\-\-+/g, '-')         // Replace multiple - with single -
//                .replace(/^-+/, '')             // Trim - from start of text
//                .replace(/-+$/, '');            // Trim - from end of text
// }