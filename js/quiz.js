/* Quick checks on nelsoninno.com. Answers never leave the browser unless the visitor sends them. */
(function () {
  var D = window.QZ, U = window.QZU;
  if (!D || !U) return;
  var root = document.getElementById('qz');
  var $ = function (id) { return document.getElementById('qz-' + id); };
  var i = 0, ans = [];

  /* Contact number: never written as plain text in the page. It is decoded only when someone clicks. */
  var K = [12, 7, 10, 14, 9, 7, 15, 8, 15, 7, 7];
  function chat(text) {
    var n = K.map(function (c) { return c - 7; }).join('');
    return 'https://' + 'wa' + '.me/' + n + '?text=' + encodeURIComponent(text);
  }

  function show(id) {
    ['intro', 'quiz', 'res'].forEach(function (s) { $(s).hidden = s !== id; });
    var r = root.getBoundingClientRect();
    if (r.top < 0 || r.top > window.innerHeight * 0.6) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function ask() {
    var q = D.questions[i], n = D.questions.length;
    $('bar').style.width = (i / n * 100) + '%';
    $('count').textContent = U.q + ' ' + (i + 1) + ' ' + U.of + ' ' + n + ' · ' + D.dims[q.dim];
    $('qt').textContent = q.q;
    var o = $('opts');
    o.innerHTML = '';
    q.opts.forEach(function (label, k) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'qz-opt' + (ans[i] === k ? ' sel' : '');
      b.textContent = label;
      b.onclick = function () { ans[i] = k; i++; if (i < n) ask(); else result(); };
      o.appendChild(b);
    });
    $('back').hidden = i === 0;
    show('quiz');
    var f = o.querySelector('button');
    if (f && i > 0) f.focus({ preventScroll: true });
  }

  function result() {
    var max = D.questions.length * 3, sum = ans.reduce(function (a, b) { return a + b; }, 0);
    var score = Math.round(sum / max * 100);
    var lv = D.levels[Math.min(3, Math.floor(score / 25.0001))];
    var per = {};
    D.questions.forEach(function (q, k) { (per[q.dim] = per[q.dim] || []).push(ans[k]); });
    var dims = Object.keys(D.dims).map(function (d) {
      var a = per[d] || [0];
      return [d, Math.round(a.reduce(function (x, y) { return x + y; }, 0) / (a.length * 3) * 100)];
    });
    var weak = dims.slice().sort(function (a, b) { return a[1] - b[1]; })[0][0];

    $('rs').innerHTML = score + '<small>/100</small>';
    $('rl').textContent = lv[0];
    $('rt').textContent = lv[1];
    $('dims').innerHTML = dims.map(function (x) {
      return '<div class="qz-dim"><div class="l"><span>' + D.dims[x[0]] + '</span><span>' + x[1] + '%</span></div><div class="t"><span style="width:' + x[1] + '%"></span></div></div>';
    }).join('');
    $('tip').innerHTML = '<b>' + U.weakest + ': ' + D.dims[weak] + '</b>' + D.tips[weak];

    var lines = dims.map(function (x) { return '- ' + D.dims[x[0]] + ': ' + x[1] + '%'; }).join('\n');
    var full = U.wa_msg.replace('{title}', D.title).replace('{score}', score).replace('{level}', lv[0]).replace('{lines}', lines);
    var short = U.li_msg.replace('{title}', D.title).replace('{score}', score).replace('{level}', lv[0]).replace('{weak}', D.dims[weak]);

    var wa = $('wa');
    wa.onclick = function () {
      wa.href = chat(full);
      setTimeout(function () { wa.href = '#qz'; }, 2000);
    };
    $('li').onclick = function () {
      var done = function () { $('note').textContent = U.copied; };
      try {
        navigator.clipboard.writeText(short).then(done, function () { fallback(short); done(); });
      } catch (e) { fallback(short); done(); }
    };
    $('note').textContent = '';
    $('bar').style.width = '100%';
    show('res');
  }

  function fallback(t) {
    var a = document.createElement('textarea');
    a.value = t; a.setAttribute('readonly', ''); a.style.position = 'fixed'; a.style.opacity = '0';
    document.body.appendChild(a); a.select();
    try { document.execCommand('copy'); } catch (e) {}
    a.remove();
  }

  $('start').onclick = function () { i = 0; ans = []; ask(); };
  $('back').onclick = function () { if (i > 0) { i--; ask(); } };
  $('retake').onclick = function () { i = 0; ans = []; show('intro'); $('start').focus({ preventScroll: true }); };
  root.hidden = false;
  var ns = document.getElementById('qz-nojs');
  if (ns) ns.hidden = true;
})();
