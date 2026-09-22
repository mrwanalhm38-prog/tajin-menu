import { RESTAURANT_INFO, MENU_ITEMS, CATEGORIES } from '../data/menuData';

export function generateStandaloneSingleHtml(): string {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${RESTAURANT_INFO.name} - منيو إلكتروني فاخر</title>
  <meta name="description" content="منيو إلكتروني تفاعلي وفاخر لمطعم طاجين للمشويات والأكل الشرقي">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@400;600;700;800;900&family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0e0d0c;
      --card-bg: #161311;
      --card-hover: #1e1a16;
      --amber: #f59e0b;
      --amber-dark: #b45309;
      --gold: #d97706;
      --text: #f5f5f4;
      --text-muted: #a8a29e;
      --border: #292524;
      --border-accent: rgba(245, 158, 11, 0.3);
      --emerald: #10b981;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Cairo', sans-serif;
      padding-bottom: 90px;
      line-height: 1.5;
    }
    h1, h2, h3, .font-alex { font-family: 'Alexandria', 'Cairo', sans-serif; }
    .header {
      background: linear-gradient(180deg, #181512 0%, #100e0c 100%);
      border-bottom: 1px solid var(--border-accent);
      padding: 24px 16px 16px;
      text-align: center;
      position: relative;
    }
    .badge {
      display: inline-block;
      background: rgba(245, 158, 11, 0.12);
      color: var(--amber);
      border: 1px solid var(--border-accent);
      border-radius: 9999px;
      padding: 2px 10px;
      font-size: 11px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .logo-box {
      width: 68px;
      height: 68px;
      margin: 0 auto 10px;
      border-radius: 20px;
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), #141210);
      border: 1px solid var(--border-accent);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      box-shadow: 0 10px 25px -5px rgba(245, 158, 11, 0.2);
    }
    .search-box {
      max-width: 500px;
      margin: 16px auto 0;
      position: relative;
    }
    .search-box input {
      width: 100%;
      background: #171412;
      border: 1px solid #332d27;
      color: #fff;
      padding: 12px 16px;
      border-radius: 16px;
      font-family: inherit;
      font-size: 14px;
      outline: none;
    }
    .search-box input:focus { border-color: var(--amber); }
    .sticky-nav {
      position: sticky;
      top: 0;
      z-index: 40;
      background: rgba(18, 16, 14, 0.95);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid #292524;
      padding: 10px 16px;
      display: flex;
      gap: 8px;
      overflow-x: auto;
      white-space: nowrap;
    }
    .sticky-nav::-webkit-scrollbar { display: none; }
    .nav-btn {
      background: #1c1815;
      color: #d6d3d1;
      border: 1px solid #2e2822;
      padding: 8px 14px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 700;
      font-family: inherit;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }
    .nav-btn.active, .nav-btn:hover {
      background: linear-gradient(135deg, #d97706, #b45309);
      color: #0e0d0c;
      border-color: #f59e0b;
    }
    .container { max-width: 900px; margin: 0 auto; padding: 20px 16px; }
    .sec-title {
      font-size: 20px;
      font-weight: 800;
      color: #fef3c7;
      margin: 28px 0 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid #292524;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .menu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: border-color 0.2s;
    }
    .card:hover { border-color: var(--border-accent); }
    .card-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
    .card-title { font-size: 16px; font-weight: 700; color: #fff; }
    .card-desc { font-size: 12px; color: var(--text-muted); margin-top: 4px; line-height: 1.4; }
    .options-row {
      display: flex;
      gap: 6px;
      margin: 14px 0 10px;
      overflow-x: auto;
      padding-bottom: 2px;
    }
    .opt-btn {
      flex: 1;
      min-width: 70px;
      background: #201c18;
      border: 1px solid #2e2822;
      border-radius: 10px;
      padding: 6px 4px;
      font-size: 11px;
      color: #d6d3d1;
      cursor: pointer;
      text-align: center;
      font-family: inherit;
    }
    .opt-btn.active {
      background: var(--amber);
      color: #0e0d0c;
      font-weight: 800;
      border-color: #f59e0b;
    }
    .card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 10px;
      border-top: 1px solid #241f1a;
      margin-top: 10px;
    }
    .price { font-size: 18px; font-weight: 800; color: #fde68a; font-family: 'Alexandria', sans-serif; }
    .add-btn {
      background: linear-gradient(135deg, #d97706, #b45309);
      color: #0e0d0c;
      border: none;
      padding: 8px 14px;
      border-radius: 12px;
      font-weight: 800;
      font-size: 12px;
      cursor: pointer;
      font-family: inherit;
    }
    .floating-cart {
      position: fixed;
      bottom: 16px;
      left: 16px;
      right: 16px;
      max-width: 480px;
      margin: 0 auto;
      background: linear-gradient(135deg, #d97706, #f59e0b);
      color: #0e0d0c;
      padding: 14px 18px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 800;
      cursor: pointer;
      box-shadow: 0 10px 30px rgba(0,0,0,0.6);
      z-index: 50;
      display: none;
    }
    .cart-drawer {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.8);
      z-index: 60;
      display: none;
      justify-content: flex-end;
    }
    .cart-drawer-content {
      width: 100%;
      max-width: 420px;
      height: 100%;
      background: #141210;
      padding: 20px;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
    .footer {
      text-align: center;
      padding: 40px 16px 20px;
      background: #090807;
      border-top: 1px solid #292524;
      margin-top: 50px;
      position: relative;
      z-index: 1;
    }
    .credit-box {
      display: inline-block;
      padding: 12px 24px;
      background: rgba(245, 158, 11, 0.08);
      border: 1px solid rgba(245, 158, 11, 0.3);
      border-radius: 16px;
      font-size: 15px;
      font-weight: 800;
      color: #fef08a;
      margin: 16px 0;
    }
    .bg-watermark {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 580px;
      max-width: 90vw;
      height: 580px;
      max-height: 90vh;
      opacity: 0.16;
      pointer-events: none;
      z-index: 0;
      filter: drop-shadow(0 0 35px #000);
    }
  </style>
</head>
<body>

  <!-- Quiet Dark Watermark in Background -->
  <div class="bg-watermark" aria-hidden="true">
    <svg viewBox="0 0 500 500" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <path id="sfTopCurve" d="M 100 250 A 155 155 0 0 1 400 250" fill="none" />
        <path id="sfBottomCurve" d="M 390 270 A 155 155 0 0 1 110 270" fill="none" />
      </defs>
      <circle cx="250" cy="250" r="185" stroke="#dfba82" stroke-width="6.5" stroke-linecap="round" stroke-dasharray="420 30 180 30" stroke-dashoffset="120" />
      <circle cx="250" cy="250" r="142" stroke="#dfba82" stroke-width="2.5" stroke-opacity="0.6" stroke-dasharray="280 20 80 20" stroke-dashoffset="75" />
      <text fill="#ffffff" font-size="24" font-weight="900" letter-spacing="4" font-family="sans-serif"><textPath href="#sfTopCurve" startOffset="50%" text-anchor="middle">ORIENTAL FOOD</textPath></text>
      <text fill="#ffffff" font-size="20" font-weight="800" letter-spacing="3.5" font-family="sans-serif"><textPath href="#sfBottomCurve" startOffset="50%" text-anchor="middle">RESTAURANT &amp; CAFE</textPath></text>
      <line x1="35" y1="250" x2="465" y2="175" stroke="#dfba82" stroke-width="6.5" stroke-linecap="round" />
      <line x1="30" y1="345" x2="460" y2="270" stroke="#dfba82" stroke-width="6.5" stroke-linecap="round" />
      <path d="M 65,320 C 85,270 145,230 195,245 C 175,285 140,320 85,328 C 75,330 65,328 65,320 Z" fill="#e8c48a" />
      <ellipse cx="140" cy="275" rx="30" ry="16" transform="rotate(-15 140 275)" fill="#0e0d0c" />
      <path d="M 180,245 C 190,195 210,165 220,150 C 223,145 228,146 226,152 C 220,172 202,215 190,246 Z" fill="#e8c48a" />
      <path d="M 185,275 C 215,225 285,230 340,250 C 310,268 250,285 195,282 Z" fill="#e8c48a" />
      <path d="M 245,255 C 275,235 320,240 338,252 C 320,270 275,285 240,285 C 230,285 225,270 245,255 Z" fill="#e8c48a" />
      <path d="M 330,252 C 365,240 395,250 405,270 C 420,245 425,210 420,185 C 425,185 432,190 435,200 C 445,235 435,275 400,295 C 360,318 320,290 325,265 Z" fill="#e8c48a" />
      <!-- Clear readable bold Arabic text طاجين -->
      <g transform="rotate(-9.5 250 265)">
        <text x="248" y="280" text-anchor="middle" fill="#e8c48a" font-size="74" font-weight="900" font-family="sans-serif">طاجين</text>
      </g>
      <rect x="105" y="268" width="26" height="26" transform="rotate(45 118 281)" fill="#ffffff" rx="3" />
      <rect x="235" y="285" width="18" height="18" transform="rotate(45 244 294)" fill="#ffffff" rx="2" />
      <rect x="248" y="302" width="18" height="18" transform="rotate(45 257 311)" fill="#ffffff" rx="2" />
      <rect x="305" y="278" width="20" height="20" transform="rotate(45 315 288)" fill="#ffffff" rx="2" />
    </svg>
  </div>

  <!-- Header -->
  <header class="header">
    <div class="logo-box">🔥</div>
    <span class="badge">مطعم ومشويات طاجين</span>
    <h1 style="font-size: 26px; font-weight: 900; color: #fff;">${RESTAURANT_INFO.name}</h1>
    <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">${RESTAURANT_INFO.tagline}</p>
    
    <div class="search-box">
      <input type="text" id="searchInput" placeholder="ابحث عن صنفك المفضل... (كباب، كفتة، مكرونة...)" onkeyup="filterMenu()">
    </div>
  </header>

  <!-- Sticky Nav -->
  <nav class="sticky-nav">
    ${CATEGORIES.map(
      (c) => `<button class="nav-btn" onclick="scrollToSec('${c.id}')">${c.emoji} ${c.name}</button>`
    ).join('')}
  </nav>

  <!-- Menu Content -->
  <main class="container" id="menuContainer">
    ${CATEGORIES.map((cat) => {
      const items = MENU_ITEMS.filter((i) => i.categoryId === cat.id);
      return `
        <section id="${cat.id}">
          <h2 class="sec-title">${cat.emoji} ${cat.name}</h2>
          <div class="menu-grid">
            ${items
              .map((item) => {
                const defaultOpt = item.options[0];
                return `
              <div class="card" data-name="${item.arabicName}" data-desc="${item.description}">
                <div>
                  <div class="card-top">
                    <span class="card-title font-alex">${item.arabicName}</span>
                    ${item.badge ? `<span class="badge">${item.badge}</span>` : ''}
                  </div>
                  <p class="card-desc">${item.description}</p>
                </div>

                <div>
                  ${
                    item.options.length > 1
                      ? `
                  <div class="options-row" id="opts-${item.id}">
                    ${item.options
                      .map(
                        (opt, idx) => `
                      <button class="opt-btn ${idx === 0 ? 'active' : ''}" 
                        onclick="selectOpt('${item.id}', '${opt.id}', ${opt.price}, this)">
                        ${opt.name}
                      </button>
                    `
                      )
                      .join('')}
                  </div>
                  `
                      : ''
                  }

                  <div class="card-footer">
                    <div>
                      <span style="font-size: 10px; color: var(--text-muted); display: block;">السعر</span>
                      <span class="price" id="price-${item.id}">${defaultOpt.price}</span>
                      <span style="font-size: 11px; color: var(--text-muted); font-weight: bold;">ج.م</span>
                    </div>
                    <button class="add-btn" onclick="addToCart('${item.id}', '${item.arabicName}')">
                      + أضف للطلب
                    </button>
                  </div>
                </div>
              </div>
            `;
              })
              .join('')}
          </div>
        </section>
      `;
    }).join('')}
  </main>

  <!-- Floating Cart -->
  <div class="floating-cart" id="floatingCart" onclick="toggleCart(true)">
    <span>🛒 سلة الطلبات (<span id="cartCount">0</span> أصناف)</span>
    <span>إتمام الطلب بالواتساب &larr;</span>
  </div>

  <!-- Cart Drawer -->
  <div class="cart-drawer" id="cartDrawer">
    <div class="cart-drawer-content">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h3 style="font-size: 18px; font-weight: 800; color: #fde68a;">سلة الطلبات</h3>
        <button onclick="toggleCart(false)" style="background: none; border: none; color: #fff; font-size: 20px; cursor: pointer;">✕</button>
      </div>

      <div style="margin-bottom: 16px;">
        <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px;">رقم الطاولة / أو نوع الاستلام:</label>
        <input type="text" id="orderNoteInput" placeholder="مثال: طاولة 5 أو تيك أواي" style="width: 100%; background: #1c1815; border: 1px solid #332d27; color: #fff; padding: 10px; border-radius: 10px; font-family: inherit; font-size: 13px;">
      </div>

      <div id="cartItemsList" style="flex: 1; overflow-y: auto;"></div>

      <div style="border-top: 1px solid #292524; padding-top: 16px; margin-top: 16px;">
        <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: 900; margin-bottom: 14px;">
          <span>الإجمالي:</span>
          <span style="color: #fde68a;"><span id="cartTotal">0</span> ج.م</span>
        </div>
        <button onclick="sendOrderWhatsApp()" style="width: 100%; background: #10b981; color: #fff; border: none; padding: 14px; border-radius: 14px; font-size: 15px; font-weight: 900; cursor: pointer; font-family: inherit;">
          💬 إرسال الطلب عبر واتساب المطعم (${RESTAURANT_INFO.phone})
        </button>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="footer">
    <h3 style="color: #fff; font-size: 20px; font-weight: 800;">${RESTAURANT_INFO.name}</h3>
    <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">📍 ${RESTAURANT_INFO.address}</p>
    <p style="font-size: 12px; color: #f59e0b; margin-top: 2px;">📞 هاتف / واتساب: ${RESTAURANT_INFO.phone}</p>
    
    <div class="credit-box">
      <div>تم التطوير بواسطة مروان لهم ❤️</div>
      <div style="margin-top: 8px;">
        <a href="${RESTAURANT_INFO.developer.whatsappLink}" target="_blank" style="color: #6ee7b7; font-size: 13px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
          💬 تواصل مع المطور عبر الواتساب: <span dir="ltr">${RESTAURANT_INFO.developer.whatsapp}</span>
        </a>
      </div>
    </div>

    <p style="font-size: 11px; color: #78716c; margin-top: 8px;">
      جميع الحقوق محفوظة © ${new Date().getFullYear()} ${RESTAURANT_INFO.name}
    </p>
  </footer>

  <script>
    const itemsData = ${JSON.stringify(
      MENU_ITEMS.map((i) => ({
        id: i.id,
        name: i.arabicName,
        options: i.options,
      }))
    )};

    let cart = [];
    let selectedOptions = {};

    itemsData.forEach(item => {
      selectedOptions[item.id] = item.options[0];
    });

    function selectOpt(itemId, optId, price, btn) {
      const item = itemsData.find(i => i.id === itemId);
      const opt = item.options.find(o => o.id === optId);
      selectedOptions[itemId] = opt;
      document.getElementById('price-' + itemId).innerText = price;
      
      const parent = document.getElementById('opts-' + itemId);
      parent.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }

    function addToCart(itemId, itemName) {
      const opt = selectedOptions[itemId];
      const cartId = itemId + '-' + opt.id;
      const exist = cart.find(c => c.cartId === cartId);
      if (exist) {
        exist.qty++;
      } else {
        cart.push({ cartId, itemId, name: itemName, optName: opt.name, price: opt.price, qty: 1 });
      }
      updateCartUI();
    }

    function updateCartUI() {
      const totalCount = cart.reduce((s, i) => s + i.qty, 0);
      const totalPrice = cart.reduce((s, i) => s + (i.price * i.qty), 0);
      
      document.getElementById('cartCount').innerText = totalCount;
      document.getElementById('cartTotal').innerText = totalPrice;
      
      const floatBar = document.getElementById('floatingCart');
      floatBar.style.display = totalCount > 0 ? 'flex' : 'none';

      const list = document.getElementById('cartItemsList');
      if (cart.length === 0) {
        list.innerHTML = '<p style="color: #78716c; text-align: center; margin-top: 40px;">السلة فارغة</p>';
      } else {
        list.innerHTML = cart.map((i, idx) => \`
          <div style="background: #1c1815; padding: 10px; border-radius: 12px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 13px; font-weight: 700; color: #fff;">\${i.name}</div>
              <div style="font-size: 11px; color: var(--amber);">\${i.optName} (\${i.price} ج.م)</div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <button onclick="changeQty(\${idx}, -1)" style="width: 26px; height: 26px; background: #2e2822; color: #fff; border: none; border-radius: 6px; cursor: pointer;">-</button>
              <span style="font-weight: 800; font-size: 13px;">\${i.qty}</span>
              <button onclick="changeQty(\${idx}, 1)" style="width: 26px; height: 26px; background: var(--amber); color: #000; border: none; border-radius: 6px; cursor: pointer; font-weight: 800;">+</button>
            </div>
          </div>
        \`).join('');
      }
    }

    function changeQty(idx, delta) {
      cart[idx].qty += delta;
      if (cart[idx].qty <= 0) cart.splice(idx, 1);
      updateCartUI();
    }

    function toggleCart(show) {
      document.getElementById('cartDrawer').style.display = show ? 'flex' : 'none';
    }

    function scrollToSec(id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }

    function filterMenu() {
      const q = document.getElementById('searchInput').value.toLowerCase().trim();
      document.querySelectorAll('.card').forEach(card => {
        const name = card.getAttribute('data-name').toLowerCase();
        const desc = card.getAttribute('data-desc').toLowerCase();
        card.style.display = (name.includes(q) || desc.includes(q)) ? 'flex' : 'none';
      });
    }

    function sendOrderWhatsApp() {
      if (cart.length === 0) return;
      const note = document.getElementById('orderNoteInput').value || 'غير محدد';
      const totalPrice = cart.reduce((s, i) => s + (i.price * i.qty), 0);
      
      let msg = '🍽️ *طلب جديد من منيو ${RESTAURANT_INFO.name}*\\n';
      msg += '━━━━━━━━━━━━━━━━━━━━━\\n';
      msg += '📍 *بيانات الطلب:* ' + note + '\\n';
      msg += '📋 *الأصناف:*\\n\\n';
      
      cart.forEach((i, idx) => {
        msg += (idx + 1) + '. *' + i.name + '* (' + i.optName + ')\\n';
        msg += '   الكمية: ' + i.qty + ' × ' + i.price + ' ج.م = ' + (i.qty * i.price) + ' ج.م\\n';
      });
      
      msg += '━━━━━━━━━━━━━━━━━━━━━\\n';
      msg += '💰 *الإجمالي الكلي:* *' + totalPrice + ' ج.م*\\n';
      msg += '✨ شكراً لاختياركم *${RESTAURANT_INFO.name}*!';

      const encoded = encodeURIComponent(msg);
      window.open('https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=' + encoded, '_blank');
    }
  </script>
</body>
</html>`;
}

export function downloadStandaloneHtmlFile() {
  const content = generateStandaloneSingleHtml();
  const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'tajin-restaurant-menu.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
