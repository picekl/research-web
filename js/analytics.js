(function initAnalytics() {
  const analytics = window.siteConfig && window.siteConfig.analytics;
  if (!analytics || !analytics.provider) return;

  if (analytics.provider === "goatcounter" && analytics.goatcounterUrl) {
    const script = document.createElement("script");
    script.defer = true;
    script.src = "https://gc.zgo.at/count.js";
    script.dataset.goatcounter = analytics.goatcounterUrl;
    document.head.appendChild(script);
    return;
  }

  if (
    analytics.provider === "plausible" &&
    analytics.plausibleDomain &&
    analytics.plausibleScriptUrl
  ) {
    const script = document.createElement("script");
    script.defer = true;
    script.dataset.domain = analytics.plausibleDomain;
    script.src = analytics.plausibleScriptUrl;
    document.head.appendChild(script);
  }
})();
