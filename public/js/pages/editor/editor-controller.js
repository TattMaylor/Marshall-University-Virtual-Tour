import _ from 'lodash';

export default class editorController {
  static resolve() {
    return {
      locations: ['$stateParams', 'locationService', ($stateParams, locationService) => {
        return locationService.getAll('locations').then((results) => {
            return results.data;
          });
        }

      ],
      location: ['$stateParams', 'locations', ($stateParams, locations) => {
        return _.find(locations, item => item.name === $stateParams.name);
        }
      ],
      pictures: ['$stateParams', 'pictureService', 'location', ($stateParams, pictureService, location) => {
        return pictureService.getPictures({location_id: location.location_id}).then((results) => {
            return results.data;
          });
        }

      ],
      pictureLinks: ['$stateParams', 'pictureLinkService', 'location', ($stateParams, pictureLinkService, location) => {
        return pictureLinkService.getPictureLinks(location.location_id).then((results) => {
            return results.data;
          });
        }
      ],
      placesOfInterest: ['$stateParams', 'placeOfInterestService', 'location', ($stateParams, placeOfInterestService, location) => {
        return placeOfInterestService.getPlacesOfInterest(location.location_id).then((results) => {
            return results.data;
          });
        }
      ]
    }
  }

  static get $inject(){
    return ['$scope', '$state', '$auth', '$mdSidenav', 'locationService', 'pictureService', 'pictureLinkService', 'locations', 'location', 'pictures', 'pictureLinks', 'placesOfInterest'];
  }

  constructor($scope, $state, $auth, $mdSidenav, locationService, pictureService, pictureLinkService, locations, location, pictures, pictureLinks, placesOfInterest) {
    this.$scope = $scope;
    this.$state = $state;
    this.$auth = $auth;
    this.locations = locations;
    this.location = location;
    this.pictures = pictures;
    this.pictureLinks = pictureLinks;
    this.placesOfInterest = placesOfInterest;
    this.$mdSidenav = $mdSidenav;
    this.$scope.$on('open', () => this.openSideNav());

    this.tabs = [
      { title: 'Locations', state: 'home.editor.locations'},
      { title: 'Images', state: 'home.editor.pictures'},
      { title: 'Image Links', state: 'home.editor.links'},
      { title: 'Places of Interest', state: 'home.editor.poi'},
      { title: 'Logout', state: 'home.login'},
    ];
  }

  transitionTo(tab) {
    if(tab.title === 'Logout') {
      this.$auth.logout();
    }
    this.$state.go(tab.state);
  }

  openSideNav(){
        let nav = this.$mdSidenav('editorNav');
        nav.toggle();
      }

}
