import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterOutlet} from '@angular/router';
import {AuthComponent} from "auth";
import {NgForOf} from "@angular/common";
import {InstancesService} from "./services/instances.service";
import {AnyFederationManifest} from "./models/federation-manifest";

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
  image?: string;

  constructor(
    private instancesService: InstancesService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {
    instancesService.getFederationManifest()
      .subscribe((manifest: AnyFederationManifest) => {
        this.instances = Object.keys(manifest);
        this.image = '/assets/bbb.svg';

        const name = route.snapshot.data['name'];
        console.log(1, name, manifest)
        if (name && (name in manifest)) {
          this.image = `${manifest[name].replace('/remoteEntry.json', '')}${this.image}`;
        }

        cdr.markForCheck();
      });
  }
}
