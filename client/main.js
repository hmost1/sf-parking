import angular from 'angular';
import angularMeteor from 'angular-meteor';
import sfParking from '../imports/components/sfParking/sfParking';

angular.module('street-sweeping', [
  angularMeteor, 
  sfParking.name
]);