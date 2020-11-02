import { Component, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'stock-counter',
    templateUrl: './stock-counter.component.html',
    styleUrls: ['./stock-counter.component.scss']
})
export class StockCounterComponent implements OnInit {
    @Input() step = 1;
    @Input() min = 0;
    @Input() max = 100;

    @Output() changed = new EventEmitter<number>();

    value = 0;
    focused: boolean;

    constructor() { }

    ngOnInit(): void {
    }

    increment() {
        if (this.value < this.max) {
            this.value = this.value + this.step;
            this.changed.emit(this.value);
        }
    }

    decrement() {
        if (this.value > this.min) {
            this.value = this.value - this.step;
            this.changed.emit(this.value);
        }
    }

    private onBlur(event: FocusEvent) {
        this.focused = false;
        event.preventDefault();
        event.stopPropagation();
    }

    private onKeyUp(event: KeyboardEvent) {
        const handlers = {
            ArrowDown: () => this.decrement(),
            ArrowUp: () => this.increment()
        };

        if (handlers[event.code]) {
            handlers[event.code]();
            event.preventDefault();
            event.stopPropagation();
        }
    }

    private onFocus(event: FocusEvent) {
        this.focused = true;
        event.preventDefault();
        event.stopPropagation();
    }
}
