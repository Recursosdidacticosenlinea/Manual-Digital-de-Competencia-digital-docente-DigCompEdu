/* Curso autogestivo: diagnóstico, resultado, fichas con retos y plan personal.
   Todo se guarda en el navegador del docente (localStorage); no se envía nada a ningún servidor. */
(function () {
  "use strict";
  var M = window.MANUAL;
  var LV = ["A1", "A2", "B1", "B2", "C1", "C2"];
  var KEY = "cdd-leli:v1";
  var app = document.getElementById("app");
  var ALL = [];
  M.areas.forEach(function (a) { a.comps.forEach(function (c) { ALL.push(c); }); });

  /* ---------- estado ---------- */
  function blank() {
    return { v: 1, selfLevel: "", answers: {}, diagDate: "", diagPage: 0, perfil: { nombre: "", materias: "" },
      chosen: [], comps: {}, guia: [], revision: { mitad: [], cierre: [] }, cierre: {} };
  }
  var state = blank();
  var storageOk = true;
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) state = Object.assign(blank(), JSON.parse(raw));
    } catch (e) { storageOk = false; }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { storageOk = false; }
  }

  /* ---------- utilidades ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function nivel(id) { return M.niveles[LV.indexOf(id)]; }
  function areaOf(cid) { return M.areas[Number(cid[0]) - 1]; }
  function answered() { return ALL.filter(function (c) { return state.answers[c] != null; }).length; }
  function diagDone() { return answered() === ALL.length; }
  function total() { return ALL.reduce(function (s, c) { return s + (state.answers[c] || 0); }, 0); }
  function globalLevel(t) {
    for (var i = 0; i < M.rangosGlobal.length; i++) if (t <= M.rangosGlobal[i].max) return M.rangosGlobal[i].nivel;
    return "C2";
  }
  function areaPts(a) { return a.comps.reduce(function (s, c) { return s + (state.answers[c] || 0); }, 0); }
  function areaMax(a) { return a.comps.length * 4; }
  function areaLevel(a) {
    var r = M.rangosArea[areaMax(a)], p = areaPts(a);
    for (var i = 0; i < r.length; i++) if (p <= r[i]) return LV[i];
    return "C2";
  }
  function startLevel(cid) {
    var s = state.answers[cid];
    return s == null ? null : M.filaPorPuntos[s].fila;
  }
  function compState(cid) {
    if (!state.comps[cid]) state.comps[cid] = { level: "", steps: {} };
    return state.comps[cid];
  }
  function curLevel(cid) { return compState(cid).level || startLevel(cid) || "A1"; }
  function stepState(cid, lv) {
    var cs = compState(cid);
    if (!cs.steps[lv]) cs.steps[lv] = { materia: "", fecha: "", apoyo: "", detalle: "", checks: [], veces: 0, nota: "", link: "" };
    return cs.steps[lv];
  }
  function nextLevel(lv) { var i = LV.indexOf(lv); return i < 5 ? LV[i + 1] : null; }
  function planRows() {
    var rows = [];
    state.chosen.forEach(function (cid) {
      var cur = curLevel(cid), cs = compState(cid);
      LV.forEach(function (lv) {
        var st = cs.steps[lv];
        if (lv === cur || (st && st.veces > 0)) rows.push({ cid: cid, lv: lv, st: stepState(cid, lv) });
      });
    });
    return rows;
  }
  function extremes() {
    var idx = M.areas.map(function (a) { return LV.indexOf(areaLevel(a)); });
    var lo = Math.min.apply(null, idx), hi = Math.max.apply(null, idx);
    return {
      flat: lo === hi,
      low: M.areas.filter(function (a, i) { return idx[i] === lo; }),
      high: M.areas.filter(function (a, i) { return idx[i] === hi; })
    };
  }
  function areaNames(list) { return list.map(function (a) { return a.n + ". " + a.name; }).join("; "); }
  function setPath(path, value) {
    var parts = path.split("|"), o = state;
    for (var i = 0; i < parts.length - 1; i++) {
      if (o[parts[i]] == null) o[parts[i]] = {};
      o = o[parts[i]];
    }
    o[parts[parts.length - 1]] = value;
  }
  function badge(lv, extra) {
    return '<span class="badge' + (extra ? " " + extra : "") + '">' + lv + '</span>';
  }
  function vecesTexto(v) { return ["Pendiente", "Hecho una vez", "Repetido: nivel alcanzado"][v || 0]; }
  function table(cols, rows, cls) {
    return '<div class="tablewrap"><table class="' + (cls || "") + '"><thead><tr>' +
      cols.map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") + "</tr></thead><tbody>" +
      rows.map(function (r) { return "<tr>" + r.map(function (c, i) { return (i === 0 ? '<th scope="row">' : "<td>") + esc(c) + (i === 0 ? "</th>" : "</td>"); }).join("") + "</tr>"; }).join("") +
      "</tbody></table></div>";
  }
  function field(label, bind, value, opts) {
    opts = opts || {};
    var id = "f-" + bind.replace(/[^a-zA-Z0-9]/g, "-");
    var input = opts.area
      ? '<textarea id="' + id + '" data-bind="' + esc(bind) + '" rows="' + (opts.rows || 3) + '" placeholder="' + esc(opts.ph || "") + '">' + esc(value) + "</textarea>"
      : '<input id="' + id + '" type="text" data-bind="' + esc(bind) + '" value="' + esc(value) + '" placeholder="' + esc(opts.ph || "") + '">';
    return '<div class="field"><label for="' + id + '">' + esc(label) + "</label>" + input + "</div>";
  }

  /* ---------- navegación ---------- */
  var NAV = [
    { r: "", t: "Inicio" },
    { r: "diagnostico", t: "Diagnóstico", n: 1 },
    { r: "resultado", t: "Resultado", n: 2 },
    { r: "fichas", t: "Fichas y retos", n: 3 },
    { r: "plan", t: "Mi plan", n: 4 },
    { r: "portafolio", t: "Mi portafolio" },
    { r: "guia", t: "Guía de recursos" },
    { r: "marco", t: "Marco y glosario" }
  ];
  function stepDone(r) {
    if (r === "diagnostico" || r === "resultado") return diagDone();
    if (r === "fichas") return state.chosen.length > 0;
    if (r === "plan") return planRows().some(function (x) { return x.st.materia || x.st.fecha; });
    return false;
  }
  function renderNav(route) {
    var base = route.split("/")[0];
    if (base === "ficha") base = "fichas";
    document.getElementById("nav").innerHTML = NAV.map(function (n) {
      var cur = n.r === base;
      return '<a href="#/' + n.r + '"' + (cur ? ' aria-current="page"' : "") + ">" +
        (n.n ? '<span class="num' + (stepDone(n.r) ? " ok" : "") + '">' + (stepDone(n.r) ? "✓" : n.n) + "</span>" : "") +
        esc(n.t) + "</a>";
    }).join("");
  }

  /* ---------- vistas ---------- */
  function vInicio() {
    var started = answered() > 0, done = diagDone();
    var cta = done
      ? (state.chosen.length ? '<a class="btn primary" href="#/fichas">Continuar con mis retos</a>' : '<a class="btn primary" href="#/resultado">Ver mi resultado</a>')
      : '<a class="btn primary" href="#/diagnostico">' + (started ? "Continuar el diagnóstico" : "Comenzar el diagnóstico") + "</a>";
    return '<section class="hero"><p class="eyebrow">LELI modalidad mixta · BUAP</p><h1 tabindex="-1">' + esc(M.titulo) + "</h1>" +
      '<p class="lead">' + esc(M.subtitulo) + ". Cada docente responde el diagnóstico, conoce su nivel por área y sigue los retos de las fichas a su propio ritmo.</p>" +
      '<p class="autor">Autora: <strong>Angélica Méndez Luna</strong> · LELI modalidad mixta, BUAP</p>' +
      '<p class="actions">' + cta + (done ? "" : ' <a class="btn" href="#/marco">Conocer el marco</a>') + "</p></section>" +
      '<section><h2>Cómo se usa</h2><ol class="steps">' + M.pasos.map(function (p) {
        var ok = stepDone(p.ruta);
        return '<li class="' + (ok ? "ok" : "") + '"><a href="#/' + p.ruta + '"><span class="num' + (ok ? " ok" : "") + '">' + (ok ? "✓" : p.n) + "</span><strong>" + esc(p.nombre) + "</strong></a><p>" + esc(p.texto) + "</p></li>";
      }).join("") + "</ol>" +
      '<p>Después de las fichas se incluye una <a href="#/guia">guía para elegir recursos tecnológicos</a>, la cual se consulta cada vez que un reto pide buscar o incorporar un recurso o una herramienta.</p>' +
      '<p class="callout">' + esc(M.recomendacion) + "</p></section>" +
      "<section><h2>Presentación</h2>" + M.presentacion.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</section>" +
      '<section class="two"><div class="card"><h3>Lo que el manual no hace</h3><p>' + esc(M.noHace) + "</p></div>" +
      '<div class="card"><h3>Dónde se guarda el avance</h3><p>Las respuestas y el plan se guardan solamente en este navegador. No se envían a ningún servidor ni a la coordinación. Si se cambia de equipo o se borran los datos del navegador, el avance se pierde, por lo que conviene guardar una copia desde <a href="#/plan">Mi plan</a>.</p>' +
      (storageOk ? "" : '<p class="warn">Este navegador no permite guardar datos. Se puede usar la página, pero el avance se perderá al cerrarla.</p>') + "</div></section>";
  }

  function vDiagnostico() {
    var p = state.diagPage || 0;
    if (p === 0) {
      return '<h1 tabindex="-1">Paso 1. Diagnóstico</h1>' +
        M.diagnostico.intro.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") +
        '<div class="card"><h2 class="h3">Antes de comenzar</h2><p>' + esc(M.diagnostico.previo) + "</p>" +
        '<div class="chips" role="group" aria-label="Nivel en el que creo estar">' + M.niveles.map(function (n) {
          return '<button type="button" class="chip' + (state.selfLevel === n.id ? " on" : "") + '" aria-pressed="' + (state.selfLevel === n.id) + '" data-act="self" data-v="' + n.id + '"><b>' + n.id + "</b> " + esc(n.nombre) + "</button>";
        }).join("") + "</div>" +
        '<p class="hint">Si no se conocen los niveles, se pueden consultar en <a href="#/marco">Marco y glosario</a>. Este dato es opcional.</p></div>' +
        '<p class="actions"><button class="btn primary" data-act="diag-go" data-v="1">' + (answered() ? "Continuar el cuestionario" : "Comenzar el cuestionario") + "</button>" +
        (diagDone() ? ' <a class="btn" href="#/resultado">Ver mi resultado</a>' : "") + "</p>";
    }
    var a = M.areas[p - 1];
    var html = '<p class="eyebrow">Paso 1. Diagnóstico · Área ' + p + " de 6</p>" +
      '<h1 tabindex="-1">Área ' + a.n + ". " + esc(a.name) + "</h1>" +
      '<div class="progress" aria-hidden="true"><span id="diag-bar"></span></div><p class="hint" id="diag-count"></p>' +
      '<p class="hint">Se elige la opción que mejor describe lo que se hace actualmente. Si dos opciones parecen adecuadas, se elige la más baja.</p>';
    a.comps.forEach(function (cid) {
      var c = M.comps[cid];
      html += '<fieldset class="item" id="item-' + cid.replace(".", "-") + '"><legend><span class="cid">' + cid + "</span> " + esc(c.item) + "</legend>" +
        c.options.map(function (o, i) {
          return '<label class="opt"><input type="radio" name="q' + cid + '" value="' + i + '" data-answer="' + cid + '"' + (state.answers[cid] === i ? " checked" : "") + "><span>" + esc(o) + "</span></label>";
        }).join("") + "</fieldset>";
    });
    html += '<p class="warn" id="diag-missing" hidden></p><p class="actions between">' +
      '<button class="btn" data-act="diag-go" data-v="' + (p - 1) + '">Anterior</button>' +
      '<button class="btn primary" data-act="diag-next">' + (p === 6 ? "Ver mi resultado" : "Siguiente área") + "</button></p>";
    return html;
  }
  function refreshDiag() {
    var bar = document.getElementById("diag-bar");
    if (!bar) return;
    bar.style.width = Math.round(answered() / ALL.length * 100) + "%";
    document.getElementById("diag-count").textContent = answered() + " de " + ALL.length + " ítems respondidos";
  }

  function vResultado() {
    if (!diagDone()) {
      return '<h1 tabindex="-1">Paso 2. Interpretación del resultado</h1><div class="card"><p>El resultado aparece cuando se responden los 22 ítems del diagnóstico. Van ' + answered() + " de 22.</p>" +
        '<p class="actions"><a class="btn primary" href="#/diagnostico">Ir al diagnóstico</a></p></div>';
    }
    var t = total(), g = nivel(globalLevel(t)), ex = extremes();
    var html = '<h1 tabindex="-1">Paso 2. Interpretación del resultado</h1>' +
      '<section class="result"><div class="score"><span class="big">' + t + '</span><span class="of">de 88 puntos</span></div>' +
      '<div><p class="eyebrow">Nivel global</p><h2>' + g.id + " · " + esc(g.nombre) + "</h2><p>" + esc(g.caracteriza) + ".</p>" +
      "<p><strong>Lo que necesita para avanzar:</strong> " + esc(g.necesita.charAt(0).toLowerCase() + g.necesita.slice(1)) + ".</p></div></section>";
    if (state.selfLevel) {
      html += '<p class="callout">Antes de responder se anotó el nivel <strong>' + state.selfLevel + "</strong> y el resultado es <strong>" + g.id + "</strong>. " +
        (state.selfLevel === g.id ? "Coinciden." : esc(M.resultado.diferencia)) + "</p>";
    }
    html += '<p class="hint">' + esc(M.resultado.global) + "</p>";
    html += "<section><h2>Perfil por área</h2><p>El perfil es el dato más útil para elegir en cuáles fichas trabajar.</p><div class=\"profile\">" + M.areas.map(function (a) {
      var pts = areaPts(a), mx = areaMax(a), lv = areaLevel(a);
      var tag = ex.flat ? "" : (ex.low.indexOf(a) >= 0 ? '<span class="tag low">Nivel más bajo</span>' : (ex.high.indexOf(a) >= 0 ? '<span class="tag high">Nivel más alto</span>' : ""));
      return '<div class="prow"><div class="pname"><strong>' + a.n + ". " + esc(a.name) + "</strong> " + tag + "</div>" +
        '<div class="pbar" role="img" aria-label="' + pts + " de " + mx + ' puntos"><span style="width:' + (pts / mx * 100) + '%"></span></div>' +
        '<div class="pval">' + pts + " / " + mx + "</div><div>" + badge(lv) + " " + esc(nivel(lv).nombre) + "</div></div>";
    }).join("") + '</div><p class="hint">' + esc(M.resultado.area) + "</p></section>";
    html += "<section><h2>Nivel por competencia</h2><p>" + esc(M.resultado.competencia) + "</p>" +
      '<div class="tablewrap"><table><thead><tr><th>Competencia</th><th>Puntos</th><th>Fila de la ficha por la que se empieza</th></tr></thead><tbody>';
    M.areas.forEach(function (a) {
      html += '<tr class="group"><th colspan="3" scope="colgroup">Área ' + a.n + ". " + esc(a.name) + "</th></tr>";
      a.comps.forEach(function (cid) {
        var s = state.answers[cid], f = M.filaPorPuntos[s];
        html += '<tr><th scope="row"><a href="#/ficha/' + cid + '">' + cid + " " + esc(M.comps[cid].title) + "</a></th><td>" + dots(s) + "</td><td>" + badge(f.fila) + (f.nota ? ' <span class="hint">(' + esc(f.nota) + ")</span>" : "") + "</td></tr>";
      });
    });
    html += "</tbody></table></div></section>" +
      '<p class="actions between"><button class="btn" data-act="diag-go" data-v="1">Revisar mis respuestas</button><a class="btn primary" href="#/fichas">Elegir en qué trabajar</a></p>' +
      '<p class="hint">Diagnóstico respondido el ' + esc(state.diagDate) + ". " + esc(M.noHace) + "</p>";
    return html;
  }
  function dots(s) {
    var o = '<span class="dots" aria-label="' + s + ' de 4 puntos">';
    for (var i = 1; i <= 4; i++) o += '<i class="' + (i <= s ? "on" : "") + '"></i>';
    return o + '</span> <span class="hint">' + s + "</span>";
  }

  function tagsFor(cid) {
    if (!diagDone()) return "";
    var s = state.answers[cid], ex = extremes(), out = "";
    if (!ex.flat && ex.low.indexOf(areaOf(cid)) >= 0) out += '<span class="tag low">Área con el nivel más bajo</span>';
    if (s <= 1) out += '<span class="tag">0 o 1 punto</span>';
    if (s === 2) out += '<span class="tag step">A un paso de B1</span>';
    if (s === 4) out += '<span class="tag step">A un paso de C1</span>';
    return out;
  }
  function chosenCard(cid) {
    var c = M.comps[cid], lv = curLevel(cid), nx = nextLevel(lv), st = stepState(cid, lv);
    return '<div class="card mine"><p class="eyebrow">Competencia ' + cid + "</p><h3>" + esc(c.title) + "</h3>" +
      "<p>" + badge(lv, "now") + (nx ? ' <span aria-hidden="true">→</span> ' + badge(nx) : "") + ' <span class="status s' + st.veces + '">' + vecesTexto(st.veces) + "</span></p>" +
      '<p class="reto">' + esc(c.rows[lv].challenge) + "</p>" +
      '<p class="actions"><a class="btn primary" href="#/ficha/' + cid + '">Abrir la ficha</a> <button class="btn ghost" data-act="toggle" data-v="' + cid + '">Quitar</button></p></div>';
  }
  function vFichas() {
    var html = '<h1 tabindex="-1">Paso 3. Fichas de progresión</h1><p>' + esc(M.fichasInfo.intro) + "</p>";
    if (!diagDone()) html += '<p class="callout">Todavía no se ha respondido el diagnóstico, así que las fichas se abren en la fila A1. Se pueden leer, pero conviene <a href="#/diagnostico">responder primero el diagnóstico</a>.</p>';
    html += '<section><h2>Mis competencias de este semestre</h2>';
    if (state.chosen.length) {
      html += '<div class="grid">' + state.chosen.map(chosenCard).join("") + "</div>" +
        '<p class="actions"><a class="btn" href="#/plan">Ver mi plan</a></p>';
    } else {
      html += '<p class="empty">Aún no se ha elegido ninguna. Se eligen de una a tres en la lista de abajo o a partir de un problema del curso.</p>';
    }
    html += "</section><section><h2>Cómo elegir en qué trabajar</h2><p>" + esc(M.elegir.intro) + "</p><ul>" +
      M.elegir.preguntas.map(function (q) { return "<li>" + esc(q) + "</li>"; }).join("") + "</ul>";
    M.areas.forEach(function (a) {
      html += '<h3 class="areahead">Área ' + a.n + ". " + esc(a.name) + (diagDone() ? " " + badge(areaLevel(a)) : "") + "</h3>" +
        (a.intro ? '<p class="hint">' + esc(a.intro) + "</p>" : "") + '<ul class="complist">' + a.comps.map(function (cid) {
          var on = state.chosen.indexOf(cid) >= 0;
          return '<li class="' + (on ? "on" : "") + '"><div><a href="#/ficha/' + cid + '"><span class="cid">' + cid + "</span> " + esc(M.comps[cid].title) + "</a>" +
            (diagDone() ? ' <span class="hint">· ' + state.answers[cid] + " pts · fila " + startLevel(cid) + "</span>" : "") +
            '<div class="tags">' + tagsFor(cid) + "</div></div>" +
            '<button class="btn small' + (on ? " on" : "") + '" aria-pressed="' + on + '" data-act="toggle" data-v="' + cid + '">' + (on ? "Elegida ✓" : "Elegir") + "</button></li>";
        }).join("") + "</ul>";
    });
    html += '</section><section><h2>Partir de un problema del curso</h2><p>' + esc(M.rutasIntro) + '</p><div class="grid">' +
      M.rutas.map(function (r, i) {
        return '<div class="card"><h3>' + esc(r.problema) + '</h3><p class="chips static">' + r.comps.map(function (c) { return '<a class="chip" href="#/ficha/' + c + '">' + c + "</a>"; }).join("") + "</p><p>" + esc(r.orden) + ".</p>" +
          '<p class="actions"><button class="btn small" data-act="ruta" data-v="' + i + '">Elegir esta ruta</button></p></div>';
      }).join("") + "</div></section>" +
      '<section><h2>Tres reglas para usar las fichas</h2><ul>' + M.fichasInfo.reglas.map(function (r) { return "<li><strong>" + esc(r[0]) + "</strong> " + esc(r[1]) + "</li>"; }).join("") + "</ul>" +
      "<p>" + esc(M.fichasInfo.c2) + "</p><p>" + esc(M.fichasInfo.herramientas) + "</p></section>";
    return html;
  }

  function stepBlock(cid, lv) {
    var c = M.comps[cid], row = c.rows[lv], s = c.steps[lv], st = stepState(cid, lv), nx = nextLevel(lv), base = "comps|" + cid + "|steps|" + lv + "|";
    var n = 0, sec = function (t) { n++; return '<h3 class="sec"><span class="num">' + n + "</span>" + t + "</h3>"; };
    var html = '<section class="card reto-card" id="mi-reto"><p class="eyebrow">Mi reto actual · ' + (nx ? "de " + lv + " a " + nx : "nivel C2") + "</p>" +
      sec("Qué voy a hacer") + '<p class="reto">' + esc(row.challenge) + (/[.?!]$/.test(row.challenge) ? "" : ".") + "</p>" +
      '<p class="hint">Se hace con un grupo real, en una materia de este semestre.</p>';
    if (s) {
      html += sec("Cómo hacerlo, paso a paso") + '<ol class="pasos">' + s.steps.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ol>" +
        '<p><strong>Tiempo aproximado:</strong> ' + esc(s.time) + '. <span class="hint">' + esc(M.fichasInfo.tiempo) + "</span></p>";
    } else {
      html += "<p>" + esc(M.fichasInfo.c2) + "</p>";
    }
    html += sec("Qué guardo como evidencia") + '<p class="evid">' + esc(row.evidence) + "</p>" +
      '<p class="hint">Es el producto que demuestra que el reto se cumplió. Se guarda en la carpeta del portafolio, en la subcarpeta de esta competencia.</p>';
    if (s) {
      html += sec("Cómo sé que lo logré") + '<p class="hint">Se marca cada indicador cuando se cumple.</p>' + s.done.map(function (d, i) {
        return '<label class="check"><input type="checkbox" data-bind="' + base + "checks|" + i + '"' + (st.checks[i] ? " checked" : "") + "><span>" + esc(d) + "</span></label>";
      }).join("");
    }
    html += sec("Lo llevo a mi plan") + '<p class="hint">Aquí el reto se vuelve un compromiso concreto. Lo que se anota aparece en Mi plan y en Mi portafolio.</p><div class="fields">' +
      field("Materia y unidad", base + "materia", st.materia, { ph: "Lengua meta, unidad 2" }) +
      field("Fecha en que lo haré", base + "fecha", st.fecha, { ph: "Semana 5" }) +
      field("Apoyo que se necesita", base + "apoyo", st.apoyo, { ph: "Revisión de un colega" }) + "</div>" +
      field("Cómo lo haré en mi curso", base + "detalle", st.detalle || "", { area: true, rows: 3, ph: "Con cuál grupo, sobre qué tema u objetivo de la unidad y con cuál herramienta o espacio de la plataforma" });
    html += sec("Mi avance") + '<div class="seg" role="group" aria-label="Avance del reto">' + [0, 1, 2].map(function (v) {
        return '<button type="button" class="' + (st.veces === v ? "on" : "") + '" aria-pressed="' + (st.veces === v) + '" data-act="veces" data-cid="' + cid + '" data-lv="' + lv + '" data-v="' + v + '">' +
          ["Pendiente", "Lo hice una vez", "Lo repetí en otra unidad o materia"][v] + "</button>";
      }).join("") + "</div>" +
      '<p class="hint">Hacerlo una sola vez es probarlo, y hacerlo en dos unidades o en dos materias ya es parte de la práctica.</p>';
    if (st.veces === 2) {
      html += '<div class="done-box"><p><strong>' + (nx ? "Nivel " + nx + " alcanzado en esta competencia." : "Reto de C2 sostenido.") + "</strong> " +
        (nx ? "Se puede pasar a la fila siguiente este semestre o dejarla para el próximo." : "") + "</p>" +
        (nx ? '<button class="btn primary" data-act="subir" data-cid="' + cid + '" data-v="' + nx + '">Pasar a la fila ' + nx + "</button>" : "") + "</div>";
    }
    html += field("Qué resultó con los alumnos", base + "nota", st.nota, { area: true, rows: 4, ph: "Fecha en que se hizo, grupo, qué pasó y un dato concreto (entregas, participación, calidad de las producciones)" }) +
      field("Enlace a la evidencia (opcional)", base + "link", st.link || "", { ph: "https://... carpeta o archivo en la nube" }) +
      '<p class="hint">La página no guarda archivos. La evidencia se guarda en una carpeta propia y aquí se pega su enlace. Si incluye producciones de alumnos, se guardan sin nombre o con su autorización.</p>' +
      '<p class="actions"><a class="btn" href="#/portafolio">Ver mi portafolio</a></p></section>';
    return html;
  }
  function vFicha(cid) {
    var c = M.comps[cid];
    if (!c) return vFichas();
    var a = areaOf(cid), lv = curLevel(cid), on = state.chosen.indexOf(cid) >= 0, s = state.answers[cid];
    var i = ALL.indexOf(cid);
    var html = '<p class="crumbs"><a href="#/fichas">Fichas</a> › Área ' + a.n + ". " + esc(a.name) + "</p>" +
      '<h1 tabindex="-1">Ficha ' + cid + " " + esc(c.title) + "</h1>" + (c.intro ? '<p class="lead">' + esc(c.intro) + "</p>" : (a.intro ? '<p class="lead">' + esc(a.intro) + "</p>" : "")) +
      '<p class="actions"><button class="btn' + (on ? " on" : " primary") + '" aria-pressed="' + on + '" data-act="toggle" data-v="' + cid + '">' + (on ? "En mis competencias ✓" : "Añadir a mis competencias") + "</button></p>";
    if (s != null) {
      html += '<div class="callout"><strong>Mi respuesta en el diagnóstico (' + s + " de 4):</strong> " + esc(c.options[s]) + " La lectura empieza en la fila " + M.filaPorPuntos[s].fila + (M.filaPorPuntos[s].nota ? " (" + M.filaPorPuntos[s].nota + ")" : "") + ".</div>";
    }
    html += "<section><h2>Progresión</h2><p class=\"hint\">" + esc(M.fichasInfo.confirmar) + '</p><div class="levels">' +
      '<div class="lrow lhead" aria-hidden="true"><div>Nivel</div><div>Así se ve en la práctica</div><div>Reto para subir</div><div>Evidencia</div><div></div></div>' +
      LV.map(function (l) {
        var r = c.rows[l], cur = l === lv, st = compState(cid).steps[l];
        return '<div class="lrow' + (cur ? " cur" : "") + '"><div class="lname">' + badge(l, cur ? "now" : "") + "<span>" + esc(nivel(l).nombre) + "</span>" + (st && st.veces === 2 ? '<span class="tag high">Logrado</span>' : "") + "</div>" +
          '<div data-l="Así se ve en la práctica">' + esc(r.practice) + '</div><div data-l="Reto para subir">' + esc(r.challenge) + '</div><div data-l="Evidencia">' + esc(r.evidence) + "</div>" +
          "<div>" + (cur ? '<span class="here">Mi fila</span>' : '<button class="btn small ghost" data-act="fila" data-cid="' + cid + '" data-v="' + l + '">Estoy aquí</button>') + "</div></div>";
      }).join("") + "</div>" + c.notes.map(function (n) { return '<p class="hint">' + esc(n) + ' <a href="#/guia">Abrir la guía</a>.</p>'; }).join("") + "</section>";
    html += stepBlock(cid, lv);
    html += '<section class="two"><div class="card"><h3>Ejemplo resuelto</h3>' + c.example.map(function (e) { return "<p>" + esc(e) + "</p>"; }).join("") + "</div>" +
      '<div class="card"><h3>Dificultades frecuentes</h3><dl class="diff">' + c.difficulties.map(function (d) { return "<dt>" + esc(d.problem) + "</dt><dd>" + esc(d.action) + "</dd>"; }).join("") + "</dl></div></section>";
    html += "<section><h2>Los cinco pasos de nivel</h2><p class=\"hint\">Para ver el camino completo. " + esc(M.fichasInfo.tiempo) + "</p>" + LV.slice(0, 5).map(function (l) {
      var st = c.steps[l];
      return "<details" + (l === lv ? ' class="cur"' : "") + "><summary>De " + l + " a " + st.to + (l === lv ? " · mi reto actual" : "") + "</summary><p><strong>Reto:</strong> " + esc(st.challenge) + "</p><ol>" +
        st.steps.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ol><p><strong>Tiempo aproximado:</strong> " + esc(st.time) + ".</p><p><strong>Se logró cuando:</strong></p><ul>" +
        st.done.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul></details>";
    }).join("") + "</section>";
    html += '<p class="actions between">' + (i > 0 ? '<a class="btn" href="#/ficha/' + ALL[i - 1] + '">‹ Ficha ' + ALL[i - 1] + "</a>" : "<span></span>") +
      (i < ALL.length - 1 ? '<a class="btn" href="#/ficha/' + ALL[i + 1] + '">Ficha ' + ALL[i + 1] + " ›</a>" : "<span></span>") + "</p>";
    return html;
  }

  function vGuia() {
    var g = M.guia;
    var html = '<h1 tabindex="-1">Guía para elegir recursos tecnológicos</h1><p>' + esc(g.intro) + "</p>";
    g.pasos.forEach(function (p) {
      html += '<section><h2><span class="letter">' + p.id + "</span> " + esc(p.titulo) + "</h2><p>" + esc(p.texto) + "</p>" +
        (p.tabla ? table(p.tabla.cols, p.tabla.filas) : "") +
        (p.lista ? "<ul>" + p.lista.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : "") +
        (p.nota ? '<p class="callout">' + esc(p.nota) + "</p>" : "") + "</section>";
    });
    html += '<section><h2>Registro de la selección</h2><p>Cada recurso o herramienta que se revisa se anota aquí. El registro se incluye en la descarga del plan.</p>';
    state.guia.forEach(function (r, i) {
      var b = "guia|" + i + "|", n = (r.criterios || []).filter(Boolean).length;
      html += '<div class="card reg"><div class="fields">' +
        field("Recurso o herramienta", b + "recurso", r.recurso) +
        field("Objetivo y habilidad", b + "objetivo", r.objetivo) +
        '<div class="field"><label for="g-m-' + i + '">Momento de la secuencia</label><select id="g-m-' + i + '" data-bind="' + b + 'momento"><option value="">Elegir</option>' +
        g.momentos.map(function (m) { return "<option" + (r.momento === m ? " selected" : "") + ">" + esc(m) + "</option>"; }).join("") + "</select></div>" +
        field("Qué aporta la tecnología", b + "aporta", r.aporta) + "</div>" +
        '<fieldset class="crit"><legend>Criterios que cumple: <strong data-count="' + i + '">' + n + "</strong> de 8</legend>" + g.criterios.map(function (c, k) {
          return '<label class="check" title="' + esc(c[1]) + '"><input type="checkbox" data-bind="' + b + "criterios|" + k + '" data-crit="' + i + '"' + ((r.criterios || [])[k] ? " checked" : "") + "><span><strong>" + esc(c[0]) + ".</strong> " + esc(c[1]) + "</span></label>";
        }).join("") + "</fieldset>" +
        '<div class="fields"><div class="field"><label for="g-d-' + i + '">Decisión</label><select id="g-d-' + i + '" data-bind="' + b + 'decision"><option value="">Elegir</option>' +
        g.decisiones.map(function (m) { return "<option" + (r.decision === m ? " selected" : "") + ">" + esc(m) + "</option>"; }).join("") + "</select></div></div>" +
        '<p class="actions"><button class="btn small ghost" data-act="guia-del" data-v="' + i + '">Eliminar este registro</button></p></div>';
    });
    html += '<p class="actions"><button class="btn primary" data-act="guia-add">Agregar un recurso</button></p></section>';
    return html;
  }

  function datosPartida() {
    var done = diagDone(), t = total(), ex = done ? extremes() : null;
    return [
      ["Fecha del diagnóstico", done ? state.diagDate : "Sin responder"],
      ["Nivel en el que creía estar", state.selfLevel || "No se anotó"],
      ["Puntaje total y nivel global", done ? t + " de 88 · " + globalLevel(t) + " (" + nivel(globalLevel(t)).nombre + ")" : "Sin responder"],
      ["Área con el nivel más alto", done ? (ex.flat ? "Todas en el mismo nivel" : areaNames(ex.high)) : "Sin responder"],
      ["Área con el nivel más bajo", done ? (ex.flat ? "Todas en el mismo nivel" : areaNames(ex.low)) : "Sin responder"]
    ];
  }
  function vPlan() {
    var P = M.plan, rows = planRows();
    var html = '<h1 tabindex="-1">Paso 4. Plan personal de desarrollo</h1><p>' + esc(P.intro) + "</p>" +
      '<section><h2>Datos de partida</h2><div class="fields">' + field("Nombre", "perfil|nombre", state.perfil.nombre) +
      field("Materias que imparte en la LELI mixta este semestre", "perfil|materias", state.perfil.materias) + "</div>" +
      '<dl class="meta wide">' + datosPartida().map(function (d) { return "<div><dt>" + esc(d[0]) + "</dt><dd>" + esc(d[1]) + "</dd></div>"; }).join("") + "</dl></section>";
    html += "<section><h2>Mi plan</h2>";
    if (!rows.length) {
      html += '<p class="empty">El plan se arma con los retos de las competencias elegidas. <a href="#/fichas">Elegir competencias</a>.</p>';
    } else {
      rows.forEach(function (r) {
        var c = M.comps[r.cid], nx = nextLevel(r.lv), b = "comps|" + r.cid + "|steps|" + r.lv + "|";
        html += '<div class="card planrow"><div class="phead"><h3><a href="#/ficha/' + r.cid + '">' + r.cid + " " + esc(c.title) + "</a></h3><p>" + badge(r.lv, "now") + (nx ? ' <span aria-hidden="true">→</span> ' + badge(nx) : "") +
          ' <span class="status s' + r.st.veces + '">' + vecesTexto(r.st.veces) + "</span></p></div>" +
          '<p class="reto">' + esc(c.rows[r.lv].challenge) + "</p><p><strong>Evidencia:</strong> " + esc(c.rows[r.lv].evidence) + "</p>" +
          '<div class="fields">' + field("Materia y unidad", b + "materia", r.st.materia, { ph: "Lengua meta, unidad 2" }) + field("Fecha", b + "fecha", r.st.fecha, { ph: "Semana 5" }) +
          field("Apoyo que se necesita", b + "apoyo", r.st.apoyo, { ph: "Ninguno" }) + "</div></div>";
      });
    }
    html += "<details><summary>Ver un ejemplo lleno</summary><p>" + esc(P.ejemploIntro) + "</p>" + table(P.columnas, P.ejemplo, "small") + "</details></section>";
    html += "<section><h2>Calendario sugerido para un semestre</h2>" + table(["Momento", "Qué se hace"], P.calendario) + "</section>";
    html += "<section><h2>Revisión intermedia y cierre</h2><p>" + esc(P.noCumplido) + "</p>" + [["mitad", "Revisión intermedia (semana 9)"], ["cierre", "Cierre (última semana)"]].map(function (k) {
      return "<details><summary>" + k[1] + "</summary>" + P.preguntas.map(function (q, i) {
        return field(q, "revision|" + k[0] + "|" + i, state.revision[k[0]][i] || "", { area: true, rows: 3 });
      }).join("") + (k[0] === "cierre" ? cierreItems() : "") + "</details>";
    }).join("") + "</section>";
    html += "<section><h2>Portafolio de evidencias y trabajo entre colegas</h2><details><summary>Portafolio</summary>" + P.portafolio.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</details>" +
      "<details><summary>Trabajo entre colegas</summary><p>" + esc(P.colegas) + "</p>" + table(["Reunión", "Cuándo", "Qué se hace"], P.reuniones) + "<p>" + esc(P.colegasNota) + "</p></details></section>";
    html += '<p class="actions"><a class="btn" href="#/portafolio">Ver mi portafolio</a></p>' + downloadBox(true);
    return html;
  }
  function cierreItems() {
    if (!state.chosen.length) return "";
    return '<h3>Responder de nuevo los ítems trabajados</h3>' + state.chosen.map(function (cid) {
      var c = M.comps[cid], before = state.answers[cid];
      return '<div class="field"><label for="c-' + cid + '">' + cid + " " + esc(c.item) + (before != null ? ' <span class="hint">(al inicio: ' + before + " de 4)</span>" : "") + "</label>" +
        '<select id="c-' + cid + '" data-bind="cierre|' + cid + '" data-num="1"><option value="">Elegir</option>' + c.options.map(function (o, i) {
          return '<option value="' + i + '"' + (state.cierre[cid] === i ? " selected" : "") + ">" + i + ": " + esc(o) + "</option>";
        }).join("") + "</select></div>";
    }).join("");
  }


  function linkHtml(u) {
    return /^https?:\/\//i.test(u || "") ? '<a href="' + esc(u) + '" target="_blank" rel="noopener">' + esc(u) + "</a>" : esc(u || "Sin anotar");
  }
  function downloadBox(withCopy) {
    return '<section class="card download"><h2>Descargar mi portafolio y mi plan</h2><p>El documento reúne los datos de partida, el perfil por área, el plan, cada reto con sus indicadores, notas y enlaces de evidencia, el registro de recursos y las reflexiones.</p>' +
      '<p class="actions"><button class="btn primary" data-act="word">Descargar en Word</button> <button class="btn" data-act="print">Imprimir o guardar como PDF</button></p>' +
      (withCopy ? '<h3>Copia del avance</h3><p>La copia es un archivo que permite continuar en otro equipo o navegador.</p>' +
      '<p class="actions"><button class="btn" data-act="export">Guardar una copia</button> <label class="btn filebtn">Cargar una copia<input type="file" accept="application/json,.json" data-act-file="import"></label> <button class="btn ghost danger" data-act="reset">Borrar todo y empezar de nuevo</button></p>' : "") + "</section>";
  }
  function vPortafolio() {
    var rows = planRows();
    var html = '<h1 tabindex="-1">Mi portafolio</h1><p>Aquí se reúne todo lo trabajado: las competencias elegidas, cada reto con su avance, lo que resultó con los alumnos y el enlace a la evidencia. Se llena desde las fichas y se puede descargar completo.</p>';
    if (!state.chosen.length) {
      return html + '<p class="empty">El portafolio se forma con los retos de las competencias elegidas. <a href="#/fichas">Elegir competencias</a>.</p>';
    }
    var hechos = rows.filter(function (r) { return r.st.veces > 0; }).length, logrados = rows.filter(function (r) { return r.st.veces === 2; }).length;
    var stats = [[state.chosen.length, "Competencias elegidas"], [rows.length, "Retos en el plan"], [hechos, "Retos hechos al menos una vez"], [logrados, "Niveles alcanzados"]];
    html += '<div class="stats">' + stats.map(function (s) { return '<div class="card"><span class="big">' + s[0] + "</span><span>" + s[1] + "</span></div>"; }).join("") + "</div>";
    if (diagDone()) html += '<p class="hint">Diagnóstico del ' + esc(state.diagDate) + ": " + total() + " de 88 puntos, nivel global " + globalLevel(total()) + ". <a href=\"#/resultado\">Ver el resultado</a>.</p>";
    state.chosen.forEach(function (cid) {
      var c = M.comps[cid], cur = curLevel(cid), cs = compState(cid), ini = startLevel(cid);
      html += '<section class="card port"><p class="eyebrow">Competencia ' + cid + '</p><h2><a href="#/ficha/' + cid + '">' + esc(c.title) + "</a></h2>" +
        '<div class="track" aria-label="Progresión">' + LV.map(function (l) {
          var ok = cs.steps[l] && cs.steps[l].veces === 2;
          return '<span class="tstep' + (ok ? " ok" : "") + (l === cur ? " cur" : "") + '">' + l + (ok ? " ✓" : "") + "</span>";
        }).join("") + "</div>" +
        '<p class="hint">' + (ini ? "Fila de inicio según el diagnóstico: " + ini + ". " : "") + "Fila actual: " + cur + ".</p>";
      rows.filter(function (r) { return r.cid === cid; }).forEach(function (r) {
        var s = c.steps[r.lv], nx = nextLevel(r.lv), st = r.st;
        html += '<div class="entry"><h3>' + (nx ? "De " + r.lv + " a " + nx : "Nivel C2") + ' <span class="status s' + st.veces + '">' + vecesTexto(st.veces) + "</span></h3>" +
          '<p class="reto">' + esc(c.rows[r.lv].challenge) + "</p>" +
          '<dl class="meta wide"><div><dt>Materia y unidad</dt><dd>' + esc(st.materia || "Sin anotar") + "</dd></div><div><dt>Fecha</dt><dd>" + esc(st.fecha || "Sin anotar") + "</dd></div>" +
          "<div><dt>Evidencia</dt><dd>" + esc(c.rows[r.lv].evidence) + "</dd></div><div><dt>Enlace a la evidencia</dt><dd>" + linkHtml(st.link) + "</dd></div></dl>" +
          (st.detalle ? "<p><strong>Cómo lo haré en mi curso:</strong> " + esc(st.detalle) + "</p>" : "") +
          (s ? '<ul class="ind">' + s.done.map(function (d, i) { return '<li class="' + (st.checks[i] ? "ok" : "") + '">' + (st.checks[i] ? "✓ " : "○ ") + esc(d) + "</li>"; }).join("") + "</ul>" : "") +
          (st.nota ? '<p><strong>Qué resultó con los alumnos:</strong> ' + esc(st.nota).replace(/\n/g, "<br>") + "</p>" : '<p class="hint">Todavía no se anota qué resultó con los alumnos.</p>') +
          '<p class="actions"><a class="btn small" href="#/ficha/' + cid + '">' + (r.lv === cur ? "Continuar este reto en la ficha" : "Abrir la ficha") + "</a></p></div>";
      });
      html += "</section>";
    });
    var reg = state.guia.filter(function (r) { return r.recurso; });
    html += "<section><h2>Recursos revisados</h2>" + (reg.length ? table(["Recurso o herramienta", "Momento", "Criterios (de 8)", "Decisión"], reg.map(function (r) { return [r.recurso, r.momento, (r.criterios || []).filter(Boolean).length, r.decision]; })) : '<p class="empty">Sin registros. Se agregan desde la <a href="#/guia">guía de recursos</a>.</p>') + "</section>";
    var hayRev = (state.revision.mitad || []).some(Boolean) || (state.revision.cierre || []).some(Boolean);
    html += "<section><h2>Reflexiones</h2>" + (hayRev ? [["mitad", "Revisión intermedia"], ["cierre", "Cierre"]].map(function (k) {
      var ans = state.revision[k[0]] || [];
      return ans.some(Boolean) ? "<h3>" + k[1] + '</h3><dl class="gloss">' + M.plan.preguntas.map(function (q, i) { return ans[i] ? "<dt>" + esc(q) + "</dt><dd>" + esc(ans[i]).replace(/\n/g, "<br>") + "</dd>" : ""; }).join("") + "</dl>" : "";
    }).join("") : '<p class="empty">La revisión intermedia y el cierre se escriben en <a href="#/plan">Mi plan</a>.</p>') + "</section>";
    return html + downloadBox(false);
  }

  function vMarco() {
    return '<h1 tabindex="-1">El marco DigCompEdu en la LELI mixta</h1><p>' + esc(M.marco) + "</p>" +
      "<section><h2>Las seis áreas y sus competencias</h2>" + '<div class="tablewrap"><table><thead><tr><th>Área</th><th>Competencias</th><th>En la LELI mixta se observa cuando el docente...</th></tr></thead><tbody>' +
      M.areas.map(function (a) {
        return '<tr><th scope="row">' + a.n + ". " + esc(a.name) + "</th><td>" + a.comps.map(function (c) { return '<a href="#/ficha/' + c + '">' + c + " " + esc(M.comps[c].title) + "</a>"; }).join("<br>") + "</td><td>" + esc(M.areaObserva[a.n]) + "</td></tr>";
      }).join("") + "</tbody></table></div></section>" +
      "<section><h2>Los seis niveles</h2><p>" + esc(M.nivelesIntro) + "</p>" +
      table(["Nivel", "Nombre", "Lo que caracteriza al docente", "Lo que necesita para avanzar"], M.niveles.map(function (n) { return [n.id, n.nombre, n.caracteriza, n.necesita]; })) +
      "<p>" + esc(M.nivelesNota) + "</p></section>" +
      "<section><h2>Rangos del diagnóstico</h2>" + table(["Puntaje total", "Nivel", "Nombre"], M.rangosGlobal.map(function (r) { return [r.texto, r.nivel, nivel(r.nivel).nombre]; })) +
      table(["Nivel", "Áreas 1 y 3 (máx. 16)", "Áreas 2, 4 y 5 (máx. 12)", "Área 6 (máx. 20)"], LV.map(function (l, i) {
        return [l].concat([16, 12, 20].map(function (m) {
          var r = M.rangosArea[m], lo = i === 0 ? 0 : r[i - 1] + 1, hi = i < 5 ? r[i] : m;
          return lo === hi ? String(lo) : lo + " a " + hi;
        }));
      })) + '<p class="hint">' + esc(M.resultado.global) + " " + esc(M.resultado.area) + "</p></section>" +
      "<section><h2>Glosario</h2><dl class=\"gloss\">" + M.glosario.map(function (g) { return "<dt>" + esc(g[0]) + "</dt><dd>" + esc(g[1]) + "</dd>"; }).join("") + "</dl></section>" +
      '<section><h2>Referencias</h2><ul class="refs">' + M.referencias.map(function (r) { return "<li>" + r.texto + (r.url ? ' <a href="' + r.url + '" target="_blank" rel="noopener">' + esc(r.url) + "</a>" : "") + "</li>"; }).join("") + "</ul></section>";
  }

  /* ---------- documento para descargar ---------- */
  function planDoc() {
    var th = function (cols) { return "<tr>" + cols.map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") + "</tr>"; };
    var tr = function (cells) { return "<tr>" + cells.map(function (c) { return "<td>" + esc(c).replace(/\n/g, "<br>") + "</td>"; }).join("") + "</tr>"; };
    var rows = planRows(), done = diagDone();
    var h = "<h1>Portafolio y plan personal de desarrollo</h1><p>" + esc(M.titulo) + " (DigCompEdu)</p>";
    h += "<h2>Datos de partida</h2><table>" + [["Nombre", state.perfil.nombre], ["Materias que imparte en la LELI mixta este semestre", state.perfil.materias]].concat(datosPartida()).map(function (d) {
      return "<tr><th>" + esc(d[0]) + "</th><td>" + esc(d[1]) + "</td></tr>";
    }).join("") + "</table>";
    if (done) {
      h += "<h2>Perfil por área</h2><table>" + th(["Área", "Ítems", "Máximo", "Mis puntos", "Nivel del área"]) + M.areas.map(function (a) {
        return tr([a.n + ". " + a.name, a.comps[0] + " a " + a.comps[a.comps.length - 1], areaMax(a), areaPts(a), areaLevel(a)]);
      }).join("") + tr(["Total", "22 ítems", 88, total(), globalLevel(total())]) + "</table>";
    }
    h += "<h2>Plan</h2>";
    if (rows.length) {
      h += "<table>" + th(M.plan.columnas.concat(["Avance"])) + rows.map(function (r) {
        var c = M.comps[r.cid];
        return tr([r.cid + " " + c.title, r.lv, nextLevel(r.lv) || "C2", c.rows[r.lv].challenge, r.st.materia, r.st.fecha, c.rows[r.lv].evidence, r.st.apoyo, vecesTexto(r.st.veces)]);
      }).join("") + "</table>";
      h += "<h2>Portafolio de retos</h2>" + rows.map(function (r) {
        var c = M.comps[r.cid], s = c.steps[r.lv], nx = nextLevel(r.lv), st = r.st;
        return "<h3>" + r.cid + " " + esc(c.title) + " · " + (nx ? "de " + r.lv + " a " + nx : "nivel C2") + " · " + vecesTexto(st.veces) + "</h3>" +
          "<p><b>Reto:</b> " + esc(c.rows[r.lv].challenge) + "</p>" +
          (st.detalle ? "<p><b>Cómo se hizo en el curso:</b> " + esc(st.detalle).replace(/\n/g, "<br>") + "</p>" : "") +
          (s ? "<p><b>Indicadores de logro:</b><br>" + s.done.map(function (d, i) { return (st.checks[i] ? "[x] " : "[ ] ") + esc(d); }).join("<br>") + "</p>" : "") +
          "<p><b>Evidencia:</b> " + esc(c.rows[r.lv].evidence) + (st.link ? "<br><b>Enlace:</b> " + esc(st.link) : "") + "</p>" +
          "<p><b>Qué resultó con los alumnos:</b> " + (st.nota ? esc(st.nota).replace(/\n/g, "<br>") : "Sin anotar") + "</p>";
      }).join("");
    } else h += "<p>Sin competencias elegidas.</p>";
    var reg = state.guia.filter(function (r) { return r.recurso; });
    if (reg.length) {
      h += "<h2>Registro de la selección de recursos</h2><table>" + th(["Recurso o herramienta", "Objetivo y habilidad", "Momento de la secuencia", "Qué aporta la tecnología", "Criterios que cumple (de 8)", "Decisión"]) + reg.map(function (r) {
        return tr([r.recurso, r.objetivo, r.momento, r.aporta, (r.criterios || []).filter(Boolean).length, r.decision]);
      }).join("") + "</table>";
    }
    [["mitad", "Revisión intermedia"], ["cierre", "Cierre"]].forEach(function (k) {
      var ans = state.revision[k[0]] || [];
      if (!ans.some(Boolean)) return;
      h += "<h2>" + k[1] + "</h2>" + M.plan.preguntas.map(function (q, i) { return "<p><b>" + esc(q) + "</b><br>" + esc(ans[i] || "").replace(/\n/g, "<br>") + "</p>"; }).join("");
    });
    var re = state.chosen.filter(function (c) { return state.cierre[c] != null && state.cierre[c] !== ""; });
    if (re.length) {
      h += "<h2>Ítems respondidos de nuevo al cierre</h2><table>" + th(["Competencia", "Al inicio", "Al cierre"]) + re.map(function (c) {
        return tr([c + " " + M.comps[c].title, state.answers[c] == null ? "" : state.answers[c], state.cierre[c]]);
      }).join("") + "</table>";
    }
    h += "<p><i>" + esc(M.noHace) + "</i></p>";
    h += "<p>Manual de Angélica Méndez Luna · LELI modalidad mixta, BUAP</p>";
    return h;
  }
  function download(name, mime, content) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([content], { type: mime }));
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  function today() { return new Date().toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" }); }

  /* ---------- enrutador ---------- */
  function route() { return location.hash.replace(/^#\/?/, ""); }
  function render(keepScroll) {
    var r = route(), parts = r.split("/"), y = window.scrollY, html;
    switch (parts[0]) {
      case "diagnostico": html = vDiagnostico(); break;
      case "resultado": html = vResultado(); break;
      case "fichas": html = vFichas(); break;
      case "ficha": html = vFicha(parts[1]); break;
      case "guia": html = vGuia(); break;
      case "plan": html = vPlan(); break;
      case "portafolio": html = vPortafolio(); break;
      case "marco": html = vMarco(); break;
      default: html = vInicio();
    }
    app.innerHTML = html;
    renderNav(r);
    refreshDiag();
    if (keepScroll) window.scrollTo(0, y);
    else {
      window.scrollTo(0, 0);
      var h1 = app.querySelector("h1");
      if (h1) h1.focus({ preventScroll: true });
    }
  }
  function toast(msg) {
    var t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast.t);
    toast.t = setTimeout(function () { t.classList.remove("show"); }, 3500);
  }

  /* ---------- eventos ---------- */
  var ACT = {
    self: function (el) { state.selfLevel = state.selfLevel === el.dataset.v ? "" : el.dataset.v; save(); render(true); },
    "diag-go": function (el) {
      state.diagPage = Math.max(0, Number(el.dataset.v)); save();
      if (route() !== "diagnostico") location.hash = "#/diagnostico"; else render();
    },
    "diag-next": function () {
      var a = M.areas[state.diagPage - 1];
      var missing = a.comps.filter(function (c) { return state.answers[c] == null; });
      if (missing.length) {
        var w = document.getElementById("diag-missing");
        w.hidden = false;
        w.textContent = "Falta responder: " + missing.join(", ") + ".";
        document.getElementById("item-" + missing[0].replace(".", "-")).scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      if (state.diagPage < 6) { state.diagPage++; save(); render(); return; }
      state.diagDate = today(); state.diagPage = 0; save();
      location.hash = "#/resultado";
    },
    toggle: function (el) {
      var cid = el.dataset.v, i = state.chosen.indexOf(cid);
      if (i >= 0) state.chosen.splice(i, 1);
      else if (state.chosen.length >= 3) { toast("El manual sugiere de una a tres competencias por semestre. Para añadir otra, primero se quita una."); return; }
      else state.chosen.push(cid);
      save(); render(true);
    },
    ruta: function (el) {
      var r = M.rutas[Number(el.dataset.v)];
      if (state.chosen.length && !confirm("Se reemplazarán las competencias elegidas por las de esta ruta (" + r.comps.join(", ") + "). El avance anotado no se borra.")) return;
      state.chosen = r.comps.slice(); save(); render();
    },
    fila: function (el) { compState(el.dataset.cid).level = el.dataset.v; save(); render(true); },
    subir: function (el) {
      compState(el.dataset.cid).level = el.dataset.v; save(); render(true);
      var m = document.getElementById("mi-reto");
      if (m) m.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    veces: function (el) { stepState(el.dataset.cid, el.dataset.lv).veces = Number(el.dataset.v); save(); render(true); },
    "guia-add": function () { state.guia.push({ recurso: "", objetivo: "", momento: "", aporta: "", criterios: [], decision: "" }); save(); render(true); },
    "guia-del": function (el) {
      if (!confirm("Se eliminará este registro.")) return;
      state.guia.splice(Number(el.dataset.v), 1); save(); render(true);
    },
    word: function () {
      var css = "body{font-family:Calibri,Arial,sans-serif;font-size:11pt}h1{font-size:18pt}h2{font-size:13pt;margin-top:18pt}h3{font-size:11pt;margin-top:12pt}table{border-collapse:collapse;width:100%}th,td{border:1px solid #666;padding:4pt 6pt;vertical-align:top;text-align:left;font-size:10pt}th{background:#e8eef0}";
      var doc = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>Portafolio y plan personal de desarrollo</title>' +
        "<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View></w:WordDocument></xml><![endif]--><style>@page{size:11in 8.5in;margin:0.8in}" + css + "</style></head><body>" + planDoc() + "</body></html>";
      download("portafolio-competencia-digital.doc", "application/msword", "﻿" + doc);
    },
    print: function () { document.getElementById("print-area").innerHTML = planDoc(); window.print(); },
    "export": function () { download("avance-competencia-digital.json", "application/json", JSON.stringify(state, null, 1)); },
    reset: function () {
      if (!confirm("Se borrarán las respuestas del diagnóstico, las competencias elegidas y el plan guardados en este navegador. Esta acción no se puede deshacer.")) return;
      state = blank(); save(); location.hash = "#/"; render();
    }
  };
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-act]");
    if (el && ACT[el.dataset.act]) { e.preventDefault(); ACT[el.dataset.act](el); }
  });
  function onInput(e) {
    var el = e.target;
    if (el.dataset.answer) {
      state.answers[el.dataset.answer] = Number(el.value); save(); refreshDiag();
      var w = document.getElementById("diag-missing"); if (w) w.hidden = true;
      return;
    }
    if (el.dataset.actFile === "import") {
      var f = el.files[0]; if (!f) return;
      var rd = new FileReader();
      rd.onload = function () {
        try {
          var d = JSON.parse(rd.result);
          if (!d || d.v !== 1 || typeof d.answers !== "object") throw new Error("formato");
          if (!confirm("Se reemplazará el avance guardado en este navegador por el de la copia.")) return;
          state = Object.assign(blank(), d); save(); render(); toast("Copia cargada.");
        } catch (err) { toast("El archivo no es una copia válida del avance."); }
      };
      rd.readAsText(f);
      return;
    }
    if (!el.dataset.bind) return;
    var v = el.type === "checkbox" ? el.checked : el.value;
    if (el.dataset.num) v = v === "" ? "" : Number(v);
    setPath(el.dataset.bind, v); save();
    if (el.dataset.crit != null) {
      var out = document.querySelector('[data-count="' + el.dataset.crit + '"]');
      if (out) out.textContent = (state.guia[Number(el.dataset.crit)].criterios || []).filter(Boolean).length;
    }
  }
  document.addEventListener("input", onInput);
  document.addEventListener("change", function (e) { if (e.target.type === "file") onInput(e); });
  window.addEventListener("hashchange", function () { render(); });

  load();
  render();
})();
