/* ==============================================
   Prompt Palette v2 — App Logic
   ============================================== */

(function () {
  'use strict';

  // ==================== THEME TOGGLE ====================
  const html = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const iconSun = toggle.querySelector('.icon-sun');
  const iconMoon = toggle.querySelector('.icon-moon');

  // In-memory theme storage (persistent storage unavailable in sandboxed iframe)
  var savedTheme = 'dark';

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    savedTheme = theme;
    if (theme === 'dark') {
      iconSun.style.display = 'block';
      iconMoon.style.display = 'none';
    } else {
      iconSun.style.display = 'none';
      iconMoon.style.display = 'block';
    }
  }

  setTheme(savedTheme);

  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // ==================== TOAST ====================
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toastText');
  let toastTimer;

  function showToast(msg) {
    toastText.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
  }

  // ==================== COPY TO CLIPBOARD ====================
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied "${text}"`);
      }).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast(`Copied "${text}"`);
    } catch {
      showToast('Copy failed');
    }
    document.body.removeChild(ta);
  }

  // ==================== CHIP CLICK (copy) ====================
  document.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip[data-copy]');
    if (chip) {
      const text = chip.getAttribute('data-copy');
      copyText(text);
      chip.classList.add('copied');
      setTimeout(() => chip.classList.remove('copied'), 1200);
    }
  });

  // ==================== SCROLL REVEAL ====================
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach((el) => observer.observe(el));

  // ==================== COLOR SCHEMES (Section 4) ====================
  const colorSchemes = [
    {
      name: 'Monochromatic',
      desc: 'Variations of a single hue — unified and harmonious.',
      swatches: ['#1a3a5c', '#2a5a8c', '#3a7abc', '#6a9ad0', '#a0c4e8'],
      chips: ['monochromatic palette', 'single hue', 'tonal variation']
    },
    {
      name: 'Complementary',
      desc: 'Opposite hues on the color wheel — maximum contrast and energy.',
      swatches: ['#e63946', '#f4a261', '#fefae0', '#457b9d', '#1d3557'],
      chips: ['complementary colors', 'high contrast palette', 'opposing hues']
    },
    {
      name: 'Analogous',
      desc: 'Adjacent hues — naturally cohesive and easy on the eyes.',
      swatches: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'],
      chips: ['analogous palette', 'adjacent hues', 'harmonious colors']
    },
    {
      name: 'Triadic',
      desc: 'Three evenly spaced hues — vibrant yet balanced.',
      swatches: ['#ef476f', '#ffd166', '#06d6a0', '#118ab2', '#073b4c'],
      chips: ['triadic colors', 'three-color palette', 'vibrant balanced']
    },
    {
      name: 'Split-Complementary',
      desc: 'A base hue plus two adjacent to its complement — versatile contrast.',
      swatches: ['#5f0f40', '#9a031e', '#fb8b24', '#e36414', '#0f4c5c'],
      chips: ['split complementary', 'versatile contrast', 'offset palette']
    },
    {
      name: 'Warm',
      desc: 'Reds, oranges, yellows — energetic, inviting, and passionate.',
      swatches: ['#6a040f', '#9d0208', '#d00000', '#e85d04', '#faa307'],
      chips: ['warm colors', 'red orange palette', 'energetic tones']
    },
    {
      name: 'Cool',
      desc: 'Blues, greens, purples — calming, professional, and serene.',
      swatches: ['#03045e', '#0077b6', '#00b4d8', '#90e0ef', '#caf0f8'],
      chips: ['cool colors', 'blue palette', 'calming tones']
    },
    {
      name: 'Pastel',
      desc: 'Desaturated, soft tints — gentle, friendly, and approachable.',
      swatches: ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#a0c4ff'],
      chips: ['pastel colors', 'soft tints', 'gentle palette']
    },
    {
      name: 'Neon / Vibrant',
      desc: 'Fully saturated, electric hues — attention-grabbing and bold.',
      swatches: ['#ff006e', '#fb5607', '#ffbe0b', '#8338ec', '#3a86ff'],
      chips: ['neon colors', 'vibrant palette', 'electric hues', 'saturated']
    },
    {
      name: 'Earth Tones',
      desc: 'Natural browns, greens, tans — grounded, organic, and warm.',
      swatches: ['#582f0e', '#7f4f24', '#936639', '#a68a64', '#b6ad90'],
      chips: ['earth tones', 'natural palette', 'organic colors']
    },
    {
      name: 'Jewel Tones',
      desc: 'Deep, rich hues like emerald, sapphire, ruby — luxurious and regal.',
      swatches: ['#6a0572', '#ab0d77', '#c71585', '#008080', '#004d40'],
      chips: ['jewel tones', 'rich colors', 'luxurious palette', 'regal hues']
    },
    {
      name: 'Neutral / Greyscale',
      desc: 'Pure black-to-white scale — timeless, sophisticated, and versatile.',
      swatches: ['#111111', '#333333', '#666666', '#999999', '#cccccc'],
      chips: ['greyscale', 'neutral palette', 'monochrome', 'black and white']
    },
    {
      name: 'Duotone',
      desc: 'Two contrasting colors applied over imagery — bold and graphic.',
      swatches: ['#0d0221', '#261447', '#6b1fb1', '#c471f5', '#f8ceec'],
      chips: ['duotone', 'two-color', 'gradient overlay']
    },
    {
      name: 'Dark Mode Palette',
      desc: 'Low-luminance backgrounds with high-contrast foreground elements.',
      swatches: ['#000000', '#111111', '#1a1a1a', '#ededed', '#0070f3'],
      chips: ['dark mode', 'dark UI palette', 'low luminance', 'dark background']
    }
  ];

  const colorGrid = document.getElementById('colorGrid');
  colorSchemes.forEach((scheme) => {
    const card = document.createElement('div');
    card.className = 'card reveal';
    const swatchesHTML = scheme.swatches.map(
      (c) => `<div class="color-swatch" style="background:${c}" data-hex="${c}"></div>`
    ).join('');
    const chipsHTML = scheme.chips.map(
      (c) => `<button class="chip" data-copy="${c}">${c}</button>`
    ).join('');

    card.innerHTML = `
      <div class="card-demo"><div class="color-strip">${swatchesHTML}</div></div>
      <div class="card-body">
        <h3 class="card-title">${scheme.name}</h3>
        <p class="card-desc">${scheme.desc}</p>
        <div class="chips">${chipsHTML}</div>
      </div>
    `;
    colorGrid.appendChild(card);
  });

  // ==================== VISUAL EFFECTS (Section 5) ====================
  const effects = [
    {
      name: 'Gradient',
      desc: 'Smooth color transitions — linear, radial, or conic. The foundation of depth.',
      demoStyle: 'background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);width:100%;height:100%;',
      chips: ['gradient background', 'color transition', 'linear gradient', 'radial gradient']
    },
    {
      name: 'Grain / Noise',
      desc: 'Film-like texture overlay that adds warmth and analog character.',
      demoHTML: `<div style="width:100%;height:100%;background:#1a1a2e;position:relative;display:flex;align-items:center;justify-content:center">
        <div style="position:absolute;inset:0;opacity:0.3;background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E');background-size:128px 128px;"></div>
        <span style="color:#ededed;font-size:0.8rem;z-index:1;font-family:Geist Mono,monospace">grain overlay</span>
      </div>`,
      chips: ['grain texture', 'film noise', 'noise overlay', 'analog texture']
    },
    {
      name: 'Blur / Depth of Field',
      desc: 'Gaussian blur creates depth, focus areas, and atmospheric layering.',
      demoHTML: `<div style="width:100%;height:100%;background:#0a0a0a;display:flex;align-items:center;justify-content:center;gap:16px">
        <div style="width:40px;height:40px;border-radius:50%;background:#0070f3;filter:blur(8px)"></div>
        <div style="width:40px;height:40px;border-radius:50%;background:#0070f3"></div>
        <div style="width:40px;height:40px;border-radius:50%;background:#0070f3;filter:blur(4px)"></div>
      </div>`,
      chips: ['blur effect', 'depth of field', 'gaussian blur', 'background blur']
    },
    {
      name: 'Shadow / Elevation',
      desc: 'Layered box shadows that lift elements off the page with realistic depth.',
      demoHTML: `<div style="width:100%;height:100%;background:var(--bg);display:flex;align-items:center;justify-content:center;gap:16px">
        <div style="width:50px;height:50px;border-radius:8px;background:var(--bg-card);box-shadow:0 1px 3px rgba(0,0,0,0.12)"></div>
        <div style="width:50px;height:50px;border-radius:8px;background:var(--bg-card);box-shadow:0 4px 12px rgba(0,0,0,0.2)"></div>
        <div style="width:50px;height:50px;border-radius:8px;background:var(--bg-card);box-shadow:0 12px 40px rgba(0,0,0,0.35)"></div>
      </div>`,
      chips: ['box shadow', 'elevation', 'layered shadows', 'depth']
    },
    {
      name: 'Glow / Neon',
      desc: 'Luminous halos of color — from subtle ambient glow to full neon signage.',
      demoHTML: `<div style="width:100%;height:100%;background:#0a0a0a;display:flex;align-items:center;justify-content:center">
        <div style="font-family:Geist Mono,monospace;font-size:1.4rem;font-weight:700;color:#0ff;text-shadow:0 0 10px #0ff,0 0 30px #0ff,0 0 60px rgba(0,255,255,0.4)">GLOW</div>
      </div>`,
      chips: ['glow effect', 'neon glow', 'text shadow glow', 'luminous']
    },
    {
      name: 'Parallax',
      desc: 'Background layers move at different speeds during scroll — creating depth illusion.',
      demoHTML: `<div style="width:100%;height:100%;background:linear-gradient(180deg,#0a0a2e 0%,#1a1a4e 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden">
        <div style="font-size:2rem;opacity:0.15;position:absolute;top:10px">★</div>
        <div style="font-size:1.2rem;opacity:0.3;position:absolute;top:40px;left:30%">★</div>
        <div style="font-size:0.8rem;opacity:0.5;position:absolute;top:25px;right:25%">★</div>
        <div style="font-size:0.8rem;color:#ededed;font-family:Geist Mono,monospace;z-index:1">parallax depth</div>
      </div>`,
      chips: ['parallax effect', 'scroll depth', 'layered parallax']
    },
    {
      name: 'Border Radius',
      desc: 'From sharp rectangles to full circles — corner rounding defines shape personality.',
      demoHTML: `<div style="width:100%;height:100%;background:var(--bg);display:flex;align-items:center;justify-content:center;gap:12px">
        <div style="width:40px;height:40px;background:var(--chip-bg);border:1px solid var(--border);border-radius:0"></div>
        <div style="width:40px;height:40px;background:var(--chip-bg);border:1px solid var(--border);border-radius:8px"></div>
        <div style="width:40px;height:40px;background:var(--chip-bg);border:1px solid var(--border);border-radius:16px"></div>
        <div style="width:40px;height:40px;background:var(--chip-bg);border:1px solid var(--border);border-radius:50%"></div>
      </div>`,
      chips: ['border radius', 'rounded corners', 'pill shape', 'circle']
    },
    {
      name: 'Micro-interactions',
      desc: 'Tiny animated responses to user actions — hover states, toggles, and feedback.',
      demoHTML: `<div style="width:100%;height:100%;background:var(--bg);display:flex;align-items:center;justify-content:center;gap:12px">
        <div style="width:50px;height:50px;border-radius:12px;background:var(--chip-bg);border:1px solid var(--border);transition:transform 0.2s,box-shadow 0.2s;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.65rem;color:var(--text-muted)" onmouseenter="this.style.transform='scale(1.1)';this.style.boxShadow='0 4px 20px rgba(0,112,243,0.2)'" onmouseleave="this.style.transform='scale(1)';this.style.boxShadow='none'">hover</div>
        <div style="width:50px;height:50px;border-radius:12px;background:var(--chip-bg);border:1px solid var(--border);transition:transform 0.2s;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.65rem;color:var(--text-muted)" onmouseenter="this.style.transform='translateY(-4px)'" onmouseleave="this.style.transform='translateY(0)'">lift</div>
      </div>`,
      chips: ['micro-interaction', 'hover effect', 'animated feedback', 'transition']
    },
    {
      name: 'Glassmorphism Overlay',
      desc: 'Frosted blur panel floating over content — combines blur + transparency + border.',
      demoHTML: `<div style="width:100%;height:100%;background:linear-gradient(135deg,#ff6b6b,#feca57,#48dbfb);display:flex;align-items:center;justify-content:center">
        <div style="padding:16px 24px;border-radius:12px;background:rgba(255,255,255,0.15);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.2);color:#fff;font-size:0.8rem;font-family:Geist Mono,monospace">overlay</div>
      </div>`,
      chips: ['glass overlay', 'frosted panel', 'blur overlay', 'translucent card']
    },
    {
      name: 'Gradient Mesh',
      desc: 'Multi-point gradient blending — creates organic, flowing color fields.',
      demoStyle: 'width:100%;height:100%;background:radial-gradient(at 0% 0%,#ff006e 0%,transparent 50%),radial-gradient(at 100% 0%,#3a86ff 0%,transparent 50%),radial-gradient(at 100% 100%,#8338ec 0%,transparent 50%),radial-gradient(at 0% 100%,#fb5607 0%,transparent 50%);background-color:#000;',
      chips: ['gradient mesh', 'multi-point gradient', 'organic gradient', 'color field']
    },
    {
      name: 'Halftone Dots',
      desc: 'Print-style dot pattern that creates a retro, screenprinted effect.',
      demoHTML: `<div style="width:100%;height:100%;background:#1a1a1a;display:flex;align-items:center;justify-content:center;position:relative">
        <div style="position:absolute;inset:0;background-image:radial-gradient(circle,#555 1px,transparent 1px);background-size:8px 8px;opacity:0.5"></div>
        <span style="font-size:1.4rem;font-weight:700;color:#ededed;z-index:1">HALFTONE</span>
      </div>`,
      chips: ['halftone', 'dot pattern', 'screen print', 'retro dots']
    },
    {
      name: 'Scan Lines',
      desc: 'CRT monitor effect — horizontal lines for a retro tech or cinematic look.',
      demoHTML: `<div style="width:100%;height:100%;background:#0d0d0d;display:flex;align-items:center;justify-content:center;position:relative">
        <div style="position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.03) 2px,rgba(255,255,255,0.03) 4px)"></div>
        <span style="font-family:Geist Mono,monospace;font-size:0.9rem;color:#0f0;text-shadow:0 0 6px #0f0;z-index:1">&gt; scanning...</span>
      </div>`,
      chips: ['scan lines', 'CRT effect', 'retro screen', 'line overlay']
    },
    {
      name: 'Dot Grid Background',
      desc: 'Subtle dot matrix background — popular in modern SaaS and developer tools.',
      demoHTML: `<div style="width:100%;height:100%;background:var(--bg);display:flex;align-items:center;justify-content:center;position:relative">
        <div style="position:absolute;inset:0;background-image:radial-gradient(circle,var(--dot-color) 1px,transparent 1px);background-size:20px 20px"></div>
        <span style="font-size:0.8rem;color:var(--text-muted);z-index:1;font-family:Geist Mono,monospace">dot grid</span>
      </div>`,
      chips: ['dot grid', 'dot pattern background', 'subtle grid', 'SaaS background']
    },
    {
      name: 'Noise Gradient',
      desc: 'Gradient with noise texture blended in — adds organic warmth to smooth color shifts.',
      demoHTML: `<div style="width:100%;height:100%;background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);display:flex;align-items:center;justify-content:center;position:relative">
        <div style="position:absolute;inset:0;opacity:0.15;background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E');background-size:128px 128px"></div>
        <span style="font-size:0.8rem;color:#ededed;z-index:1;font-family:Geist Mono,monospace">noise + gradient</span>
      </div>`,
      chips: ['noise gradient', 'grainy gradient', 'textured gradient', 'organic blend']
    }
  ];

  const effectsGrid = document.getElementById('effectsGrid');
  effects.forEach((fx) => {
    const card = document.createElement('div');
    card.className = 'fx-card reveal';
    const demoInner = fx.demoHTML
      ? fx.demoHTML
      : `<div style="${fx.demoStyle}"></div>`;
    const chipsHTML = fx.chips.map(
      (c) => `<button class="chip" data-copy="${c}">${c}</button>`
    ).join('');

    card.innerHTML = `
      <div class="fx-demo">${demoInner}</div>
      <div class="fx-body">
        <h3 class="fx-title">${fx.name}</h3>
        <p class="fx-desc">${fx.desc}</p>
        <div class="chips">${chipsHTML}</div>
      </div>
    `;
    effectsGrid.appendChild(card);
  });

  // ==================== CHEAT SHEET (Section 6) ====================
  const cheatCategories = [
    {
      category: 'Mood / Atmosphere',
      keywords: ['elegant', 'playful', 'futuristic', 'minimalist', 'luxurious', 'moody', 'vibrant', 'serene', 'dramatic', 'whimsical', 'sophisticated', 'energetic', 'cozy', 'ethereal']
    },
    {
      category: 'Spacing / Density',
      keywords: ['generous whitespace', 'dense layout', 'compact', 'airy', 'breathing room', 'tight spacing', 'spacious', 'packed', 'open', 'cramped']
    },
    {
      category: 'Surface / Material',
      keywords: ['matte', 'glossy', 'textured', 'frosted', 'metallic', 'glass', 'paper', 'fabric', 'ceramic', 'leather', 'wood grain', 'concrete']
    },
    {
      category: 'Visual Hierarchy',
      keywords: ['focal point', 'contrast', 'emphasis', 'scale variation', 'color weight', 'type hierarchy', 'visual anchor', 'leading element', 'progressive disclosure']
    },
    {
      category: 'Animation / Motion',
      keywords: ['fade in', 'slide up', 'parallax scroll', 'spring physics', 'stagger animation', 'morph transition', 'hover lift', 'elastic bounce', 'smooth ease', 'kinetic typography', 'auto-scroll', 'reveal on scroll']
    },
    {
      category: 'Era / Movement',
      keywords: ['modernist', 'postmodern', 'art nouveau', 'swiss design', 'mid-century', 'brutalist', 'victorian', 'futurist', 'deconstructivist', 'psychedelic', 'industrial']
    },
    {
      category: 'Composition',
      keywords: ['rule of thirds', 'golden ratio', 'symmetry', 'asymmetry', 'radial balance', 'grid alignment', 'negative space', 'visual flow', 'layered depth']
    },
    {
      category: 'Texture',
      keywords: ['grain', 'noise', 'stipple', 'crosshatch', 'linen', 'canvas', 'rough', 'smooth', 'distressed', 'weathered']
    }
  ];

  const cheatGrid = document.getElementById('cheatGrid');
  cheatCategories.forEach((cat) => {
    const card = document.createElement('div');
    card.className = 'cheat-card reveal';
    const kws = cat.keywords.map(
      (k) => `<button class="chip" data-copy="${k}">${k}</button>`
    ).join('');
    card.innerHTML = `
      <div class="cheat-category">${cat.category}</div>
      <div class="cheat-title">${cat.category}</div>
      <div class="cheat-keywords">${kws}</div>
    `;
    cheatGrid.appendChild(card);
  });

  // ==================== PROMPT BUILDER (Section 7) ====================
  const builderData = [
    {
      label: 'Style',
      options: ['glassmorphism', 'neumorphism', 'neubrutalism', 'minimalist', 'dark luxury', 'flat design', 'cyberpunk', 'vaporwave', 'art deco', 'bauhaus', 'claymorphism', 'memphis']
    },
    {
      label: 'Layout',
      options: ['bento grid', 'split screen', 'card grid', 'sidebar layout', 'masonry', 'single column', 'full-bleed hero', 'asymmetric']
    },
    {
      label: 'Typography',
      options: ['serif', 'sans-serif', 'monospace', 'display type', 'handwritten', 'bold weight', 'light weight', 'condensed']
    },
    {
      label: 'Color',
      options: ['monochromatic', 'complementary', 'pastel', 'neon', 'earth tones', 'dark mode', 'warm palette', 'cool palette', 'jewel tones']
    },
    {
      label: 'Effects',
      options: ['gradient', 'grain texture', 'blur', 'neon glow', 'shadow elevation', 'parallax', 'glass overlay', 'dot grid', 'scan lines']
    },
    {
      label: 'Mood',
      options: ['elegant', 'playful', 'futuristic', 'minimal', 'luxurious', 'moody', 'energetic', 'serene', 'dramatic', 'sophisticated']
    }
  ];

  const promptOutput = document.getElementById('promptOutput');
  const builderContainer = document.getElementById('builderCategories');
  const selectedKeywords = new Set();

  builderData.forEach((cat) => {
    const section = document.createElement('div');
    section.innerHTML = `<div class="builder-category-label">${cat.label}</div>`;
    const chipsWrap = document.createElement('div');
    chipsWrap.className = 'builder-chips';

    cat.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'builder-chip';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        if (selectedKeywords.has(opt)) {
          selectedKeywords.delete(opt);
          btn.classList.remove('active');
        } else {
          selectedKeywords.add(opt);
          btn.classList.add('active');
        }
        updatePromptOutput();
      });
      chipsWrap.appendChild(btn);
    });

    section.appendChild(chipsWrap);
    builderContainer.appendChild(section);
  });

  function updatePromptOutput() {
    if (selectedKeywords.size === 0) {
      promptOutput.innerHTML = '<span class="placeholder">Click keywords below to build your prompt...</span>';
    } else {
      const arr = Array.from(selectedKeywords);
      promptOutput.textContent = `Design a UI with: ${arr.join(', ')}`;
    }
  }

  // Clear button
  document.getElementById('clearPrompt').addEventListener('click', () => {
    selectedKeywords.clear();
    document.querySelectorAll('.builder-chip.active').forEach((c) => c.classList.remove('active'));
    updatePromptOutput();
  });

  // Copy prompt
  document.getElementById('copyPrompt').addEventListener('click', () => {
    if (selectedKeywords.size === 0) {
      showToast('Add keywords first');
      return;
    }
    const text = promptOutput.textContent;
    navigator.clipboard.writeText(text).then(() => {
      showToast('Prompt copied!');
    });
  });

  // ==================== RE-OBSERVE DYNAMICALLY ADDED REVEALS ====================
  document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el));

  // ==================== SMOOTH SCROLL FOR NAV LINKS ====================
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
