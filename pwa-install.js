/**
 * Smart PWA Install Prompt Script - LINA STORE (Android & iOS)
 */
let deferredPrompt;
const installBanner = document.getElementById('install-banner');

// 1. تفعيل الـ Service Worker الرسمي للموقع
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker Registered!', reg))
      .catch(err => console.log('Service Worker Error:', err));
  });
}

// 2. التقاط حدث التثبيت للأندرويد
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // الزر ظاهر بالفعل في الـ HTML
});

// 3. معالجة الضغط على الزر (ذكاء اصطناعي للتمييز بين الأنظمة)
if (installBanner) {
  installBanner.addEventListener('click', async () => {
    
    // أولاً: إذا كان أندرويد والمتصفح جاهز للتثبيت المباشر
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response: ${outcome}`);
      deferredPrompt = null;
      installBanner.style.display = 'none';
    } 
    // ثانياً: إذا كان الزائر يستخدم آيفون (iOS)
    else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      alert("للتثبيت على الآيفون: اضغط على زر المشاركة (Share) في الأسفل ⎋ ثم اختر 'إضافة إلى الشاشة الرئيسية' (Add to Home Screen) ➕");
    } 
    // ثالثاً: إذا كان التطبيق مثبتاً بالفعل أو على الكمبيوتر
    else {
      alert("التطبيق مدعوم بالكامل على الهواتف الذكية عبر متصفح Chrome أو Safari!");
    }
  });
}

// 4. إخفاء الزر إذا تم التثبيت بنجاح
window.addEventListener('appinstalled', () => {
  if (installBanner) {
    installBanner.style.display = 'none';
  }
  deferredPrompt = null;
});
