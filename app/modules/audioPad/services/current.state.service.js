'use strict';
angular.module('audioPad')
  .service('CurrentStateService', currentStateService);

currentStateService.$inject = [];

function currentStateService() {
  this.questionParams = {
    group: 1,
    pos: 0,
    questionUID: 0,
    navFilter: 'all'
  };

  this.questionsConfig = {
    selectedMode: 'rq-study'
  };

  this.selectedGroup = {
    group : {}
  };

  this.selectedCategories = {

  };

  this.lastParams = {
    testUID: 0
  }
}
