import { Injectable } from '@angular/core';
import { Toast } from '../models/toast.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  newToast$: Subject<Toast> = new Subject<Toast>();

  addToast(toast: Toast) {
    this.newToast$.next(toast);
  }
}
