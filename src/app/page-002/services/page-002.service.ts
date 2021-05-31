import { Injectable, NgZone, ElementRef } from '@angular/core';
import { WindowRefService } from '../../shared/services/window-ref.service';

import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

import 'pepjs';

import { InteractionService } from './interaction.service';

@Injectable({
  providedIn: 'root'
})
export class Page002Service {

  private canvas: HTMLCanvasElement;
  private engine: BABYLON.Engine;
  private scene: BABYLON.Scene;

  private universal_camera: BABYLON.UniversalCamera;
  private anaglyph_universal_camera: BABYLON.AnaglyphUniversalCamera;

  private hemispheric_light: BABYLON.Light;
  private directional_light: BABYLON.DirectionalLight;

  public constructor(
    private ngZone: NgZone,
    private windowRef: WindowRefService,
    protected readonly interaction: InteractionService
  ) {}

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {

    // CANVAS / ENGINE / SCENE

    this.canvas = canvas.nativeElement;

    this.engine = new BABYLON.Engine(this.canvas, true, { stencil: true });

    this.scene = new BABYLON.Scene(this.engine);
    this.scene.clearColor = BABYLON.Color4.FromHexString('#000000');

    // CANERAS

    this.universal_camera = new BABYLON.UniversalCamera("universal_camera", new BABYLON.Vector3(0, 0, 0), this.scene);
    this.universal_camera.position = new BABYLON.Vector3(0, 0, 0);
    this.universal_camera.target = new BABYLON.Vector3(0, 0, 0);
    this.universal_camera.touchAngularSensibility = 10000;
    this.universal_camera.speed = 0.7;
    this.universal_camera.inputs.addMouseWheel();
    this.universal_camera.attachControl(canvas);

    this.anaglyph_universal_camera = new BABYLON.AnaglyphUniversalCamera("anaglyph_universal_camera", new BABYLON.Vector3(0, 0, 0), 0.05, this.scene);
    this.anaglyph_universal_camera.touchAngularSensibility = 10000;
    this.anaglyph_universal_camera.speed = 0.7;
    this.anaglyph_universal_camera.inputs.addMouseWheel();

    // LIGHTS

    this.hemispheric_light = new BABYLON.HemisphericLight('hemispheric_light', new BABYLON.Vector3(0, 0, 0), this.scene);
    this.hemispheric_light.intensity = 1;

    this.directional_light = new BABYLON.DirectionalLight("directional_light", new BABYLON.Vector3(0, 0, 0), this.scene);
    this.directional_light.intensity = 1;
    this.directional_light.diffuse = new BABYLON.Color3(0.4, 0, 0.2);
    this.directional_light.specular = new BABYLON.Color3(0, 0, 0);
}

  // ANIMATE

  public animate(): void {
    this.ngZone.runOutsideAngular(() => {
      const rendererLoopCallback = () => {
        this.scene.render();
      };

      if (this.windowRef.document.readyState !== 'loading') {
        this.engine.runRenderLoop(rendererLoopCallback);
      } else {
        this.windowRef.window.addEventListener('DOMContentLoaded', () => {
          this.engine.runRenderLoop(rendererLoopCallback);
        });
      }

      this.windowRef.window.addEventListener('resize', () => {
        this.engine.resize();
      });
    });
  }

  // CLEAN UP

  public cleanUp() {
    this.engine.stopRenderLoop();
    this.scene.dispose();
    this.engine.dispose();
  }
}
