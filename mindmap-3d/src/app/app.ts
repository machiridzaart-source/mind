import { Component, signal } from '@angular/core';
import { MindmapVisualizerComponent } from './components/mindmap-visualizer/mindmap-visualizer.component';

@Component({
  selector: 'app-root',
  imports: [MindmapVisualizerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mindmap-3d');
}
