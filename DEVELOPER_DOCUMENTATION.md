## **medications**
---
---

## Az alkalmazás leírása

**Célja:**

Az alkalmazás célja, hogy segítse egy idősotthon lakóinak gyógyszerellátását.
Nyilvántartsa az ehhez szükséges legfontosabb adatokat. Lakók és gyógyszereik adatai, a készleten lévő gyógyszerek lakónként.

**Technikai követelmények, előírások:**
- Az alkalmazás Angular-alapú, model-service-component architektúra jellemzi
- Bootstrap, Font-Awesome, CSS/SCSS
- MongoDB, NoSQL
- NodeJS API: saját API szolgálja ki a frontendet
- Minden API útvonalhoz egy unit és egy integrációs teszt kapcsolódik
- Az API-hoz Swagger alapú dokumentáció tartozik
- A felület csak belépés után érhető el (JWT autentikáció) 
- Adminisztrátori szerepkört leíró User Story a README.md-ben
- Markdown dokumentáció a documentaton.md-ben
- Az alkalmazás dockerizálva van, konténerből futtatható 

**Megjelenése:**

- Az alkalmazás egy fej és oldalléces navigációval rendelkezik, amely az egyes oldalak közötti váltáshoz szükséges.
- A főoldal egy dashboard, amelyen a legfontosabb adatok láthatóak: 
  - a lakók száma
  - a gyógyszerezés alatt álló lakók száma
  - a gyógyszerek száma
  - a használatban lévő gyógyszerek száma
  - a gyógyszerrel való ellátottság ideje
- Teljesen reszponzív, mobile-first szemléletű.

---
---

## **Főbb részei:**

---
---

## _**0. Bejelentkezés**_

---

**Komponens neve:** login  
**Komponens helye:** page/login

Az alkalmazás használatához be kell jelentkezni.
Ehhez egy érvényes email cím és egy jelszó szükséges.
Sikeres bejelentkezés után a felhasználó neve megjelenik a side-navigation komponens footer részében.

---
---

## _**1. Főoldal**_

---

**Komponens neve:** dashboard  
**Komponens helye:** page/dashboard

Kártyás elrendezésben jelenik meg a gyógyszerellátás pillanatnyi állapota:
  - a lakók száma
  - a gyógyszerezés alatt álló lakók száma
  - a gyógyszerek száma
  - a használatban lévő gyógyszerek száma
  - a gyógyszerrel való ellátottság ideje

---
---

## _**2. Navigáció**_

---

**Komponens neve:** side-navigation  
**Komponens helye:** common/side-navigation

Az egyes aloldalakra az Angular routing segítségével lehet navigálni egy BS navbar segítségével.

- A ***Lakók*** menügombra kattintva az alkalmazás a lakókat listázó aloldalra navigálva megjeleníti az összes lakó adatbázisban tárolt adatait.
- A ***Gyógyszerek*** menügombra kattintva az alkalmazás a gyógyszereket listázó aloldalra navigálva megjeleníti a az idősotthonban használt valamennyi gyógyszer adatbázisban tárolt adatait.
- A ***Gyógyszerezés*** menügombra kattintva az alkalmazás a lakók és az általuk szedett valamennyi gyógyszert kilistázó oldalra navigál.
- A ***Gyógyszerkészlet*** menügombra kattintva a megjelenő listában az összes lakó látható, akinek a nevén gyógyszer van, valamint gyógyszerenként a még nem felhasznált készlet.
- A ***Felhasználók*** menügombra kattintva a megjelenő listában az összes felhasználó látható, akinek hozzáférése van az alkalmazáshoz.

- A ***Gyógyszer kiváltás*** menügombra kattintva egy oldal jelenik meg azon lakók és gyógyszereik listájával akiknek a gyógyszerkészletük nem elegendő az adott időszakra. Az oldal segítségével lehet a kiváltott gyógyszereket hozzáadni a lakók készletéhez.
- A ***Gyógyszer kiosztás*** menügombra kattintva az alkalmazás a gyógyszer kiosztás aloldalra navigálva megjeleníti a gyógyszeres kezelés alatt álló lakókat, gyógyszereiket és gyógyszer adagjaikat.

---
---

## _**3. Lakók adatbázis**_

---

**Osztály neve:** resident   
**Osztály helye:** model/resident  

**Service neve:** resident  
**Osztály helye:** service/resident

**Komponens neve:** residents  
**Komponens helye:** page/residents

Az oldalon megjelenik az összes lakó adata egy helyen.  

Ezek az adatok a következők:
- name (név)
- mother (anyja neve)
- dob (date of birth - születési dátum)
- sin (Social Insurance Number - TAJ szám)
- movingIn (beköltözés ideje)
- movingOut (kiköltözés ideje)

---

**Create:**

> _Az ***Új felvitel*** gombra kattintva egy űrlap segítségével új lakó adatai vehetők fel és menthetők az adatbázisban._

- Az ***Új felvitel*** gombra való kattintással egy új oldal nyílik meg, ahol egy új lakó adatait lehet beviteli mezők segítségével bevinni. Minden beviteli mezőn validáció biztosítja, hogy csak érvényes adatot lehessen megadni.
- A ***Mentés*** gombra kattintva a program az adatbázisba menti a megadott adatokat.
- A gomb megnyomásának hatására az összes lakót listázó oldalra navigál vissza az alkalmazás.

---

**Update:**

> _A ***Módosítás*** gombra kattintva egy űrlap segítségével a lakó adatai szerkeszthetők és menthetők az adatbázisban._

- A ***Módosítás*** gombra való kattintással a lakó egyedi adatait tartalmazó oldal nyílik meg, ahol a választott lakó adatait lehet beviteli mezők segítségével módosítani. Minden beviteli mezőn validáció biztosítja, hogy csak érvényes adatot lehessen megadni.
- A ***Mentés*** gombra kattintva a program az adatbázisba menti a módosított adatokat.
- A gomb megnyomásának hatására az összes lakót listázó oldalra navigál vissza az alkalmazás.

---

**Delete:**

> _A ***Törlés*** gombra kattintva egy lakó törölhető az adatbázisból._

- A ***Törlés*** gombra való kattintásra egy megerősítő ablak jön fel, amit elfogadva az alkalmazás törli a lakót az adatbázisból.
- A törlés után az összes lakót listázó oldal automatikusan frissül.

---

**Szabadszavas keresés:**

> _Egy szabadszavas beviteli mező segítségével bármilyen kulcsszóra lehet keresni az adatbázisban._

- A keresendő kifejezés begépelése során az alkalmazás automatikusan kikeresi a kulcsszónak megfelelő entitásokat az adatbázisból, és listázza azokat.

---

**Rendezés:**

> _A lista oszlopainak fejlécére való kattintással növekvő és csökkenő sorrendbe rendezhetőek a szám típusú adatok, illetve abc-sorrendbe, valamint fordított abc-sorrendbe rendezhetőek a szöveges adatok._

- A fejlécre való kattintás után a fejléc mellett megjelenik a rendezés irányát jelző ikon.
- Első kattintásra a lista a mező szerint először növekvő (abc)sorrendbe, a következő kattintásra csökkenő (abc)sorrendbe lesz rendezve.

---
---

## _**4. A gyógyszerek adatbázis**_

---

**Osztály neve:** medicine   
**Osztály helye:** model/medicine  

**Service neve:** medicine  
**Osztály helye:** service/medicine

**Komponens neve:** medicines  
**Komponens helye:** page/medicines

Ezen az oldalon megjelenik az idősotthonban használt valamennyi gyógyszer listája a legfontosabb adatokkal.

Ezek az adatok a következők:
- name (név)
- agent (hatóanyag)
- packing (kiszerelés)

---

**Create:**

> _Az ***Új felvitel*** gombra kattintva egy űrlap segítségével új gyógyszer adatai vehetők fel és menthetők az adatbázisban._

- Az ***Új felvitel*** gombra való kattintással egy új oldal nyílik meg, ahol egy új gyógyszer adatait lehet beviteli mezők segítségével bevinni. Minden beviteli mezőn validáció biztosítja, hogy csak érvényes adatot lehessen megadni.
- A ***Mentés*** gombra kattintva a program az adatbázisba menti a megadott adatokat.
- A gomb megnyomásának hatására az összes gyógyszert listázó oldalra navigál vissza az alkalmazás.

---

**Update:**

> _A ***Módosítás*** gombra kattintva egy űrlap segítségével a gyógyszer adatai szerkeszthetők és menthetők az adatbázisban._

- A ***Módosítás*** gombra való kattintással a gyógyszer egyedi adatait tartalmazó aloldal nyílik meg, ahol a választott gyógyszer adatait lehet beviteli mezők segítségével módosítani. Minden beviteli mezőn validáció biztosítja, hogy csak érvényes adatot lehessen megadni.
- A ***Mentés*** gombra kattintva a program az adatbázisba menti a módosított adatokat.
- A gomb megnyomásának hatására az összes gyógyszert listázó oldalra navigál vissza az alkalmazás.

---

**Delete:**

> _A ***Törlés*** gombra kattintva egy gyógyszer törölhető az adatbázisból._

- A ***Törlés*** gombra való kattintásra egy megerősítő ablak jön fel, amit elfogadva az alkalmazás törli a gyógyszert az adatbázisból.
- A törlés után az összes gyógyszert listázó oldal automatikusan frissül.

---

**Szabadszavas keresés:**

> _Egy szabadszavas beviteli mező segítségével bármilyen kulcsszóra lehet keresni az adatbázisban._

- A keresendő kifejezés begépelése során az alkalmazás automatikusan kikeresi a kulcsszónak megfelelő entitásokat az adatbázisból, és listázza azokat.

---

**Rendezés:**

> _A lista oszlopainak fejlécére való kattintással növekvő és csökkenő sorrendbe rendezhetőek a szám típusú adatok, illetve abc-sorrendbe, valamint fordított abc-sorrendbe rendezhetőek a szöveges adatok._

- A fejlécre való kattintás után a fejléc mellett megjelenik a rendezés irányát jelző ikon.
- Első kattintásra a lista a mező szerint először növekvő (abc)sorrendbe, a következő kattintásra csökkenő (abc)sorrendbe lesz rendezve.

---
---

## _**5. A gyógyszerezés adatbázis**_

---

**Osztály neve:** medication   
**Osztály helye:** model/medication  

**Service neve:** medication  
**Osztály helye:** service/medication

**Komponens neve:** medications  
**Komponens helye:** page/medications

Ezen az oldalon megjelenik az idősotthonban lakók és az általuk szedett valamennyi gyógyszer és a gyógyszerek adagolása.

Ezek az adatok a következők:
- name (lakó neve)
- medicine (gyógyszer neve)
- morning (reggeli adagolás)
- afternoon (déli adagolás)
- evening (esti adagolás)

---

**Create:**

> _Az ***Új felvitel*** gombra kattintva egy űrlap segítségével egy lakó gyógyszerezésének az adatai vehetők fel és menthetők az adatbázisban._

- Az ***Új felvitel*** gombra való kattintással egy új oldal nyílik meg, ahol egy új gyógyszerezést lehet felvenni. Egy-egy legördülő listából lehet kiválasztani a lakó és a gyógyszer nevét. Az adagolás megadására 3 beviteli mező (reggel, délben, este) szolgál. Minden beviteli mezőn validáció biztosítja, hogy csak érvényes adatot lehessen megadni.
- A ***Mentés*** gombra kattintva a program az adatbázisba menti a megadott adatokat.
- A gomb megnyomásának hatására az összes gyógyszerezést listázó oldalra navigál vissza az alkalmazás.

---

**Update:**

> _A ***Módosítás*** gombra kattintva egy űrlap segítségével a gyógyszerezés adatai szerkeszthetők és menthetők az adatbázisban._

- A ***Módosítás*** gombra való kattintással a gyógyszerezés egyedi adatait tartalmazó aloldal nyílik meg, ahol a választott gyógyszerezés adatait lehet beviteli mezők segítségével módosítani. Egy-egy legördülő listából lehet kiválasztani a lakó és a gyógyszer nevét. Az adagolás megadására 3 beviteli mező (reggel, délben, este) szolgál. Minden beviteli mezőn validáció biztosítja, hogy csak érvényes adatot lehessen megadni.
- A ***Mentés*** gombra kattintva a program az adatbázisba menti a módosított adatokat.
- A gomb megnyomásának hatására az összes gyógyszerezést listázó oldalra navigál vissza az alkalmazás.

---

**Delete:**

> _A ***Törlés*** gombra kattintva egy gyógyszerezés törölhető az adatbázisból._

- A ***Törlés*** gombra való kattintásra egy megerősítő ablak jön fel, amit elfogadva az alkalmazás törli a gyógyszerezést az adatbázisból.
- A törlés után az összes gyógyszerezést listázó oldal automatikusan frissül.

---

**Szabadszavas keresés:**

> _Egy szabadszavas beviteli mező segítségével bármilyen kulcsszóra lehet keresni az adatbázisban._

- A keresendő kifejezés begépelése során az alkalmazás automatikusan kikeresi a kulcsszónak megfelelő entitásokat az adatbázisból, és listázza azokat.

---

**Rendezés:**

> _A lista oszlopainak fejlécére való kattintással növekvő és csökkenő sorrendbe rendezhetőek a szám típusú adatok, illetve abc-sorrendbe, valamint fordított abc-sorrendbe rendezhetőek a szöveges adatok._

- A fejlécre való kattintás után a fejléc mellett megjelenik a rendezés irányát jelző ikon.
- Első kattintásra a lista a mező szerint először növekvő (abc)sorrendbe, a következő kattintásra csökkenő (abc)sorrendbe lesz rendezve.

---
---

## _**6. Gyógyszerkészlet adatbázis**_

---

**Osztály neve:** stock   
**Osztály helye:** model/stock  

**Service neve:** stock  
**Osztály helye:** service/stock

**Komponens neve:** stocks  
**Komponens helye:** page/stocks

Ezen az oldalon megjelenő listában az idősotthonban lakók és a nevükre kiváltott valamennyi gyógyszerből a még nem kiosztott készlet láthatóak, valamit az, hogy a készlet mennyi időre elegendő.

Ezek az adatok a következők:
- name (lakó neve)
- medicine(gyógyszer neve)
- pills(tabletta darab)

Az ellátás idejének kiszámolásához az alkalmazás használja a medications modell adatait.

---

**Create:**

> _Az ***Új felvitel*** gombra kattintva egy űrlap segítségével egy lakó gyógyszerkészletének az adatai vehetők fel és menthetők az adatbázisban._

- Az ***Új felvitel*** gombra való kattintással egy új oldal nyílik meg, ahol egy új gyógyszerkészletet lehet felvenni. Egy-egy legördülő listából lehet kiválasztani a lakó és a gyógyszer nevét. A készlet megadására egy beviteli mező szolgál. Validáció biztosítja, hogy csak érvényes adatot lehessen megadni.
- A ***Mentés*** gombra kattintva a program az adatbázisba menti a megadott adatokat.
- A gomb megnyomásának hatására az összes gyógyszerkészletet listázó oldalra navigál vissza az alkalmazás.

---

**Update:**

> _A ***Módosítás*** gombra kattintva egy űrlap segítségével a gyógyszerkészlet adatai szerkeszthetők és menthetők az adatbázisban._

- A ***Módosítás*** gombra való kattintással a gyógyszerkészlet egyedi adatait tartalmazó oldal nyílik meg, ahol a választott gyógyszerkészlet adatait lehet beviteli mezők segítségével módosítani. Egy-egy legördülő listából lehet kiválasztani a lakó és a gyógyszer nevét. A készlet megadására 1 beviteli mező szolgál. Validáció biztosítja, hogy csak érvényes adatot lehessen megadni.
- A ***Mentés*** gombra kattintva a program az adatbázisba menti a módosított adatokat.
- A gomb megnyomásának hatására az összes gyógyszerkészletet listázó oldalra navigál vissza az alkalmazás.

---

**Delete:**

> _A ***Törlés*** gombra kattintva egy gyógyszerkészlet törölhető az adatbázisból._

- A ***Törlés*** gombra való kattintásra egy megerősítő ablak jön fel, amit elfogadva az alkalmazás törli a gyógyszerkészletet az adatbázisból.
- A törlés után az összes gyógyszerkészletet listázó oldal automatikusan frissül.

---

**Szabadszavas keresés:**

> _Egy szabadszavas beviteli mező segítségével bármilyen kulcsszóra lehet keresni az adatbázisban._

- A keresendő kifejezés begépelése során az alkalmazás automatikusan kikeresi a kulcsszónak megfelelő entitásokat az adatbázisból, és listázza azokat.

---

**Rendezés:**

> _A lista oszlopainak fejlécére való kattintással növekvő és csökkenő sorrendbe rendezhetőek a szám típusú adatok, illetve abc-sorrendbe, valamint fordított abc-sorrendbe rendezhetőek a szöveges adatok._

- A fejlécre való kattintás után a fejléc mellett megjelenik a rendezés irányát jelző ikon.
- Első kattintásra a lista a mező szerint először növekvő (abc)sorrendbe, a következő kattintásra csökkenő (abc)sorrendbe lesz rendezve.

---
---

## _**7. Felhasználók adatbázis**_

---

**Osztály neve:** user   
**Osztály helye:** model/user  

**Service neve:** user  
**Osztály helye:** service/user

**Komponens neve:** users  
**Komponens helye:** page/users

Az oldalon megjelenik az összes felhasználó adata egy helyen.  

Ezek az adatok a következők:
- name (név)
- email (email cím)
- role (felhasználói szint: 2-admin; 1-user)

---

**Create:**

> _Az ***Új felvitel*** gombra kattintva egy űrlap segítségével új felhasználó adatai vehetők fel és menthetők az adatbázisban._

- Az ***Új felvitel*** gombra való kattintással egy új oldal nyílik meg, ahol egy új felhasználó adatait lehet beviteli mezők segítségével bevinni. Minden beviteli mezőn validáció biztosítja, hogy csak érvényes adatot lehessen megadni.
- A ***Mentés*** gombra kattintva a program az adatbázisba menti a megadott adatokat.
- A gomb megnyomásának hatására az összes felhasználót listázó oldalra navigál vissza az alkalmazás.

---

**Update:**

> _A ***Módosítás*** gombra kattintva egy űrlap segítségével a felhasználó adatai szerkeszthetők és menthetők az adatbázisban._

- A ***Módosítás*** gombra való kattintással a felhasználó egyedi adatait tartalmazó oldal nyílik meg, ahol a választott felhasználó adatait lehet beviteli mezők segítségével módosítani. Minden beviteli mezőn validáció biztosítja, hogy csak érvényes adatot lehessen megadni. Ha a jelszó mezőt üresen hagyjuk, akkor a jelszó nem módosul az adatbázisban.
- A ***Mentés*** gombra kattintva a program az adatbázisba menti a módosított adatokat.
- A gomb megnyomásának hatására az összes felhasználót listázó oldalra navigál vissza az alkalmazás.

---

**Delete:**

> _A ***Törlés*** gombra kattintva egy felhasználó törölhető az adatbázisból._

- A ***Törlés*** gombra való kattintásra egy megerősítő ablak jön fel, amit elfogadva az alkalmazás törli a felhasználót az adatbázisból.
- A törlés után az összes felhasználót listázó oldal automatikusan frissül.

---

**Szabadszavas keresés:**

> _Egy szabadszavas beviteli mező segítségével bármilyen kulcsszóra lehet keresni az adatbázisban._

- A keresendő kifejezés begépelése során az alkalmazás automatikusan kikeresi a kulcsszónak megfelelő entitásokat az adatbázisból, és listázza azokat.

---

**Rendezés:**

> _A lista oszlopainak fejlécére való kattintással növekvő és csökkenő sorrendbe rendezhetőek a szám típusú adatok, illetve abc-sorrendbe, valamint fordított abc-sorrendbe rendezhetőek a szöveges adatok._

- A fejlécre való kattintás után a fejléc mellett megjelenik a rendezés irányát jelző ikon.
- Első kattintásra a lista a mező szerint először növekvő (abc)sorrendbe, a következő kattintásra csökkenő (abc)sorrendbe lesz rendezve.

---
---

## _**8. A gyógyszerezés működtetése**_

---
---

### _**8.1 A gyógyszer kiosztás**_  

---

> _A ***Gyógyszer kiosztás*** menüpontot kiválasztva egy lista jelenik meg a gyógyszeres kezelés alatt álló lakókról és gyógyszereikről._

**Osztály neve:** medication   
**Osztály helye:** model/medication  

**Service neve:** medication  
**Osztály helye:** service/medication

**Komponens neve:** distributions  
**Komponens helye:** page/distributions

Ezek az adatok a következők:
- name (lakó neve)
- medicine (gyógyszer neve)
- morning (reggeli adagolás)
- afternoon (déli adagolás)
- evening (esti adagolás)

---

A ***Gyógyszer kiosztás*** működése:

A ***Gyógyszer kiosztás*** menüpont csak akkor aktív, ha legalább 1 heti gyógyszerkészlet áll rendelkezésre (minden lakó, minden használt gyógyszere esetében). A megjelenő listában látható a lakó, a gyógyszerei és az adagolásuk.  
Ha a gyógyszer kiosztás megtörtént, akkor az ***Elkészült*** gombra kattintva az alkalmazás levonja a kiosztott (1 heti) gyógyszermennyiséget a lakó készletéből.  
A gomb megnyomásának hatására a dashboard-ra kerülünk vissza, ahol automatikusan frissül a gyógyszer ellátás ideje (1 héttel csökken).

---

**Szabadszavas keresés:**

> _Egy szabadszavas beviteli mező segítségével bármilyen kulcsszóra lehet keresni az adatbázisban._

- A keresendő kifejezés begépelése során az alkalmazás automatikusan kikeresi a kulcsszónak megfelelő entitásokat az adatbázisból, és listázza azokat.

---

**Rendezés:**

> _A lista oszlopainak fejlécére való kattintással növekvő és csökkenő sorrendbe rendezhetőek a szám típusú adatok, illetve abc-sorrendbe, valamint fordított abc-sorrendbe rendezhetőek a szöveges adatok._

- A fejlécre való kattintás után a fejléc mellett megjelenik a rendezés irányát jelző ikon.
- Első kattintásra a lista a mező szerint először növekvő (abc)sorrendbe, a következő kattintásra csökkenő (abc)sorrendbe lesz rendezve.

---
---

### _**8.2 Gyógyszer kiváltás**_  

---

> _A ***Gyógyszer kiváltás*** menügombra kattintva egy oldal jelenik meg azon lakók és gyógyszereik listájával akiknek a gyógyszerkészletük nem elegendő egy adott időszakra. Az időszakot regy legördőlő listában lehet megadni. Az oldal segítségével lehet 4 heti gyógyszeradagot kiváltani.

**Komponens neve:** redeems  
**Komponens helye:** page/redeems

Ezek az adatok a következők:
- name (lakó neve)
- medicine (gyógyszer neve)
- boxes (ennyi doboz gyógyszert kell kiváltani a 4 heti ellátáshoz)
- pills (tabletták száma, doboz szám * az egy dobozban lévő tabletták számával)

---

A ***Gyógyszer kiváltás*** működése:

A ***Gyógyszer kiváltás*** menüpont kiválasztásával a megjelenő listában látható a lakó, a gyógyszerei és a szükséges mennyiség a 4 heti ellátáshoz.  
Ha a gyógyszer kiváltás megtörtént, akkor az ***Elkészült*** gombra kattintva az alkalmazás hozáadja a listában szereplő tabletta mennyiséget a lakó készletéhez.  
A gomb megnyomásának hatására a dashboard-ra kerülünk vissza, ahol automatikusan frissül a gyógyszer ellátás ideje.

---

**Szabadszavas keresés:**

> _Egy szabadszavas beviteli mező segítségével bármilyen kulcsszóra lehet keresni az adatbázisban._

- A keresendő kifejezés begépelése során az alkalmazás automatikusan kikeresi a kulcsszónak megfelelő entitásokat az adatbázisból, és listázza azokat.

---

**Rendezés:**

> _A lista oszlopainak fejlécére való kattintással növekvő és csökkenő sorrendbe rendezhetőek a szám típusú adatok, illetve abc-sorrendbe, valamint fordított abc-sorrendbe rendezhetőek a szöveges adatok._

- A fejlécre való kattintás után a fejléc mellett megjelenik a rendezés irányát jelző ikon.
- Első kattintásra a lista a mező szerint először növekvő (abc)sorrendbe, a következő kattintásra csökkenő (abc)sorrendbe lesz rendezve.

---
---

## **További fejlesztési lehetőségek:**  
- hibaüzenetek megjelenítése
- a listázó oldalakon lapozó készítése
- gyógyszer lejárati dátumok kezelése
- vény lejárati dátumok kezelése
- az adott ideig szedendő gyógyszerek (antibiotikumok) kezelése
- törlések előtt logikai ellenőrzések és eljárások
  - gyógyszer: szedi-e valaki azt a gyógyszert?
  - lakó: minden függőséget is törölni kell: gyógyszerezés, gyógyszerkészlet

---
---

## **Linkek:**  

- [User Story](https://github.com/kkovacsics/medications/blob/main/README.md)

- [Dokumentáció](https://github.com/kkovacsics/medications/blob/main/DOCUMENTATION.md)

