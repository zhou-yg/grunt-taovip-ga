# taovip-ga

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  taovip_ga: {
    options: {
      api:function(){
        return new Promise(r=>{
           r([1,2,3])
        })      
      }
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

## Contributing

zhou-yg

## Release History
_(Nothing yet)_
