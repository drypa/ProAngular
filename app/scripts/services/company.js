(function(){
  "use strict";
  angular.module('marketApp')
    .service('CompanyService',function($resource){
      return $resource('companies.json');
    });
})();
