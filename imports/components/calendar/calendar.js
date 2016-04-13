import angular from 'angular';
import angularMeteor from 'angular-meteor';
//import template from './calendar.html';
///import template from './calendar.html';
import './calendar.html';

class Calendar {
  constructor($scope,$reactive) {
    'ngInject';
 
    //$scope.viewModel(this);
    $reactive(this).attach($scope);

    this.helpers({
      test(){
        console.log('test');
      },
      add(){
        console.log("adding");
      }
    });

    this.me = 'hi'; 
  };
  
  another(){
    console.log('aother');
  };
}

const name = 'calendar';

export default angular.module(name, [
  angularMeteor
])
  .component(name, {
    templateUrl: 'imports/components/calendar/calendar.html',
    controllerAs: name,
    controller: Calendar
  });