# **_PRELIMINARY - NOT FINAL_**
# **User Story - Adminisztrátori szerepkör**

## **medications**
Idősottthon lakóinak gyógyszerellátása

---
---
## _**1. Főoldal**_
---
**1. agilis felhasználói történet**
> _A főoldal valójában egy dashboard a gyógyszerellátás legfontosabb adataival_

**Elfogadási kritérium:**

- a dashboard tartalmazza az idősotthon lakóinak számát
- az aktuális gyógyszerkészlet hány hétre elegendő
- vannak-e lejárt szavatosságú gyógyszerek (hány doboz)
- mikor kell legközelebb vényt, illetve gyógyszert kiváltani

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

Az oldalon legördőlő listából lehet kiválasztani a lakót, a gyógyszert, napi maximum 3 gyógyszerbeszedési alkalmat feltételezve lehet megadni az alkalmankénti adagokat. Egy lakóhoz bármennyi gyógyszer fajtát fel lehet venni. Az oldal menüből illetve a listázó oldalról nyitható meg. Sikeres mentés után listázó oldal automatikusan frissül.

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
## _**5. Lakók-gyógyszerkészlet adatbázis**_

---
**1. agilis felhasználói történet**
> _Ezen az oldalon megjelenő listában az idősotthonban lakók és a nevükre kiváltott valamennyi gyógyszerből a még nem kiosztott készlet látható_

**Elfogadási kritérium:**

Az oldalra navigálva megjelenik a listában az összes lakó, akinek a nevén gyógyszer van, valamint gyógyszerenként a még nem felhasznált készlet

---
**2. agilis felhasználói történet**
> _Új lakó gyógyszerkészletének beállítása_

**Elfogadási kritérium:**

Az oldalon legördőlő listából lehet kiválasztani a lakót, a gyógyszert és a mennyiséget. Egy lekóhoz bármennyi gyógyszert fajtát fel lehet venni. Az oldal menüből illetve a listázó oldalról nyitható meg. Sikeres mentés után listázó oldal automatikusan frissül.

---
**3. agilis felhasználói történet**
> _A lakó gyógyszerkészletének módosítása_

**Elfogadási kritérium:**

A listában kiválasztott lakó gyógyszerkészlete módosítható. Sikeres mentés után listázó oldal automatikusan frissül.

---
**4. agilis felhasználói történet**
> _A lakók-gyógyszerkészletek listájában bármely mező szerint lehet keresni, szűrni_

**Elfogadási kritérium:**

A mező kiválasztásával és a keresési szöveg megadásával frissül a listaoldal, ahol csak a szűrési feltételnek megfelelő lakók és gyógyszerkészleteik adatai láthatóak csak.

---
**5. agilis felhasználói történet**
> _A lakók-gyógyszerkészletek listáját bármely mező szerint lehet sorba rendezni_

**Elfogadási kritérium:**

A mező fejlécére kattintva a lista a mező szerint először növekvő sorrendbe, a következő kattintásra csökkenő sorrendbe, míg a harmadik kattintásra normál sorrendbe lesz rendezve.

---
**6. agilis felhasználói történet**
> _A gyógyszerkészletek csökkentése a lakók heti adagjának kiosztása után_

**Elfogadási kritérium:**

A funkció egy menüpont kiválasztásával indítható. A menüpont csak akkor aktív, ha van készleten legalább egy heti gyógyszer adag. Ezt a tényt a dashboard is mutatja. 

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
