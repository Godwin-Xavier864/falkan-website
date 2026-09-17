/**
 * FALKAN Business Static Website
 * Client-side interactivity script
 * Owned & Operated by Mangozteen (Kerala, India)
 * Responsive & Adaptive across all screen sizes
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Responsive Mobile Menu Drawer
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.textContent = isOpen ? '✕' : '☰';
    });

    // Close menu when clicking a navigation link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.textContent = '☰';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileToggle.textContent = '☰';
        }
      }
    });

    // Auto-close on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860 && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.textContent = '☰';
      }
    });
  }

  // 2. Interactive Terminal Simulator
  const marketData = {
    equities: {
      symbol: "RELIANCE.NS",
      name: "Reliance Industries Ltd",
      price: "₹2,984.45",
      change: "+1.84%",
      isPositive: true,
      aiSummary: "Bullish divergence on 4H RSI with high institutional accumulation. Immediate resistance at ₹3,020.",
      sentimentScore: "87% Bullish",
      volume: "12.4M",
      volatility: "Moderate",
      spread: "0.05"
    },
    crypto: {
      symbol: "BTC/USDT",
      name: "Bitcoin Perpetual",
      price: "$68,420.00",
      change: "+3.22%",
      isPositive: true,
      aiSummary: "Key breakout above $67,800 retested with aggressive volume. Algorithmic liquidity sweeps detected.",
      sentimentScore: "92% Bullish",
      volume: "$24.8B",
      volatility: "High",
      spread: "0.01%"
    },
    indices: {
      symbol: "NIFTY 50",
      name: "National Stock Exchange Index",
      price: "24,850.15",
      change: "-0.28%",
      isPositive: false,
      aiSummary: "Consolidation near previous swing high. Support holding firmly at 24,720 round mark.",
      sentimentScore: "54% Neutral",
      volume: "480M",
      volatility: "Low",
      spread: "0.02"
    },
    forex: {
      symbol: "USD/INR",
      name: "US Dollar / Indian Rupee",
      price: "83.62",
      change: "+0.08%",
      isPositive: true,
      aiSummary: "Rangebound compression between 83.50 and 83.75. Central bank liquidity intervention active.",
      sentimentScore: "60% Neutral",
      volume: "3.2B",
      volatility: "Very Low",
      spread: "0.0025"
    }
  };

  const terminalTabs = document.querySelectorAll('.terminal-tab-btn');
  const symbolEl = document.getElementById('tickerSymbol');
  const nameEl = document.getElementById('tickerName');
  const priceEl = document.getElementById('tickerPrice');
  const changeEl = document.getElementById('tickerChange');
  const aiInsightEl = document.getElementById('aiInsightText');
  const statVolumeEl = document.getElementById('statVolume');
  const statSentimentEl = document.getElementById('statSentiment');
  const statVolatilityEl = document.getElementById('statVolatility');
  const statSpreadEl = document.getElementById('statSpread');
  const chartBarsEl = document.getElementById('chartBars');

  function renderMarketData(category) {
    const data = marketData[category];
    if (!data) return;

    if (symbolEl) symbolEl.textContent = data.symbol;
    if (nameEl) nameEl.textContent = data.name;
    if (priceEl) priceEl.textContent = data.price;
    if (changeEl) {
      changeEl.textContent = (data.isPositive ? '▲ ' : '▼ ') + data.change;
      changeEl.className = 'ticker-change ' + (data.isPositive ? 'positive' : 'negative');
    }
    if (aiInsightEl) aiInsightEl.textContent = data.aiSummary;
    if (statVolumeEl) statVolumeEl.textContent = data.volume;
    if (statSentimentEl) statSentimentEl.textContent = data.sentimentScore;
    if (statVolatilityEl) statVolatilityEl.textContent = data.volatility;
    if (statSpreadEl) statSpreadEl.textContent = data.spread;

    // Dynamically regenerate candle heights, adjusting count for narrow screens
    if (chartBarsEl) {
      chartBarsEl.innerHTML = '';
      const isNarrow = window.innerWidth < 480;
      const fullHeights = data.isPositive 
        ? [40, 55, 48, 65, 58, 72, 68, 85, 92, 110, 102, 125]
        : [110, 100, 105, 90, 85, 95, 78, 70, 75, 62, 58, 48];
      
      const heights = isNarrow ? fullHeights.slice(-7) : fullHeights;
      
      heights.forEach((h, idx) => {
        const bar = document.createElement('div');
        const isUp = idx === 0 ? true : heights[idx] >= heights[idx - 1];
        bar.className = `candle-bar ${isUp ? 'up' : 'down'}`;
        bar.style.height = `${h}px`;
        chartBarsEl.appendChild(bar);
      });
    }
  }

  terminalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      terminalTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const market = tab.getAttribute('data-market');
      renderMarketData(market);
    });
  });

  // Re-render chart on viewport width change to adjust candle count
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const activeTab = document.querySelector('.terminal-tab-btn.active');
      const category = activeTab ? activeTab.getAttribute('data-market') : 'equities';
      renderMarketData(category);
    }, 200);
  });

  // Initialize with equities
  renderMarketData('equities');

  // Subtle simulated tick pulse
  setInterval(() => {
    const activeTab = document.querySelector('.terminal-tab-btn.active');
    const category = activeTab ? activeTab.getAttribute('data-market') : 'equities';
    const data = marketData[category];
    if (priceEl && data) {
      priceEl.style.opacity = '0.7';
      setTimeout(() => {
        priceEl.style.opacity = '1';
      }, 300);
    }
  }, 4500);

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all others
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });
        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 4. Smooth Anchor Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
