/* Textos del manual que no son fichas: marco, niveles, rutas, guía de recursos, plan, glosario y referencias.
   Para corregir una redacción basta con editar este archivo. */
window.MANUAL = window.MANUAL || {};

MANUAL.titulo = "Manual de competencia digital docente para la LELI mixta";
MANUAL.subtitulo = "Curso autogestivo basado en DigCompEdu";

MANUAL.presentacion = [
  "Este manual está dirigido a los profesores que imparten clases en la Licenciatura en Enseñanza de Lenguas con Opción en Inglés (LELI), modalidad mixta, de la BUAP, y se elaboró con el propósito de que cada docente conozca su nivel de competencia digital y cuente con una ruta concreta para subirlo, tomando como base el Marco Europeo para la Competencia Digital de los Educadores (DigCompEdu).",
  "En la modalidad mixta el profesor ve a sus alumnos pocas horas de manera presencial y el resto del trabajo ocurre en línea, por lo que las decisiones que se toman sobre qué recurso usar, cómo dar seguimiento entre una sesión y otra o cómo retroalimentar una producción oral dependen en gran medida de la competencia digital del docente. A esto se suma que los alumnos de la LELI serán profesores de inglés, de modo que la forma en la cual sus docentes usan la tecnología también es un modelo de lo que ellos harán después en sus propias aulas.",
  "El manual no es un catálogo de herramientas. Las fichas describen decisiones pedagógicas propias de la enseñanza de lenguas y la tecnología aparece solamente como el medio para llevarlas a cabo, ya que las aplicaciones cambian cada semestre y los criterios para elegirlas no."
];

MANUAL.pasos = [
  { n: 1, ruta: "diagnostico", nombre: "Diagnóstico", texto: "Se responde el cuestionario de 22 ítems, que es una adaptación del Check-In de DigCompEdu a la enseñanza de lenguas en modalidad mixta. Toma entre 20 y 25 minutos." },
  { n: 2, ruta: "resultado", nombre: "Interpretación", texto: "La página suma el puntaje para dar el nivel global (de A1 a C2) y arma el perfil por área, con el fin de ubicar en cuáles competencias se está más bajo y en cuáles más alto." },
  { n: 3, ruta: "fichas", nombre: "Fichas", texto: "Se eligen de una a tres competencias, se busca en su ficha la fila del nivel actual y se realiza el reto que ahí se indica para pasar al nivel siguiente." },
  { n: 4, ruta: "plan", nombre: "Plan personal", texto: "Se anota qué se va a hacer, en cuál materia, en qué fecha y con cuál evidencia, y al terminar el semestre se revisa lo logrado. El plan y el portafolio se pueden descargar." }
];

MANUAL.recomendacion = "Se recomienda trabajar pocas competencias por semestre y subir un nivel a la vez. Un docente que pasa de A2 a B1 en dos competencias y lo sostiene durante un semestre completo avanza más que uno que intenta cubrir las seis áreas al mismo tiempo.";

MANUAL.noHace = "El resultado del diagnóstico es una autoevaluación con fines formativos. No es una evaluación del desempeño docente, no se entrega a la coordinación y no certifica ningún nivel.";

MANUAL.marco = "DigCompEdu describe 22 competencias digitales propias de los educadores, organizadas en seis áreas, y propone seis niveles de progresión que van de A1 a C2, con la misma nomenclatura del Marco Común Europeo de Referencia para las Lenguas (MCER), la cual ya es conocida por los profesores de la licenciatura. Las áreas 2, 3, 4 y 5 forman el núcleo pedagógico del marco, mientras que el área 1 se refiere al entorno profesional del docente y el área 6 a lo que el docente hace para que sus alumnos desarrollen su propia competencia digital (Redecker, 2020).";

MANUAL.areaObserva = {
  1: "se comunica con sus alumnos entre una sesión presencial y otra, comparte materiales con sus colegas de academia y revisa su propia práctica en línea",
  2: "elige, adapta o crea materiales para el trabajo en línea de acuerdo con el nivel de lengua del grupo y respeta licencias y datos personales",
  3: "decide qué se trabaja en línea y qué en el aula, acompaña a los alumnos a distancia y organiza la interacción en la lengua meta fuera del salón",
  4: "evalúa las cuatro habilidades con medios digitales, revisa los datos de la plataforma y retroalimenta producciones orales y escritas",
  5: "toma en cuenta la conectividad y los dispositivos de sus alumnos, atiende niveles de lengua distintos en un mismo grupo y propone tareas en las que el alumno produce",
  6: "enseña a sus alumnos, futuros profesores de inglés, a buscar y evaluar fuentes, a crear materiales didácticos y a usar la tecnología con responsabilidad"
};

MANUAL.nivelesIntro = "La progresión es acumulativa, es decir, quien se ubica en B2 ya hace lo que se describe en A2 y B1. Además, el marco señala que hay un salto mayor entre A2 y B1 y entre B2 y C1 que entre los demás niveles, por lo que es normal que esos dos pasos tomen más tiempo.";

MANUAL.niveles = [
  { id: "A1", nombre: "Novel", caracteriza: "Conoce el potencial de la tecnología, pero la usa poco y casi siempre para preparar clases, tareas administrativas o avisos", necesita: "Orientación y estímulo para aplicarla con un fin pedagógico" },
  { id: "A2", nombre: "Explorador", caracteriza: "Ha comenzado a usar tecnologías en algunas áreas, sin seguir todavía un enfoque coherente", necesita: "Ver ejemplos de colegas e intercambiar prácticas" },
  { id: "B1", nombre: "Integrador", caracteriza: "Prueba tecnologías en varios contextos y las integra en muchas de sus prácticas; aún trabaja en saber cuál herramienta funciona mejor en cada situación", necesita: "Tiempo para experimentar y reflexionar" },
  { id: "B2", nombre: "Experto", caracteriza: "Usa diversas tecnologías con confianza y de manera crítica, y las selecciona para situaciones particulares", necesita: "Estructurar su repertorio de estrategias y compartirlo" },
  { id: "C1", nombre: "Líder", caracteriza: "Tiene un enfoque consistente, cuenta con un repertorio amplio y sabe elegir la estrategia adecuada; transmite su experiencia a otros", necesita: "Cuestionar las prácticas existentes y renovarlas" },
  { id: "C2", nombre: "Pionero", caracteriza: "Cuestiona las prácticas actuales, experimenta con tecnologías complejas o desarrolla enfoques pedagógicos nuevos", necesita: "Documentar y difundir lo que desarrolla" }
];

MANUAL.nivelesNota = "Un docente puede estar en niveles distintos según el área. Es común, por ejemplo, que un profesor con mucha experiencia en la selección de materiales (área 2) se encuentre en un nivel más bajo en analíticas de aprendizaje (4.2), y por eso el manual se trabaja por competencia y no por nivel global.";

MANUAL.diagnostico = {
  intro: [
    "El cuestionario es una adaptación del Check-In de DigCompEdu en su versión original para educación superior, del cual existe una traducción al español (Cabero-Almenara y Palacios-Rodríguez, 2020). Tiene 22 ítems, uno por cada competencia del marco, y cada ítem tiene un enunciado y cinco opciones ordenadas de menor a mayor uso, las cuales valen de 0 a 4 puntos. Lo que se adaptó es el contenido de los enunciados y de las opciones, que se llevaron a situaciones de la enseñanza de lenguas en modalidad mixta.",
    "Para responder se elige, en cada ítem, la opción que mejor describe lo que se hace actualmente en las materias de la LELI mixta, no lo que se quisiera hacer ni lo que se hizo una sola vez. Si dos opciones parecen adecuadas, se elige la más baja de las dos."
  ],
  previo: "Antes de comenzar se sugiere anotar en qué nivel se cree estar, con el fin de compararlo después con el resultado."
};

/* Rangos del Check-In de DigCompEdu */
MANUAL.rangosGlobal = [
  { nivel: "A1", min: 0, max: 19, texto: "Menos de 20" },
  { nivel: "A2", min: 20, max: 33, texto: "20 a 33" },
  { nivel: "B1", min: 34, max: 49, texto: "34 a 49" },
  { nivel: "B2", min: 50, max: 65, texto: "50 a 65" },
  { nivel: "C1", min: 66, max: 80, texto: "66 a 80" },
  { nivel: "C2", min: 81, max: 88, texto: "Más de 80" }
];
/* Por máximo del área: límite superior de A1, A2, B1, B2, C1 (C2 = máximo) */
MANUAL.rangosArea = { 16: [4, 7, 10, 13, 15], 12: [3, 5, 7, 9, 11], 20: [6, 8, 12, 16, 19] };

MANUAL.resultado = {
  global: "Los rangos son los que establece el Check-In de DigCompEdu (DigCompEdu CheckIn Self-reflection Tool, 2018).",
  area: "El informe de resultados del Check-In ofrece estos rangos como una orientación para ubicar fortalezas y áreas de desarrollo, y aclara que con tan pocos ítems por área no se puede calcular un puntaje fiable.",
  competencia: "Como cada competencia tiene un solo ítem, el puntaje de ese ítem indica en cuál fila de la ficha conviene empezar a leer. El documento del Check-In explica que, en la mayoría de los ítems, las dos primeras opciones corresponden al nivel A1 y la última al nivel B2, de modo que los niveles C1 y C2 se confirman leyendo la descripción de la ficha.",
  diferencia: "Si el nivel que se anotó antes de responder es distinto del que resultó, conviene revisar el perfil por área para ubicar de dónde viene la diferencia."
};
MANUAL.filaPorPuntos = [
  { fila: "A1", nota: "" },
  { fila: "A1", nota: "se lee también A2" },
  { fila: "A2", nota: "" },
  { fila: "B1", nota: "" },
  { fila: "B2", nota: "se leen también C1 y C2" }
];

MANUAL.elegir = {
  intro: "Se sugiere elegir de una a tres competencias para el semestre con base en estas preguntas:",
  preguntas: [
    "¿En cuál área se obtuvo el nivel más bajo? Si es una de las áreas 2, 3, 4 o 5, conviene empezar por ella, debido a que son las que tienen efecto directo en la clase.",
    "¿Cuál de los ítems con 0 o 1 punto corresponde a un problema que ya se tiene en el curso? Por ejemplo, alumnos que no entregan en línea (3.2, 4.2) o falta de práctica oral entre sesiones (3.3, 4.3).",
    "¿Hay una competencia en la cual se está a un paso de B1 o de C1? Esos dos saltos son los más grandes del marco y vale la pena dedicarles un semestre completo."
  ]
};

MANUAL.rutasIntro = "Algunas competencias se trabajan mejor juntas. Si el docente tiene identificado un problema en su curso, puede partir de él en lugar del puntaje más bajo.";
MANUAL.rutas = [
  { problema: "Los alumnos casi no practican la producción oral entre una sesión y otra", comps: ["4.1", "4.3", "3.3"], orden: "Primero 4.1 (grabación con rúbrica), después 4.3 (retroalimentación) y al final 3.3 (interacción en equipo)" },
  { problema: "Los alumnos no entregan o se atrasan en el trabajo en línea", comps: ["1.1", "4.2", "3.2"], orden: "Primero 1.1 (canales y calendario), después 4.2 (revisar los datos) y al final 3.2 (apoyo entre sesiones)" },
  { problema: "Los materiales no corresponden al nivel del grupo o al objetivo", comps: ["2.1", "3.1", "2.2"], orden: "Primero 2.1 (seleccionar con criterios), después 3.1 (ubicar el recurso en la secuencia) y al final 2.2 (adaptar)" },
  { problema: "En el grupo hay niveles de inglés muy distintos", comps: ["5.2", "3.4"], orden: "Primero 5.2 (actividades por nivel) y después 3.4 (metas y seguimiento del propio alumno)" },
  { problema: "Algunos alumnos no pueden hacer las tareas por su equipo o su conexión", comps: ["5.1", "3.1"], orden: "Primero 5.1 (conocer el acceso y adaptar) y después 3.1 (revisar qué se deja para la sesión presencial)" },
  { problema: "Los alumnos dependen del traductor o de la inteligencia artificial", comps: ["6.4", "6.1", "4.1"], orden: "Primero 6.4 (acordar el uso permitido), después 6.1 (comprobar lo que generan) y al final 4.1 (evaluar con producción oral)" },
  { problema: "Los alumnos participan poco", comps: ["5.3", "3.3", "6.3"], orden: "Primero 5.3 (tareas en las que producen), después 3.3 (trabajo en equipo en línea) y al final 6.3 (creación de contenido)" },
  { problema: "El docente trabaja sin intercambio con sus colegas", comps: ["1.2", "1.3", "1.4"], orden: "Primero 1.2 (intercambiar materiales), después 1.3 (revisar la práctica con un colega) y al final 1.4 (formación)" }
];

MANUAL.fichasInfo = {
  intro: "Hay una ficha por cada competencia, 22 en total, y todas tienen la misma estructura: una línea que explica qué significa esa competencia en la LELI mixta y una tabla con una fila por nivel. Después de la tabla, cada ficha desarrolla los cinco pasos de nivel, de A1 a A2 hasta C1 a C2.",
  reglas: [
    ["Un nivel a la vez.", "Los niveles son acumulativos, de modo que saltarse una fila deja huecos que aparecen después."],
    ["El reto se hace con un grupo real.", "Leer sobre una herramienta o tomar un curso no cumple el reto, salvo en la competencia 1.4."],
    ["El nivel se considera alcanzado cuando el reto se repite.", "Hacerlo una sola vez es probarlo, y hacerlo en dos unidades o en dos materias ya es parte de la práctica."]
  ],
  c2: "La fila C2 no tiene un nivel siguiente, así que su reto consiste en documentar y difundir lo que se hace.",
  herramientas: "Los nombres de herramientas que aparecen en las fichas son solamente ejemplos. Lo que se pide en cada reto es la decisión pedagógica, y se puede cumplir con la plataforma institucional o con cualquier otra herramienta que el docente ya conozca.",
  confirmar: "La descripción se lee para confirmar el nivel; si queda corta, se sube una fila, y si queda grande, se baja una.",
  tiempo: "El tiempo es una estimación y cambia según el tamaño del grupo."
};

MANUAL.guia = {
  intro: "Esta guía se usa cada vez que un reto de las fichas pide buscar, adaptar o incorporar un recurso o una herramienta, y se relaciona sobre todo con las competencias 2.1 (selección de recursos digitales) y 3.1 (enseñanza). El orden de los pasos es intencional: primero se define qué se quiere que el alumno haga con la lengua y después se busca la tecnología, ya que cuando se empieza por la herramienta se termina adaptando la clase a lo que la herramienta permite.",
  pasos: [
    { id: "A", titulo: "Partir del objetivo y de la habilidad", texto: "Antes de buscar se responde por escrito, en una o dos líneas, qué debe poder hacer el alumno al terminar la actividad y cuál habilidad o conocimiento de la lengua se trabaja. Si no se puede responder, todavía no es momento de elegir un recurso." },
    { id: "B", titulo: "Ubicar el momento de la secuencia", texto: "En la modalidad mixta el mismo recurso sirve o no según el momento en el cual se usa.",
      tabla: { cols: ["Momento", "Para qué conviene", "Lo que se le pide al recurso"], filas: [
        ["Antes de la sesión presencial", "Presentar contenido e input, activar conocimientos previos", "Que el alumno lo pueda usar solo, a su propio ritmo y más de una vez"],
        ["Durante la sesión presencial", "Práctica oral, interacción, resolver dudas", "Que no quite tiempo de práctica y que funcione con el equipo y la conexión del salón"],
        ["Después de la sesión presencial", "Reforzar, producir, recibir retroalimentación", "Que deje un registro de lo que el alumno hizo y permita comentarlo"]
      ] } },
    { id: "C", titulo: "Definir qué debe aportar la tecnología", texto: "Para cada necesidad de la clase de lengua hay una función que la tecnología debe cumplir, y es esa función la que se busca, no una aplicación en particular.",
      tabla: { cols: ["Necesidad pedagógica", "Lo que debe permitir la tecnología", "Tipo de recurso"], filas: [
        ["Comprensión oral y escrita", "Controlar el ritmo, repetir, contar con subtítulos o transcripción", "Audio o video con preguntas, lectura con glosario"],
        ["Práctica de vocabulario y gramática", "Retroalimentación inmediata y varios intentos", "Cuestionarios y actividades autocorregibles"],
        ["Producción oral", "Grabar, volver a escucharse y recibir comentarios", "Grabación de audio o video, notas de voz"],
        ["Producción escrita", "Guardar versiones y recibir comentarios al margen", "Documento compartido, tarea con rúbrica en la plataforma"],
        ["Interacción en la lengua meta", "Que los alumnos se respondan entre ellos fuera del aula", "Foro, videollamada en equipos pequeños, documento colaborativo"],
        ["Autonomía del alumno", "Registrar metas, avances y producciones", "Portafolio digital, listas de descriptores can-do"],
        ["Seguimiento y evaluación", "Ver datos por alumno y por pregunta", "Reportes de la plataforma, rúbricas en línea"]
      ] } },
    { id: "D", titulo: "Revisar el recurso con la lista de cotejo", texto: "Cuando ya se tienen dos o tres recursos candidatos, se revisan con estos ocho criterios y se elige el que cumple más.",
      tabla: { cols: ["Criterio", "Pregunta"], filas: [] } },
    { id: "E", titulo: "Revisar las condiciones de uso de la herramienta", texto: "Si el recurso requiere una herramienta que el grupo no ha usado, se revisan además estas condiciones.",
      tabla: { cols: ["Condición", "Pregunta", "Señal para descartarla"], filas: [
        ["Disponibilidad", "¿Ya se tiene en la institución una herramienta que haga lo mismo?", "La plataforma institucional ya cumple esa función"],
        ["Costo", "¿Es gratuita, y qué límites tiene la versión gratuita?", "El límite impide terminar la actividad con todo el grupo"],
        ["Registro", "¿Los alumnos tienen que crear una cuenta o dar datos personales?", "Pide más datos de los necesarios para la actividad"],
        ["Dispositivo", "¿Funciona en celular y con poca conexión?", "Solo funciona bien en computadora y con buena conexión"],
        ["Tiempo de aprendizaje", "¿Cuánto tardan el docente y los alumnos en aprender a usarla?", "Aprender a usarla toma más tiempo que la actividad"],
        ["Conservación", "¿Se puede descargar o exportar lo que los alumnos producen?", "Lo producido se pierde o queda atrapado en la herramienta"]
      ] },
      nota: "En el caso de los traductores automáticos y de las herramientas de inteligencia artificial se agregan dos cuidados: comprobar lo que generan antes de usarlo como muestra de lengua, y no subir a ellas trabajos ni datos de los alumnos." },
    { id: "F", titulo: "Probar antes y valorar después", texto: "Antes de usar el recurso con el grupo se prueba desde un celular y con una cuenta de alumno, siguiendo las mismas instrucciones que se van a dar. Después de usarlo se responden tres preguntas y la respuesta se guarda en el portafolio:",
      lista: [
        "¿Los alumnos lograron lo que se anotó en el paso A?",
        "¿La herramienta ayudó o quitó tiempo y atención a la lengua?",
        "¿Se vuelve a usar tal como está, se ajusta o se descarta?"
      ],
      nota: "Se recomienda trabajar con pocas herramientas y usarlas de manera constante durante el semestre, debido a que cada herramienta nueva le cuesta al grupo tiempo que no se dedica a la lengua." }
  ],
  criterios: [
    ["Objetivo", "¿A cuál objetivo de la unidad responde?"],
    ["Habilidad", "¿Qué habilidad o conocimiento de la lengua trabaja (comprensión oral o escrita, producción, interacción, vocabulario, gramática)?"],
    ["Nivel", "¿La lengua del recurso corresponde al nivel MCER del grupo o se puede graduar con apoyo?"],
    ["Muestra de lengua", "¿Es lengua auténtica o adaptada? ¿Qué variedad del inglés presenta?"],
    ["Tarea", "¿Qué hace el alumno con el recurso, además de verlo o leerlo?"],
    ["Lugar en la secuencia", "¿Se usa antes, durante o después de la sesión presencial, y con qué se conecta?"],
    ["Acceso", "¿Funciona en celular y con poca conexión? ¿Tiene subtítulos o transcripción?"],
    ["Licencia y datos", "¿Se permite usarlo y compartirlo? ¿Pide a los alumnos registrarse o dar datos personales?"]
  ],
  momentos: ["Antes de la sesión presencial", "Durante la sesión presencial", "Después de la sesión presencial"],
  decisiones: ["Se usa tal como está", "Se ajusta", "Se descarta"]
};
MANUAL.guia.pasos[3].tabla.filas = MANUAL.guia.criterios;

MANUAL.plan = {
  intro: "El plan personal convierte los retos de las fichas en compromisos con materia, fecha y evidencia. Se llena al inicio del semestre, después del diagnóstico, y se revisa a la mitad y al final.",
  ejemploIntro: "El ejemplo corresponde a un docente ficticio que obtuvo 31 puntos (A2, explorador), con el área 4 como la más baja, y cuyo problema principal es que sus alumnos casi no practican la producción oral entre una sesión y otra.",
  ejemplo: [
    ["4.1 Estrategias de evaluación", "A2", "B1", "Evaluar una producción oral por medio de una grabación, con una rúbrica que el alumno conoce de antemano", "Lengua meta, unidad 2", "Semana 5", "Instrucciones, rúbrica y una muestra", "Rúbrica de producción oral de la academia"],
    ["4.3 Retroalimentación", "A2", "B1", "Retroalimentar esa producción con una nota de voz: un acierto, un aspecto a mejorar y un ejemplo", "Lengua meta, unidad 2", "Semana 6", "Nota de voz", "Ninguno"],
    ["3.1 Enseñanza", "A2", "B1", "Planear la unidad 3 en tres columnas y comprobar que cada actividad en línea se retoma en el aula", "Lengua meta, unidad 3", "Semana 8", "Tabla de la unidad", "Revisión de un colega"]
  ],
  columnas: ["Competencia", "Nivel actual", "Nivel meta", "Reto (tomado de la ficha)", "Materia y unidad", "Fecha", "Evidencia", "Apoyo que se necesita"],
  calendario: [
    ["Semanas 1 y 2", "Diagnóstico, elección de competencias y llenado del plan"],
    ["Semanas 3 a 8", "Primer reto de cada competencia elegida, con un grupo real"],
    ["Semana 9", "Revisión intermedia: qué se cumplió, qué se ajusta"],
    ["Semanas 10 a 15", "Se repite el reto en otra unidad o materia; si ya se sostiene, se pasa a la fila siguiente"],
    ["Última semana", "Cierre: se responden de nuevo los ítems trabajados y se escribe la reflexión final"]
  ],
  preguntas: [
    "¿Cuáles retos se cumplieron y cuáles evidencias se guardaron?",
    "¿Qué cambió para los alumnos? Se anota un dato concreto, como entregas, participación o calidad de las producciones.",
    "¿Qué no funcionó y por qué?",
    "¿La descripción del nivel meta ya corresponde a lo que se hace de manera habitual?",
    "¿Cuáles competencias se trabajarán el siguiente semestre?"
  ],
  noCumplido: "Un reto que no se cumplió se revisa antes de descartarlo. Si resultó demasiado grande, se divide en dos pasos, y si la materia no se prestaba, se cambia de materia y se conserva la competencia.",
  portafolio: [
    "Las evidencias se guardan en una carpeta digital con una subcarpeta por competencia trabajada. Cada evidencia lleva una nota de cuatro líneas con la fecha, la materia y el grupo, el reto al que corresponde, y qué resultó con los alumnos.",
    "El portafolio sirve al propio docente para revisar su avance al cierre del semestre y como material para compartir con los colegas. Si incluye producciones de alumnos, se guardan sin nombre o con su autorización (ficha 2.3)."
  ],
  colegas: "El marco señala que el paso de un nivel a otro depende en buena medida del intercambio con otros docentes, y que en un equipo cada nivel aporta algo distinto: el explorador identifica los problemas que pueden tener los alumnos con una tecnología, el integrador propone ideas y herramientas, el experto decide cómo ponerlas en práctica y el líder o el pionero da forma al proyecto (Redecker, 2020). Por eso se recomienda trabajar el manual en parejas o tríos de docentes que eligieron competencias de la misma área, de preferencia con niveles distintos.",
  reuniones: [
    ["1", "Después del diagnóstico", "Cada docente presenta las competencias que eligió y su primer reto; los colegas señalan posibles dificultades"],
    ["2", "A la mitad del semestre", "Se muestra una evidencia y se comenta qué funcionó con los alumnos"],
    ["3", "Al cierre", "Se comparte la reflexión final y se decide qué materiales pasan a la carpeta común de la academia"]
  ],
  colegasNota: "Compartir el puntaje del diagnóstico es voluntario. Para estas reuniones basta con decir cuál competencia se trabaja y cuál reto se eligió."
};

MANUAL.glosario = [
  ["Analíticas de aprendizaje", "Datos que registra la plataforma sobre la actividad de los alumnos (accesos, entregas, intentos, resultados) y su uso para tomar decisiones del curso"],
  ["Can-do", "Descriptores del MCER redactados como lo que el alumno puede hacer en la lengua (\"puedo...\")"],
  ["Evaluación formativa", "Evaluación que se hace durante el proceso para orientar al alumno y ajustar la enseñanza, con o sin calificación"],
  ["Licencia Creative Commons", "Permiso que el autor da por adelantado para usar, compartir o modificar su obra bajo ciertas condiciones"],
  ["Modalidad mixta", "Modalidad que combina sesiones presenciales con trabajo en línea"],
  ["Portafolio digital", "Colección organizada de producciones del alumno o del docente, con una reflexión sobre su avance"],
  ["Recurso digital", "Cualquier material en formato digital que se usa para enseñar o aprender: texto, audio, video, actividad interactiva, cuestionario"],
  ["Recursos educativos abiertos (REA)", "Recursos con una licencia que permite usarlos, adaptarlos y compartirlos sin costo"],
  ["Reto", "Acción concreta de una ficha que se realiza con un grupo real para pasar al nivel siguiente"]
];

MANUAL.referencias = [
  { texto: "Cabero-Almenara, J., y Palacios-Rodríguez, A. (2020). Marco Europeo de Competencia Digital Docente «DigCompEdu». Traducción y adaptación del cuestionario «DigCompEdu Check-In». <i>EDMETIC, Revista de Educación Mediática y TIC, 9</i>(1), 213-234.", url: "https://doi.org/10.21071/edmetic.v9i1.12462" },
  { texto: "<i>DigCompEdu CheckIn Self-reflection Tool: English master for translation and localisation.</i> (2018).", url: "https://www.metared.org/content/dam/metared/pdf/Check_In_DigCompEdu_Self_Reflection_Tool.pdf" },
  { texto: "Redecker, C. (2020). <i>Marco Europeo para la Competencia Digital de los Educadores: DigCompEdu</i> (Trad. Fundación Universia y Ministerio de Educación y Formación Profesional de España). Secretaría General Técnica del Ministerio de Educación y Formación Profesional de España. (Original publicado en 2017)", url: "" }
];
