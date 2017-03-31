angular.module('audioPad').factory('ErrorResponseInterceptor', ErrorResponseInterceptor);

ErrorResponseInterceptor.$inject = ['$q', '$injector', 'config'];

function ErrorResponseInterceptor($q, $injector, config) {

  return {
    'responseError': function (rejection) {
      switch (rejection.status) {
        case 401:
          $injector.get('$state').go('unauthorized');
          break;
        case 403:
          $injector.get('$state').go('forbidden');
          break;
        case 404:
          var questionUID  = '';
          if(rejection.config.params.goToDiagram){
            questionUID +=   rejection.config.params.goToDiagram;
            delete rejection.config.params.goToDiagram;
          }else if(rejection.config.params.goTo){
            questionUID +=   rejection.config.params.goTo;
            delete rejection.config.params.goTo;
          }else if(rejection.config.params.jumpTo){
            questionUID +=   rejection.config.params.jumpTo;
            delete rejection.config.params.jumpTo;
          }
          if (rejection.config.url.indexOf(config.endpoint + '/questions') > -1) {
            $injector.get('notify')({
              message: 'Question ID ' + questionUID+ ' not found',
              classes: 'alert-warning',
              templateUrl: '',
              position: 'right',
              duration: 2500
            });
          }
          break;
        default:
          break;
      }
      return $q.reject(rejection);
    }
  };
}
