import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as Three from 'three';

@Component({
  selector: 'app-three-viewer',
  templateUrl: './three-viewer.component.html',
  styleUrls: ['./three-viewer.component.scss'],
})
export class ThreeViewerComponent implements OnInit, AfterViewInit {
  @ViewChild('threeCanvas') threeCanvas!: ElementRef<HTMLCanvasElement>;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (!this.threeCanvas) {
      throw 'Three.js canvas not found.';
    }
    const scene = new Three.Scene();
    const camera = new Three.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );

    const renderer = new Three.WebGLRenderer({
      canvas: this.threeCanvas.nativeElement,
      alpha: false,
      antialias: true,
    });

    const geometry = new Three.BoxGeometry(1, 1, 1);
    const material = new Three.MeshBasicMaterial({ color: 0xffff00 });
    const cube = new Three.Mesh(geometry, material);
    scene.add(cube);
    const animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.02;
      renderer.render(scene, camera);
    };
    camera.position.z = 5;
    renderer.render(scene, camera);
    animate();
  }
}
