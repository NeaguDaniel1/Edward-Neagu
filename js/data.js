/* ==========================================================
   Datele agenției: destinații și oferte.
   Pentru a adăuga o destinație nouă, copiază un obiect și
   modifică textele (imaginea trebuie pusă în folderul img/).
   ========================================================== */

const CATEGORII = {
  romania: "România",
  europa: "Europa",
  exotic: "Exotic"
};

const DESTINATII = [
  {
    id: "santorini",
    nume: "Santorini",
    tara: "Grecia",
    categorie: "europa",
    img: "img/santorini.jpg",
    zile: 7,
    pret: 629,
    rating: 4.9,
    popular: true,
    badge: "Top vânzări",
    scurt: "Apusuri spectaculoase, case albe cu cupole albastre și plaje vulcanice.",
    descriere: "Insula cea mai fotografiată din Grecia te așteaptă cu satele Oia și Fira, plaje cu nisip negru și roșu, croaziere spre vulcan și cele mai frumoase apusuri din Mediterana.",
    perioada: "mai – octombrie",
    atractii: [
      { nume: "Oia", text: "Satul de pe stâncă unde se adună lumea seara pentru cel mai faimos apus din Grecia." },
      { nume: "Fira", text: "Capitala insulei, cu străduțe albe, magazine și o telecabină până în port." },
      { nume: "Plaja Roșie", text: "O plajă mică sub o stâncă de culoare roșie, formată de vulcan." },
      { nume: "Vulcanul Nea Kameni", text: "Mergi cu barca, urci pe craterul activ și faci baie în izvoarele termale." }
    ],
    include: ["Zbor dus-întors București – Santorini", "6 nopți la hotel 4★ cu vedere la mare", "Mic dejun inclus", "Croazieră la vulcan și izvoarele termale", "Transfer aeroport – hotel"]
  },
  {
    id: "carpati",
    nume: "Brașov & Bran",
    tara: "România",
    categorie: "romania",
    img: "img/bran.jpg",
    zile: 3,
    pret: 159,
    rating: 4.8,
    popular: true,
    badge: "Excursie școlară",
    scurt: "Castelul Bran, Biserica Neagră, drumeții pe Tâmpa și aer curat de munte.",
    descriere: "Excursia perfectă pentru clase și familii: vizităm Castelul Bran, centrul vechi al Brașovului, Cetatea Râșnov și urcăm cu telecabina pe Tâmpa. Ghid autorizat pe tot traseul.",
    perioada: "tot anul (iarna pentru zăpadă)",
    atractii: [
      { nume: "Castelul Bran", text: "Castelul legat de legenda lui Dracula, cu camere secrete și o expoziție despre Regina Maria." },
      { nume: "Biserica Neagră", text: "Cea mai mare biserică gotică din sud-estul Europei, înnegrită de un incendiu din 1689." },
      { nume: "Muntele Tâmpa", text: "Urci cu telecabina până la literele BRAȘOV și ai tot orașul la picioare." },
      { nume: "Cetatea Râșnov", text: "O cetate țărănească pe deal, cu ziduri de apărare și o fântână adâncă de 146 m." }
    ],
    include: ["Transport cu autocar modern", "2 nopți la pensiune 3★", "Demipensiune (mic dejun + cină)", "Bilete la Castelul Bran și Cetatea Râșnov", "Ghid autorizat"]
  },
  {
    id: "bali",
    nume: "Bali",
    tara: "Indonezia",
    categorie: "exotic",
    img: "img/bali.jpg",
    zile: 10,
    pret: 1390,
    rating: 4.8,
    popular: true,
    badge: "Exotic",
    scurt: "Plaje tropicale, orezării în terase, temple și apusuri de neuitat.",
    descriere: "Insula zeilor combină plajele cu apă turcoaz, orezăriile din Ubud, templele de pe stânci și pădurea maimuțelor. Ideal pentru relaxare și aventură.",
    perioada: "aprilie – octombrie (sezonul uscat)",
    atractii: [
      { nume: "Kelingking Beach", text: "Plaja în formă de T-Rex de pe insula Nusa Penida, cu apă turcoaz." },
      { nume: "Orezăriile Tegallalang", text: "Terase verzi de orez sculptate în deal, lângă Ubud." },
      { nume: "Templul Uluwatu", text: "Templu pe marginea unei stânci, unde la apus se ține dansul tradițional Kecak." },
      { nume: "Pădurea maimuțelor", text: "Un sanctuar în junglă cu sute de maimuțe jucăușe și temple vechi." }
    ],
    include: ["Zbor cu o escală", "9 nopți în resort 4★", "Mic dejun inclus", "Excursie la orezăriile Tegallalang", "Asistență în limba română"]
  },
  {
    id: "paris",
    nume: "Paris",
    tara: "Franța",
    categorie: "europa",
    img: "img/paris.jpg",
    zile: 5,
    pret: 449,
    rating: 4.8,
    popular: true,
    badge: "City break",
    scurt: "Orașul luminilor: Turnul Eiffel, Luvru, Montmartre și croaziere pe Sena.",
    descriere: "Un city break de neuitat în capitala Franței: urcăm în Turnul Eiffel, vedem Mona Lisa la Luvru, ne plimbăm prin Montmartre și facem o croazieră pe Sena la apus.",
    perioada: "aprilie – iunie și septembrie – octombrie",
    atractii: [
      { nume: "Turnul Eiffel", text: "Simbolul Parisului, înalt de 330 m; seara strălucește la fiecare oră." },
      { nume: "Muzeul Luvru", text: "Cel mai mare muzeu de artă din lume, casa Mona Lisei." },
      { nume: "Montmartre", text: "Cartierul pictorilor, pe un deal, cu Bazilica Sacré-Cœur." },
      { nume: "Croazieră pe Sena", text: "Vezi Notre-Dame și podurile orașului direct de pe apă." }
    ],
    include: ["Zbor dus-întors București – Paris", "4 nopți la hotel 3★ central", "Mic dejun inclus", "Tur ghidat Montmartre", "Croazieră pe Sena"]
  },
  {
    id: "roma",
    nume: "Roma",
    tara: "Italia",
    categorie: "europa",
    img: "img/roma.jpg",
    zile: 4,
    pret: 389,
    rating: 4.7,
    popular: false,
    badge: "Cultural",
    scurt: "Colosseumul, Fontana di Trevi, Vaticanul și cea mai bună pizza din lume.",
    descriere: "Cetatea eternă este un muzeu în aer liber. Vizităm Colosseumul, Forul Roman, Vaticanul și aruncăm o monedă în Fontana di Trevi ca să ne întoarcem.",
    perioada: "martie – mai și septembrie – noiembrie",
    atractii: [
      { nume: "Colosseumul", text: "Arena de acum 2.000 de ani în care se luptau gladiatorii, pentru 50.000 de spectatori." },
      { nume: "Fontana di Trevi", text: "Arunci o monedă peste umăr și legenda spune că te vei întoarce la Roma." },
      { nume: "Vaticanul", text: "Cel mai mic stat din lume: Bazilica Sf. Petru și Capela Sixtină." },
      { nume: "Pantheonul", text: "Templu roman cu o cupolă uriașă și o gaură în vârf prin care intră lumina." }
    ],
    include: ["Zbor dus-întors", "3 nopți la hotel 3★", "Mic dejun inclus", "Bilete Colosseum + Forul Roman", "Tur pietonal cu ghid"]
  },
  {
    id: "delta",
    nume: "Delta Dunării",
    tara: "România",
    categorie: "romania",
    img: "img/delta.jpg",
    zile: 4,
    pret: 229,
    rating: 4.9,
    popular: false,
    badge: "Natură",
    scurt: "Plimbări cu barca printre canale, peste 300 de specii de păsări și pește proaspăt.",
    descriere: "Rezervația Biosferei Delta Dunării este unică în Europa. Navigăm pe canale, vedem pelicani și cormorani, ajungem la Sulina și gustăm bucătăria pescărească tradițională.",
    perioada: "mai – septembrie",
    atractii: [
      { nume: "Canalele din Crișan", text: "Plimbare cu barca printre stuf, nuferi și sălcii, pe ape liniștite." },
      { nume: "Coloniile de pelicani", text: "Delta găzduiește cea mai mare colonie de pelicani din Europa." },
      { nume: "Sulina", text: "Orașul cel mai estic al României, acolo unde Dunărea se varsă în Marea Neagră." },
      { nume: "Pădurea Letea", text: "Cea mai veche rezervație din țară, cu stejari seculari și cai sălbatici." }
    ],
    include: ["Transport din București", "3 nopți la pensiune în Crișan", "Pensiune completă", "2 excursii cu barca pe canale", "Ghid local"]
  },
  {
    id: "tokyo",
    nume: "Tokyo & Fuji",
    tara: "Japonia",
    categorie: "exotic",
    img: "img/tokyo.jpg",
    zile: 9,
    pret: 1690,
    rating: 4.9,
    popular: false,
    badge: "Nou",
    scurt: "Tradiție și tehnologie: temple, sakura, Muntele Fuji și cartiere futuriste.",
    descriere: "Descoperă Japonia: templele din Asakusa, intersecția Shibuya, trenul de mare viteză Shinkansen și o zi întreagă la poalele Muntelui Fuji.",
    perioada: "martie – aprilie (sakura) și octombrie – noiembrie",
    atractii: [
      { nume: "Shibuya", text: "Cea mai aglomerată intersecție din lume, unde trec mii de oameni deodată." },
      { nume: "Templul Senso-ji", text: "Cel mai vechi templu din Tokyo, în cartierul tradițional Asakusa." },
      { nume: "Pagoda Chureito", text: "Pagoda roșie cu Muntele Fuji în spate, cea mai fotografiată priveliște din Japonia." },
      { nume: "Akihabara", text: "Cartierul jocurilor video, al tehnologiei și al anime-ului." }
    ],
    include: ["Zbor cu o escală", "8 nopți la hotel 4★", "Mic dejun inclus", "Excursie de o zi la Muntele Fuji", "Japan Rail Pass 7 zile"]
  },
  {
    id: "dubai",
    nume: "Dubai",
    tara: "Emiratele Arabe Unite",
    categorie: "exotic",
    img: "img/dubai.jpg",
    zile: 6,
    pret: 849,
    rating: 4.7,
    popular: false,
    badge: "Lux",
    scurt: "Burj Khalifa, safari în deșert, mall-uri uriașe și plaje cu nisip fin.",
    descriere: "Orașul superlativelor: urcăm în cea mai înaltă clădire din lume, facem safari cu jeep-ul prin dune, vedem fântânile dansatoare și ne relaxăm pe plajele de la Golful Persic.",
    perioada: "noiembrie – martie",
    atractii: [
      { nume: "Burj Khalifa", text: "Cea mai înaltă clădire din lume, 828 m, cu o terasă la etajul 124." },
      { nume: "Safari în deșert", text: "Plimbare cu jeep-ul peste dune, plimbare cu cămila și cină sub stele." },
      { nume: "Fântânile Dubai", text: "Spectacol de apă, lumini și muzică la baza Burj Khalifa, în fiecare seară." },
      { nume: "Dubai Mall", text: "Unul dintre cele mai mari mall-uri din lume, cu acvariu uriaș și patinoar." }
    ],
    include: ["Zbor direct", "5 nopți la hotel 4★", "Mic dejun inclus", "Safari în deșert cu cină", "Bilet Burj Khalifa etajul 124"]
  }
];

const OFERTE = [
  { id: "santorini", tip: "Last minute", reducere: 25, plecare: "Plecare: 3 noiembrie" },
  { id: "carpati", tip: "Ofertă școli", reducere: 30, plecare: "Grupuri de minim 15 elevi" },
  { id: "dubai", tip: "Early booking", reducere: 15, plecare: "Plecări din ianuarie" },
  { id: "roma", tip: "Last minute", reducere: 20, plecare: "Plecare: 7 noiembrie" },
  { id: "tokyo", tip: "Early booking", reducere: 12, plecare: "Sezonul sakura, aprilie" },
  { id: "delta", tip: "Weekend", reducere: 18, plecare: "În fiecare vineri" }
];

/* coduri de reducere acceptate pe pagina de rezervare */
const CODURI = {
  SCOALA10: 10,
  ORIZONT5: 5
};
