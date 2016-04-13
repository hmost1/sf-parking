import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import './home.html';
import { name as SFParking } from '../sfParking/sfParking';
 
class Home {}
 
const name = 'home';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  SFParking
]).component(name, {
  templateUrl: 'imports/components/home/home.html',
  controllerAs: name,
  controller: Home
});