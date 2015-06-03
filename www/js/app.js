var App = angular.module("App", ["ionic"]);

App.service("githubTrending", ["$http", "$log", githubTrending]);

App.controller("AppCtrl", ["$scope", "githubTrending", "$log", AppCtrl]);

function AppCtrl($scope, GithubTrending, $log) {
    $scope.repos = [];
    $scope.getData = function() {
        GithubTrending.getTrending($scope);
    }
}

function githubTrending($http, $log) {
    this.getTrending = function($scope) {
        var date = new Date();
        date.setDate(date.getDate() - 3);
        var day = ('0' + date.getDate()).slice(-2);
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var lastSeven = date.getFullYear() + '-' + month + '-' + day;

        $http.get("https://api.github.com/search/repositories?q=created:%3E" + lastSeven + "&sort=stars&order=desc")
            .success(function(result) {
                $scope.repos = result.items;
                $scope.$broadcast("scroll.refreshComplete");
            });
    };
}