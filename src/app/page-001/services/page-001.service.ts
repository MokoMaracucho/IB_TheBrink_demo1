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

  private circle;
  private brink;

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

    // CAMERA

    this.camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), this.scene);
    this.camera.setPosition(new BABYLON.Vector3(0, 3, 20));
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
    });

    const boxMaterial = new BABYLON.StandardMaterial('BoxMaterial', this.scene);
    boxMaterial.diffuseColor = BABYLON.Color3.FromHexString('#ffffff');
    boxMaterial.specularColor = BABYLON.Color3.FromHexString('#000000');
    boxMaterial.indexOfRefraction = 1;

    // Plane

    var probe = new BABYLON.ReflectionProbe("main", 512, this.scene);

    BABYLON.SceneLoader.ImportMeshAsync("brink", "../../assets/glb/page-001/", "brink.glb", this.scene).then((result) => {
      this.brink = this.scene.getMeshByName("brink");
      probe.renderList.push(this.brink);
    });

    /* const plane = BABYLON.MeshBuilder.CreatePlane('BackPlane', {width: 6, height: 3.5}, this.scene)
    plane.position.z = -5;
    plane.rotation.y = Math.PI;
    const planeMaterial = new BABYLON.StandardMaterial('PlaneMaterial', this.scene);
    planeMaterial.diffuseTexture = new BABYLON.Texture('/assets/amiga', this.scene);
    plane.material = planeMaterial */

    /* const refractionTexture = new BABYLON.RefractionTexture('RefractionTexture', 1024, this.scene, true)
    refractionTexture.refractionPlane = new BABYLON.Plane(0, 0, 1, 0)
    refractionTexture.depth = 2;
    refractionTexture.level = 0.3;
    refractionTexture.renderList.push(this.brink); */

    boxMaterial.refractionTexture = probe.cubeTexture;


    /* const boxMaterial = new BABYLON.StandardMaterial('BoxMaterial', this.scene);
    boxMaterial.indexOfRefraction = 0.6;

    const plane = BABYLON.MeshBuilder.CreateBox('BackPlane', {width: 6, height: 3.5}, this.scene);
    plane.position.z = -5;
    const planeMaterial = new BABYLON.StandardMaterial('PlaneMaterial', this.scene);
    planeMaterial.diffuseTexture = new BABYLON.Texture('/assets/amiga', this.scene);
    plane.material = planeMaterial;

    const refractionTexture = new BABYLON.RefractionTexture('RefractionTexture', 1024, this.scene, true)
    refractionTexture.refractionPlane = new BABYLON.Plane(0, 0, -1, 0)
    refractionTexture.depth = 2
    refractionTexture.renderList.push(plane); */

    BABYLON.SceneLoader.ImportMeshAsync("circle", "../../assets/glb/page-001/", "circle.glb", this.scene).then((result) => {
      this.circle = this.scene.getMeshByName("circle");
      this.circle.material = boxMaterial;
      /* this.circle.refractionTexture = refractionTexture; */
    });

    probe.attachToMesh(this.circle);

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
