appInstaller.controller('InstallController', function($scope, $mdDialog, profileService, InstallerFactory) {
  var profile = profileService.getCurrentProfile();
  profileService.bind($scope);

  $scope.distro = 'Ubuntu';
  $scope.distros = ['Ubuntu'];

  $scope.download = function() {
    var remote = require('remote');
    var dialog = remote.dialog;
    var prof = $scope.profiles[profile];
    var distro = $scope.distro;

    dialog.showSaveDialog({
      title: 'Save Script',
      defaultPath: 'script.sh',
      filters: [{
        name: 'Scripts',
        extensions: ['sh']
      }]
    }, function(path) {
      if (path) {
        var fs = require('fs');
        InstallerFactory.getInstaller($scope.profiles[profile], distro).then(function(installer) {
          fs.writeFile(path, installer, function(err) {
            if (err) {
              return console.log(err);
            }
            alert = $mdDialog.alert({
              title: 'Download Compleate!',
              htmlContent: 'The file hase been saved in <code>' + path +
                           '</code> ! <br /> To install it run:  <br /><br />' +
                           '<pre>' +
                           'bash "' + path + '"' + "\n" +
                           '</pre>',
              ok: 'Close'
            });
            $mdDialog
              .show(alert)
              .finally(function() {
                alert = undefined;
              });
          });
        });
      }
    });
  };

  $scope.install = function() {
    var p = $scope.profiles[profile];
    var distro = $scope.distro;

    var repos, install, postInstall;
  };
});
