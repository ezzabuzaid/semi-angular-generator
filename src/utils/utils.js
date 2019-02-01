const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

exports.letterAtOneToUpperCase = (value) => value.charAt(0).toUpperCase() + value.slice(1);

exports.pathToFolder = (...selectedPath) => path.join(process.cwd(), ...selectedPath);

exports.toCamelCase = value => value.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

exports.compose = (...functions) => (args) => functions.reduceRight((arg, fn) => fn(arg), args)

exports.pipe = (...functions) => (args) => functions.reduce((arg, fn) => fn(arg), args)

exports.writeFile = ({ folderPath, fileName, content }, cb) => {
  mkdirp(folderPath, (err) => {
    fs.writeFile(path.join(folderPath, fileName), content, cb);
  });

}

exports.objectToArray = (object) => {
  return Object.keys(object)
    .reduce((acc, curr) => {
      acc.push(object[curr]);
      return acc;
    }, []);
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