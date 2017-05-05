'use strict';

/**
 * @ngdoc function
 * @name nameGameApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nameGameApp
 */


angular.module('nameGameApp.view', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        // templateUrl: '/views/main.html',
        controller: 'MainCtrl'
    });
}])
.controller('MainCtrl', [
    '$http',
    '$scope',
    function MainCtrl ($http, $scope) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        var modifiedEmployeeList = [];
        var badEmployeeImage = 'featured-image-TEST1.png';
        var controlEmployeeId;
        var defaultControl = {
            name: 'Ready to Play?',
            headShot: ''
        };
        var defaultScore = {
            numCorrect: 0,
            numIncorrect: 0
        };

        $scope.displayList = [];
        $scope.control = defaultControl;
        $scope.showReadyPlay = true;
        $scope.showNameGame = false;
        $scope.showReverse = false;
        $scope.gameOver = false;


        var checkForProperImage = function(imageURL){
            /**
            * Checks that image url is a proper one
            * @param {string} imageURL = 'featured-image-TEST1.png'
            * @return {boolean}
            */

            if (imageURL.includes(badEmployeeImage)) {
                return true;
            }

        };

        var checkLocalStorage = function(arrayName){
            /**
            * Checks that localstorage exists with given array name
            * @param {string} arrayName
            * @return {boolean}
            */

            if (localStorage.getItem(arrayName) !== null){
                return true;
            }

        };

        var chooseNUniqueEmployees = function(array, num, objKey){
            /**
            * Make sure that only unique employees are chosen
            * @param {array} array
            * @param {number} num
            * @param {string} objKey
            * @return {boolean}
            */

            var randomList = [];

            for (var i=0; i<num; i++){
                var randomEmployee = chooseRandom(array);

                if (!isDupe(array, objKey)){
                    randomList.push(randomEmployee);
                }
            }

            return randomList;

        };

        var chooseRandom = function(array){
            /**
            * Choose a random element from an array
            * @param {array} array
            * @return {element}
            */

            var random = array[Math.floor(Math.random() * array.length)];

            return random;

        };

        $scope.clearGame = function(){
            /**
            * Clear and reset controller variables associated with all games
            */

            clearGameScopes();
            $scope.displayList = [];
            $scope.control = defaultControl;

        };

        var clearGameScopes = function(){
            /**
            * Reset individual game variables.
            */

            $scope.showReadyPlay = true;
            $scope.showNameGame = false;
            $scope.showReverse = false;
            $scope.gameOver = false;

        };

        $scope.clearScore = function(){
            /**
            * Resets individual score variables.
            */

            $scope.score = defaultScore;
            setToLocalStorage($scope.score, 'scoreBoard');

        };

        var displayControlEmployee = function(array){
            /**
            * Sets variables for control employee
            * @param {array} array
            * @return sets $scope variables passed to FE
            */

            var controlEmployee = setControlEmployee(array);
            controlEmployeeId = controlEmployee.controlId;

            $scope.control.name = 'Who is ' + controlEmployee.fullName + '?';
            $scope.control.headShot = controlEmployee.employeeHeadshot;

        };

        var disableListItems = function(Id){
            /**
            * Disables displayList items
            * @param {number} Id
            * @return sets $scope variables passed to FE
            */

            for (var i=0; i<$scope.displayList.length; i++){

                if ($scope.displayList[i].employeeId === Id) {
                    $scope.displayList[i].disabled = false;
                } else {
                    $scope.displayList[i].disabled = true;
                }
            }

        };

        var endGame = function(Id){
            /**
            * Triggers game end events and sets score to localstorage.
            * @param {number} Id
            * @return sets $scope variables passed to FE,
            * calls disableListItems(); and sets score to localstorage
            */

            $scope.gameOver = true;
            disableListItems(Id);
            setToLocalStorage($scope.score, 'scoreBoard');

        };

        var errorCallback = function(){
            /**
            * Error callback on GET request to: 'https://willowtreeapps.com/api/v1.0/profiles?limit=150'
            * @return an alert
            */

            window.alert('Please refresh your browser and try again.  There was an error!');

        };

        var getEmployeeList = function(){
            /**
            * GET request for Employee Lists
            */

            $http.get('https://willowtreeapps.com/api/v1.0/profiles?limit=150').then(successCallback, errorCallback);

        };

        var initEmployeeBoard = function(){
            /**
            * Initializes the modifiedEmployeeList, by checking:
            *   1. If localstorage contains employeeList
            *   2. Or, if not there then makes the GET request
            */

            if (checkLocalStorage('employeeList')) {
                modifiedEmployeeList = JSON.parse(localStorage.getItem('employeeList'));
            } else {
                getEmployeeList();
            }

        };

        $scope.initGameBoards = function(){
            /**
            * Initializes Employee Board and Score Board
            */

            initEmployeeBoard();
            initScoreBoard();

        };

        var initScoreBoard = function(){
            /**
            * Initializes the $scope.score, by checking:
            *   1. If localstorage contains $scope.score
            *   2. Or, sets $scope.score to defaultScore
            */

            if (checkLocalStorage('scoreBoard')) {
                $scope.score = JSON.parse(localStorage.getItem('scoreBoard'));
            } else {
                $scope.score = defaultScore;
            }

        };

        var isDupe = function(array, objKey){
            /**
            * Adapted from:  http://stackoverflow.com/a/22844694/2052678
            * Checks if there is a duplicate object in an array
            * @param {array} array
            * @param {string} objKey
            * @return boolean
            */

            return array.some(function(el){
                return el[objKey] === objKey;
            });

        };

        $scope.isEmployee = function(employeeId){
            /**
            * Checks if chosen employee on FE is control employee, based on employee ID.
            * @param {number} employeeId
            * @return sets scope variables and/or calls endGame()
            */

            this.employee.clicked = true;

            if (employeeId === controlEmployeeId) {
                this.employee.correct = true;
                $scope.score.numCorrect += 1;
                endGame(employeeId);
            } else {
                this.employee.incorrect = true;
                $scope.score.numIncorrect += 1;
            }

        };

        $scope.playNameGame = function(num){
            /**
            * Starts Name Game
            * @param {number} num
            * @return sets scope variables, calls clearGameScopes(), and setDisplayList()
            */

            clearGameScopes();
            $scope.showReadyPlay = false;
            $scope.showNameGame = true;
            setDisplayList(modifiedEmployeeList, num);

        };

        $scope.playReverse = function(num){
            /**
            * Starts Reverse Game
            * @param {number} num
            * @return sets scope variables, calls clearGameScopes(), and setDisplayList()
            */

            clearGameScopes();
            $scope.showReadyPlay = false;
            $scope.showReverse = true;
            setDisplayList(modifiedEmployeeList, num);

        };

        var setControlEmployee = function(array){
            /**
            * Starts Name Game
            * @param {array} array
            * @return sets scope variables, calls clearGameScopes(), and setDisplayList()
            */

            var random = chooseRandom(array);
            var controlEmployee = {};

            controlEmployee.controlId = random.employeeId;
            controlEmployee.fullName = random.fullName;
            controlEmployee.employeeHeadshot = random.employeeHeadshot;

            return controlEmployee;

        };

        var setDisplayList = function(array, num){
            /**
            * Sets unique displayList for games
            * @param {array} array
            * @param {number} num
            * @return sets scope variables, calls displayControlEmployee()
            */

            $scope.displayList = [];
            $scope.displayList = chooseNUniqueEmployees(array, num, 'employeeId');

            displayControlEmployee($scope.displayList);

        };

        var setEmployeeList = function(data){
            /**
            * Sets & parses employeeList from GET request, localstorage
            * @param {object} data
            * @return Calls setToLocalStorage()
            */

            var fullEmployeeList = data.data.items;
            var storedEmployeeList = [];

            for (var i=0; i<fullEmployeeList.length; i++){
                var headShotURL = fullEmployeeList[i].headshot.url;
                var fullName = fullEmployeeList[i].firstName + ' ' + fullEmployeeList[i].lastName;
                var employeeId = fullEmployeeList[i].id;
                var employeeObj = {};

                if (!headShotURL || checkForProperImage(headShotURL)) {
                    continue;
                }

                employeeObj.fullName = fullName;
                employeeObj.employeeId = employeeId;
                employeeObj.employeeHeadshot = 'http:' + headShotURL;

                storedEmployeeList.push(employeeObj);
            }

            modifiedEmployeeList = storedEmployeeList;
            setToLocalStorage(modifiedEmployeeList, 'employeeList');

        };

        var setToLocalStorage = function(array, arrayName){
            /**
            * Sets stringified array to localstorage
            * @param {array} array
            * @param {string} arrayName
            */

            localStorage.setItem(arrayName, JSON.stringify(array));

        };

        var successCallback = function(data){
            /**
            * success callback on GET request to: 'https://willowtreeapps.com/api/v1.0/profiles?limit=150'
            * @return calls setEmployeeList()
            */

            setEmployeeList(data);

        };

  }]);
