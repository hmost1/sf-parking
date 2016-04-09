import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './sfParking.html';
import { Routes } from '../../api/routes.js';

class SFParkingCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.helpers({
      routes() {
        return Routes.find(this.getReactively('routeQuery'));
      }
    })
  }

  addressQuery(number, street) {
    var num = parseInt(number);
    var str = street;

     // Clear form
    this.number = '';
    this.street = '';

    //TODO: everything below here needs to be broken out into better helpers or reusabl
    //This is very data specific: if even, rightside, if odd, left. 
    //Used to filter on the cnnrightle field 
    var rightLeft = num %2 ? "L" : "R";
    
    //we need to do all of this because there is no guarantee blocks on each side end at preceding values (is this true???)
    //so couldnt just do ands of both regardless
    //need to look at some maps... 
    //TODO: simplify this 
    var numberQuery = rightLeft === "L" ? {lf_fadd: {$lte: num}, lf_toadd: {$gte: num}} : {rt_fadd: {$lte: num}, rt_toadd: {$gte: num}}
    
    //TODO: get the npm merge package or something for this and others down the line 
    //fill up the mongo query with the other fields we're searching on 
    var addressQuery = numberQuery;
    addressQuery.streetname =  {$regex: ".*"+str+".*", $options: 'i'}; 
    addressQuery.cnnrightle = {$regex: rightLeft}

    this.routeQuery = addressQuery; 
  };
}
 
export default angular.module('sfParking', [
  angularMeteor
])
  .component('sfParking', {
    templateUrl: 'imports/components/sfParking/sfParking.html',
    controller: ['$scope', SFParkingCtrl]
  });