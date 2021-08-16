## **1. Az alkalmazás célja**

Az alkalmazás célja, hogy segítse egy idősotthon lakóinak gyógyszerellátását.

## **2. Az alkalmazás telepítése**

- Forkolni kell a https://github.com/kkovacsics/medications GitHub repository-t
- Majd le kell klónozni az új repót, pl.:
  `git clone https://github.com/kkovacsics/medications.git`
- Telepíteni kell az alkalmazás függőségeit az `npm i` paranccsal, mind a **/backend**, mind a **/frontend** mappában.
- Ha további fejlesztések szükségesek, akkor telepíteni kell az Angular keretrendszert az `npm i -g @angular/cli` paranccsal.
- A **/backend/public** mappa tartalmazza a frontend build-elt verzióját.

## **3. Az alkalmazás konfigurálása**

Az API végpont elérési útvonala: http://localhost:3000  
A portszám megváltoztatásához a következő állományok módosítása szükséges:
- /backend/.env
- /backend/docker-compose.yml
- /frontend/src/app/service/config.service.ts

## **4. Az alkalmazás indítása**

Az alkalmazás indítása a Docker container indításával történik.
- a **Docker Desktop** alkalmazásnak futnia kell
- majd a **/backend** mappában ki kell adni a `docker-compose up` parancsot

Ha frontend vagy backend oldalon bármilyen módosítás történt, akkor első alkalommal az `npm run build` parancssal kell újraépíteni és elindítani az alkalmazást.

Az alkalmazásba bejelentkezni a http://localhost:3000 URL-en egy érvényes email/jelszó párossal lehet (fonover@gmail.com/test)


## **5. A végpontok dokumentációja**

[Swagger](http://localhost:3000/api-docs/)

---
---

## **Linkek:**  

- [User Story](https://github.com/kkovacsics/medications/blob/main/README.md)

- [Fejlesztői dokumentáció](https://github.com/kkovacsics/medications/blob/main/DEVELOPER_DOCUMENTATION.md)





