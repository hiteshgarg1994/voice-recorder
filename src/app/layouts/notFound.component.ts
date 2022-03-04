import {Component} from '@angular/core';

@Component({
  template: `
    <body>
    <div class="dashboard-inner-container request-failed-padding-40px">
      <div class="RFP-block white-bg responsive-padding-top-15 padding-bottom-11 fieldset request-failed-padding-40px">
        <div class="access-denied-content page-not-found-content">
          <div class="access-denied-content-inner">
            <p class="access-denied-text">Page not found</p>
            <p class="not-authorized-text">Looks like you have followed a broken link or entered a URL that doesn't
              exit on this site.</p>
            <button mat-flat-button color="primary" routerLink="/dashboard"> Back to dashboard</button>
          </div>
        </div>
      </div>
    </div>
    </body>
  `,
  styles: [`
    body {
      margin: 0;
    }

    .wrap {
      margin: 0 auto;
      width: 1000px;
    }

    .logo {
      text-align: center;
    }

    .logo p span {
      color: lightgreen;
    }

    .sub a {
      color: white;
      background: rgba(0, 0, 0, 0.3);
      text-decoration: none;
      padding: 5px 10px;
      font-size: 13px;
      font-family: arial, serif;
      font-weight: bold;
    }
  `]
})

export class NotFoundComponent {
}
