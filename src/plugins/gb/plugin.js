(function(){
  var getTagsFromRecords = function(records, valueField, labelField){
    var tagsObj = records.reduce(function(acc, recordTags){
      recordTags.forEach(function(tag){
        acc[tag] = 1;
      });
      return acc;
    }, {});

    return Object.keys(tagsObj).map(function(tag){
      res = {}
      res[labelField] = tag;
      res[valueField] = tag;
      return res;
    });
  }

  var valueInArray = function(value, array){
    for(var i = 0; i < array.length; i++){
      if(array[i] == value){
        return true;
      }
    }
    return false;
  }

  var arrayInArray = function(array1, array2){
    for(var i = 0; i < array1.length; i++){
      if(!valueInArray(array1[i], array2)){
        return false;
      }
    }
    return true;
  }

  var clone = function(obj) {
    if(obj == null || typeof(obj) != 'object'){
      return obj;
    }

    var temp = obj.constructor(); // changed

    for(var key in obj) {
      if(obj.hasOwnProperty(key)) {
        temp[key] = clone(obj[key]);
      }
    }
    return temp;
  }

  var countTags = function(records, selectedTags, emptyCounts){
    var counts = records.reduce(function(acc, recordTags){
      if(arrayInArray(selectedTags, recordTags)){
        recordTags.forEach(function(tag){
          acc[tag] += 1;
        });
      }
      return acc;
    }, emptyCounts);

    return counts;
  };

  Selectize.define('gb', function(options) {
    if (this.settings.mode === 'single') return;
    console.log("Got GB plugin");
    var self = this;

    options = $.extend({
      records: []
    }, options);

    self.setup = (function() {
      var original = self.setup;
      return function() {
        // self.options = 
        // console.log(self.options);
        original.apply(self, arguments);
        self
      };
    })();

  });

})()
