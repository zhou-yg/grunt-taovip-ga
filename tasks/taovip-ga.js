/*
 * taovip-ga
 * ''
 *
 * Copyright (c) 2016 zhouyg
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('taovip-ga', 'ga', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    //
    var options = this.options({
      punctuation: '.', //test
      separator: ', ', //test
      api:function(){},
    });

    var done = this.async();

    options.api().then((dataArr)=>{

      var error = undefined;

      // Iterate over all specified file groups.
      this.files.forEach(function(f,i) {

        var dest = f.dest;
        // Concat specified files.
        var src = f.src.filter(function(filepath) {
          // Warn on and remove invalid source files (if nonull was set).
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          } else {
            return true;
          }
        }).map(function(filepath) {
          // Read file source.
          return grunt.file.read(filepath);
        }).join('');

        // Handle options.

        // Write the destination file.
        //grunt.file.write(f.dest, src);

        // Print a success message.

        var errorResultArr = dataArr.filter(function (data) {
          var reg = new RegExp(data)
          return !reg.test(src)
        });


        if(errorResultArr.length > 0){

          error = [f].concat(error);

          grunt.log.writeln('all Src done error:'+errorResultArr.length);

          grunt.file.write(dest,JSON.stringify(errorResultArr,null,2));
          //done(new Error('lack of data'+errorResultArr.length))
        }
      });

      done(error)

    }, (e)=>{

      done(e);

    })
  });

};
