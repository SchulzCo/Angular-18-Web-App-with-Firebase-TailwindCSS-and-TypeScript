import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-google-button',
  standalone: true,
  templateUrl: './google-button.component.html',
})
export class GoogleButtonComponent {
  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    this.onClick.emit();
  }
}
