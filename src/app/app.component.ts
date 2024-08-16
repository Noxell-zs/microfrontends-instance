import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AuthComponent} from "auth";
import {NgForOf} from "@angular/common";
import {InstancesService} from "./services/instances.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AuthComponent, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'instance';
  instances?: string[];

  constructor(
    private instancesService: InstancesService,
    private cdr: ChangeDetectorRef,
  ) {
    instancesService.getFederationManifest()
      .subscribe(manifest => {
        this.instances = Object.keys(manifest);
        cdr.markForCheck();
      });
  }
}
