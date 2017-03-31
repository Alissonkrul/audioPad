'use strict';
angular.module('audioPad', ['cgNotify','ng.httpLoader','cfp.hotkeys','timer'])
  .config(['httpMethodInterceptorProvider',
    function (httpMethodInterceptorProvider) {
      httpMethodInterceptorProvider.whitelistDomain('localhost');
      // ...
    }
  ]);
