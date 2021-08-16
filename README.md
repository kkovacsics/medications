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

---
---
## _**2. Lakók adatbázis**_

---
**1. agilis felhasználói történet**
> _Ezen az oldalon megjelenik az összes lakó listája a legfontosabb adatokkal_

**Elfogadási kritérium:**

Az oldalra navigálva megjelenik az összes lakó adata egy helyen. 
Ezek az adatok az azonosító, a név, anyja neve, születési idő, TAJ szám, a beköltözés ideje, a kiköltözés (elhalálozás) ideje

---
**2. agilis felhasználói történet**
> _Új lakó adatainak felvétele_

**Elfogadási kritérium:**

A kötelező adatok megadásával új lakót lehet felvenni a rendszerbe. Az oldal a lakó listázó oldalról nyitható meg. Sikeres mentés után listázó oldal automatikusan frissül.

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

A keresési szöveg megadásával frissül a listaoldal, ahol csak azok a lakók láthatóak, akiknek bármely adata megfelel a szűrési feltételnek.

---
**6. agilis felhasználói történet**
> _A lakók listáját bármely mező szerint lehet sorba rendezni_

**Elfogadási kritérium:**

A mező fejlécére kattintva a lista a mező szerint először növekvő sorrendbe, a következő kattintásra csökkenő sorrendbe lesz rendezve.

---
---
## _**3. Gyógyszerek adatbázis**_

---
**1. agilis felhasználói történet**
> _Ezen az oldalon megjelenik az idősotthonban használt valamennyi gyógyszer listája a legfontosabb adatokkal_

**Elfogadási kritérium:**

Az oldalra navigálva megjelenik az összes gyógyszer adata egy helyen. 
Ezek az adatok: a név, a hatóanyag neve, kiszerelés (tabletta / doboz) 

---
**2. agilis felhasználói történet**
> _Új gyógyszer adatainak felvétele_

**Elfogadási kritérium:**

A kötelező adatok megadásával új gyógyszert lehet felvenni a rendszerbe. Az oldal a gyógyszer listázó oldalról nyitható meg. Sikeres mentés után listázó oldal automatikusan frissül.

---
**3. agilis felhasználói történet**
> _A gyógyszer adatainak módosítása_

**Elfogadási kritérium:**

A listában kiválasztott gyógyszer adatai módosíthatóak. Sikeres mentés után listázó oldal automatikusan frissül.

---
**4. agilis felhasználói történet**
> _A gyógyszer törlése a rendszerben_

**Elfogadási kritérium:**

A listában kiválasztott gyógyszert törölni lehet, ha pl. a gyógyszert már nem gyártják. Sikeres mentés után listázó oldal automatikusan frissül.

---
**5. agilis felhasználói történet**
> _A gyógyszerek listájában bármely mező szerint lehet keresni, szűrni_

**Elfogadási kritérium:**

A a keresési szöveg megadásával frissül a listaoldal, ahol csak azok a gyógyszerek láthatóak, amelyeknek bármely adata megfelel a szűrési feltételnek.

---
**6. agilis felhasználói történet**
> _A gyógyszerek listáját bármely mező szerint lehet sorba rendezni_

**Elfogadási kritérium:**

A mező fejlécére kattintva a lista a mező szerint először növekvő sorrendbe, a következő kattintásra csökkenő sorrendbe lesz rendezve.

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

Az oldalon legördőlő listából lehet kiválasztani a lakót, a gyógyszert, napi maximum 3 (reggel, délben, este) gyógyszerbeszedési alkalmat feltételezve lehet megadni az alkalmankénti adagokat. Egy lakóhoz bármennyi gyógyszer fajtát fel lehet venni. Az oldal a listázó oldalról nyitható meg. Sikeres mentés után a listázó oldal automatikusan frissül.

---
**3. agilis felhasználói történet**
> _A lakó gyógyszerellátásának módosítása_

**Elfogadási kritérium:**

A listában kiválasztott lakó gyógyszerellátása módosítható. Lehet a gyógyszert és az adagolást módosítani. Sikeres mentés után listázó oldal automatikusan frissül.

---
**4. agilis felhasználói történet**
> _A lakók-gyógyszerek listájában bármely mező szerint lehet keresni, szűrni_

**Elfogadási kritérium:**

A mező kiválasztásával és a keresési szöveg megadásával frissül a listaoldal, ahol csak azok a lakók és gyógyszereik adatai láthatóak, amelyeknek bármely adata megfelel a szűrési feltételnek.

---
**5. agilis felhasználói történet**
> _A lakók-gyógyszerek listáját bármely mező szerint lehet sorba rendezni_

**Elfogadási kritérium:**

A mező fejlécére kattintva a lista a mező szerint először növekvő sorrendbe, a következő kattintásra csökkenő sorrendbe lesz rendezve.

---
---
## _**5. Lakók-gyógyszerkészlet adatbázis**_

---
**1. agilis felhasználói történet**
> _Ezen az oldalon megjelenő listában az idősotthonban lakók és a nevükre kiváltott valamennyi gyógyszerből a még nem kiosztott készlet láthatóak_

**Elfogadási kritérium:**

Az oldalra navigálva megjelenik a listában az összes lakó, akinek a nevén gyógyszer van, valamint gyógyszerenként a még nem felhasznált készlet.

---
**2. agilis felhasználói történet**
> _Új lakó gyógyszerkészletének beállítása_

**Elfogadási kritérium:**

Az oldalon legördőlő listából lehet kiválasztani a lakót, a gyógyszert, valamint a mennyiséget. Egy lakóhoz bármennyi gyógyszert fajtát fel lehet venni. Az oldal a listázó oldalról nyitható meg. Sikeres mentés után listázó oldal automatikusan frissül.

---
**3. agilis felhasználói történet**
> _A lakó gyógyszerkészletének módosítása_

**Elfogadási kritérium:**

A listában kiválasztott lakó gyógyszerkészlete módosítható. Sikeres mentés után listázó oldal automatikusan frissül.

---
**4. agilis felhasználói történet**
> _A lakók-gyógyszerkészletek/vénykészletek listában bármely mező szerint lehet keresni, szűrni_

**Elfogadási kritérium:**

A mező kiválasztásával és a keresési szöveg megadásával frissül a listaoldal, ahol csak azok a lakók és gyógyszerkészleteik láthatóak, amelyeknek bármely adata megfelel a szűrési feltételnek.

---
**5. agilis felhasználói történet**
> _A lakók-gyógyszerkészletek/vénykészletek listáját bármely mező szerint lehet sorba rendezni_

**Elfogadási kritérium:**

A mező fejlécére kattintva a lista a mező szerint először növekvő sorrendbe, a következő kattintásra csökkenő sorrendbe lesz rendezve.

---
---
## _**6. A gyógyszerezés működtetése**_

---
**1. agilis felhasználói történet**
> _A heti gyógyszeradagok kiosztása a lakóknak az orvos által előírt adagokban. _

**Elfogadási kritérium:**

A funkció menüpontból indítható. A menüpont inaktív, ha bármely lakónál nem áll rendelkezésre a heti gyógyszeradag. A dashboard is mutatja, hogy a gyógyszerkészlet mennyi időre elegendő. A funkció elindításával egy listát látunk az összes lakóról akinek ki kell osztani a gyógyszereit. A gyógyszerek kiosztása után egy gombnyomásra az összes lakó készletéből levonódik gyógyszerenként a heti gyógyszeradag, visszatérünk a dashboardra, ahol automatikusan frissül a gyógyszerrel való ellátottság ideje.

---
**2. agilis felhasználói történet**
> _A gyógyszerkészlet feltöltése_

**Elfogadási kritérium:**

A funkció menüpontból indítható. A funkció elindításával egy listát látunk az összes lakóról és gyógyszereikről, ahol a gyógyszerkészlet nem legendő egy legördülő listából kiválasztható hétig. Az oldal mutatja a 4 heti gyógyszerezéshez szükséges doboz mennyiséget és a dobozmennyiségnek megfelelő tabletta számot. Egy gombnyomásra a listában szereplő lakók listában szereplő gyógyszereinek készlete megnő az adott tabletta számmal, majd visszatérünk a dashboardra, ahol automatikusan frissül a gyógyszerrel való ellátottság ideje.

---
---
## _A projekt egyéb adatai_ ##

**Prioritás:**  
magas

**A megvalósítás időtartama:**  
11 hét

**További fejlesztési lehetőségek:**  
- hibaüzenetek megjelenítése
- a listázó oldalakon lapozó készítése
- gyógyszer lejárati dátumok kezelése
- az adott ideig szedendő gyógyszerek (antibiotikumok) kezelése
