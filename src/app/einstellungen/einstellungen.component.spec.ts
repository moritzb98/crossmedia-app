import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EinstellungenComponent } from './einstellungen.component';

describe('EinstellungenComponent', () => {
  let component: EinstellungenComponent;
  let fixture: ComponentFixture<EinstellungenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EinstellungenComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EinstellungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
