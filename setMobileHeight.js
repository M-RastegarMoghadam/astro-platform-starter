// calculates height on moble Devices (Excusive Status Bars)

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function isMobile() {
  const userAgent = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const smallScreen = window.innerWidth <= 768;
  return userAgent && smallScreen;
}

// für Webseiten
function setViewportHeight() {
  const vh = window.innerHeight;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// für PWA's ? - to be tested
function setRealVh() {
  const vh = getSafeViewportHeight();
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

function setFullHeight() {
  console.log("[height] height of Website set To \"Viewport Height\"")
  document.documentElement.style.setProperty('--fullHeightFlex', `1`);
  document.documentElement.style.setProperty('--fullHeight', `var(--vh)`);
}

function setAutoHeight() {
    console.log("[height] height of Website set To \"Auto\"")
    document.documentElement.style.setProperty('--fullHeightFlex', `0`);
    document.documentElement.style.setProperty('--fullHeight', `auto`);
}

const fullHeightOption=getComputedStyle(document.documentElement).getPropertyValue('--fullHeightOption').trim();
console.log(`[height] \"--fullHeightOption: ${fullHeightOption}\" detected"`)

if (isMobile()) {
  // mobile
  if (fullHeightOption==3) setFullHeight()
  else if (fullHeightOption==1) setAutoHeight()
  else if (fullHeightOption==2) setFullHeight()
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', setViewportHeight);
  window.addEventListener('load', setViewportHeight);
  setViewportHeight();
  console.log("[height] Mobile Device detected / Viewport-height calculation activted'")
  console.log('[height] Calculated Viewport-height is written to CSS-Variable: "--vh"')
} else {
  // Website
  if (fullHeightOption==3) setAutoHeight()
  else if (fullHeightOption==1) setAutoHeight()
  else if (fullHeightOption==2) setFullHeight()
  console.log("[height] Website detected / Viewport-height calculation Deactivted'")
}


