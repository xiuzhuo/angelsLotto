angular.module('starter.controllers', ['ionic'])

.controller('MainCtrl', function($scope, Options) {
  $scope.options = Options.all();
})

.controller('TabCtrl', function($scope, Options) {
  $scope.options = Options.all();
})

.controller('ResultsCtrl', function($scope, $ionicHistory, $ionicActionSheet, $timeout, $http, Games) {
  Games.setOnSelectedChangeListener('ResultsCtrl', function(){
    $ionicHistory.clearCache();
  });
  var parseResultGeneral = function(jsonText, drawday, fromCache){
    var data = JSON.parse(jsonText);
    $scope.general = data;
    $scope.result = data[data.years[0]][0];
    console.log($scope.result);
    var years = data.years;
    for (var key in data){
      if (key == years[0]){
        // for (key2 in data[key]){
        //   console.log(data[key][key2].date == drawday);
        //   if (data[key][key2].date == drawday){
        //     $scope.result = data[key][key2];
        //     console.log($scope.result);
        //   }
        // }
      } else if (key == 'years'){

      } else {
        drawday = key;
      }
    }

    fetchResultDetail(drawday, fromCache);
  }
  var parseResultDetail = function(jsonText, drawday, fromCache){
    var data = JSON.parse(jsonText);
    $scope.drawday = drawday;
    $scope.detail = data;
  }
  var fetchResultGeneral = function(drawday){
    $http.get(Games.getSelected().apis.archiv)
      .success(function(data, status, headers, config){
        console.log(data);
        parseResultGeneral(JSON.stringify(data), drawday, false);
      })
      .error(function(data, status, headers, config) {

        parseResultGeneral($scope.selectedGame.dummyDataGeneral, drawday, true);
      });
  }
  var fetchResultDetail = function(drawday){

    if (drawday){
      $http.get(Games.getSelected().apis.archiv+'?drawday='+drawday)
        .success(function(data, status, headers, config){
          parseResultDetail(JSON.stringify(data), drawday, false);
        })
        .error(function(data, status, headers, config) {
          parseResultDetail($scope.selectedGame.dummyDataDetail, drawday, true);
        });
    }
  }
  $scope.changeDrawday = function(data){
    fetchResultDetail(data);
  }
  $scope.games = Games.all();
  $scope.selectedGame = Games.getSelected();
  $scope.refreshGame = function(){
    fetchResultGeneral();
  };
  $scope.refreshGame();
  console.log($scope.refreshGame);
})
.controller('PredictCtrl', function($scope, Games, $ionicActionSheet, $ionicPopup, $timeout, $q, $window) {

  $scope.games = Games.all();
  Games.call(Games.get(0));
  if (!$scope.count){
    $scope.count = 10;
  };
  $scope.selectedGame = Games.getSelected();
  $scope.refreshPredict = function(){
    console.log($scope.selectedGame);
    $scope.lottos = $scope.selectedGame.calcPredict($scope.count);
  };
  $scope.refreshPredict();
  $scope.showOptionDialog = function(){
    $scope.popup = {};
    $scope.popup.count = $scope.count;
    $scope.popup.selectedGame =  $scope.selectedGame;
    console.log($scope.games);
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
            } else if ($scope.popup.count <= 0){
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
        Games.setSelected($scope.selectedGame);
        $scope.refreshPredict();
        console.log('Tapped!', $scope.popup.count);
      }
    });
  };
})

.controller('DashCtrl', function($scope) {})

.controller('OptionsCtrl', function($window, $scope, $ionicPopup, Styles, Options) {

  $scope.options = Options.all();

  $scope.showStyleDialog = function(){
    $scope.popup = {};
    $scope.popup.styleId = $scope.options.style.id;
    var myPopup = $ionicPopup.show({
      title: '',
      subTitle: '',
      templateUrl: 'templates/popup-options-style.html',
      scope: $scope,
      buttons: [
        { text: 'Cancel',
          onTap: function(e) {
            return false;
          }
        },
        { text: '<b>Save</b>',
          type: 'button-' + $scope.options.style.name,
          onTap: function(e) {
            if ($scope.popup.styleId) {
              return true;
            }
          }
        }
      ]
    }).then(function(saved) {
      if (saved){
        Options.load($scope.options.style, Styles.get($scope.popup.styleId));
        Options.saveAll();
        $window.location.reload(true)
      }
    });
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AboutCtrl', function($scope, $ionicPopup, Games) {
  $scope.games = Games.all();
  $scope.popup = {};
  $scope.aboutMe = function(showDetail){
    $scope.popup.sum = 0;
    $scope.popup.winnedGame =  Games.getSelected();
    $scope.popup.showDetail = showDetail;
    var options = {
      title: 'About More!',
      subTitle: 'I am very clever!',
      templateUrl: 'templates/popup-about.html',
      scope: $scope,
      buttons: [
        {
          text: 'Cancel',
          onTap: function(e) {
            return false;
          }
        }
      ]
    };
    if (showDetail){
      options.buttons.push({
        text: '<b>Know More!</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.popup.sum) {
            e.preventDefault();
          } else {
            return true;
          }
          return false;
        }
      });
    }
    $ionicPopup.show(options).then(function(success) {
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
