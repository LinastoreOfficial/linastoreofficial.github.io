/**
 * Amazon Favorites - Smart Search & Navigation
 * الربط المباشر والكامل مع روابط القائمة الجانبية
 */

function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    if (menu) {
        const isOpen = menu.style.width === "250px";
        menu.style.width = isOpen ? "0" : "250px";
    }
}

document.addEventListener('click', function(event) {
    const menu = document.getElementById("sideMenu");
    const menuIcon = document.querySelector(".menu-icon");
    if (menu && menu.style.width === "250px" && !menu.contains(event.target) && event.target !== menuIcon) {
        menu.style.width = "0";
    }
});

function performSmartSearch(event) {
    // التنفيذ فقط عند الضغط على زر Enter
    if (event.key !== 'Enter') return;

    let input = document.getElementById('searchInput').value.toLowerCase().trim();
    if (!input) return;

    // مصفوفة الروابط (تأكد أن الروابط هنا هي نفس روابط القائمة الجانبية بالضبط)
    const navigationMap = [
        { 
            url: 'https://amzn.to/48h5YFM', 
            keywords: ['men', 'man', 'homme', 'رجال', 'رجالي', 'رجل', 'ذكور', 'mens', 'men fashion','ملابس رجال','apparel'] 
        },
        { 
            url: 'https://amzn.to/4sKQBfW', 
            keywords: ['women', 'woman', 'femme', 'نساء', 'ملابس نساء', 'نسائية', 'بنات', 'بناتي', 'حريمي', 'lady'] 
        },
        { 
            url: 'https://amzn.to/4cqdHDS', 
            keywords: ['ملابس أطفال','kids', 'children', 'enfant', 'baby', 'أطفال', 'طفل', 'صغار', 'بيبي'] 
        },
        { 
            url: 'https://amzn.to/4e1Qaua', 
            keywords: ['accessories', 'إكسسوارات نساء','accessoires', 'accessoires pour femme' ,'أكسسوارات','إكسسوارات','accessories for women','مكملات', 'مجوهرات', 'ساعات'] 
        },
        { 
            url: 'https://amzn.to/4vC6wQt', 
            keywords: ['apple', 'آبل',  'ايفون', 'iphone', 'ipad', 'أكسيسوارات آبل','macbook', 'apple accessoires','airpods'] 
        }
    ];

    // 1. فحص الأقسام: إذا كتب المستخدم كلمة موجودة في المصفوفة، يتم نقله فوراً
    for (let section of navigationMap) {
        // نتحقق إذا كانت الكلمة المكتوبة تطابق أو "جزء من" الكلمات المفتاحية للقسم
        let isMatch = section.keywords.some(key => input === key || input.includes(key));
        
        if (isMatch) {
            window.location.href = section.url; // التحويل للرابط المطلوب
            return; // إنهاء الدالة فوراً وعدم البحث داخل الصفحة
        }
    }

    // 2. البحث المحلي: إذا لم تكن الكلمة قسماً (مثل اسم منتج محدد p1 أو ماركة معينة)
    let grid = document.getElementById('productGrid');
    if (grid) {
        let cards = grid.getElementsByClassName('product-card');
        for (let i = 0; i < cards.length; i++) {
            let title = cards[i].querySelector('.product-title').innerText.toLowerCase();
            if (title.includes(input)) {
                cards[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
                cards[i].style.transition = "0.5s";
                cards[i].style.boxShadow = "0 0 25px #D4AF37";
                setTimeout(() => cards[i].style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)", 3000);
                return;
            }
        }
    }
}
