/* NeonPulse · PR Guardian — embeds the real n8n workflow as an interactive, read-only canvas.
   Uses n8n's official <n8n-demo> web component (pinned + SRI). The workflow JSON is read
   straight from the Guardian repo, so this page never drifts from the workflow itself. */
(function () {
  var COMPONENT = 'https://cdn.jsdelivr.net/npm/@n8n_io/n8n-demo-component@1.0.20/n8n-demo.bundled.js';
  var COMPONENT_SRI = 'sha384-aFom9fiO8R2aGLz5XooQK70H33kayU/NpPVVA0OayjMc7Qg+gePQOJOEINwGSx1q';
  var WORKFLOW_JSON = 'https://raw.githubusercontent.com/Kujoh1/neonpulse-pr-guardian/main/pr-guardian.workflow.json';
  var REPO = 'https://github.com/Kujoh1/neonpulse-pr-guardian';
  var loading = null;

  function loadComponent() {
    if (window.customElements && customElements.get('n8n-demo')) return Promise.resolve();
    if (loading) return loading;
    loading = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.type = 'module'; s.src = COMPONENT; s.integrity = COMPONENT_SRI; s.crossOrigin = 'anonymous';
      s.onerror = reject; document.head.appendChild(s);
      customElements.whenDefined('n8n-demo').then(resolve);
    });
    return loading;
  }

  function message(stage, de, en) {
    stage.innerHTML = '<div class="wf__gate"><p lang="de">' + de + '</p><p lang="en">' + en + '</p>' +
      '<a class="np-btn np-btn--ghost np-btn--sm" href="' + REPO + '" target="_blank" rel="noopener">GitHub →</a></div>';
  }

  function mount(stage, opts) {
    opts = opts || {};
    stage.setAttribute('aria-busy', 'true');
    stage.innerHTML = '<div class="wf__gate"><span class="np-btn np-btn--ghost is-loading" aria-hidden="true"><span>…</span></span>' +
      '<p lang="de">Workflow wird geladen …</p><p lang="en">Loading workflow …</p></div>';
    return Promise.all([
      fetch(WORKFLOW_JSON, { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); }),
      loadComponent()
    ]).then(function (res) {
      var demo = document.createElement('n8n-demo');
      demo.setAttribute('theme', 'dark');
      demo.setAttribute('collapseformobile', 'false');
      demo.setAttribute('hidecanvaserrors', 'true');
      demo.setAttribute('workflow', res[0]);
      demo.style.setProperty('--n8n-workflow-min-height', opts.minHeight || '520px');
      demo.style.setProperty('--n8n-iframe-border-radius', '0px');
      demo.style.display = 'block'; demo.style.width = '100%';
      stage.innerHTML = ''; stage.appendChild(demo);
      stage.removeAttribute('aria-busy');
    }).catch(function () {
      stage.removeAttribute('aria-busy');
      message(stage, 'Der Workflow konnte nicht geladen werden. Er liegt auch direkt im Repository.',
                     'The workflow could not be loaded. It is also available in the repository.');
    });
  }

  window.NPWorkflow = { mount: mount, json: WORKFLOW_JSON, repo: REPO };
})();
