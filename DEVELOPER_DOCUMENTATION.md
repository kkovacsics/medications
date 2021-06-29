## **medications**
---
---

## Az alkalmazás leírása

**Célja:**

Az alkalmazás célja, hogy segítse egy idősotthon lakóinak gyógyszerellátását.
Nyilvántartsa az ehhez szükséges legfontosabb adatokat. Lakók és gyógyszereik adatai, a készleten lévő gyógyszerek és vények lakónként.

**Technikai követelmények, előírások:**
- Az alkalmazás Angular-alapú, model-service-component architektúra jellemzi
- Az egyes service-eket egy base service szolgálja ki
- Bootstrap, Font Awesome, CSS/SCSS
- MongoDB, NoSQL
- NodeJS API: saját API szolgálja ki a frontendet
- Minden API útvonalhoz egy unit teszt kapcsolódik
- Az API-hoz Swagger alapú dokumentáció tartozik
- A felület csak belépés után elérhető (JWT autentikáció) 
- Adminisztrátori szerepkört leíró User Story a README.md-ben
- Markdown dokumentáció a documentaton.md-ben
- Az alkalmazás dockerizálva van, konténerből futtatható 

**Megjelenése:**

- Az alkalmazás egy fejléces navigációval rendelkezik, amely az egyes oldalak közötti váltáshoz szükséges
- A főoldal egy dashboard, amelyen a legfontosabb adatok láthatóak: 
  - gyógyszerkészlet
  - vénykészlet
  - felírandó gyógyszerek
  - kiváltandó gyógyszerek
- Teljesen reszponzív, mobile-first szemléletű.

---
---

## **Főbb részei:**

---
---

## _**1. Főoldal**_

---

**Komponens neve:** Dashboard  
**Komponens helye:** page/dashboard

Kártyás elrendezésben jelenik meg a gyógyszerellátás pillanatnyi állapota:
- a gyógyszerkészlet mennyi időre elegendő
- a vénykészlet mennyi időre elegendő
- a felírandó gyógyszerek száma
- a kiváltandó gyógyszerek száma

---
---

## _**2. Navigáció**_

---

**Komponens neve:** navigation  
**Komponens helye:** common/navigation

Az egyes aloldalakra az Angular routing segítségével lehet navigálni egy BS navbar segítségével.

- A ***Lakók*** menügombra kattintva az alkalmazás a lakókat listázó aloldalra navigálva megjeleníti az összes lakó adatbázisban tárolt adatait.
- A ***Gyógyszerek*** menügombra kattintva az alkalmazás a gyógyszereket listázó aloldalra navigálva megjeleníti a az idősotthonban használt valamennyi gyógyszer adatbázisban tárolt adatait.
- A ***Lakók-gyógyszerezés*** menügombra kattintva az alkalmazás a lakók és az általuk szedett valamennyi gyógyszert kilistázó oldalra navigál.
- A ***Gyógyszer- és vénykészlet*** menügombra kattintva a megjelenő listában az összes lakó látható, akinek a nevén gyógyszer vagy vény van, valamint gyógyszerenként a még nem felhasznált készlet, valamint a vényeken szereplő gyógyszerkészlet.
- A ***Gyógyszerezés*** menügombra kattintva az alkalmazás a gyógyszerezés aloldalra navigálva megjeleníti a gyógyszeres kezelés alatt álló lakókat, gyógyszereiket és gyógyszer adagjaikat.

---
---

## _**3. Lakók adatbázis**_

---

**Osztály helye:** model/resident

**Osztály neve:** resident   

**Service neve:** resident  
**Osztály helye:** service/resident

**Komponens neve:** resident  
**Komponens helye:** page/resident

Az oldalon megjelenik az összes lakó adata egy helyen.  

Ezek az adatok a következők:
- id (azonosító)
- name (név)
- dob (date of birth - születési dátum)
- pob (place of birth - születési hely)
- motherName (anyja neve)
- SIN (Social Insurance Number - TAJ szán)
- movingIn (beköltözés ideje)
- movingOut (kiköltözés ideje)

---

**Create:**

> _Az ***Új Lakó*** gombra kattintva egy űrlap segítségével új lakó adatai vehetők fel és menthetők az adatbázisban._

- Az ***Új Lakó*** gombra való kattintással egy új oldal nyílik meg, ahol egy új lakó adatait lehet input mezők segítségével bevinni.
- A ***Mentés*** gombra kattintva a program az adatbázisba menti a megadott adatokat.
- A ***x*** ikonra kattintva mentés nélkül záródik be az oldal.
- Bármelyik gomb megnyomásának hatására az összes lakót listázó oldalra navigál vissza az alkalmazás.

---

**Update:**

> _A ***Módosítás*** gombra kattintva egy űrlap segítségével a lakó adatai szerkeszthetők és menthetők az adatbázisban._

- A ***Módosítás*** gombra való kattintással a lakó egyedi adatait tartalmazó aloldal nyílik meg, ahol a választott lakó adatait lehet beviteli mezők segítségével módosítani.
- A ***Mentés*** gombra kattintva a program az adatbázisba menti a módosított adatokat.
- A ***x*** ikonra kattintva mentés nélkül záródik be az oldal.
- Bármelyik gomb megnyomásának hatására az összes lakót listázó oldalra navigál vissza az alkalmazás.

---

**Inactivate:**

> _Az ***Inactivate*** gombra kattintva egy lakó inaktiválható az adatbázisban._

- Az ***Inactivate*** gombra való kattintással az alkalmazás inaktiválja a lakót az adatbázisban.
- A gombra kattintva ugyanaz a szerkesztő oldal jön fel, mint módosításnál, de csak a kiköltözés ideje mező módosítható, ami az aktuális dátummal már fel van töltve. 
- A ***Mentés*** gombra kattintva a program az adatbázisba menti a módosított adatokat.
- A ***x*** ikonra kattintva mentés nélkül záródik be az oldal.
- Bármelyik gomb megnyomásának hatására az összes lakót listázó oldalra navigál vissza az alkalmazás.

---

**Szabadszavas keresés:**

> _Egy szabadszavas beviteli mező segítségével bármilyen kulcsszóra lehet keresni az adatbázisban._

- A mező kiválasztása és a keresendő kifejezés megadása után a ***Keresés*** gombra való kattintással az alkalmazás kikeresi a kulcsszónak megfelelő entitásokat az adatbázisból, és listázza azokat.

---

**Rendezés:**

> _A lista oszlopainak fejlécére való kattintással növekvő és csökkenő sorrendbe rendezhetőek a szám típusú adatok, illetve abc-sorrendbe, valamint fordított abc-sorrendbe rendezhetőek a szöveges adatok._

- A fejlécre való kattintás után a fejléc mellett megjelenik a rendezés irányát jelző ikon.
- Első kattintásra a lista a mező szerint először növekvő (abc)sorrendbe, a következő kattintásra csökkenő (abc)sorrendbe, míg a harmadik kattintásra a default sorrendbe lesz rendezve.

---
---

## _**4. A gyógyszerek adatbázis**_

---

**Osztály helye:** model/medicine
**Osztály neve:** medicine   

**Service neve:** medicine  
**Osztály helye:** service/medicine

**Komponens neve:** medicine  
**Komponens helye:** page/medicine

Ezen az oldalon megjelenik az idősotthonban használt valamennyi gyógyszer listája a legfontosabb adatokkal.

Ezek az adatok a következők:
- id (azonosító)
- name (név)
- agent (hatóanyag)
- packing (kiszerelés)

---

**Create:**

> _Az ***Új gyógyszer*** gombra kattintva egy űrlap segítségével új gyógyszer adatai vehetők fel és menthetők az adatbázisban._

- Az ***Új gyógyszer*** gombra való kattintással egy új oldal nyílik meg, ahol egy új gyógyszer adatait lehet input mezők segítségével bevinni.
- A ***Mentés*** gombra kattintva a program az adatbázisba menti a megadott adatokat.
- A ***x*** ikonra kattintva mentés nélkül záródik be az oldal.
- Bármelyik gomb megnyomásának hatására az összes gyógyszert listázó oldalra navigál vissza az alkalmazás.

---

**Update:**

> _A ***Módosítás*** gombra kattintva egy űrlap segítségével a gyógyszer adatai szerkeszthetők és menthetők az adatbázisban._

- A ***Módosítás*** gombra való kattintással a gyógyszer egyedi adatait tartalmazó aloldal nyílik meg, ahol a választott gyógyszer adatait lehet beviteli mezők segítségével módosítani.
- A ***Mentés*** gombra kattintva a program az adatbázisba menti a módosított adatokat.
- A ***x*** ikonra kattintva mentés nélkül záródik be az oldal.
- Bármelyik gomb megnyomásának hatására az összes gyógyszert listázó oldalra navigál vissza az alkalmazás.

---

**Delete:**

> _Az ***Törlés*** gombra kattintva egy lakó törölhető az adatbázisból._

- Az ***Törlés*** gombra való kattintással az alkalmazás törli a gyógyszert az adatbázisból.
- A gombra kattintva az alkalmazás ellenőrzi, hogy az adott gyógyszert szedi-e valaki, van-e belőle gyógyszer vagy vénykészlet. Bármelyik esetben egy modális tájékoztató ablak jelenik meg a megfelelő tájékozatató szöveggel. Ha egyik kizáró tényező sem áll fenn, akkor egy törlést megerősítő modális ablak jön fel. 
- A ***Törlés*** gombra kattintva a program az adatbázisból törli az adott gyógyszert.
- A ***x*** ikonra kattintva törlés nélkül záródik be az oldal.
- Bármelyik gomb megnyomásának hatására az összes gyógyszert listázó oldalra navigál vissza az alkalmazás.

---

**Szabadszavas keresés:**

> _Egy szabadszavas beviteli mező segítségével bármilyen kulcsszóra lehet keresni az adatbázisban._

- A mező kiválasztása és a keresendő kifejezés megadása után a ***Keresés*** gombra való kattintással az alkalmazás kikeresi a kulcsszónak megfelelő entitásokat az adatbázisból, és listázza azokat.

---

**Rendezés:**

> _A lista oszlopainak fejlécére való kattintással növekvő és csökkenő sorrendbe rendezhetőek a szám típusú adatok, illetve abc-sorrendbe, valamint fordított abc-sorrendbe rendezhetőek a szöveges adatok._

- A fejlécre való kattintás után a fejléc mellett megjelenik a rendezés irányát jelző ikon.
- Első kattintásra a lista a mező szerint először növekvő (abc)sorrendbe, a következő kattintásra csökkenő (abc)sorrendbe, míg a harmadik kattintásra a default sorrendbe lesz rendezve.

---
---

## **További fejlesztési lehetőségek:**  
- hibaüzenetek megjelenítése
- a listázó oldalakon lapozó készítése
- gyógyszer lejárati dátumok kezelése
- vény lejárati dátumok kezelése
- az adott ideig szedendő gyógyszerek (antibiotikumok) kezelése

---
---

## **Linkek:**  

- [User Story](https://github.com/kkovacsics/medications/blob/main/README.md)

- [Dokumentáció](https://github.com/kkovacsics/medications/blob/main/DOCUMENTATION.md)

