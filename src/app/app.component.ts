import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SpinnerService } from './services/spiner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  isLoad$: Observable<boolean>;
  constructor(private spinnerService: SpinnerService) {

  }

  ngOnInit() {
    this.isLoad$ = this.spinnerService.spinnerState;
  }
}

export const ToastrOptions = {
  positionClass: 'toast-top-center',
  closeButton: false,
  tapToDismiss: false,
  enableHtml: true
};
