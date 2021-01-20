import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EinkaufslistePage } from './einkaufsliste.page';

describe('EinkaufslistePage', () => {
  let component: EinkaufslistePage;
  let fixture: ComponentFixture<EinkaufslistePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EinkaufslistePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EinkaufslistePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
