import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
isDB = true;
status = 'Connect';
imgsrc='assets/imgs/button-not-connected.png';
  title = 'app';
}

function Ctrl($scope) {
    $scope.state = 'on';

    $scope.changeState = function() {
        $scope.state = $scope.state === 'on' ? 'off' : 'on';
    }
}
