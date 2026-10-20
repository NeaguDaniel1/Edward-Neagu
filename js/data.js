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
