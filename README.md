# Foodchaser Installationsanleitung

## Vorraussetzungen
1. npm installieren: `npm install npm@latest -g` oder unter [nodejs.org](https://www.npmjs.com/get-npm) herunterladen
2. Ionic installieren: `npm install -g @ionic/cli`
3. Angular für Ionic installieren: `npm install @ionic/angular@latest --save`
4. Neuste Node.js Version installieren: [nodejs.org](https://nodejs.org/en/download/)
5. Xcode installieren: https://apps.apple.com/us/app/xcode/id497799835?mt=12



## Run on Development
1. Im Terminal ins Verzeichnis `crossmedia-app` navigieren.
2. `npm install`im Terminal ausführen.
3. `ionic serve`im Terminal ausführen.
4. Danach sollte sich der Browser öffnen und die Adresse `localhost:8100` öffnen.

## Run on IOS
1. Im Terminal ins Verzeichnis `crossmedia-app` navigieren.
2. Cocoapods installieren: `sudo gem install cocoapods`
3. Falls kein `ios`-Ordner im Verzeichnis `crossmedia-app` vorhanden ist: `ionic capacitor add ios`
4. `npm install` im Terminal ausführen.
5. `ionic cap sync` im Terminal ausführen
6. Die Datei `App.xcworkspace` im Verzeichnis `crossmedia-app/ios/App` öffnen.
7. Dann zu **Xcode > Preferences** wechseln und im neu geöffneten Fenster zu Accounts navigieren. Dort muss ein neuer Developer Account hinterlegt werden.
8. In der Projektnavigation unter **Signing & Capabilities** kann dann der hinterlegte Account ausgewählt werden. Bei **Bundle Identifier** muss ein einzigartiger Name verwendet werden.
9. Wenn alle Schritte erflogreich abgeschlossen sind, kann entweder ein iPhone angeschlossen werden oder ein Simulator oben in der Leiste ausgewählt werden. Anschließend auf den **Play Button** klicken.
10. Danach sollte sich der Simulator öffnen bzw. die App auf dem angeschlossenen iPhone geöffnet werden. Eventuell muss am eigenen iPhone noch unter **Einstellungen > Allgemein > Geräteverwaltung** die App zugelassen werden.
