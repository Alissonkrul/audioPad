'use strict';
angular.module('audioPad', ['cgNotify','ng.httpLoader','cfp.hotkeys'  ])
  .config(['httpMethodInterceptorProvider',
    function (httpMethodInterceptorProvider) {
      httpMethodInterceptorProvider.whitelistDomain('localhost');
      // ...
    }
  ]);
