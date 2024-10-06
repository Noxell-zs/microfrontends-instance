import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AuthComponent} from "auth";
import {NgForOf} from "@angular/common";
import {InstancesService} from "./services/instances.service";
import { NewsComponent } from "./components/news/news.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AuthComponent, NgForOf, NewsComponent],
  providers: [InstancesService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'instance';
  instances?: string[];
  image?: string;

  constructor(
    private instancesService: InstancesService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.instancesService.getFederationManifest()
      .subscribe((manifest) => {
        this.instances = Object.keys(manifest);
        this.cdr.markForCheck();
      });

    this.instancesService.getPath('assets/bbb.svg')
      .subscribe((image) => {
        this.image = image;
        this.cdr.markForCheck();
      });
  }
}
