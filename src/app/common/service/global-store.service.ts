import { EventEmitter, Injectable } from '@angular/core';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalStoreService {
  statusChange = new EventEmitter();

  password?: string;

  HideButton: boolean = false;
  HideTitlebar: boolean = false;



  statistic = {
    illegalDrop: 0,
    mixedInto: 0,
    full: 0,
    station: {
      count: 0,
      drop: 0,
    },
    device: {
      count: 0,
      online: 0,
      offline: 0,
    },
  };

  interval = new EventEmitter();
  private intervalHandle?: NodeJS.Timer;
  runInterval(interval: number = 1000 * 60 * 1) {
    this.intervalHandle = setInterval(() => {
      this.interval.emit();
    }, interval);
  }
  stopInterval() {
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
    }
  }

  constructor() {
    this.runInterval();
  }
}
