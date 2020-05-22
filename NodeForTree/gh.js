
const fs = require('fs');

const directory = 'A';

const PATH = require('path');


const async = require('async');




    /**

     * This static function is used to create a singleton object

     * return type of method is instance of class

     */





    /**

     * This function is used to get Entire Folder Details

     * return type of method is promise

     */

  function  getFileFolderDetails() {

        console.log('FolderDetails|getFileFolderDetails ');

        try {

            return new Promise((resolve, reject) => {

                var createFolderStructure = function (dir, folderName, type, done) {

                    var results = {

                        "name": folderName,

                        "type": type,

                        "children": []

                    };

                    fs.readdir(dir, function (err, list) {

                        if (err) { return done(err); }

                        var pending = list.length;

                        if (!pending) { return done(null, results); }

                        console.log('listdata----------------- ', list);

                        async.each(list, function (file) {

                            fs.stat(dir + '/' + file, function (err, stat) {

                                if (stat && stat.isDirectory()) {

                                    createFolderStructure(dir + '/' + file, file, 'directory', function (err, res) {

                                        results.children.push(res);

                                        if (!--pending) { done(null, results); }

                                    });

                                } else {

                                    results.children.push({ "name": file, "path": dir + "/" + file, "type": 'file' });

                                    if (!--pending) { done(null, results); }

                                }

                            });



                        }, function (err) {

                            callback(err, returnFiles);

                        });

                    });

                };

                let directorName = directory.split('/').pop();

                createFolderStructure(directory, directorName, 'directory', function (err, results) {

                    if (err) console.log('Error While Creating Directory ', err);

                    console.log('final result with async=========== ', JSON.stringify(results));

                    resolve(JSON.stringify(results));

                });

            });

        } catch (err) {

            console.log('Error Occured in FolderDetails|getFileFolderDetailsDirectoryTree ', err);

        }

    }



getFileFolderDetails();