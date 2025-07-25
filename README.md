# وصف مشروع Affiliate App - Order Form by Ahmed

هذا المشروع هو تطبيق ويب مبني باستخدام إطار العمل Next.js، وهو إطار عمل يعتمد على React لبناء تطبيقات ويب ذات أداء عالي تدعم التقديم من جانب الخادم والتوليد الثابت للصفحات.

## تفاصيل المشروع

- يحتوي المشروع على نظام لإدارة الطلبات والمنتجات، مع واجهات للمستخدمين والمسؤولين (Admin).
- يستخدم Redux Toolkit لإدارة الحالة (state management) في التطبيق.
- يعتمد على مكتبات مثل React Icons، React Toastify، وFramer Motion لتحسين تجربة المستخدم.
- يستخدم Tailwind CSS مع تكامل NextUI لتصميم واجهات المستخدم بشكل حديث ومتجاوب.
- يدعم المشروع تحميل الصور وعرضها في شكل Carousel (عرض شرائح).
- يحتوي على صفحات دعم (SupportPage) تتيح للمستخدمين التواصل عبر واتساب وفيسبوك.
- يدعم تسجيل الدخول والتسجيل مع التحقق من صحة البيانات.

## شرح الملفات والمجلدات الرئيسية

### 1. `src`:
- يحتوي على مجلد `app` الذي يضم جميع صفحات ومكونات التطبيق.
- مجلد `componant` يحتوي على مكونات React مثل Navbar, Footer, Carousel, Admin components، وغيرها.
- مجلد `adminahmed` يحتوي على صفحات وإدارة المنتجات والطلبات للمسؤول.
- مجلد `lib` يحتوي على ملفات Redux مثل `authSlice.js` و `store.js` لإدارة الحالة.

### 2. `next.config.mjs`:
- يحتوي على إعدادات Next.js مثل السماح بتحميل الصور من نطاق معين.
- تفعيل وضع React الصارم (Strict Mode).
- تفعيل ميزات تجريبية مثل serverActions.

### 3. `package.json`:
- يحتوي على تعريف المشروع واعتماده على مكتبات مثل Next.js، React، Redux Toolkit، Tailwind CSS، وغيرها.
- يحتوي على سكربتات لتشغيل المشروع (`dev`, `build`, `start`, `lint`).

### 4. `tailwind.config.js`:
- إعدادات Tailwind CSS مع إضافة دعم لمكونات NextUI.
- تعريف محتوى الملفات التي يستخدمها Tailwind لتوليد الأنماط.
- تفعيل الوضع الداكن (dark mode).

### 5. `public`:
- يحتوي على ملفات الصور المستخدمة في التطبيق مثل صور WhatsApp.
- ملف `ads.txt` لإعلانات.

### 6. `google1f94b0f748d1fb7b.html`:
- ملف تحقق من ملكية الموقع لخدمات Google.

## ملاحظات إضافية
- التطبيق يدعم التفاعل مع API خارجي محدد عبر متغير البيئة `NEXT_PUBLIC_API_URL`.
- يحتوي على نظام إشعارات باستخدام React Toastify.
- يدعم التصفح عبر الأجهزة المختلفة مع تحسينات للهواتف المحمولة.
        
