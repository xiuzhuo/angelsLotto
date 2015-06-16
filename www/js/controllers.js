angular.module('starter.controllers', ['ionic'])

.controller('MainCtrl', function($scope, Options) {
  $scope.options = Options.all();
})

.controller('TabCtrl', function($scope, Options) {
  $scope.options = Options.all();
})

.controller('ResultCtrl', function($scope, $ionicHistory, $ionicActionSheet, $timeout, $http, Games) {
  Games.setOnSelectedChangeListener('ResultCtrl', function(){
    $ionicHistory.clearCache();
  });

  var fetchArchiv = function(game){
    var parseArchiv = function (data){
      for (var key in data){
        game.result[key] = data[key];
      }
      game.drawday = data[data.years[0]][0];
      console.log(game);
    }
    $http.get(game.apis.archiv)
      .success(function(data, status, headers, config){
        parseArchiv(data);
      })
      .error(function(data, status, headers, config) {
        alert("error status="+status);
      });
  };

  var fetchDrawday = function(game, drawday){
    var parseDrawday = function(data){
      for (key in data){
        game.result[key] = data[key];
      }
    };
    $http.get(game.apis.archiv+'?drawday='+drawday.date)
    .success(function(data, status, headers, config){
      parseDrawday(data);
    })
    .error(function(data, status, headers, config) {

    });
  }

  var fetchResultGeneral = function(game){
    var parseResultGeneral = function(game, jsonText){
      var data = JSON.parse(jsonText);
      $scope.games[game.id].general = data;
      // $scope.games[game.id].result = data[data.years[0]][0];
      var drawday;
      for (var key in data){
        if (key == data.years[0]){
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
      fetchResultDetail(game, drawday);
    }
    $http.get(game.apis.archiv)
      .success(function(data, status, headers, config){
        parseResultGeneral(game, JSON.stringify(data), false);
      })
      .error(function(data, status, headers, config) {
        parseResultGeneral(game, game.dummyDataGeneral, true);
      });
  }
  var fetchResultDetail = function(game, drawday){
    var parseResultDetail = function(game, jsonText, drawday){
      var data = JSON.parse(jsonText);
      $scope.games[game.id].drawday = drawday;
      $scope.games[game.id].detail = data;
    }
    if (drawday){
      $http.get(game.apis.archiv+'?drawday='+drawday)
        .success(function(data, status, headers, config){
          parseResultDetail(game, JSON.stringify(data), drawday);
        })
        .error(function(data, status, headers, config) {
          parseResultDetail(game, game.dummyDataDetail, drawday);
        });
    }
  }
  $scope.changeDrawday = function(game){
    console.log(game);
    fetchDrawday(game, game.drawday);
  }
  $scope.games = Games.all();
  $scope.selectedGame = Games.getSelected();
  $scope.refreshGame = function(){
    for (var key in $scope.games){
      fetchArchiv($scope.games[key]);
    }
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
.controller('AboutCtrl', function($window, $scope, $ionicPopup, Games, Options, Styles) {
  $scope.options = Options.all();
  $scope.changeStyle = function(){
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



  var aboutCount = 0;
  var aboutClickTime = 0;

  $scope.games = Games.all();
  $scope.options = Options.all();
  $scope.popup = {};

  $scope.aboutMe = function(){
    console.log(aboutCount);
    var time = new Date().getTime();
    if (time - aboutClickTime > 10000){
      aboutCount = 0;
    }
    aboutClickTime = time;
    aboutCount++;
    if (aboutCount > 2){
      $scope.popup.showDetail = true;
      aboutCount = 0;
    } else{
      $scope.popup.showDetail = false;
    }
    var options = {
      title: 'About More!',
      subTitle: '',
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
    if ($scope.popup.showDetail ){
      options.buttons.push({
        text: '<b>Know More!</b>',
        type: 'button-'+ $scope.options.style.name,
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
          type: 'button-' + $scope.options.style.name,
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
