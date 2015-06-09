angular.module('starter.controllers', ['ionic'])

.controller('ResultsCtrl', function($scope, $ionicActionSheet, $timeout,$http, Games) {
  // $scope.selectedGame = JSON.parse(window.localStorage['selectedGame'] || null);
  //alert(JSON.stringify(Games.getSelected()))
  // $http.get('/new-items')
  //  .success(function(newItems) {
  //    $scope.items = newItems;
  //  })
  //  .finally(function() {
  //    // Stop the ion-refresher from spinning
  //    $scope.$broadcast('scroll.refreshComplete');
  //  });
  var parseGame = function(jsonText){
    alert(jsonText);
    var data=JSON.parse(jsonText);
    console.log(data[2015][0]);
  }

  $scope.selectedGame = Games.getSelected();
  $scope.refreshGame = function(){
    alert($scope.selectedGame.apis.archiv);
    $http.get($scope.selectedGame.apis.archiv)
    .success(function(data, status, headers, config){
      //alert(JSON.stringify(data));
      var result=JSON.parse(data);
      alert(true);
      parseGame(result);
    })
  .error(function(data, status, headers, config) {
      //alert($scope.selectedGame.dummyData);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      alert(false);
      parseGame($scope.selectedGame.dummyData);
    });
  };
  $scope.refreshGame();
})
.controller('PredictCtrl', function($scope, Games, $ionicActionSheet, $ionicPopup, $timeout, $q, $window) {
  $scope.games = Games.all();
  Games.call(Games.get(0));
  if (!$scope.count){
    $scope.count = 10;
  };
  $scope.selectedGame = Games.getSelected();
  $scope.refreshPredict = function(){
    var selectedGame = $scope.selectedGame;
    var Lottos = [];
    var calc = function() {
      var deferred = $q.defer();
      setTimeout(function(){
        var count = $scope.count;
        var allNumbers = [];
        var allExtras = [];

        for (var i = 0; i < count;i++){
          var lotto={};
          lotto.values=[];
          lotto.extras=[];
          if (allNumbers.length < selectedGame.normalNumbersCount){
            allNumbers = selectedGame.normalNumbers.slice();
          }
          for (var j = 0; j < selectedGame.normalNumbersCount; j++){
            var index=Math.floor(Math.random() * allNumbers.length);
            lotto.values.push(allNumbers[index]);
            allNumbers.splice(index,1);
          }

          if (allExtras.length < selectedGame.specialNumbersCount){
            allExtras = selectedGame.specialNumbers.slice();
          }
          for (var j = 0; j < selectedGame.specialNumbersCount; j++){
            var index = Math.floor(Math.random() * allExtras.length);
            lotto.extras.push(allExtras[index]);
            allExtras.splice(index, 1);
          }
          lotto.values.sort(function(a, b){return a-b});
          lotto.extras.sort(function(a, b){return a-b});
          Lottos.push(lotto);
        }

        deferred.resolve('Done! '+Lottos);
      }, 100);
      return deferred.promise;
    };
    var promise = calc();
    promise.then(function(greeting) {
      console.log('Success: ' + greeting);
      $scope.lottos=Lottos;
      $scope.$broadcast('scroll.refreshComplete');
    }, function(reason) {
      console.log('Failed: ' + reason);
    }, function(update) {
      console.log('Got notification: ' + update);
    });
    return this;
  };
  $scope.refreshPredict();
  $scope.showOptionDialog = function(){
    $scope.popup = {};
    $scope.popup.count = $scope.count;
    $scope.popup.selectedGame =  $scope.selectedGame;
    var myPopup = $ionicPopup.show({
      title: '',
      subTitle: '',
      templateUrl: 'templates/popup-predict.html',
      scope: $scope,
      buttons: [
        { text: 'Cancel',
          onTap: function(e) {
            return false;
          }
        },
        { text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.popup.count) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else if ($scope.popup.count<=0){
              $scope.popup.count = 10;
              e.preventDefault();
            } else {
              return true;
            }
            return false;
          }
        }
      ]
    }).then(function(saved) {
      if (saved){
        $scope.count = $scope.popup.count;
        $scope.selectedGame = $scope.popup.selectedGame;
        Games.saveSelected($scope.selectedGame);
        $scope.refresh();
        console.log('Tapped!', $scope.popup.count);
      }
    });
  };
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AboutCtrl', function($scope, $ionicPopup, Games) {
  $scope.games = Games.all();
  $scope.popup = {};
  $scope.aboutMe = function(detail){
    $scope.popup.sum = 0;
    $scope.popup.winnedGame =  Games.getSelected();
    $ionicPopup.show({
      title: 'About me',
      subTitle: 'I am very clever!',
      templateUrl: 'templates/popup-about.html',
      scope: $scope,
      buttons: [
        {
          text: 'Cancel',
          onTap: function(e) {
            return false;
          }
        },
        {
          text: '<b>Tell</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.popup.sum) {
              e.preventDefault();
            } else {
              return true;
            }
            return false;
          }
        }
      ]
    }).then(function(success) {
      if (success){
        alert($scope.popup.sum);
      }
    });
  }

  $scope.makeDonate = function(){
    $scope.popup.sum = null;
    $scope.popup.winnedGame =  Games.getSelected();
    $ionicPopup.show({
      title: 'Donate',
      subTitle: '',
      templateUrl: 'templates/popup-donate.html',
      scope: $scope,
      buttons: [
        {
          text: 'Cancel',
          onTap: function(e) {
            return false;
          }
        },
        {
          text: '<b>Donate</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.popup.sum) {
              e.preventDefault();
            } else {
              return true;
            }
            return false;
          }
        }
      ]
    }).then(function(success) {
      if (success){
        alert($scope.popup.sum);
      }
    });
  }
});
