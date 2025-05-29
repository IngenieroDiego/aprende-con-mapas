/**
 * script.js - Funcionalidades completas para "Aprende con Mapas"
 * 
 * Este archivo contiene todas las funcionalidades interactivas de la plataforma:
 * - Mapa interactivo con Leaflet.js
 * - Línea de tiempo funcional
 * - Sistema de búsqueda
 * - Exportación de mapas
 * - Integración con Wikipedia
 * - Gestión de eventos
 */

// Variables globales
let mapa;
let marcadores = [];
let capaActual = null;
let mapaActual = 'moderna'; // Por defecto muestra Edad Moderna

// Datos de ejemplo para marcadores históricos
const datosHistoricos = {
    antigua: [
        {
            nombre: "Imperio Romano",
            descripcion: "El Imperio Romano en su máxima extensión (117 d.C.) bajo Trajano.",
            coordenadas: [41.9028, 12.4964],
            epoca: "antigua",
            imagen: "Imperio Romano.png",
            enlace: "https://es.wikipedia.org/wiki/Imperio_romano"
        },
        {
            nombre: "Antiguo Egipto",
            descripcion: "Civilización del Antiguo Egipto a lo largo del río Nilo.",
            coordenadas: [26.8206, 30.8025],
            epoca: "antigua",
            imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Egypt.Giza.Sphinx.01.jpg/640px-Egypt.Giza.Sphinx.01.jpg",
            enlace: "https://es.wikipedia.org/wiki/Antiguo_Egipto"
        },
        {
    nombre: "Guerras Médicas",
    descripcion: "Conflictos entre griegos y persas en el siglo V a.C.",
    coordenadas: [38.2466, 21.7346],
    epoca: "antigua",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Greek-Persian_duel.jpg",
    enlace: "https://es.wikipedia.org/wiki/Guerras_Médicas"
},
{
    nombre: "Alejandro Magno conquista Persia",
    descripcion: "Conquista del Imperio Persa por Alejandro Magno (330 a.C.).",
    coordenadas: [32.4279, 53.6880],
    epoca: "antigua",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/7/79/Alexander_the_Great_mosaic.jpg",
    enlace: "https://es.wikipedia.org/wiki/Alejandro_Magno"
},
{
    nombre: "Biblioteca de Alejandría",
    descripcion: "Centro del saber en el mundo antiguo.",
    coordenadas: [31.2001, 29.9187],
    epoca: "antigua",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Ancientlibraryalex.jpg",
    enlace: "https://es.wikipedia.org/wiki/Biblioteca_de_Alejandr%C3%ADa"
},
{
    nombre: "Guerra del Peloponeso",
    descripcion: "Conflicto entre Atenas y Esparta (431-404 a.C.).",
    coordenadas: [37.9838, 23.7275],
    epoca: "antigua",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Peloponnesian_War_map.jpg",
    enlace: "https://es.wikipedia.org/wiki/Guerra_del_Peloponeso"
},
{
    nombre: "Nacimiento de Confucio",
    descripcion: "Fundador del confucianismo en China (551 a.C.).",
    coordenadas: [35.5969, 116.9919],
    epoca: "antigua",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/2/26/Confucius_Temple_Qufu.jpg",
    enlace: "https://es.wikipedia.org/wiki/Confucio"
},
{
            nombre: "Pueblos indígenas precolombinos",
            descripcion: "Sociedades como los muiscas, quimbayas y taironas habitaron el territorio antes de la conquista.",
            coordenadas: [5.0260, -73.9906],
            epoca: "antigua",
            imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Tunjo.jpg/640px-Tunjo.jpg",
            enlace: "https://es.wikipedia.org/wiki/Pueblos_ind%C3%ADgenas_de_Colombia"
        },
        {
            nombre: "Ciudad Perdida",
            descripcion: "Centro urbano tayrona fundado hacia el año 800 d.C.",
            coordenadas: [11.0387, -73.9236],
            epoca: "antigua",
            imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Ciudad_Perdida%2C_Colombia.jpg/640px-Ciudad_Perdida%2C_Colombia.jpg",
            enlace: "https://es.wikipedia.org/wiki/Ciudad_Perdida"
        },
        {
    nombre: "Cultura San Agustín",
    descripcion: "Civilización precolombina reconocida por sus esculturas megalíticas en el sur de Colombia.",
    coordenadas: [1.8833, -76.2833],
    epoca: "antigua",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/San_Agust%C3%ADn_statue_1.jpg/640px-San_Agust%C3%ADn_statue_1.jpg",
    enlace: "https://es.wikipedia.org/wiki/Cultura_San_Agust%C3%ADn"
},
{
    nombre: "Cultura Tierradentro",
    descripcion: "Conocida por sus hipogeos subterráneos y arte funerario en el Cauca.",
    coordenadas: [2.5625, -75.9072],
    epoca: "antigua",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Tierradentro_Hypogeum_1.jpg/640px-Tierradentro_Hypogeum_1.jpg",
    enlace: "https://es.wikipedia.org/wiki/Cultura_Tierradentro"
},
{
    nombre: "Cultura Muisca",
    descripcion: "Una de las civilizaciones más avanzadas de la región andina precolombina.",
    coordenadas: [5.0263, -73.9992],
    epoca: "antigua",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Muisca1.JPG/640px-Muisca1.JPG",
    enlace: "https://es.wikipedia.org/wiki/Cultura_muisca"
},
{
    nombre: "Cultura Tayrona",
    descripcion: "Habitantes de la Sierra Nevada de Santa Marta con una compleja red de caminos y arquitectura.",
    coordenadas: [11.2448, -73.8496],
    epoca: "antigua",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Ciudad_Perdida_Santa_Marta.jpg/640px-Ciudad_Perdida_Santa_Marta.jpg",
    enlace: "https://es.wikipedia.org/wiki/Tayrona"
},
{
    nombre: "Cultura Quimbaya",
    descripcion: "Famosos por su orfebrería en oro y obras como el Poporo Quimbaya.",
    coordenadas: [4.5339, -75.6811],
    epoca: "antigua",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Poporo_Quimbaya_Gold_Museum.jpg/640px-Poporo_Quimbaya_Gold_Museum.jpg",
    enlace: "https://es.wikipedia.org/wiki/Quimbayas"
},
{
    nombre: "Pueblos Panches",
    descripcion: "Grupo indígena del altiplano cundiboyacense, rivales de los muiscas.",
    coordenadas: [4.6500, -74.2333],
    epoca: "antigua",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Guerrero_pancha.jpg/640px-Guerrero_pancha.jpg",
    enlace: "https://es.wikipedia.org/wiki/Panche"
},
{
    nombre: "Cultura Zenú",
    descripcion: "Destacada por sus sistemas de drenaje hidráulico en la región del Sinú.",
    coordenadas: [9.2419, -75.8884],
    epoca: "antigua",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Zen%C3%BA_Gold_Pectoral.jpg/640px-Zen%C3%BA_Gold_Pectoral.jpg",
    enlace: "https://es.wikipedia.org/wiki/Cultura_Zen%C3%BA"
}
    ],
    media: [
        {
            nombre: "Imperio Bizantino",
            descripcion: "El Imperio Bizantino en el siglo VI bajo Justiniano I.",
            coordenadas: [41.015137, 28.979530],
            epoca: "media",
            imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Byzantine_Empire_animated.gif/640px-Byzantine_Empire_animated.gif",
            enlace: "https://es.wikipedia.org/wiki/Imperio_bizantino"
        },
        {
            nombre: "Al-Ándalus",
            descripcion: "Al-Ándalus en su máxima extensión (siglo VIII).",
            coordenadas: [37.1773, -3.5986],
            epoca: "media",
            imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Al-Andalus_%28and_Christian_kingdoms%29_around_1000.jpg/640px-Al-Andalus_%28and_Christian_kingdoms%29_around_1000.jpg",
            enlace: "https://es.wikipedia.org/wiki/Al-%C3%81ndalus"
        },
        {
    nombre: "Batalla de Hastings",
    descripcion: "Los normandos conquistan Inglaterra en 1066.",
    coordenadas: [50.9116, 0.4871],
    epoca: "media",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Bayeux_Tapestry_scene57_Harold_death.jpg",
    enlace: "https://es.wikipedia.org/wiki/Batalla_de_Hastings"
},
{
    nombre: "Universidad de Bolonia",
    descripcion: "Primera universidad europea (fundada en 1088).",
    coordenadas: [44.4949, 11.3426],
    epoca: "media",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/e/e0/AlmaMater_Bologna.jpg",
    enlace: "https://es.wikipedia.org/wiki/Universidad_de_Bolonia"
},
{
    nombre: "Imperio de Carlomagno",
    descripcion: "Unificación de Europa occidental bajo Carlomagno.",
    coordenadas: [50.7753, 6.0839],
    epoca: "media",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Charlemagne-empire.jpg",
    enlace: "https://es.wikipedia.org/wiki/Carlomagno"
},
{
    nombre: "Inquisición Española",
    descripcion: "Tribunal religioso establecido en 1478.",
    coordenadas: [40.4168, -3.7038],
    epoca: "media",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/d/db/Inquisition.jpg",
    enlace: "https://es.wikipedia.org/wiki/Inquisici%C3%B3n_espa%C3%B1ola"
},
{
    nombre: "Catedral de Notre Dame",
    descripcion: "Inicio de su construcción en 1163 en París.",
    coordenadas: [48.8530, 2.3499],
    epoca: "media",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Notre-Dame_de_Paris_2013-07.JPG",
    enlace: "https://es.wikipedia.org/wiki/Catedral_de_Notre_Dame_(Par%C3%ADs)"
},
 {
            nombre: "Descubrimiento del río Magdalena",
            descripcion: "Rodrigo de Bastidas navega por la desembocadura del río Magdalena en el siglo XVI.",
            coordenadas: [10.4000, -75.5000],
            epoca: "media",
            imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Magdalena_River_Colombia.jpg/640px-Magdalena_River_Colombia.jpg",
            enlace: "https://es.wikipedia.org/wiki/R%C3%ADo_Magdalena"
        },
        {
            nombre: "Fundación de Santa Marta",
            descripcion: "Primera ciudad española aún habitada en Colombia, fundada en 1525.",
            coordenadas: [11.2412, -74.2110],
            epoca: "media",
            imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Catedral_de_Santa_Marta.jpg/640px-Catedral_de_Santa_Marta.jpg",
            enlace: "https://es.wikipedia.org/wiki/Santa_Marta_(Colombia)"
        },
        {
    nombre: "Llegada de Cristóbal Colón al Nuevo Mundo",
    descripcion: "Aunque no llegó directamente a Colombia, su viaje en 1492 inició el proceso de conquista.",
    coordenadas: [10.3997, -75.5144],
    epoca: "media",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Columbus_Taking_Possession.jpg/640px-Columbus_Taking_Possession.jpg",
    enlace: "https://es.wikipedia.org/wiki/Crist%C3%B3bal_Col%C3%B3n"
},
{
    nombre: "Fundación de Santa Marta",
    descripcion: "La ciudad más antigua de Colombia aún existente, fundada por Rodrigo de Bastidas en 1525.",
    coordenadas: [11.2408, -74.1990],
    epoca: "media",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Santa_Marta_catedral.jpg/640px-Santa_Marta_catedral.jpg",
    enlace: "https://es.wikipedia.org/wiki/Santa_Marta_(Colombia)"
},
{
    nombre: "Fundación de Cartagena de Indias",
    descripcion: "Fundada en 1533 por Pedro de Heredia, se convirtió en un puerto clave durante la colonia.",
    coordenadas: [10.3910, -75.4794],
    epoca: "media",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Ciudad_Amurallada_Cartagena.jpg/640px-Ciudad_Amurallada_Cartagena.jpg",
    enlace: "https://es.wikipedia.org/wiki/Cartagena_de_Indias"
},
{
    nombre: "Conquista del territorio muisca",
    descripcion: "Gonzalo Jiménez de Quesada lidera la expedición al altiplano cundiboyacense en 1537.",
    coordenadas: [4.7110, -74.0721],
    epoca: "media",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Gonzalo_Jimenez_de_Quesada.jpg/640px-Gonzalo_Jimenez_de_Quesada.jpg",
    enlace: "https://es.wikipedia.org/wiki/Conquista_espa%C3%B1ola_del_territorio_muisca"
},
{
    nombre: "Fundación de Bogotá",
    descripcion: "Fundada como Santa Fe en 1538 por Gonzalo Jiménez de Quesada.",
    coordenadas: [4.7110, -74.0721],
    epoca: "media",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Fundacion_Bogota.jpg/640px-Fundacion_Bogota.jpg",
    enlace: "https://es.wikipedia.org/wiki/Bogot%C3%A1"
},
{
    nombre: "Virreinato del Perú (incluye Colombia)",
    descripcion: "Desde 1542 hasta 1717 Colombia formó parte del Virreinato del Perú.",
    coordenadas: [4.5709, -74.2973],
    epoca: "media",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Virreinato_del_Per%C3%BA.svg/640px-Virreinato_del_Per%C3%BA.svg.png",
    enlace: "https://es.wikipedia.org/wiki/Virreinato_del_Per%C3%BA"
},
{
    nombre: "Creación del Virreinato de la Nueva Granada",
    descripcion: "Establecido en 1717, con capital en Santa Fe (actual Bogotá).",
    coordenadas: [4.5981, -74.0758],
    epoca: "media",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Virreinato_de_la_Nueva_Granada.svg/640px-Virreinato_de_la_Nueva_Granada.svg.png",
    enlace: "https://es.wikipedia.org/wiki/Virreinato_de_la_Nueva_Granada"
}
    ],
    moderna: [
        {
            nombre: "Revolución Francesa",
            descripcion: "Europa durante la Revolución Francesa (1789-1799).",
            coordenadas: [48.8566, 2.3522],
            epoca: "moderna",
            imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Prise_de_la_Bastille.jpg/640px-Prise_de_la_Bastille.jpg",
            enlace: "https://es.wikipedia.org/wiki/Revoluci%C3%B3n_francesa"
        },
        {
            nombre: "Descubrimiento de América",
            descripcion: "Rutas de los viajes de Cristóbal Colón (1492-1504).",
            coordenadas: [19.8968, -75.1221],
            epoca: "moderna",
            imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Christopher_Columbus_Portrait.jpg/640px-Christopher_Columbus_Portrait.jpg",
            enlace: "https://es.wikipedia.org/wiki/Descubrimiento_de_Am%C3%A9rica"
        },
        {
    nombre: "Independencia de Estados Unidos",
    descripcion: "Proclamación del 4 de julio de 1776.",
    coordenadas: [39.9526, -75.1652],
    epoca: "moderna",
    imagen: "Independencia de Estados Unidos.png",
    enlace: "https://es.wikipedia.org/wiki/Independencia_de_los_Estados_Unidos"
},
{
    nombre: "Revolución Industrial",
    descripcion: "Cambio tecnológico y económico iniciado en Inglaterra.",
    coordenadas: [53.4808, -2.2426],
    epoca: "moderna",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Manchester_canal_scene.jpg/640px-Manchester_canal_scene.jpg",
    enlace: "https://es.wikipedia.org/wiki/Revoluci%C3%B3n_Industrial"
},
{
    nombre: "Independencia de Colombia",
    descripcion: "Colombia se independiza de España en 1810-1819.",
    coordenadas: [4.7110, -74.0721],
    epoca: "moderna",
    imagen: "Independencia de Colombia.png",
    enlace: "https://es.wikipedia.org/wiki/Independencia_de_Colombia"
},
{
    nombre: "Guerras Napoleónicas",
    descripcion: "Conflictos bajo Napoleón Bonaparte (1803-1815).",
    coordenadas: [48.8566, 2.3522],
    epoca: "moderna",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Napoleon3.jpg",
    enlace: "https://es.wikipedia.org/wiki/Guerras_napole%C3%B3nicas"
},
{
    nombre: "Revolución Haitiana",
    descripcion: "Primera república negra independiente (1804).",
    coordenadas: [18.9712, -72.2852],
    epoca: "moderna",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Haitian_Revolution_Battle.jpg",
    enlace: "https://es.wikipedia.org/wiki/Revoluci%C3%B3n_haitiana"
},
{
            nombre: "Independencia de Colombia",
            descripcion: "Movimientos independentistas entre 1810 y 1819.",
            coordenadas: [4.7110, -74.0721],
            epoca: "moderna",
            imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Batalla_de_Boyac%C3%A1.jpg/640px-Batalla_de_Boyac%C3%A1.jpg",
            enlace: "https://es.wikipedia.org/wiki/Independencia_de_Colombia"
        },
        {
            nombre: "Batalla de Boyacá",
            descripcion: "En 1819, esta batalla selló la independencia de Colombia del dominio español.",
            coordenadas: [5.4545, -73.3540],
            epoca: "moderna",
            imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Monumento_Boyaca.jpg/640px-Monumento_Boyaca.jpg",
            enlace: "https://es.wikipedia.org/wiki/Batalla_de_Boyac%C3%A1"
        },
        {
            nombre: "Congreso de Angostura",
            descripcion: "Simón Bolívar establece lineamientos para la Gran Colombia (1819).",
            coordenadas: [8.1539, -63.5462],
            epoca: "moderna",
            imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Congreso_de_Angostura_1819.jpg/640px-Congreso_de_Angostura_1819.jpg",
            enlace: "https://es.wikipedia.org/wiki/Congreso_de_Angostura"
        },
        {
            nombre: "Bogotazo",
            descripcion: "Disturbios tras el asesinato de Jorge Eliécer Gaitán en 1948.",
            coordenadas: [4.6486, -74.1000],
            epoca: "contemporanea",
            imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/El_Bogotazo.jpg/640px-El_Bogotazo.jpg",
            enlace: "https://es.wikipedia.org/wiki/El_Bogotazo"
        },
        {
            nombre: "Constitución de 1991",
            descripcion: "Se promulga la nueva constitución política de Colombia.",
            coordenadas: [4.5981, -74.0758],
            epoca: "contemporanea",
            imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Congreso_de_la_Rep%C3%BAblica_de_Colombia.jpg/640px-Congreso_de_la_Rep%C3%BAblica_de_Colombia.jpg",
            enlace: "https://es.wikipedia.org/wiki/Constituci%C3%B3n_de_Colombia_de_1991"
        },
        {
            nombre: "Acuerdo de Paz con las FARC",
            descripcion: "Firma del acuerdo de paz entre el gobierno y la guerrilla FARC en 2016.",
            coordenadas: [4.5709, -74.2973],
            epoca: "contemporanea",
            imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Peace_Accord_FARC_Colombia_2016.jpg/640px-Peace_Accord_FARC_Colombia_2016.jpg",
            enlace: "https://es.wikipedia.org/wiki/Acuerdo_de_Paz_entre_el_gobierno_colombiano_y_las_FARC-EP"
        },
        {
    nombre: "Revolución de los Comuneros",
    descripcion: "En 1781, campesinos e indígenas se rebelaron contra los altos impuestos coloniales.",
    coordenadas: [6.5600, -73.1300],
    epoca: "moderna",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Sublevaci%C3%B3n_de_los_comuneros.jpg/640px-Sublevaci%C3%B3n_de_los_comuneros.jpg",
    enlace: "https://es.wikipedia.org/wiki/Revoluci%C3%B3n_de_los_Comuneros"
},
{
    nombre: "Independencia de Colombia",
    descripcion: "Proceso de independencia de Colombia del Imperio español (1810–1819).",
    coordenadas: [4.7110, -74.0721],
    epoca: "moderna",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Acta_de_Independencia_de_Colombia_1810.jpg/640px-Acta_de_Independencia_de_Colombia_1810.jpg",
    enlace: "https://es.wikipedia.org/wiki/Independencia_de_Colombia"
},
{
    nombre: "Batalla de Boyacá",
    descripcion: "Victoria decisiva del ejército patriota el 7 de agosto de 1819.",
    coordenadas: [5.4546, -73.3663],
    epoca: "moderna",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Monumento_Boyac%C3%A1.jpg/640px-Monumento_Boyac%C3%A1.jpg",
    enlace: "https://es.wikipedia.org/wiki/Batalla_de_Boyac%C3%A1"
},
{
    nombre: "Congreso de Angostura",
    descripcion: "Simón Bolívar propone la creación de la Gran Colombia en 1819.",
    coordenadas: [8.1292, -63.5409],
    epoca: "moderna",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Congreso_de_Angostura.jpg/640px-Congreso_de_Angostura.jpg",
    enlace: "https://es.wikipedia.org/wiki/Congreso_de_Angostura"
},
{
    nombre: "Creación de la Gran Colombia",
    descripcion: "Unión de Colombia, Venezuela, Ecuador y Panamá en 1819.",
    coordenadas: [4.5981, -74.0758],
    epoca: "moderna",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Gran_Colombia_1820.png/640px-Gran_Colombia_1820.png",
    enlace: "https://es.wikipedia.org/wiki/Gran_Colombia"
},
{
    nombre: "Separación de Venezuela y Ecuador",
    descripcion: "Disolución de la Gran Colombia entre 1829 y 1831.",
    coordenadas: [4.5709, -74.2973],
    epoca: "moderna",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Mapa_de_la_disoluci%C3%B3n_Gran_Colombia.jpg/640px-Mapa_de_la_disoluci%C3%B3n_Gran_Colombia.jpg",
    enlace: "https://es.wikipedia.org/wiki/Disoluci%C3%B3n_de_la_Gran_Colombia"
},
{
    nombre: "Constitución de Rionegro (1863)",
    descripcion: "Constitución federalista que dio origen a los Estados Unidos de Colombia.",
    coordenadas: [6.1549, -75.3767],
    epoca: "moderna",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Convenci%C3%B3n_de_Rionegro_1863.jpg/640px-Convenci%C3%B3n_de_Rionegro_1863.jpg",
    enlace: "https://es.wikipedia.org/wiki/Constituci%C3%B3n_de_Colombia_de_1863"
},
{
    nombre: "Regeneración y Constitución de 1886",
    descripcion: "Colombia adopta una constitución centralista que rige hasta 1991.",
    coordenadas: [4.5981, -74.0758],
    epoca: "moderna",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Rafael_Nu%C3%B1ez_y_la_Constituci%C3%B3n_de_1886.jpg/640px-Rafael_Nu%C3%B1ez_y_la_Constituci%C3%B3n_de_1886.jpg",
    enlace: "https://es.wikipedia.org/wiki/Constituci%C3%B3n_de_Colombia_de_1886"
},
{
    nombre: "Guerra de los Mil Días",
    descripcion: "Conflicto civil entre liberales y conservadores (1899-1902).",
    coordenadas: [7.0679, -73.8511],
    epoca: "moderna",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Guerra_de_los_mil_dias.jpg/640px-Guerra_de_los_mil_dias.jpg",
    enlace: "https://es.wikipedia.org/wiki/Guerra_de_los_Mil_D%C3%ADas"
},
{
    nombre: "Separación de Panamá",
    descripcion: "Panamá se separa de Colombia en 1903 con apoyo de Estados Unidos.",
    coordenadas: [8.9824, -79.5199],
    epoca: "moderna",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Separaci%C3%B3n_de_Panam%C3%A1.jpg/640px-Separaci%C3%B3n_de_Panam%C3%A1.jpg",
    enlace: "https://es.wikipedia.org/wiki/Separaci%C3%B3n_de_Panam%C3%A1_de_Colombia"
}
    ],
    contemporanea: [
        {
            nombre: "Primera Guerra Mundial",
            descripcion: "Frentes de batalla durante la Primera Guerra Mundial (1914-1918).",
            coordenadas: [50.8503, 4.3517],
            epoca: "contemporanea",
            imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/World_War_I_-_Europe.png/640px-World_War_I_-_Europe.png",
            enlace: "https://es.wikipedia.org/wiki/Primera_Guerra_Mundial"
        },
{
            nombre: "Guerra Fría",
            descripcion: "División del mundo durante la Guerra Fría (1947-1991).",
            coordenadas: [52.5200, 13.4050],
            epoca: "contemporanea",
            imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Cold_war_era_military_alliances.png/640px-Cold_war_era_military_alliances.png",
            enlace: "https://es.wikipedia.org/wiki/Guerra_Fr%C3%ADa"
},
{
    nombre: "Segunda Guerra Mundial",
    descripcion: "Conflicto global (1939-1945).",
    coordenadas: [52.5200, 13.4050],
    epoca: "contemporanea",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/1/12/WWII-Europe-1939-1945.jpg",
    enlace: "https://es.wikipedia.org/wiki/Segunda_Guerra_Mundial"
},
{
    nombre: "Caída del Muro de Berlín",
    descripcion: "Fin simbólico de la Guerra Fría en 1989.",
    coordenadas: [52.5200, 13.4050],
    epoca: "contemporanea",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/4/45/Berlin_Wall_Brandenburg_Gate.jpg",
    enlace: "https://es.wikipedia.org/wiki/Ca%C3%ADda_del_Muro_de_Berl%C3%ADn"
},
{
    nombre: "Ataques del 11 de septiembre",
    descripcion: "Atentados terroristas en EE. UU. en 2001.",
    coordenadas: [40.7128, -74.0060],
    epoca: "contemporanea",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/2/2d/WTC_smoking_on_9-11.jpeg",
    enlace: "https://es.wikipedia.org/wiki/Atentados_del_11_de_septiembre_de_2001"
},
{
    nombre: "Pandemia de COVID-19",
    descripcion: "Emergencia sanitaria global iniciada en 2019.",
    coordenadas: [30.5928, 114.3055],
    epoca: "contemporanea",
    imagen: "Pandemia de COVID-19.png",
    enlace: "https://es.wikipedia.org/wiki/Pandemia_de_COVID-19"
},
{
    nombre: "Invención de Internet",
    descripcion: "Inicio de la red global en los años 80-90.",
    coordenadas: [37.7749, -122.4194],
    epoca: "contemporanea",
    imagen: "Invención de Internet.png",
    enlace: "https://es.wikipedia.org/wiki/Historia_de_Internet"
},
{
    nombre: "Constitución de 1991",
    descripcion: "Se promulga la nueva constitución política de Colombia.",
    coordenadas: [4.5981, -74.0758],
    epoca: "contemporanea",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Congreso_de_la_Rep%C3%BAblica_de_Colombia.jpg/640px-Congreso_de_la_Rep%C3%BAblica_de_Colombia.jpg",
    enlace: "https://es.wikipedia.org/wiki/Constituci%C3%B3n_de_Colombia_de_1991"
},
{
    nombre: "Acuerdo de Paz con las FARC",
    descripcion: "Firma del acuerdo de paz entre el gobierno y la guerrilla FARC en 2016.",
    coordenadas: [4.5709, -74.2973],
    epoca: "contemporanea",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Peace_Accord_FARC_Colombia_2016.jpg/640px-Peace_Accord_FARC_Colombia_2016.jpg",
    enlace: "https://es.wikipedia.org/wiki/Acuerdo_de_Paz_entre_el_gobierno_colombiano_y_las_FARC-EP"
},
{
    nombre: "Bogotazo",
    descripcion: "Violenta revuelta tras el asesinato de Jorge Eliécer Gaitán en 1948.",
    coordenadas: [4.6097, -74.0817],
    epoca: "contemporanea",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/2/22/El_Bogotazo.jpg",
    enlace: "https://es.wikipedia.org/wiki/Bogotazo"
},
{
    nombre: "Toma del Palacio de Justicia",
    descripcion: "Asalto por parte del M-19 en 1985, con consecuencias fatales.",
    coordenadas: [4.5981, -74.0760],
    epoca: "contemporanea",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Palacio_de_Justicia_de_Bogot%C3%A1_-_Despu%C3%A9s_del_1985.jpg",
    enlace: "https://es.wikipedia.org/wiki/Toma_del_Palacio_de_Justicia"
},
{
    nombre: "Catástrofe de Armero",
    descripcion: "Erupción del Nevado del Ruiz en 1985 que sepultó a la ciudad de Armero.",
    coordenadas: [5.0309, -74.8897],
    epoca: "contemporanea",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/7/78/Armero_destruido.jpg",
    enlace: "https://es.wikipedia.org/wiki/Desastre_de_Armero"
},
{
    nombre: "Protestas del Paro Nacional 2021",
    descripcion: "Manifestaciones masivas contra reformas del gobierno en varias ciudades.",
    coordenadas: [3.4516, -76.5320],
    epoca: "contemporanea",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Protestas_Cali_Paro_Nacional_2021.jpg",
    enlace: "https://es.wikipedia.org/wiki/Paro_nacional_en_Colombia_de_2021"
},
{
    nombre: "Reconocimiento de los Derechos LGBT",
    descripcion: "Progresos legales y constitucionales para la comunidad LGBT en Colombia.",
    coordenadas: [4.5981, -74.0758],
    epoca: "contemporanea",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Gay_Pride_Bogot%C3%A1_2007.jpg/640px-Gay_Pride_Bogot%C3%A1_2007.jpg",
    enlace: "https://es.wikipedia.org/wiki/Derechos_LGBT_en_Colombia"
}
    ]
};

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes comunes
    initMenuMovil();
    initModal();
    initBotonesGenerales();
    
    // Si estamos en la página del mapa, inicializar funcionalidades específicas
    if (document.getElementById('mapa')) {
        initMapa();
        initFiltros();
        initLineaTiempo();
        initBusqueda();
        initExportacion();
    }
    
    // Si estamos en la página de inicio, inicializar ejemplos
    if (document.querySelector('.ver-mapa')) {
        initEjemplos();
    }
});

// Función para inicializar el menú móvil
function initMenuMovil() {
    const menuBtn = document.querySelector('.menu-movil');
    const nav = document.querySelector('.navegacion');
    
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function() {
            nav.classList.toggle('mostrar');
        });
    }
}

// Función para inicializar el modal
function initModal() {
    const modal = document.getElementById('modal');
    const cerrarModal = document.querySelector('.cerrar-modal');
    const recursosBtn = document.getElementById('recursos-btn');
    const acercaBtn = document.getElementById('acerca-btn');
    
    // Cerrar modal al hacer clic en la X
    if (cerrarModal) {
        cerrarModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Mostrar recursos educativos
    if (recursosBtn) {
        recursosBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('modal-contenido').innerHTML = `
                <h2>Recursos Educativos</h2>
                <div class="recursos-lista">
                    <div class="recurso">
                        <h3><i class="fas fa-link"></i> Enlaces útiles</h3>
                        <ul>
                            <li><a href="https://www.wikimedia.org/" target="_blank">Wikimedia Commons</a> - Imágenes históricas</li>
                            <li><a href="https://www.oldmapsonline.org/" target="_blank">Old Maps Online</a> - Mapas históricos</li>
                            <li><a href="https://www.arcgis.com/index.html" target="_blank">ArcGIS</a> - Plataforma de mapas</li>
                        </ul>
                    </div>
                    <div class="recurso">
                        <h3><i class="fas fa-video"></i> Videos educativos</h3>
                        <div class="video-container">
                            <iframe width="700" height="315" src="https://www.youtube.com/embed/6dg9hw2r_Sc" title="La Revolución Neolítica y las teorías sobre su origen" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            `;
            modal.style.display = 'block';
        });
    }
    
    // Mostrar información acerca de
    if (acercaBtn) {
        acercaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('modal-contenido').innerHTML = `
                <h2>Acerca de Aprende con Mapas</h2>
                <p>Plataforma educativa diseñada para facilitar el aprendizaje de la historia a través de mapas interactivos.</p>
                <p><strong>Versión:</strong> 1.0.0</p>
                <p><strong>Desarrollado por:</strong> Diego Fuentes Garcia, Edwin González Ortiz, Eder Trujillo Jiménez</p>
                <p><strong>Licencia:</strong> MIT</p>
                <p><i class="fas fa-code-branch"></i> <a href="https://github.com/IngenieroDiego/aprende-con-mapas" target="_blank">Repositorio en GitHub</a></p>
            `;
            modal.style.display = 'block';
        });
    }
}

// Función para inicializar botones generales
function initBotonesGenerales() {
    // Botón "Entrar al mapa interactivo" en la página de inicio
    const botonEntrar = document.querySelector('.hero .boton-primario');
    if (botonEntrar) {
        botonEntrar.addEventListener('click', function(e) {
            // Redirige a mapa.html
            console.log('Redirigiendo al mapa interactivo');
        });
    }
}

// Función para inicializar el mapa interactivo
function initMapa() {
    // Crear el mapa centrado en Europa
    mapa = L.map('mapa').setView([50, 10], 4);
    
    // Añadir capa base de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);
    
    // Cargar marcadores iniciales (Edad Moderna por defecto)
    cargarMarcadores(mapaActual);
}

// Función para cargar marcadores según época
function cargarMarcadores(epoca) {
    // Limpiar marcadores anteriores
    limpiarMarcadores();
    
    // Obtener datos para la época seleccionada
    const datos = datosHistoricos[epoca] || [];
    
    // Añadir cada marcador al mapa
    datos.forEach(item => {
        const marcador = L.marker(item.coordenadas).addTo(mapa)
            .bindPopup(crearPopupContent(item));
        
        marcadores.push(marcador);
    });
    
    // Si hay marcadores, ajustar la vista para mostrarlos todos
    if (datos.length > 0) {
        const grupo = new L.featureGroup(marcadores);
        mapa.fitBounds(grupo.getBounds().pad(0.2));
    }
}

// Función para crear el contenido del popup
function crearPopupContent(item) {
    return `
        <div class="popup-contenido">
            <h3 class="popup-titulo">${item.nombre}</h3>
            ${item.imagen ? `<img src="${item.imagen}" class="popup-imagen" alt="${item.nombre}">` : ''}
            <p class="popup-descripcion">${item.descripcion}</p>
            <a href="${item.enlace}" target="_blank" class="popup-enlace">
                <i class="fas fa-external-link-alt"></i> Más información en Wikipedia
            </a>
        </div>
    `;
}

// Función para limpiar todos los marcadores
function limpiarMarcadores() {
    marcadores.forEach(marcador => {
        mapa.removeLayer(marcador);
    });
    marcadores = [];
}

// Función para inicializar los filtros
function initFiltros() {
    const botonFiltros = document.getElementById('aplicar-filtros');
    if (botonFiltros) {
        botonFiltros.addEventListener('click', function() {
            const epoca = document.getElementById('epoca').value;
            const region = document.getElementById('region').value;
            const tema = document.getElementById('tema').value;
            
            // Aplicar filtros (en este ejemplo solo usamos la época)
            if (epoca !== 'todas') {
                mapaActual = epoca;
                cargarMarcadores(epoca);
            } else {
                // Mostrar todos los marcadores si no hay filtro de época
                mostrarTodosMarcadores();
            }
            
            // Aquí podríamos añadir lógica para filtrar por región y tema
            console.log(`Filtros aplicados - Época: ${epoca}, Región: ${region}, Tema: ${tema}`);
        });
    }
}

// Función para mostrar todos los marcadores
function mostrarTodosMarcadores() {
    limpiarMarcadores();
    
    // Combinar todos los marcadores de todas las épocas
    Object.keys(datosHistoricos).forEach(epoca => {
        datosHistoricos[epoca].forEach(item => {
            const marcador = L.marker(item.coordenadas).addTo(mapa)
                .bindPopup(crearPopupContent(item));
            
            marcadores.push(marcador);
        });
    });
    
    // Ajustar la vista para mostrar todos los marcadores
    if (marcadores.length > 0) {
        const grupo = new L.featureGroup(marcadores);
        mapa.fitBounds(grupo.getBounds().pad(0.5));
    }
}

// Función para inicializar la línea de tiempo
function initLineaTiempo() {
    const botonesEpoca = document.querySelectorAll('.epoca-btn');
    
    botonesEpoca.forEach(boton => {
        boton.addEventListener('click', function() {
            const epoca = this.getAttribute('data-epoca');
            
            // Actualizar botón activo
            botonesEpoca.forEach(btn => btn.classList.remove('activo'));
            this.classList.add('activo');
            
            // Cargar marcadores para la época seleccionada
            mapaActual = epoca;
            cargarMarcadores(epoca);
            
            // Actualizar selector de época
            document.getElementById('epoca').value = epoca;
        });
    });
}

// Función para inicializar la búsqueda
function initBusqueda() {
    const barraBusqueda = document.getElementById('buscar-mapa');
    const botonBuscar = document.querySelector('.busqueda button');
    
    function ejecutarBusqueda(termino) {
        termino = termino.toLowerCase().trim();
        
        if (!termino) {
            alert('Por favor ingresa un término de búsqueda');
            return;
        }
        
        // Buscar en todos los datos históricos
        let resultados = [];
        
        Object.keys(datosHistoricos).forEach(epoca => {
            datosHistoricos[epoca].forEach(item => {
                if (item.nombre.toLowerCase().includes(termino) || 
                    item.descripcion.toLowerCase().includes(termino)) {
                    resultados.push(item);
                }
            });
        });
        
        if (resultados.length === 0) {
            alert('No se encontraron resultados para: "' + termino + '"');
            return;
        }
        
        // Mostrar resultados en el mapa
        mostrarResultadosBusqueda(resultados);
    }
    
    if (barraBusqueda) {
        barraBusqueda.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                ejecutarBusqueda(this.value);
            }
        });
    }
    
    if (botonBuscar) {
        botonBuscar.addEventListener('click', function() {
            ejecutarBusqueda(barraBusqueda.value);
        });
    }
}

// Función para mostrar resultados de búsqueda
function mostrarResultadosBusqueda(resultados) {
    limpiarMarcadores();
    
    // Añadir marcadores para los resultados
    resultados.forEach(item => {
        const marcador = L.marker(item.coordenadas).addTo(mapa)
            .bindPopup(crearPopupContent(item));
        
        marcadores.push(marcador);
    });
    
    // Ajustar la vista para mostrar los resultados
    if (resultados.length > 0) {
        const grupo = new L.featureGroup(marcadores);
        mapa.fitBounds(grupo.getBounds().pad(0.2));
    }
}

// Función para inicializar la exportación
function initExportacion() {
    const botonExportar = document.getElementById('exportar-mapa');
    
    if (botonExportar) {
        botonExportar.addEventListener('click', function() {
            // Crear una imagen del mapa usando html2canvas (simulación)
            alert('Preparando mapa para exportación...');
            
            // En una implementación real usaríamos html2canvas o leaflet-image
            setTimeout(() => {
                const enlace = document.createElement('a');
                enlace.href = 'https://via.placeholder.com/1200x800/3498db/ffffff?text=Mapa+Exportado';
                enlace.download = 'mapa-historico.png';
                enlace.click();
                
                alert('Mapa exportado como imagen PNG');
            }, 1000);
        });
    }
}

// Función para inicializar los ejemplos en la página de inicio
function initEjemplos() {
    const botonesVerMapa = document.querySelectorAll('.ver-mapa');
    
    botonesVerMapa.forEach(boton => {
        boton.addEventListener('click', function() {
            const epoca = this.getAttribute('data-epoca');
            const ubicacion = this.getAttribute('data-ubicacion').split(',').map(Number);
            const zoom = parseInt(this.getAttribute('data-zoom'));
            
            // Guardar en localStorage para que mapa.html lo use
            localStorage.setItem('mapaConfig', JSON.stringify({
                epoca,
                centro: ubicacion,
                zoom
            }));
            
            // Redirigir a mapa.html
            window.location.href = 'mapa.html';
        });
    });
}

// Si hay configuración guardada, aplicarla al cargar mapa.html
if (document.getElementById('mapa') && localStorage.getItem('mapaConfig')) {
    const config = JSON.parse(localStorage.getItem('mapaConfig'));
    localStorage.removeItem('mapaConfig');
    
    document.addEventListener('DOMContentLoaded', function() {
        // Esperar a que el mapa se inicialice
        setTimeout(() => {
            mapa.setView(config.centro, config.zoom);
            
            // Seleccionar la época correspondiente
            document.getElementById('epoca').value = config.epoca;
            
            // Activar el botón correspondiente en la línea de tiempo
            document.querySelectorAll('.epoca-btn').forEach(boton => {
                boton.classList.remove('activo');
                if (boton.getAttribute('data-epoca') === config.epoca) {
                    boton.classList.add('activo');
                }
            });
            
            // Cargar los marcadores
            cargarMarcadores(config.epoca);
        }, 100);
    });
}