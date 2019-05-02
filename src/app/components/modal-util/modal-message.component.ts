import { Component, Output, EventEmitter } from '@angular/core';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  DELETE = 'delete'
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'modal-message',
    templateUrl: './modal-message.component.html',
    styleUrls: ['modal.component.css']
})
// tslint:disable-next-line:component-class-suffix
export class ModalMessage {

    private Message: string;
    public MessageIsVisible: boolean;
    public type: string;
    public spinner = false;

    // tslint:disable-next-line:no-output-on-prefix
    @Output() onConfirm: EventEmitter<boolean> = new EventEmitter<boolean>();

    showAlert(message: string, type: AlertTypes, dismissTimeout?: number) {
        this.Message = message;
        this.type = type;
        this.MessageIsVisible = true;

        if (dismissTimeout) {
            setTimeout(() =>  this.hideMsg(), dismissTimeout);
        }
    }

    showAlertDanger(message: string) {
        this.showAlert(message, AlertTypes.DANGER);
    }

    showAlertSuccess(message: string) {
        this.showAlert(message, AlertTypes.SUCCESS, 3000);
    }

    showAlertInfo(message: string) {
        this.showAlert(message, AlertTypes.INFO);
    }

    showAlertWarning(message: string) {
        this.showAlert(message, AlertTypes.WARNING);
    }

    showAlertDelete(message: string) {
        this.showAlert(message, AlertTypes.DELETE);
    }

    showLoading(message?: string) {
        this.spinner = true;
        if (message) {
            this.Message = message;
        } else {
            this.Message = 'Aguarde...';
        }
    }

    dismiss() {
        this.spinner = false;
    }

    hideMsg() {
        this.MessageIsVisible = false;
    }

    Confirmar() {
        this.onConfirm.emit(true);
        this.hideMsg();
    }
}
