import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

import 'pepjs';

import { AppComponent } from '../app.component';
import { Page001Service } from './services/page-001.service';
import { InteractionService } from './services/interaction.service';

@Component({
  selector: 'app-page-001',
  templateUrl: './page-001.component.html',
  styleUrls: ['./page-001.component.css'],
  animations: []
})
export class Page001Component implements OnInit, OnDestroy {

  @ViewChild('rendererCanvas_page001', { static: true })
  public rendererCanvas_page001: ElementRef<HTMLCanvasElement>;

  public container_introduction

  public constructor(
    private activatedRoute: ActivatedRoute,
    private deviceService: DeviceDetectorService,
    private appComponent: AppComponent,
    private page001Service: Page001Service,
    readonly interaction: InteractionService
  ) {}

  ngOnInit(): void {

    this.page001Service.createScene(this.rendererCanvas_page001);
    this.page001Service.animate();
  }

  ngOnDestroy(): void {
  }

  // CLEAN UP

  public cleanUp_laboratory() {
      this.page001Service.cleanUp();
  }
}
