import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {

  @Input() message = 'Are you sure?';
  @Input() confirmButton = 'OK';
  constructor(public activeModal: NgbActiveModal) { }

  confirm(): void {
    this.activeModal.close({
      confirmed: true
    });
  }

  cancel(): void {
    this.activeModal.close({
      confirmed: false
    });
  }

  ngOnInit(): void {
  }

}
