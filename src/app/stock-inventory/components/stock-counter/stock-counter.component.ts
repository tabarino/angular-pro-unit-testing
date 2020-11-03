import { Component, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const COUNTER_CONTROL_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StockCounterComponent),
    multi: true
};

@Component({
    selector: 'stock-counter',
    providers: [COUNTER_CONTROL_ACCESSOR],
    templateUrl: './stock-counter.component.html',
    styleUrls: ['./stock-counter.component.scss']
})
export class StockCounterComponent implements OnInit, ControlValueAccessor {
    @Input() step = 1;
    @Input() min = 0;
    @Input() max = 100;

    @Output() changed = new EventEmitter<number>();

    value = 0;
    focused: boolean;

    private onTouch: () => void;
    private onModelChange: (value) => void;

    constructor() { }

    ngOnInit(): void {
    }

    registerOnChange(fn: any): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    writeValue(value: any): void {
        this.value = value || 10;
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

    onBlur(event: FocusEvent) {
        this.focused = false;
        event.preventDefault();
        event.stopPropagation();
    }

    onKeyUp(event: KeyboardEvent) {
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

    onFocus(event: FocusEvent) {
        this.focused = true;
        event.preventDefault();
        event.stopPropagation();
    }
}
