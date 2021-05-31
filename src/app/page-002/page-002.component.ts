import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

import 'pepjs';

import { AppComponent } from '../app.component';
import { Page002Service } from './services/page-002.service';
import { InteractionService } from './services/interaction.service';

@Component({
  selector: 'app-page-002',
  templateUrl: './page-002.component.html',
  styleUrls: ['./page-002.component.css'],
  animations: []
})
export class Page002Component implements OnInit, OnDestroy {

  @ViewChild('rendererCanvas_page002', { static: true })
  public rendererCanvas_page002: ElementRef<HTMLCanvasElement>;

  public container_introduction

  public constructor(
    private activatedRoute: ActivatedRoute,
    private deviceService: DeviceDetectorService,
    private appComponent: AppComponent,
    private page002Service: Page002Service,
    readonly interaction: InteractionService
  ) {}

  ngOnInit(): void {

    this.page002Service.createScene(this.rendererCanvas_page002);
    this.page002Service.animate();
  }

  ngOnDestroy(): void {
  }

  // CLEAN UP

  public cleanUp_laboratory() {
      this.page002Service.cleanUp();
  }
}
