import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  forceReload: boolean;
  subscriptions: Subscription[] = [];

  // this will be replaced by actual hash post-build.js
  private currentHash = '{{POST_BUILD_ENTERS_HASH_HERE}}';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    if (environment.production) {
      let url: string;
      if (window.location.origin) {
        url = window.location.origin;
      } else if (window.location.hostname && window.location.protocol) {
        url = window.location.origin;
      }

      if (url) {
        url += '/version.json';
        this.initVersionCheck(url, 90000);
      }
    }
  }

  /**
   * Checks in every set frequency the version of frontend application
   * @param url - string
   * @param frequency - in milliseconds, defaults to 30 minutes
   */
  public initVersionCheck(url: string, frequency = 1000 * 60 * 30): void {
    this.checkVersion(url);
    setInterval(() => {
      this.checkVersion(url);
    }, frequency);
  }

  /**
   * Will do the call and check if the hash has changed or not
   */
  private checkVersion(url: string): void {
    // timestamp these requests to invalidate caches
    this.http.get(url + '?t=' + new Date().getTime())
      .subscribe(
        (response: any) => {
          const hash = response.hash;
          const hashChanged = this.hasHashChanged(this.currentHash, hash);

          // If new version, do something
          if (hashChanged) {
            // CODE TO DO SOMETHING UPON VERSION CHANGE
            this.forceReload = true;
          }
        },
        (err) => {
          console.error(err, 'Could not get version');
        }
      );
  }

  /**
   * Checks if hash has changed.
   * This file has the JS hash, if it is a different one than in the version.json
   * we are dealing with version change
   */
  private hasHashChanged(currentHash: string, newHash: string): boolean {
    return currentHash && (currentHash !== newHash);
  }

  ngOnInit(): void {
    const sub1 = this.router.events.pipe(
      filter(e => e instanceof RouterEvent)
    ).subscribe(e => {
      if (!(e instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.subscriptions = [sub1];
  }

  ngOnDestroy(): void {
    this.subscriptions.map(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
