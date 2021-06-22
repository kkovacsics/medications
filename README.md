# **User Story - Adminisztrátori szerepkör**

## **medications**
Idősotthon lakóinak gyógyszerellátása

---
---
## _**1. Főoldal**_
---
**1. agilis felhasználói történet**
> _A főoldal valójában egy dashboard a gyógyszerellátás legfontosabb adataival_

**Elfogadási kritérium:**

- a dashboard tartalmazza az idősotthon lakóinak számát
- az aktuális gyógyszerkészlet mennyi időre, hány hétre elegendő
- mikor kell legközelebb vényt, illetve gyógyszert beváltani/kiváltani

---
---
## _**2. Lakók adatbázis**_

---
**1. agilis felhasználói történet**
> _Ezen az oldalon megjelenik az összes lakó listája a legfontosabb adatokkal_

**Elfogadási kritérium:**

Az oldalra navigálva megjelenik az összes lakó adata egy helyen. 
Ezek az adatok az azonosító, a név, a leánykori név, anyja neve, születési hely és idő, TAJ szám, a beköltözés ideje, a kiköltözés (elhalálozás) ideje

---
**2. agilis felhasználói történet**
> _Új lakó adatainak felvétele_

**Elfogadási kritérium:**

A kötelező adatok megadásával új lakót lehet felvenni a rendszerbe. Az oldal menüből illetve a lakó listázó oldalról nyitható meg. Sikeres mentés után listázó oldal automatikusan frissül.

---
**3. agilis felhasználói történet**
> _A lakó adatainak módosítása_

**Elfogadási kritérium:**

A listában kiválasztott lakó adatai módosíthatóak. Sikeres mentés után listázó oldal automatikusan frissül.

---
**4. agilis felhasználói történet**
> _A lakó inaktiválása a rendszerben_

**Elfogadási kritérium:**

A listában kiválasztott lakó kiköltözési idejét a módosítás oldalon lehet megadni. A kiköltözés idejének megadásával a lakó inaktívvá válik. Sikeres mentés után listázó oldal automatikusan frissül.

---
**5. agilis felhasználói történet**
> _A lakók listájában bármely mező szerint lehet keresni, szűrni_

**Elfogadási kritérium:**

A mező kiválasztásával és a keresési szöveg megadásával frissül a listaoldal, ahol csak a szűrési feltételnek megfelelő lakók adatai láthatóak csak.

---
**6. agilis felhasználói történet**
> _A lakók listáját bármely mező szerint lehet sorba rendezni_

**Elfogadási kritérium:**

A mező fejlécére kattintva a lista a mező szerint először növekvő sorrendbe, a következő kattintásra csökkenő sorrendbe, míg a harmadik kattintásra normál sorrendbe lesz rendezve.

---
---
## _**3. Gyógyszerek adatbázis**_

---
**1. agilis felhasználói történet**
> _Ezen az oldalon megjelenik az idősotthonban használt valamennyi gyógyszer listája a legfontosabb adatokkal_

**Elfogadási kritérium:**

Az oldalra navigálva megjelenik az összes gyógyszer adata egy helyen. 
Ezek az adatok az azonosító, a név, a hatóanyag neve, kiszerelés (tabletta / doboz) 

---
**2. agilis felhasználói történet**
> _Új gyógyszer adatainak felvétele_

**Elfogadási kritérium:**

A kötelező adatok megadásával új gyógyszert lehet felvenni a rendszerbe. Az oldal menüből illetve a gyógyszer listázó oldalról nyitható meg. Sikeres mentés után listázó oldal automatikusan frissül.

---
**3. agilis felhasználói történet**
> _A gyógyszer adatainak módosítása_

**Elfogadási kritérium:**

A listában kiválasztott gyógyszer adatai módosíthatóak. Sikeres mentés után listázó oldal automatikusan frissül.

---
**4. agilis felhasználói történet**
> _A gyógyszer inaktiválása a rendszerben_

**Elfogadási kritérium:**

A listában kiválasztott gyógyszert inaktívvá lehet tenni, ha pl. a gyógyszert már nem gyártják. Sikeres mentés után listázó oldal automatikusan frissül.

---
**5. agilis felhasználói történet**
> _A gyógyszerek listájában bármely mező szerint lehet keresni, szűrni_

**Elfogadási kritérium:**

A mező kiválasztásával és a keresési szöveg megadásával frissül a listaoldal, ahol csak a szűrési feltételnek megfelelő gyógyszerek adatai láthatóak csak.

---
**6. agilis felhasználói történet**
> _A gyógyszerek listáját bármely mező szerint lehet sorba rendezni_

**Elfogadási kritérium:**

A mező fejlécére kattintva a lista a mező szerint először növekvő sorrendbe, a következő kattintásra csökkenő sorrendbe, míg a harmadik kattintásra normál sorrendbe lesz rendezve.

---
---
## _**4. Lakók-gyógyszerezés adatbázis**_

---
**1. agilis felhasználói történet**
> _Ezen az oldalon megjelenő listában az idősotthonban lakók és az általuk szedett valamennyi gyógyszer és a gyógyszerek adagolása látható_

**Elfogadási kritérium:**

Az oldalra navigálva megjelenik a listában az összes gyógyszert szedő lakó, valamint az adott lakó által szedett összes gyógyszer neve és adagolása

---
**2. agilis felhasználói történet**
> _Új lakó gyógyszerellátásának beállítása_

**Elfogadási kritérium:**

Az oldalon legördőlő listából lehet kiválasztani a lakót, a gyógyszert, napi maximum 3 (reggel, délben, este) gyógyszerbeszedési alkalmat feltételezve lehet megadni az alkalmankénti adagokat. Egy lakóhoz bármennyi gyógyszer fajtát fel lehet venni. Az oldal menüből illetve a listázó oldalról nyitható meg. Sikeres mentés után a listázó oldal automatikusan frissül.

---
**3. agilis felhasználói történet**
> _A lakó gyógyszerellátásának módosítása_

**Elfogadási kritérium:**

A listában kiválasztott lakó gyógyszerellátása módosítható. Lehet az adagolást módosítani, új gyógyszert felvenni, régi gyógyszert eltávolítani. Sikeres mentés után listázó oldal automatikusan frissül.

---
**4. agilis felhasználói történet**
> _A lakók-gyógyszerek listájában bármely mező szerint lehet keresni, szűrni_

**Elfogadási kritérium:**

A mező kiválasztásával és a keresési szöveg megadásával frissül a listaoldal, ahol csak a szűrési feltételnek megfelelő lakók és gyógyszereik adatai láthatóak csak.

---
**5. agilis felhasználói történet**
> _A lakók-gyógyszerek listáját bármely mező szerint lehet sorba rendezni_

**Elfogadási kritérium:**

A mező fejlécére kattintva a lista a mező szerint először növekvő sorrendbe, a következő kattintásra csökkenő sorrendbe, míg a harmadik kattintásra normál sorrendbe lesz rendezve.

---
---
## _**5. Lakók-gyógyszerkészlet és vénykészlet adatbázis**_

---
**1. agilis felhasználói történet**
> _Ezen az oldalon megjelenő listában az idősotthonban lakók és a nevükre kiváltott valamennyi gyógyszerből a még nem kiosztott készlet és a nevükre kiállított, de még be nem váltott vények (a vényen szereplő gyógyszer) láthatóak_

**Elfogadási kritérium:**

Az oldalra navigálva megjelenik a listában az összes lakó, akinek a nevén gyógyszer vagy vény van, valamint gyógyszerenként a még nem felhasznált készlet, valamint a vényeken szereplő gyógyszerkészlet

---
**2. agilis felhasználói történet**
> _Új lakó gyógyszerkészletének / vénykészletének beállítása_

**Elfogadási kritérium:**

Az oldalon legördőlő listából lehet kiválasztani a lakót, a gyógyszert és a vényen szereplő gyógyszert, valamint a mennyiséget. Egy lakóhoz bármennyi gyógyszert fajtát fel lehet venni. Az oldal menüből illetve a listázó oldalról nyitható meg. Sikeres mentés után listázó oldal automatikusan frissül.

---
**3. agilis felhasználói történet**
> _A lakó gyógyszerkészletének / vénykészletének módosítása_

**Elfogadási kritérium:**

A listában kiválasztott lakó gyógyszerkészlete/vénykészlete módosítható. Sikeres mentés után listázó oldal automatikusan frissül.

---
**4. agilis felhasználói történet**
> _A lakók-gyógyszerkészletek/vénykészletek listában bármely mező szerint lehet keresni, szűrni_

**Elfogadási kritérium:**

A mező kiválasztásával és a keresési szöveg megadásával frissül a listaoldal, ahol csak a szűrési feltételnek megfelelő lakók és gyógyszerkészleteik/vénykészleteik adatai láthatóak csak.

---
**5. agilis felhasználói történet**
> _A lakók-gyógyszerkészletek/vénykészletek listáját bármely mező szerint lehet sorba rendezni_

**Elfogadási kritérium:**

A mező fejlécére kattintva a lista a mező szerint először növekvő sorrendbe, a következő kattintásra csökkenő sorrendbe, míg a harmadik kattintásra normál sorrendbe lesz rendezve.

---
---
## _**6. A gyógyszerezés működtetése**_

---
**1. agilis felhasználói történet**
> _A heti gyógyszeradagok kiosztása a lakóknak az orvos által előírt adagokban. _

**Elfogadási kritérium:**

A funkció menüpontból indítható. A menüpont inaktív, ha bármely lakónál nem áll rendelkezésre a heti gyógyszeradag. A dashboard is mutatja, hogy a gyógyszerkészlet mennyi időre elegendő. A funkció elindításával először egy listát látunk az összes lakóról akinek ki kell osztani a gyógyszereit. Egy lakót kiválasztva feljön egy oldal a lakó gyógyszereinek a listájával és a részletes adagolási infóval. A gyógyszerek kiosztása után egy gombnyomásra a kiosztott mennyiség levonódik a lakó készletéből, visszatérünk a listázó oldalra, ahol mindig csak azok a lakók láthatóak, akiknek még nem lettek kiosztva a heti gyógyszeradag.

---
**2. agilis felhasználói történet**
> _A vények beváltása_

**Elfogadási kritérium:**

A funkció menüpontból indítható. A menüpont akkor aktív, ha van olyan lakó akinek a gyógyszeradagja már nem elegendő egy teljes hétre, de az adott gyógyszerre van recepje. A dashboard is mutatja, ha fennáll ez az állapot. A funkció elindításával először egy listát látunk az összes lakóról akinek van kiváltandó receptje. Egy lakót kiválasztva feljön egy oldal a beváltandó vények listájával. A vényeket megjelölve a vények állapota "beváltás alatt" lesz. Ezután lehet a vényeken szereplő gyógyszereket kiváltani a gyógyszertárban.

---
**3. agilis felhasználói történet**
> _A kiváltott gyógyszerek egyenkénti visszavezetése a rendszerbe_

**Elfogadási kritérium:**

A funkció menüpontból indítható. A menüpont akkor aktív, ha van "beváltás alatt" státuszú vény. A dashboard is mutatja, ha fennáll ez az állapot. A funkció elindításával először egy listát látunk az összes lakóról akinek van "beváltás alatt" státuszú vénye. Egy lakót kiválasztva feljön egy oldal a vények listájával. Minden vénynél jelölni kell, hogy a beváltás megtörtént. Ekkor a vényen szereplő gyógyszer adag hozzáadódik a lakó gyógyszerkészletéhez, a vény pedig törlődik a rendszerből. Az adott lakó vényeinek feldolgozása után visszatérünk a listázó oldalra, ahol mindig csak azok a lakók láthatóak, akiknek a vényei még nem lettek feldolgozva. 

---
**4. agilis felhasználói történet**
> _A kiváltott gyógyszerek tömeges visszavezetése a rendszerbe_

**Elfogadási kritérium:**

A funkció menüpontból indítható. A menüpont akkor aktív, ha van "beváltás alatt" státuszú vény. A dashboard is mutatja, ha fennáll ez az állapot. A funkció elindításával egy lépésben lehet az összes "beváltás alatt" státuszú vényen szereplő gyógyszert az adott lakó készletéhez rendelni és a vényeket törölni egy felpattanó ablakon történő megerősítés után. 

---
**5. agilis felhasználói történet**
> _A vények feliratása az orvossal_

**Elfogadási kritérium:**

A funkció menüpontból indítható. A menüpont akkor aktív, ha gyógyszerkészlet már nem elegendő 1 hétre és nincs beváltható vény sem. A dashboard is mutatja, ha fennáll ez az állapot. A funkció elindításával először egy listát látunk az összes lakóról akinek van gyógyszere, amire receptet kell felíratni. Egy lakót kiválasztva feljön egy oldal a gyógyszerek listájával. Minden gyógyszernél jelölni kell, hogy a feliratás megtörtént. Ekkor a vény státusza "feliratás alatt" lesz, és hozzáadódik a lakó vénykészletéhez.

---
**6. agilis felhasználói történet**
> _Az orvostól átvett vények egyenkénti visszavezetése a rendszerbe_

**Elfogadási kritérium:**

A funkció menüpontból indítható. A menüpont akkor aktív, ha van "feliratás alatt" státuszú vény. A dashboard is mutatja, ha fennáll ez az állapot. A funkció elindításával először egy listát látunk az összes lakóról akinek van "feliratás alatt" státuszú vénye. Egy lakót kiválasztva feljön egy oldal a vények listájával. Minden vénynél jelölni kell, hogy a feliratás megtörtént. Ekkor a vény státusza "felhasználható" lesz a lakó vénykészletében. Az adott lakó vényeinek feldolgozása után visszatérünk a listázó oldalra, ahol mindig csak azok a lakók láthatóak, akiknek a vényei még nem lettek feldolgozva. 

---
**7. agilis felhasználói történet**
> _Az orvostól átvett vények tömeges visszavezetése a rendszerbe_

**Elfogadási kritérium:**

A funkció menüpontból indítható. A menüpont akkor aktív, ha van "feliratás alatt" státuszú vény. A dashboard is mutatja, ha fennáll ez az állapot. A funkció elindításával egy lépésben lehet az összes "feliratás alatt" státuszú vényt "felhasználható" státuszúvá tenni a lakó vénykészletében egy felpattanó ablakon történő megerősítés után. 


---
---
## _A projekt egyéb adatai_ ##

**Prioritás:**  
magas

**A megvalósítás időtartama:**  
10 hét

**További fejlesztési lehetőségek:**  
- hibaüzenetek megjelenítése
- a listázó oldalakon lapozó készítése
- gyógyszer lejárati dátumok kezelése
- vény lejárati dátumok kezelése
- az adott ideig szedendő gyógyszerek (antibiotikumok) kezelése
