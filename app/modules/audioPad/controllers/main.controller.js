'use strict';

angular.module('audioPad')
  .controller('MainCtrl', mainController);

mainController.$inject = ['tokenService', '$location', '$state', '$interval', '$scope', 'ApiService', 'GroupsApiService','CatsApiService', 'CurrentStateService', '$rootScope', '$timeout', 'notify', 'FinishTestService', 'ExitTestService', '$window','hotkeys'];
function mainController(tokenService, $location, $state, $interval, $scope, ApiService, GroupsApiService, CatsApiService ,CurrentStateService, $rootScope, $timeout, notify, FinishTestService, ExitTestService, $window, hotkeys) {

  this.questionsConfig = CurrentStateService.questionsConfig;




  var init = function () {
    if (!$location.search().jwt) {
      if (localStorage.getItem('jwt')) {
        tokenService.jwt = localStorage.getItem('jwt');
      } else {
        $state.go('unauthorized');
      }
    } else {
      tokenService.jwt = $location.search().jwt;
    }

    if (tokenService.jwt) {
      showClock();
      ApiService.getMetaData()
        .then(function (tokenPayload) {
            localStorage.setItem('jwt', tokenService.jwt);
            tokenService.tokenPayload = tokenPayload;
            CurrentStateService.questionParams.memberUID = tokenPayload.memberUID;
            CurrentStateService.questionsConfig.selectedMode = tokenService.getSelectMode(tokenPayload.questionMode);
            // ...

            if (!$location.search().reload || $location.search().reload === 'false' || $location.search().reload === '0') {
              CurrentStateService.questionParams.questionUID = -1
            }

            if ($location.search().group) {
              CurrentStateService.selectedGroup.group.UID = $location.search().group;
              delete CurrentStateService.questionParams.questionUID;
            }

            if ($location.search().licenseExamUID) {
              CurrentStateService.questionParams.licenseExamUID = $location.search().licenseExamUID;
              delete CurrentStateService.questionParams.questionUID;
            }

            if (tokenPayload.testUID) {
              CurrentStateService.questionParams.testUID = tokenPayload.testUID;
            }

            var loadOld = CurrentStateService.questionParams.questionUID === -1;

            showClock();

            $location.search('jwt', null);
            $location.search('group', null);
            $location.search('reload', null);
            $location.search('licenseExamUID', null);

            if (!loadOld) {
              if (CurrentStateService.questionsConfig.selectedMode === 'md-finish-test' || CurrentStateService.questionsConfig.selectedMode === 'md-take-test' && CurrentStateService.questionParams.testUID) {
                ApiService.resetAnswers()
                  .then(function () {
                    return getGroups(CurrentStateService.selectedGroup.group.UID);
                  })
                  .then(function () {
                    $rootScope.$broadcast('question-update-request');
                    $rootScope.$broadcast('categories-update-request', {data: CurrentStateService.questionParams});
                  })
              }
              else {
                getGroups(CurrentStateService.selectedGroup.group.UID)
                  .then(function () {
                    $rootScope.$broadcast('question-update-request');
                    $rootScope.$broadcast('categories-update-request', {data: CurrentStateService.questionParams});
                  })

              }
            } else {
              $rootScope.$broadcast('question-update-request', {loadOld: loadOld});
            }

          }
        );
    }
  };

  $rootScope.$on('question-update-request', function (e, args) {
    ApiService.getQuestions(CurrentStateService.questionParams)
      .then(function (result) {

        if(args && args['onlyUpdateTotals']){
          $scope.questions.filter.numQuestions = result.question.numQuestions;
          $scope.questions.question.totalWrong = result.question.totalWrong;
          $scope.questions.question.totalRight = result.question.totalRight;
          $scope.questions.question.totalAnswered = result.question.totalAnswered;
        }else{
          $scope.questions = result;
        }

        if (args && args['loadOld']) {
          CurrentStateService.questionParams.group = $scope.questions.question.groupUID;
          updateSelectedFiltersOnQuestionChanges();
          getGroups($scope.questions.question.groupUID);
        }

        if (CurrentStateService.questionParams.goTo) {
          delete CurrentStateService.questionParams.goTo;
        }

        if (CurrentStateService.questionParams.questionUID) {
          delete CurrentStateService.questionParams.questionUID;
        }

        if (CurrentStateService.questionParams.jumpTo) {
          delete CurrentStateService.questionParams.jumpTo;
        }

        if (CurrentStateService.questionParams.goToDiagram) {
          delete CurrentStateService.questionParams.goToDiagram;
        }

        if (!(args && args.isCanSubmitAnswer)) {
          $scope.questions.noRefresh = true;
        }

      });
  });
  $rootScope.$on('categories-update-request', function (event, args) {
    $scope.categories = {};

    if (args && args['resetFilters']) {
      CurrentStateService.selectedCategories.cat0 = 0;
      CurrentStateService.selectedCategories.cat1 = 0;
      CurrentStateService.selectedCategories.cat2 = 0;
      CurrentStateService.selectedCategories.cat3 = 0;

      delete CurrentStateService.questionParams.cat0;
      delete CurrentStateService.questionParams.cat1;
      delete CurrentStateService.questionParams.cat2;
      delete CurrentStateService.questionParams.cat3;
    }

    CatsApiService.getCats(args['data'])
      .then(function (categories) {
        if (categories.cat0 && categories.cat0.length >= 0) {
          categories.cat0.push({name: 'Any'});
        }

        if (categories.cat1 && categories.cat1.length >= 0) {
          categories.cat1.push({name: 'Any'});
        }

        if (categories.cat2 && categories.cat2.length >= 0) {
          categories.cat2.push({name: 'Any'});
        }

        if (categories.cat3 && categories.cat3.length >= 0) {
          categories.cat3.push({name: 'Any'});
        }

        $scope.categories = categories;
      });

  });
  var showClock = function () {
    $scope.clock = new Date();
    $scope.tickInterval = 1000; //ms
    var tick = function () {
      $scope.clock = Date.now(); // get the current time
    };

    $interval(tick, $scope.tickInterval);
  };

  var updateSelectedFiltersOnQuestionChanges = function () {
    if (!isNaN($scope.questions.filter.cat0) && $scope.questions.filter.cat0 != CurrentStateService.selectedCategories.cat0) {
      CurrentStateService.selectedCategories.cat0 = $scope.questions.filter.cat0;
      CurrentStateService.questionParams.cat0 = $scope.questions.filter.cat0;
    }
    if (!isNaN($scope.questions.filter.cat1) && $scope.questions.filter.cat1 != CurrentStateService.selectedCategories.cat1) {
      CurrentStateService.selectedCategories.cat1 = $scope.questions.filter.cat1;
      CurrentStateService.questionParams.cat1 = $scope.questions.filter.cat1;

    }
    if (!isNaN($scope.questions.filter.cat2) && $scope.questions.filter.cat2 != CurrentStateService.selectedCategories.cat2) {
      CurrentStateService.selectedCategories.cat2 = $scope.questions.filter.cat2;
      CurrentStateService.questionParams.cat2 = $scope.questions.filter.cat2;

    }
    if (!isNaN($scope.questions.filter.cat3) && $scope.questions.filter.cat3 != CurrentStateService.selectedCategories.cat3) {
      CurrentStateService.selectedCategories.cat3 = $scope.questions.filter.cat3;
      CurrentStateService.questionParams.cat3 = $scope.questions.filter.cat3;

    }
    $rootScope.$broadcast('categories-update-request', {data: CurrentStateService.questionParams});
  };

  var self = this;

  var getGroups = function (groupUID) {
    return GroupsApiService.getGroups()
      .then(function (groupsObject) {
        $scope.groups = groupsObject.groups;
        var groupIndex = _.findKey($scope.groups, {'UID': groupUID ? parseInt(groupUID) : 1});
        CurrentStateService.selectedGroup.group = groupsObject.groups[groupIndex];

        $rootScope.$broadcast('update-group-request', {
          data: {
            group: $scope.groups,
            selectedGroup: CurrentStateService.selectedGroup
          }
        });
      });
  };

  $scope.gge = function () {
    notify({
      message: 'Question review mode',
      classes: 'alert-warning',
      templateUrl: '',
      position: 'right',
      duration: 2500
    });
    self.questionsConfig.selectedMode = 'rq-study';

    ApiService.getQuestions({
      group: 1,
      pos: 0,
      questionUID: 0,
      navFilter: 'all'
    })
      .then(function (result) {
        $scope.questions = result;
      });
  };

  $scope.finishTest = function () {
    FinishTestService.showFilterOptionsModal($scope.questions);
  };

  $scope.exit = function () {
    ExitTestService.showFilterOptionsModal();
  };

  init();

}
