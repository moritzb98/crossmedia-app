import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SupermaerktePage } from './supermaerkte.page';

describe('SupermaerktePage', () => {
  let component: SupermaerktePage;
  let fixture: ComponentFixture<SupermaerktePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupermaerktePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SupermaerktePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
