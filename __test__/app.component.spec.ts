import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from '../src/app/app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [  
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  test('should create the app', () => {
    expect(component).toBeTruthy();
  });

  test(`should have as title 'adminpro'`, () => {
    expect(component.title).toEqual('adminpro');
  });

  test(`should match with snapshot`, () => {
    expect(compiled).toMatchSnapshot();
  })
});
