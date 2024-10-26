import { Component, OnDestroy, OnInit } from '@angular/core';
import { Toast } from '../../models/toast.model';
import { ToastService } from '../../services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent implements OnInit, OnDestroy {
  counter: number = 0;
  toasts: { timeout: any; toast: Toast }[] = [];

  subscription: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.subscription = this.toastService.newToast$.subscribe((toast) => {
      this.addToast(toast);
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.toasts.forEach((item) => {
      clearTimeout(item.timeout);
    });
  }

  onClose(index: number) {
    clearTimeout(this.toasts[index].timeout);
    this.toasts.splice(index, 1);
  }

  private addToast(toast: Toast) {
    this.toasts.push({
      timeout: setTimeout(() => {
        this.onTimeout(toast);
      }, toast.timeout),
      toast: toast,
    });
  }

  private onTimeout(toast: Toast) {
    const index = this.toasts.findIndex((item) => item.toast === toast);
    if (index !== -1) {
      this.toasts.splice(index, 1);
    }
  }
}
