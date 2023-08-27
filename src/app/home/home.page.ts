import { Component, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import OneSignal from 'onesignal-cordova-plugin';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private platform: Platform,
    private alertCtrl: AlertController) {}

  ngOnInit(): void {
    this.platform.ready().then(() => {
				this.setupPush();
		});
  }

  setupPush() {
      try {
        //@ts-ignore
        OneSignal.promptForPushNotificationsWithUserResponse((accepted) => {
          console.log('promptForPushNotificationsWithUserResponse: ' + accepted);
          this.presentAlert('Request permissions notification!!','');
        });

        //OneSignal.setLogLevel(6, 0);
        OneSignal.setAppId(environment.appId);
        OneSignal.sendTag('email','avilaatencioa@gmail.com');
        OneSignal.setNotificationOpenedHandler((jsonData) => {
          console.log('setNotificationOpenedHandler: ' + JSON.stringify(jsonData));
          this.presentAlert('Notification in Background','Notification received!!');
        });

        OneSignal.setNotificationWillShowInForegroundHandler((jsonData) => {
          this.presentAlert('Notification in Foreground','Notification received!!');
        });
      } catch(error) {
        console.log(JSON.stringify(error));
      }
	}

  async presentAlert(title: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }


}
