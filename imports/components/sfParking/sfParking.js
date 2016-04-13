import angular from 'angular';
import angularMeteor from 'angular-meteor';
//import { Routes } from '../../api/routes.js';
import Calendar from '../calendar/calendar';
//import Calendar from calendar;

import './sfParking.html';

class SFParking{
  constructor($scope,$reactive) {
    'ngInject';
 
    //$scope.viewModel(this);
    $reactive(this).attach($scope);

    this.helpers({
      routes() {
        return Routes.find(this.getReactively('routeQuery'));
      }, 
      d3Calender(){
        console.log('drawing the d3 calendar');
      }
    })
  }

  show(value){
    return value;
    //Calendar.rest();
    //console.log("hi hi hi");
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
    //console.log(addressQuery);
    this.routeQuery = addressQuery; 
  }

  blockQuery(block, cross1, cross2){        
    b = block;
    c1 = cross1; 
    c2 = cross2;

    this.block = '';
    this.cross1 = '';
    this.cross2 = '';

    console.log("Looking up details for  " + b + " between " + c1 + " and " + c2)
    //var blockQuery = 
    //tODO: this works, should maybe reorg
    //TODO: fix indexing in mongo so this goes faster
    //TODO: there are literally circular streets in sf (ex: Urbano drive)
    //TODO: also some streets use "end" (ex: urbano to end on corona )
    var blockQuery=
    {$and:
      [
        {$or:[{from_st:{$regex: ".*"+c1+".*", $options: 'i'}},{from_st:{$regex: ".*"+c2+".*", $options: 'i'}}]},
        {$or:[{to_st:{$regex: ".*"+c1+".*", $options: 'i'}},{to_st:{$regex: ".*"+c2+".*", $options: 'i'}}]},
        {streetname: {$regex: ".*"+b+".*", $options: 'i'}}
      ]
    };
    
    this.routeQuery = blockQuery; 
  } 
}

const name = 'sfParking';
 
export default angular.module(name, [
  angularMeteor,
  Calendar.name
]).component(name, {
    templateUrl: 'imports/components/sfParking/sfParking.html',
    controllerAs: name, 
    controller: SFParking
});