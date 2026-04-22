/**
 * Amazon Favorites - Smart Search & Navigation
 * نظام التنقل الذكي والربط المباشر مع روابط القائمة الجانبية
 */

// دالة فتح وإغلاق القائمة الجانبية
function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    if (menu) {
        const isOpen = menu.style.width === "250px";
        menu.style.width = isOpen ? "0" : "250px";
    }
}

// إغلاق القائمة عند النقر في أي مكان خارجها
document.addEventListener('click', function(event) {
    const menu = document.getElementById("sideMenu");
    const menuIcon = document.querySelector(".menu-icon");
    if (menu && menu.style.width === "250px" && !menu.contains(event.target) && event.target !== menuIcon) {
        menu.style.width = "0";
    }
});

// وظيفة البحث الذكي والتحويل المباشر
function performSmartSearch(event) {
    // التنفيذ فقط عند الضغط على زر Enter
    if (event.key !== 'Enter') return;

    let input = document.getElementById('searchInput').value.toLowerCase().trim();
    if (!input) return;

    // مصفوفة الروابط والأقسام (مرتبة ومنظمة)
    const navigationMap = [
        { 
            title: "Men's Apparel",
            url: 'https://amzn.to/48h5YFM', 
            keywords: ['men', 'man', 'homme', 'رجال', 'رجالي', 'رجل', 'ذكور', 'mens', 'men fashion', 'ملابس رجال', 'apparel'] 
        },
        { 
            title: "Men's Watches",
            url: 'https://amzn.to/4cGGKBY', 
            keywords: ['men watches', 'men watch', 'montre homme', 'ساعات رجال', 'ساعات رجالية', 'ساعة رجالية', 'ساعة رجال', 'ساعات رجالي'] 
        },
        { 
            title: "Women's Watches",
            url: 'https://amzn.to/42lmnFF', 
            keywords: ['women watches', 'women watch', 'montre femme', 'ساعات نساء', 'ساعات نسائية', 'ساعة نسائية', 'ساعة نساء', 'ساعات بنات'] 
        },
        { 
            title: "Women's Apparel",
            url: 'https://amzn.to/4sKQBfW', 
            keywords: ['women', 'woman', 'femme', 'نساء', 'ملابس نساء', 'نسائية', 'بنات', 'بناتي', 'حريمي', 'lady'] 
        },
        { 
            title: "Kids' Apparel",
            url: 'https://amzn.to/4cqdHDS', 
            keywords: ['ملابس أطفال', 'kids', 'children', 'enfant', 'baby', 'أطفال', 'طفل', 'صغار', 'بيبي'] 
        },
        { 
            title: "Women's Accessories",
            url: 'https://amzn.to/4ezmzIH', 
            keywords: ['accessories', 'إكسسوارات نساء', 'accessoires', 'accessoires pour femme', 'أكسسوارات', 'إكسسوارات', 'accessories for women', 'مكملات', 'مجوهرات'] 
        },
        { 
            title: "Apple Accessories",
            url: 'https://amzn.to/41OLl06', 
            keywords: ['apple', 'آبل', 'ايفون', 'iphone', 'ipad', 'أكسيسوارات آبل', 'macbook', 'apple accessoires', 'airpods'] 
        },
       { 
            title: "Sports Shoes", 
            url: 'https://amzn.to/4tUZRz6',
            keywords: ['shoes', 'sneakers', 'sport shoes', 'basket', 'chaussures', 'أحذية', 'حذاء', 'سبرديلة', 'كويتشي', 'أحذية رياضية', 'حذاء رياضي', 'سبورت', 'بوتي'] 
        },
    ];

    // 1. فحص الأقسام: التحويل الفوري إذا تطابق البحث مع الكلمات المفتاحية
    for (let section of navigationMap) {
        let isMatch = section.keywords.some(key => input === key || input.includes(key));
        
        if (isMatch) {
            window.location.href = section.url;
            return; 
        }
    }

    // 2. البحث المحلي: التمرير للمنتج داخل الصفحة إذا لم يكن قسماً رئيسياً
    let grid = document.getElementById('productGrid');
    if (grid) {
        let cards = grid.getElementsByClassName('product-card');
        for (let i = 0; i < cards.length; i++) {
            let title = cards[i].querySelector('.product-title').innerText.toLowerCase();
            if (title.includes(input)) {
                cards[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
                cards[i].style.transition = "0.5s";
                cards[i].style.boxShadow = "0 0 25px #D4AF37"; // تأثير التوهج الذهبي
                setTimeout(() => cards[i].style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)", 3000);
                return;
            }
        }
    }
}






            
