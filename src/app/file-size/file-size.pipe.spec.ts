import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileSizePipe } from './file-size.pipe';

describe('FileSizePipe', () => {
    it('create an instance', () => {
        const pipe = new FileSizePipe();
        expect(pipe).toBeTruthy();
    });

    describe('Shallow FileSizePipe Test', () => {
        @Component({
            template: `
                Size: {{ size | fileSize: suffix }}
            `
        })
        class TestComponent {
            suffix;
            size = 123456789;
        }

        let component: TestComponent;
        let fixture: ComponentFixture<TestComponent>;
        let el: HTMLElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [
                    FileSizePipe,
                    TestComponent
                ]
            });

            fixture = TestBed.createComponent(TestComponent);
            component = fixture.componentInstance;
            el = fixture.nativeElement;
        });

        it('should use the default extension when not supplied', () => {
            fixture.detectChanges();
            expect(el.textContent).toContain('Size: 117.74MB');
        });

        it('should override the extension when supplied', () => {
            component.size = 1029281;
            component.suffix = 'myExt';
            fixture.detectChanges();
            expect(el.textContent).toContain('Size: 0.98myExt');
        });
    });

    describe('Isolate FileSizePipe Test', () => {
        const pipe = new FileSizePipe();

        it('should convert bytes to megabytes', () => {
            expect(pipe.transform(123456789)).toBe('117.74MB');
            expect(pipe.transform(987654321)).toBe('941.90MB');
        });
    });
});
