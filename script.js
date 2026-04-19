/**
 * Smart Search & Navigation Script - RABIE STORE (FINAL VERSION)
 */

function performSmartSearch(event) {
    // تشغيل الدالة فقط عند الضغط على Enter أو إذا كانت الدالة تُستدعى من زر
    if (event.type === 'keypress' && event.key !== 'Enter') return;

    let input = document.getElementById('searchInput').value.toLowerCase().trim();
    if (!input) return;

    let grid = document.getElementById('productGrid');
    let foundLocally = false;

    // 1. البحث والتمرير (Scroll) داخل الصفحة الحالية
    if (grid) {
        let cards = grid.getElementsByClassName('product-card');
        for (let i = 0; i < cards.length; i++) {
            let titleElement = cards[i].querySelector('.product-title');
            if (titleElement) {
                let title = titleElement.innerText.toLowerCase();
                
                if (title.includes(input)) {
                    // التمرير للمنتج بسلاسة واحترافية
                    cards[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // تمييز المنتج بظل ذهبي ليراه المستخدم
                    cards[i].style.transition = "0.3s";
                    cards[i].style.boxShadow = "0 0 20px #D4AF37";
                    setTimeout(() => cards[i].style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)", 3000);
                    
                    foundLocally = true;
                    break; 
                }
            }
        }
    }

    // 2. إذا لم يجد المنتج محلياً، ينتقل لصفحة أخرى بناءً على الكلمات المفتاحية (الذكاء اللغوي)
    if (!foundLocally && event.key === 'Enter') {
        const pageMappings = [
            { 
                file: 'men.html', 
                keywords: ['men', 'homme', 'man', 'رجال', 'رجالي', 'رجالية', 'ذكر', 'ذكور'] 
            },
            { 
                file: 'women.html', 
                keywords: ['women', 'woman', 'femme', 'نساء', 'نسائي', 'نسائية', 'أنثى', 'حريمي'] 
            },
            { 
                file: 'children.html', 
                keywords: ['children', 'kids', 'enfant', 'أطفال', 'طفل', 'صغير', 'بناتي', 'أولادي'] 
            },
            { 
                file: 'accessories.html', 
                keywords: ['accessories', 'accessoires', 'إكسسوارات', 'مكملات', 'إكسسوار', 'ساعات'] 
            },
            { 
                file: 'shoes.html', 
                keywords: ['shoes', 'chaussures', 'أحذية', 'حذاء', 'سنيكرز', 'بوت'] 
            },
            { 
                file: 'amazon.html', 
                keywords: ['amazon', 'favorites', 'home', 'الرئيسية', 'أمازون'] 
            }
        ];

        // البحث بذكاء عن أي كلمة مفتاحية داخل جملة البحث
        let match = pageMappings.find(item => 
            item.keywords.some(keyword => input.includes(keyword))
        );

        if (match) {
            window.location.href = match.file;
        }
    }
}

// دالة فتح وإغلاق المنيو الجانبي
function toggleMenu() {
    let menu = document.getElementById("sideMenu");
    if (menu) {
        menu.style.width = (menu.style.width === "250px") ? "0" : "250px";
    }
}
