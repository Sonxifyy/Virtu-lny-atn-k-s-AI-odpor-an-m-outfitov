Webová aplikácia na správu virtuálneho šatníka s využitím umelej inteligencie. Používateľ nahráva oblečenie, ktoré sa ukladá do databázy a kategorizuje. AI následne generuje personalizované outfitové kombinácie na základe preferencií a kontextu (napr. príležitosť alebo štýl).

Stručný popis: Aplikácia umožní používateľovi vytvoriť si vlastný digitálny šatník, do ktorého si bude môcť ukladať oblečenie, obuv a doplnky vo forme fotografií a popisov. Na základe uložených kúskov, preferovaného štýlu, príležitosti, počasia a sezóny bude systém pomocou AI odporúčať vhodné outfity. Používateľ si bude môcť outfit uložiť medzi obľúbené kombinácie, plánovať oblečenie na konkrétne dni a získať odporúčania, ktoré kúsky sa k sebe hodia.

Funkcionalita aplikácie Funkcie pre používateľa Registrácia a prihlásenie

Používateľ sa bude môcť:

zaregistrovať, prihlásiť, spravovať svoj profil, nastaviť svoje preferencie (štýl, obľúbené farby, typ príležitostí). Správa virtuálneho šatníka

Používateľ bude môcť:

pridať nový kus oblečenia, nahrať fotografiu, priradiť kategóriu (tričko, nohavice, sukňa, bunda, topánky, doplnok), určiť farbu, sezónu, štýl, formálnosť, značku, stav, obľúbenosť. AI odporúčanie outfitov

Používateľ zadá:

príležitosť (škola, práca, rande, šport, oslava, casual), počasie alebo lokalitu, preferovaný štýl, prípadne farbu či typ kúsku, ktorý chce použiť.

AI následne odporučí:

kompletný outfit, dôvod výberu, alternatívne kombinácie, prípadne odporúčanie chýbajúceho typu kúsku. Kalendár outfitov

Používateľ si bude môcť:

uložiť outfit na konkrétny deň, plánovať outfity dopredu, prezerať históriu nosených outfitov. Obľúbené kombinácie

Používateľ bude môcť:

uložiť outfit medzi obľúbené, znovu ho použiť, upraviť ho.

AI funkcionalita: Klasifikácia oblečenia podľa textového a obrazového vstupu Pri nahraní fotografie bude možné získať pomoc pri identifikácii typu kúsku, dominantnej farby alebo štýlu. Generovanie outfitových odporúčaní AI na základe: uloženého šatníka, preferencií používateľa, počasia, typu udalosti, sezóny navrhne najvhodnejší outfit. Vysvetlenie odporúčania AI vysvetlí, prečo bola daná kombinácia zvolená, napr.: farebná kompatibilita, vhodnosť pre počasie, formálnosť, sezónnosť.

Hlavný hosting provider: Microsoft Azure

Na Azure bude nasadené:

Frontend hosting – Azure Static Web Apps Backend hosting – Azure App Service Databáza – Azure Database for PostgreSQL Ukladanie obrázkov – Azure Blob Storage Externý provider (iný ako hosting provider): Google Cloud AI služba – Google Gemini API / Vertex AI API<<<<<<< HEAD
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
=======
# Virtu-lny-atn-k-s-AI-odpor-an-m-outfitov
Webová aplikácia na správu virtuálneho šatníka s využitím umelej inteligencie. Používateľ nahráva oblečenie, ktoré sa ukladá do databázy a kategorizuje. AI následne generuje personalizované outfitové kombinácie na základe preferencií a kontextu (napr. príležitosť alebo štýl).

Stručný popis:
Aplikácia umožní používateľovi vytvoriť si vlastný digitálny šatník, do ktorého si bude môcť ukladať oblečenie, obuv a doplnky vo forme fotografií a popisov. Na základe uložených kúskov, preferovaného štýlu, príležitosti, počasia a sezóny bude systém pomocou AI odporúčať vhodné outfity. Používateľ si bude môcť outfit uložiť medzi obľúbené kombinácie, plánovať oblečenie na konkrétne dni a získať odporúčania, ktoré kúsky sa k sebe hodia.

Funkcionalita aplikácie
Funkcie pre používateľa
Registrácia a prihlásenie

Používateľ sa bude môcť:

zaregistrovať,
prihlásiť,
spravovať svoj profil,
nastaviť svoje preferencie (štýl, obľúbené farby, typ príležitostí).
Správa virtuálneho šatníka

Používateľ bude môcť:

pridať nový kus oblečenia,
nahrať fotografiu,
priradiť kategóriu (tričko, nohavice, sukňa, bunda, topánky, doplnok),
určiť farbu,
sezónu,
štýl,
formálnosť,
značku,
stav,
obľúbenosť.
AI odporúčanie outfitov

Používateľ zadá:

príležitosť (škola, práca, rande, šport, oslava, casual),
počasie alebo lokalitu,
preferovaný štýl,
prípadne farbu či typ kúsku, ktorý chce použiť.

AI následne odporučí:

kompletný outfit,
dôvod výberu,
alternatívne kombinácie,
prípadne odporúčanie chýbajúceho typu kúsku.
Kalendár outfitov

Používateľ si bude môcť:

uložiť outfit na konkrétny deň,
plánovať outfity dopredu,
prezerať históriu nosených outfitov.
Obľúbené kombinácie

Používateľ bude môcť:

uložiť outfit medzi obľúbené,
znovu ho použiť,
upraviť ho.


AI funkcionalita:
Klasifikácia oblečenia podľa textového a obrazového vstupu
Pri nahraní fotografie bude možné získať pomoc pri identifikácii typu kúsku, dominantnej farby alebo štýlu.
Generovanie outfitových odporúčaní
AI na základe:
uloženého šatníka,
preferencií používateľa,
počasia,
typu udalosti,
sezóny
navrhne najvhodnejší outfit.
Vysvetlenie odporúčania
AI vysvetlí, prečo bola daná kombinácia zvolená, napr.:
farebná kompatibilita,
vhodnosť pre počasie,
formálnosť,
sezónnosť.


Hlavný hosting provider: Microsoft Azure

Na Azure bude nasadené:

Frontend hosting – Azure Static Web Apps
Backend hosting – Azure App Service
Databáza – Azure Database for PostgreSQL
Ukladanie obrázkov – Azure Blob Storage
Externý provider (iný ako hosting provider): Google Cloud
AI služba – Google Gemini API / Vertex AI API
>>>>>>> fe9d294194013d46d2227bb605021ef634b0a9c9
