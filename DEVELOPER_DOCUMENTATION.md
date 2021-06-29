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
- A ***Gyógyszerezés*** menügombra kattintva lenyíló almenü lista elemei a gyógyszerezés működtetéséhez szükséges funkciókat indítják:
  - A ***Gyógyszer kiosztás*** almenügombra kattintva az alkalmazás a gyógyszer kiosztás aloldalra navigálva megjeleníti a gyógyszeres kezelés alatt álló lakókat, gyógyszereiket és gyógyszer adagjaikat.
  - A ***Vény feliratás*** almenügombra kattintva egy oldal jelenik meg azon lakók és gyógyszereik listájával akiknek a gyógyszer és vénykészletük nem elegendő a következő időszakra.
  - A ***Felírt vény rögzítés*** almenügombra kattintva egy oldal jelenik meg azon lakók és gyógyszereik listájával akiknek vényt kellett feliratni. Az oldal segítségével lehet rögzíteni a rendszerben a felírt vényeket.
  - A ***Vény beváltás*** almenügombra kattintva egy oldal jelenik meg azon lakók és gyógyszereik listájával akiknek a gyógyszerkészletük nem elegendő a következő időszakra, de van beváltható vényük. Az oldal segítségével lehet kiválasztani a beváltandó vényeket.
  - A ***Kiváltott gyógyszer rögzítés*** almenügombra kattintva egy oldal jelenik meg azon lakók és gyógyszereik listájával akiknek van beváltandó vényük. Az oldal segítségével lehet a kiváltott gyógyszereket hozzáadni a lakók készletéhez.

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

## _**5. A lakók-gyógyszerezés adatbázis**_

---

**Osztály helye:** model/medication  
**Osztály neve:** medication   

**Service neve:** medication  
**Osztály helye:** service/medication

**Komponens neve:** medication  
**Komponens helye:** page/medication

Ezen az oldalon megjelenik az idősotthonban lakók és az általuk szedett valamennyi gyógyszer és a gyógyszerek adagolása.

Ezek az adatok a következők:
- id (lakó azonosító)
- name (lakó neve)
- medications (gyógyszerezés)
    [{medicine, dosages[3]}] ({gyógyszer, adagolások})

---

**Create:**

> _Az ***Új lakó gyógyszerezése*** gombra kattintva egy űrlap segítségével egy új lakó gyógyszerezésének az adatai vehetők fel és menthetők az adatbázisban._

- Az ***Új lakó gyógyszerezése*** gombra való kattintással egy új oldal nyílik meg, ahol a lakóhoz (akinek még nincs beállítva a gyógyszerezése) új gyógyszert lehet felvenni és az adagolást beállítani. Az oldalon az "új" lakót egy legördülő listából lehet kiválasztani. Az ***Új gyógyszer*** gomb megnyomására a gyógyszer kiválasztásához egy a gyógyszerek neveit tartalmazó lista, az adagolás megadásához beviteli mezők (reggel, délben, este) jelennek meg.
- A ***Mentés*** gombra kattintva a program az adatbázisba menti a megadott adatokat.
- A ***x*** ikonra kattintva mentés nélkül záródik be az oldal.
- Bármelyik gomb megnyomásának hatására az összes lakók-gyógyszerezést listázó oldalra navigál vissza az alkalmazás.

---

**Update:**

> _A ***Módosítás*** gombra kattintva egy űrlap segítségével a gyógyszerezés adatai szerkeszthetők és menthetők az adatbázisban._

- A ***Módosítás*** gombra való kattintással megnyíló új oldalon az adott lakó által szedett gyógyszerek és az adagolásuk látható. Az adatok közvetlenül a listában szerkeszthetőek. A lista végén szereplő ***Törlés*** gombbal lehetőség van a gyógyszer eltávolítására a listából, illetve az ***Új gyógyszer*** gomb megnyomására az előző ponthoz hasonlóan új gyógyszert állíthatunk be. Ha a lakó valamennyi gyógyszerét eltávolítjuk a listából, azzal valójában a lakót távolítjuk el a lakók-gyógyszerezés adatbázisból.
- A ***Mentés*** gombra kattintva a program az adatbázisba menti a módosított adatokat.
- A ***x*** ikonra kattintva mentés nélkül záródik be az oldal.
- Bármelyik gomb megnyomásának hatására az összes lakók-gyógyszerezést listázó oldalra navigál vissza az alkalmazás.

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

## _**6. Lakók-gyógyszerkészlet és vénykészlet adatbázis**_

---

**Osztály helye:** model/stock  
**Osztály neve:** stock   

**Service neve:** stock  
**Osztály helye:** service/stock

**Komponens neve:** stock  
**Komponens helye:** page/stock

Ezen az oldalon megjelenő listában az idősotthonban lakók és a nevükre kiváltott valamennyi gyógyszerből a még nem kiosztott készlet és a nevükre kiállított, de még be nem váltott vények (a vényen szereplő gyógyszer) láthatóak.

Ezek az adatok a következők:
- id (lakó azonosító)
- name (lakó neve)
- medicines(gyógyszer)
    [{medicine, stock}] ({gyógyszer, készlet})
- recipes(recept)
    [{medicine, piece}] ({gyógyszer, darab})
---

**Create:**

> _Az ***Új lakó készletezése*** gombra kattintva egy űrlap segítségével egy új lakó gyógyszer és vénykészletének az adatai vehetők fel és menthetők az adatbázisban._

- Az ***Új lakó készletezése*** gombra való kattintással egy új oldal nyílik meg, ahol a lakóhoz (akinek még nem szerepel a készlet listában) új készletet lehet beállítani. Az oldalon az "új" lakót egy legördülő listából lehet kiválasztani. Az oldalon az ***Új gyógyszer*** gomb megnyomására a gyógyszer kiválasztásához egy a gyógyszerek neveit tartalmazó lista, a készlet típusához (gyógyszer/vény) szinén egy lista, a készlet megadásához egy beviteli mező jelenik meg.
- A ***Mentés*** gombra kattintva a program az adatbázisba menti a megadott adatokat.
- A ***x*** ikonra kattintva mentés nélkül záródik be az oldal.
- Bármelyik gomb megnyomásának hatására az összes lakók-készletek listázó oldalra navigál vissza az alkalmazás.

---

**Update:**

> _A ***Módosítás*** gombra kattintva egy űrlap segítségével a készletezés adatai szerkeszthetők és menthetők az adatbázisban._

- A ***Módosítás*** gombra való kattintással megnyíló új oldalon az adott lakó gyógyszer és vénykészlete látható. Az adatok közvetlenül a listában szerkeszthetőek. A lista végén szereplő ***Törlés*** gombbal lehetőség van a gyógyszer eltávolítására a listából, illetve az ***Új gyógyszer*** gomb megnyomására az előző ponthoz hasonlóan új gyógyszer/vénykészletet állíthatunk be. Ha a lakó valamennyi gyógyszer készletét eltávolítjuk a listából, azzal valójában a lakót távolítjuk el a lakók-készletek adatbázisból.
- A ***Mentés*** gombra kattintva a program az adatbázisba menti a módosított adatokat.
- A ***x*** ikonra kattintva mentés nélkül záródik be az oldal.
- Bármelyik gomb megnyomásának hatására az összes lakók-készletek listázó oldalra navigál vissza az alkalmazás.

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

## _**7. A gyógyszerezés működtetése**_

---
---

### _**7.1 A gyógyszerkiosztás**_  

---

> _A ***Gyógyszerezés / gyógyszerkiosztás*** menüpontot kiválasztva egy lista jelenik meg a gyógyszeres kezelés alatt álló lakókról és gyógyszereikről._

**Osztály helye:** model/medication  
**Osztály neve:** medication   

**Service neve:** medication  
**Osztály helye:** service/medication

**Komponens neve:** medications  
**Komponens helye:** page/medications

Ezek az adatok a következők:
- id (lakó azonosító)
- name (lakó neve)
- medications (gyógyszerezés)
    [{medicine, dosages[3]}] ({gyógyszer, adagolások})

---

A ***gyógyszerkiosztás*** működése:

- A ***Gyógyszerezés / gyógyszerkiosztás*** menüpontot kiválasztva a lista csak akkor jelenik meg, ha minden gyógyszeres kezelés alatt álló lakónál rendelkezésre áll a heti gyógyszerkészlet. A feltétel nem teljesüléséről egy modális ablak tájékoztat.
- A megjelenő listában látható a lakó, a gyógyszerei és az adagolásuk
- A sor végi gombra kattintva egy új oldalon megjelenik az adott lakó részletes gyógyszerlistája az adagolással. 
- A ***Kész*** gombra kattintva az alkalmazás levonja a kiosztott gyógyszermennyiséget a lakó készletéből.
- A ***x*** ikonra kattintva ez a levonás nem hajtódik végre.
- Bármelyik gomb megnyomásának hatására az összes lakók-gyógyszerkiosztás listázó oldalra navigál vissza az alkalmazás, ahol már csak a gyógyszerkiosztásra várakozó lakók láthatóak.

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

### _**7.2 Vény feliratás**_  

---

> _A ***Gyógyszerezés / Vény feliratás*** menüpontot kiválasztva egy lista jelenik meg a gyógyszeres kezelés alatt álló lakókról és gyógyszereikről, akiknek a gyógyszer és vénykészletük nem elegendő a következő időszakra._

**Komponens neve:** prescription-demand  
**Komponens helye:** page/prescription-demand

Ezek az adatok a következők:
- id (lakó azonosító)
- name (lakó neve)
- medicines (gyógyszerek)
    [medicine] (gyógyszer})

---

A ***vény feliratás*** működése:

- A ***Gyógyszerezés / Vény feliratás*** menüpontot kiválasztva egy lista jelenik meg a gyógyszeres kezelés alatt álló lakókról és gyógyszereikről, akiknek a gyógyszer és vénykészletük nem elegendő a következő időszakra. Az időszak kezdő értéke 1 hét, de az oldalon módosítható. Módosítás után a lista azonnal frissül.
- A megjelenő listában látható a lakó és azok a gyógyszerei, amelyekre vényt kell feliratni az orvossal.
- A sor végi gombra kattintva egy új oldalon megjelenik az adott lakóra vonatkozó felirandó vénylista. A listában a gyógyszerek melletti jelölőnégyzettel kell rögzíteni a feliratás tényét.
- A ***Kész*** gombra kattintva az alkalmazás rögzíti az adatbázisban, hogy mely gyógyszerekre lett recept feliratva.
- A ***x*** ikonra kattintva ez a rögzítés nem hajtódik végre.
- Bármelyik gomb megnyomásának hatására az összes lakók-vényfeliratás listázó oldalra navigál vissza az alkalmazás, ahol már csak a vényfeliratásra várakozó lakók láthatóak.

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

### _**7.3 Felírt vény rögzítés**_  

---

> _A ***Gyógyszerezés / Felírt vény rögzítés*** menüpontot kiválasztva egy oldal jelenik meg azon lakók és gyógyszereik listájával akiknek vényt kellett feliratni. Az oldal segítségével lehet rögzíteni a rendszerben a felírt vényeket.

**Komponens neve:** prescription-store  
**Komponens helye:** page/prescription-store

Ezek az adatok a következők:
- id (lakó azonosító)
- name (lakó neve)
- medicines (gyógyszerek)
    [medicine] (gyógyszer})

---

A ***Felírt vény rögzítés*** működése:

- A ***Gyógyszerezés / Felírt vény rögzítés*** menüpontot kiválasztva egy lista jelenik meg a gyógyszeres kezelés alatt álló lakókról és gyógyszereikről, akiknek a vényt kellett feliratni.
- A sor végi gombra kattintva egy új oldalon megjelenik az adott lakóra vonatkozó felirandó vénylista. A listában a gyógyszerek melletti bemeneti mezőben kell rögzíteni a felírt vények darabszámát.
- A ***Kész*** gombra kattintva az alkalmazás rögzíti az adatbázisban, hogy mely gyógyszerekre mennyi recept lett feliratva, a felírt darabszámmal növelve az adott lakó vénykészletének mennyiségét.
- A ***x*** ikonra kattintva ez a rögzítés nem hajtódik végre.
- Bármelyik gomb megnyomásának hatására az összes lakók-felírt-vény listázó oldalra navigál vissza az alkalmazás, ahol már csak a felírt vények rögzítésére várakozó lakók láthatóak.

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

### _**7.4 Vény beváltás**_  

---

> _A ***Vény beváltás*** almenügombra kattintva egy oldal jelenik meg azon lakók és gyógyszereik listájával akiknek a gyógyszerkészletük nem elegendő a következő időszakra, de van beváltható vényük. Az oldal segítségével lehet kiválasztani a beváltandó vényeket.

**Komponens neve:** prescription-change  
**Komponens helye:** page/prescription-change

Ezek az adatok a következők:
- id (lakó azonosító)
- name (lakó neve)
- medicines (gyógyszerek)
    [medicine] (gyógyszer})

---

A ***Vény beváltás*** működése:

- A ***Gyógyszerezés / Vény beváltás*** menüpontot kiválasztvaegy oldal jelenik meg azon lakók és gyógyszereik listájával akiknek a gyógyszerkészletük nem elegendő a következő időszakra, de van beváltható vényük. Az időszak kezdő értéke 1 hét, de az oldalon módosítható. Módosítás után a lista azonnal frissül.
- A megjelenő listában látható a lakó és azok a gyógyszerei, amelyekre vényt kell beváltani.
- A sor végi gombra kattintva egy új oldalon megjelenik az adott lakóra vonatkozó beváltandó vénylista. A listában a gyógyszerek melletti jelölőnégyzettel kell rögzíteni a beváltásra kiválasztás tényét.
- A ***Kész*** gombra kattintva az alkalmazás rögzíti az adatbázisban, hogy mely gyógyszerekre lett recept kiválasztva beváltásra.
- A ***x*** ikonra kattintva ez a rögzítés nem hajtódik végre.
- Bármelyik gomb megnyomásának hatására az összes lakók-vényfeliratás listázó oldalra navigál vissza az alkalmazás, ahol már csak a vény beváltásra várakozó lakók láthatóak.

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

### _**7.5 Kiváltott gyógyszer rögzítés**_  

---

> _A ***Gyógyszerezés / Kiváltott gyógyszer rögzítés*** menüpontot kiválasztva egy oldal jelenik meg azon lakók és gyógyszereik listájával akiknek van beváltandó vényük. Az oldal segítségével lehet a kiváltott gyógyszereket hozzáadni a lakók készletéhez.

**Komponens neve:** prescription-change  
**Komponens helye:** page/prescription-change

Ezek az adatok a következők:
- id (lakó azonosító)
- name (lakó neve)
- medicines (gyógyszerek)
    [medicine] (gyógyszer})

---

A ***Kiváltott gyógyszer rögzítés*** működése:

- A ***Gyógyszerezés / Kiváltott gyógyszer rögzítés*** menüpontot kiválasztva egy lista jelenik meg a gyógyszeres kezelés alatt álló lakókról és gyógyszereikről, akiknek a vényt kellett beváltani.
- A sor végi gombra kattintva egy új oldalon megjelenik az adott lakóra vonatkozó beváltandó vénylista. A listában a gyógyszerek melletti bemeneti mezőben kell rögzíteni a beváltott vények darabszámát.
- A ***Kész*** gombra kattintva az alkalmazás rögzíti az adatbázisban, hogy mely gyógyszerekre mennyi recept lett beváltva, a felírt darabszámmal csökkentve az adott lakó vénykészletének mennyiségét, illetve a beváltott vényeknek megfelelően növelve a gyógyszerkészletet.
- A ***x*** ikonra kattintva ez a rögzítés nem hajtódik végre.
- Bármelyik gomb megnyomásának hatására az összes lakók-beváltott-vény listázó oldalra navigál vissza az alkalmazás, ahol már csak a beváltott vények rögzítésére várakozó lakók láthatóak.

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

