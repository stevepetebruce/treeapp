//app modules
angular.module('treeapp', ['angular-meteor','ui.router','accounts.ui','angularUtils.directives.dirPagination','uiGmapgoogle-maps']); 


// angular conditional for phonegap mobile/desktop
function onReady(){
    angular.bootstrap(document, ['treeapp'], {
        strictDi: true
    });
}

if (Meteor.isCordova)
    angular.element(document).on("deviceready", onReady);
else
    angular.element(document).ready(onReady);