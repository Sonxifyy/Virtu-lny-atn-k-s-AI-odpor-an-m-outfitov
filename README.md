# Virtuálny šatník s AI odporúčaním outfitov

Štýlová full-stack webová aplikácia s React frontendom, Node.js backendom, PostgreSQL databázou a AI odporúčaním outfitov.

## Čo je hotové
- registrácia a prihlásenie cez JWT
- virtuálny šatník s ukladaním oblečenia
- nahrávanie obrázkov
- AI odporúčanie outfitu
- uložené outfity
- obľúbené kombinácie
- kalendár outfitov
- jemný Pinterest-like UI v ružovo-fialových farbách
- Docker Compose pre frontend, backend aj databázu

## Spustenie jedným príkazom
V koreňovom priečinku projektu spusti:

```bash
docker compose up --build
```

Potom otvor:
http://16.171.57.221:5173/login

- Frontend: http://localhost:5173
- Backend health: http://localhost:5000/api/health

## Dôležité
Databáza sa inicializuje automaticky z `backend/schema.sql`, takže netreba ručne importovať tabuľky.

## AI režimy
Aplikácia funguje aj bez AI kľúča.
- bez `GEMINI_API_KEY` používa inteligentný fallback algoritmus
- s `GEMINI_API_KEY` používa Gemini API

Ak chceš zapnúť Gemini, doplň kľúč v `docker-compose.yml` pri službe `backend`.

## Demo flow
1. Zaregistruj sa.
2. Pridaj si oblečenie do šatníka.
3. Otvor AI stylistu.
4. Zadaj príležitosť, počasie, štýl a sezónu.
5. Ulož odporúčaný outfit, pridaj ho medzi obľúbené alebo do kalendára.


## Frontend
Frontend je vytvorený v React + Vite. Slúži na používateľské rozhranie aplikácie:
- registrácia a prihlásenie,
- dashboard,
- virtuálny šatník,
- odporúčanie outfitov,
- uložené outfity,
- obľúbené outfity,
- kalendár outfitov.

## Backend
Backend je vytvorený v Node.js + Express. Zabezpečuje REST API, autentifikáciu používateľov a komunikáciu s databázou aj externými službami.

Backend obsahuje tieto časti:
- auth – registrácia, login, profil používateľa,
- clothes – pridávanie, filtrovanie, úprava a mazanie oblečenia,
- outfits – vytváranie a načítanie outfitov,
- favorites – obľúbené outfity,
- calendar – plánovanie outfitov na dátum,
- upload – nahrávanie obrázkov.

## Databáza
Na ukladanie dát sa používa PostgreSQL databáza.

Ukladajú sa:
- používatelia,
- oblečenie,
- outfity,
- položky outfitov,
- obľúbené outfity,
- plánované outfity v kalendári,
- logy AI odporúčaní.

Databázová štruktúra je definovaná v súbore `backend/schema.sql`.

## Autentifikácia
Aplikácia používa JWT autentifikáciu. Po prihlásení používateľ dostane token, ktorý sa posiela pri požiadavkách na chránené endpointy. Heslá sa ukladajú zahashované pomocou bcrypt.

## AI služba
Aplikácia obsahuje AI odporúčanie outfitov. 
Ak API kľúč nie je nastavený, aplikácia použije vlastný fallback algoritmus, ktorý vyberá oblečenie podľa:
- sezóny,
- štýlu,
- príležitosti,
- počasia,
- formálnosti oblečenia.

## Upload obrázkov
Používateľ môže nahrávať obrázky oblečenia. Projekt podporuje:
- lokálne ukladanie obrázkov do priečinka `uploads`,
- voliteľné ukladanie do Azure Blob Storage pomocou `AZURE_STORAGE_CONNECTION_STRING`.

## Docker
Projekt obsahuje Docker Compose konfiguráciu pre lokálne spustenie všetkých častí aplikácie:
- frontend,
- backend,
- PostgreSQL databáza.


## Ako používať aplikáciu
# Registrácia a prihlásenie
Po otvorení aplikácie sa zobrazí prihlasovacia stránka
Ak nemáš účet, klikni na Register
Vyplň:
email
heslo
Klikni na Sign Up
Následne sa prihlás cez Login

# Dashboard
Po prihlásení sa zobrazí hlavná stránka (Dashboard), odkiaľ sa dostaneš do všetkých častí aplikácie:

Wardrobe (šatník)
Outfits
Favorites
Calendar
Recommend

# Pridanie oblečenia
Prejdi do sekcie Wardrobe
Klikni na Add Item
Vyplň údaje:
názov oblečenia
kategória (napr. tričko, nohavice, topánky…)
prípadne ďalšie parametre (štýl, sezóna…)
Nahraj obrázok (voliteľné)
Klikni na Save

Oblečenie sa zobrazí v zozname

# Správa šatníka

V sekcii Wardrobe môžeš:

prezerať všetky položky
filtrovať podľa kategórie
upraviť existujúcu položku
odstrániť položku (ikona delete)


# Vytvorenie outfitu

Prejdi do sekcie Outfits
Klikni na Create Outfit
Vyber oblečenie zo zoznamu
Ulož outfit

Outfit sa uloží a zobrazí v zozname

# Obľúbené outfity

pri outfite klikni na možnosť Add to Favorites
obľúbené outfity nájdeš v sekcii Favorites

# Kalendár outfitov
Prejdi do sekcie Calendar
Vyber dátum
Priraď outfit ku konkrétnemu dňu

Môžeš si tak naplánovať oblečenie dopredu

# AI odporúčanie outfitu

Prejdi do sekcie AI Stylist
Zadaj parametre (napr. príležitosť, štýl, sezóna)
Spusti generovanie

Aplikácia:
použije AI (ak je dostupné API)
alebo fallback algoritmus a vytvorí vhodný outfit

# Nahrávanie obrázkov

Pri pridávaní oblečenia môžeš:
nahrať obrázok z počítača
obrázok sa uloží lokálne alebo do cloud storage

