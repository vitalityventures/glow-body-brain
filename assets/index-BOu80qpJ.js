(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function d(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=d(e);fetch(e.href,t)}})();var a;const r=window.basePath||((a=document.querySelector("base"))==null?void 0:a.getAttribute("href"))||"/";debugLog("Loading main.tsx from:",r+"src/main.tsx");const c=document.getElementById("root");c.innerHTML=`
        <div style="display:flex;justify-content:center;align-items:center;height:100vh;flex-direction:column;">
          <div style="border:4px solid #f3f3f3;border-top:4px solid #3498db;border-radius:50%;width:40px;height:40px;animation:spin 1s linear infinite;"></div>
          <div style="margin-top:20px;">Loading application...</div>
        </div>
        <style>
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      `;fetch(r).then(o=>(debugLog("Base directory fetch status:",o.status),o.text())).then(o=>{debugLog("Available resources:",o.match(/href="[^"]+"/g))}).catch(o=>{console.error("Failed to check available resources:",o)});import(r+"src/main.tsx").catch(o=>{console.error("Failed to load main.tsx:",o),c.innerHTML=`
            <div style="color:red;padding:20px;max-width:600px;margin:0 auto;text-align:center;margin-top:50px;">
              <h2>Error loading application</h2>
              <p>The application failed to initialize. This could be due to path issues on GitHub Pages.</p>
              <p style="font-family:monospace;background:#f5f5f5;padding:10px;text-align:left;overflow-x:auto;">Error: ${o.message}</p>
              <button onclick="location.reload()" style="padding:10px 20px;background:#4f46e5;color:white;border:none;border-radius:5px;margin-top:20px;cursor:pointer;">
                Try Again
              </button>
              <div style="margin-top:20px;font-size:12px;color:#666;">
                Technical info: Base path = ${r}
              </div>
            </div>
          `});
//# sourceMappingURL=index-BOu80qpJ.js.map
