import { Injectable, NgZone, ElementRef } from '@angular/core';
import { WindowRefService } from '../../shared/services/window-ref.service';

import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

import 'pepjs';

import { InteractionService } from './interaction.service';

@Injectable({
  providedIn: 'root'
})
export class Page001Service {

  private canvas: HTMLCanvasElement;
  private engine: BABYLON.Engine;
  private scene: BABYLON.Scene;

  private camera: BABYLON.ArcRotateCamera;

  private light: BABYLON.Light;

  private glass;
  private star;
  private brink;
  private lion;

  private axis_X;
  private axis_X_MATERIAL: BABYLON.StandardMaterial;
  private axis_Y;
  private axis_Y_MATERIAL: BABYLON.StandardMaterial;
  private axis_Z;
  private axis_Z_MATERIAL: BABYLON.StandardMaterial;

  public constructor(
    private ngZone: NgZone,
    private windowRef: WindowRefService,
    protected readonly interaction: InteractionService
  ) {}

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {

    this.canvas = canvas.nativeElement;
    this.engine = new BABYLON.Engine(this.canvas, true);

    this.scene = new BABYLON.Scene(this.engine);
    this.scene.clearColor = BABYLON.Color4.FromHexString('#ff4200FF');

    const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("../../assets/env/CUBEMAP_refraction_3.env", this.scene);
    hdrTexture.rotationY = Math.PI;
    this.scene.environmentTexture = hdrTexture;

    // CAMERA

    this.camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), this.scene);
    this.camera.setPosition(new BABYLON.Vector3(0, 2.4, 20));
    this.camera.target = new BABYLON.Vector3(0, 3, 0);
    this.camera.fov = 0.5;
    this.camera.wheelDeltaPercentage = 0.001;
    this.camera.pinchDeltaPercentage = 0.01;
    // this.camera.lowerAlphaLimit =
    this.camera.lowerBetaLimit = 0.5;
    this.camera.lowerRadiusLimit = 20;
    // this.camera.upperAlphaLimit =
    this.camera.upperBetaLimit = 2;
    this.camera.upperRadiusLimit = 20;
    this.camera.attachControl(canvas, true);

    this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), this.scene);
    this.light.intensity = 1;

    BABYLON.SceneLoader.ImportMeshAsync("lion", "../../assets/glb/page-001/", "lion.glb", this.scene).then((result) => {
      this.lion = this.scene.getMeshByName("lion");
      this.lion.material.reflectionTexture = null;
    });

    var pointLight = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(1, 2.4, 10), this.scene);
    pointLight.intensity = 1;

    const circle_MATERIAL = new BABYLON.PBRMaterial('BoxMaterial', this.scene);
    circle_MATERIAL.diffuseColor = new BABYLON.Vector4(1, 1, 1, 0.1);
    circle_MATERIAL.metallic = 0.1;
    circle_MATERIAL.roughness = 0.2;

    circle_MATERIAL.subSurface.isRefractionEnabled = true;
    circle_MATERIAL.subSurface.indexOfRefraction = 0.5;
    /* circle_MATERIAL.alpha = 0.1; */
    /* circle_MATERIAL.transparencyMode = 4; */
    /* circle_MATERIAL.refractionTexture = new BABYLON.Texture("../../assets/env/CUBEMAP_refraction", this.scene);
    circle_MATERIAL.disableLighting = true;
    circle_MATERIAL.refractionTexture.coordinatesMode = BABYLON.Texture.FIXED_EQUIRECTANGULAR_MODE; */
    /* circle_MATERIAL.diffuseTexture = new BABYLON.Texture("../../assets/img/textures/BUMP_noise.jpg", this.scene);
    circle_MATERIAL.bumpTexture = new BABYLON.Texture("../../assets/img/textures/BUMP_noise.jpg", this.scene);
    circle_MATERIAL.useParallax = true;
    circle_MATERIAL.useParallaxOcclusion = true;
    circle_MATERIAL.parallaxScaleBias = 5; */
    /* circle_MATERIAL.useAlphaFromDiffuseTexture = true; */

    // Plane

    BABYLON.SceneLoader.ImportMeshAsync("brink", "../../assets/glb/page-001/", "brink.glb", this.scene).then((result) => {
      this.brink = this.scene.getMeshByName("brink");
    });

    BABYLON.SceneLoader.ImportMeshAsync("glass", "../../assets/glb/page-001/", "glass.glb", this.scene).then((result) => {
      this.glass = this.scene.getMeshByName("glass");
      this.glass.material = circle_MATERIAL;
      this.glass.blurRatio = 10000;
      /* this.glass.blurKernel = 0.1;
      this.glass.material.diffuseTexture.uScale = 10;
      this.glass.material.diffuseTexture.vScale = 10;
      this.glass.material.bumpTexture.uScale = 10;
      this.glass.material.bumpTexture.vScale = 10; */
      /* this.circle.refractionTexture = refractionTexture; */
    });

    BABYLON.SceneLoader.ImportMeshAsync("star", "../../assets/glb/page-001/", "star.glb", this.scene).then((result) => {
      this.star = this.scene.getMeshByName("star");
    });

    // AXIS

    /* this.axis_X = BABYLON.MeshBuilder.CreateBox("axis_X", {height: 0.2, width: 0.2, depth: 0.2});
    this.axis_X.position = new BABYLON.Vector3(5, 0, 0);
    this.axis_X_MATERIAL = new BABYLON.StandardMaterial("axis_X_MATERIAL", this.scene);
    this.axis_X_MATERIAL.diffuseColor = new BABYLON.Color3(1, 0, 0);
    this.axis_X_MATERIAL.specularColor = new BABYLON.Color3(1, 0, 0);
    this.axis_X.material = this.axis_X_MATERIAL;

    this.axis_Y = BABYLON.MeshBuilder.CreateBox("axis_Y", {height: 0.2, width: 0.2, depth: 0.2});
    this.axis_Y.position = new BABYLON.Vector3(0, 0, 5);
    this.axis_Y_MATERIAL = new BABYLON.StandardMaterial("axis_Y_MATERIAL", this.scene);
    this.axis_Y_MATERIAL.diffuseColor = new BABYLON.Color3(0, 1, 0);
    this.axis_Y_MATERIAL.specularColor = new BABYLON.Color3(0, 1, 0);
    this.axis_Y.material = this.axis_Y_MATERIAL;

    this.axis_Z = BABYLON.MeshBuilder.CreateBox("axis_Z", {height: 0.2, width: 0.2, depth: 0.2});
    this.axis_Z.position = new BABYLON.Vector3(0, 5, 0);
    this.axis_Z_MATERIAL = new BABYLON.StandardMaterial("axis_Z_MATERIAL", this.scene);
    this.axis_Z_MATERIAL.diffuseColor = new BABYLON.Color3(0, 0, 1);
    this.axis_Z_MATERIAL.specularColor = new BABYLON.Color3(0, 0, 1);
    this.axis_Z.material = this.axis_Z_MATERIAL; */
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
