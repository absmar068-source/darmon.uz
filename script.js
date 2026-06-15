// MOCK DATA - Shifokorlar va Yo'nalishlar bazasi
const categories = [
    { id: 'cardiologist', name: 'Kardiolog', icon: 'fa-heart-circle-bolt', color: 'bg-red-50 text-red-600' },
    { id: 'dentist', name: 'Stomatolog', icon: 'fa-tooth', color: 'bg-blue-50 text-blue-600' },
    { id: 'pediatrician', name: 'Pediatr', icon: 'fa-baby', color: 'bg-emerald-50 text-emerald-600' },
    { id: 'neurologist', name: 'Nevrolog', icon: 'fa-brain', color: 'bg-purple-50 text-purple-600' },
    { id: 'therapist', name: 'Terapevt', icon: 'fa-stethoscope', color: 'bg-amber-50 text-amber-600' },
    { id: 'ophthalmologist', name: 'Oftalmolog', icon: 'fa-eye', color: 'bg-cyan-50 text-cyan-600' }
];

const doctors = [
    {
        id: 1,
        name: 'Dr. Shahzod Alimov',
        category: 'cardiologist',
        categoryName: 'Kardiolog',
        rating: 4.9,
        reviewsCount: 124,
        experience: 12,
        price: '150,000',
        clinic: 'Darmon Med Klinikasi',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
        bio: 'Yurak-qon tomir kasalliklarini davolash va jarrohlik amaliyotidan keyingi reabilitatsiya bo\'yicha respublika miqyosidagi yetakchi mutaxassis.',
        slots: ['09:00', '10:00', '11:30', '14:00', '15:30']
    },
    {
        id: 2,
        name: 'Dr. Madina Umarova',
        category: 'pediatrician',
        categoryName: 'Pediatr',
        rating: 4.8,
        reviewsCount: 98,
        experience: 8,
        price: '120,000',
        clinic: 'Darmon Med Klinikasi',
        image: 'https://images.unsplash.com/photo-1594824813573-246434e33963?auto=format&fit=crop&w=400&q=80',
        bio: 'Go\'daklar va maktab yoshidagi bolalar salomatligi, rivojlanish bosqichlari monitoringi bo\'yicha tajribali shifokor.',
        slots: ['09:30', '11:00', '14:30', '16:00']
    },
    {
        id: 3,
        name: 'Dr. Rustam Karimov',
        category: 'dentist',
        categoryName: 'Stomatolog',
        rating: 5.0,
        reviewsCount: 210,
        experience: 15,
        price: '200,000',
        clinic: 'Estetik Dental',
        image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
        bio: 'Barcha turdagi murakkab stomatologik va ortopedik muolajalar hamda implantatsiya ustasi.',
        slots: ['10:00', '11:00', '12:00', '15:00', '17:00']
    }
];

// Onlayn navbatlar vaqtinchalik xotirasi (Appointments DB)
let appointments = [];
let selectedDoctor = null;
let selectedDate = '16.06.2026';
let selectedSlot = null;

// Tizimni yuklash
document.addEventListener("DOMContentLoaded", () => {
    // 1.5 soniyadan keyin Splash Screenni yopish
    setTimeout(() => {
        document.getElementById("splash-screen").style.display = "none";
        navigateTo('home');
    }, 1500);

    renderCategories();
    renderDoctors();
});

// Dinamik Navigatsiya funksiyasi
function navigateTo(pageId) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(`page-${pageId}`).classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Kategoriyalarni interfeysga chiqarish
function renderCategories() {
    const grid = document.getElementById('categories-grid');
    grid.innerHTML = categories.map(cat => `
        <div class="glass-card soft-shadow p-3 rounded-2xl flex flex-col items-center text-center cursor-pointer hover:scale-105 transition transform duration-200">
            <div class="${cat.color} w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-2">
                <i class="fa-solid ${cat.icon}"></i>
            </div>
            <span class="text-xs font-bold text-blue-950">${cat.name}</span>
        </div>
    `).join('');
}

// Shifokorlarni bosh sahifaga chiqarish
function renderDoctors() {
    const grid = document.getElementById('doctors-grid');
    grid.innerHTML = doctors.map(doc => `
        <div class="bg-white rounded-3xl p-4 border border-slate-100 soft-shadow soft-shadow-hover transition duration-300 flex flex-col justify-between">
            <div class="flex gap-4">
                <img src="${doc.image}" alt="${doc.name}" class="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500/20">
                <div>
                    <span class="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full uppercase">${doc.categoryName}</span>
                    <h4 class="font-bold text-blue-950 text-base mt-1">${doc.name}</h4>
                    <p class="text-xs text-slate-400"><i class="fa-solid fa-hospital text-slate-300 mr-1"></i> ${doc.clinic}</p>
                    <div class="flex items-center gap-1 mt-1 text-xs text-amber-500 font-bold">
                        <i class="fa-solid fa-star"></i> ${doc.rating} <span class="text-slate-400 font-normal">(${doc.reviewsCount} ta izoh)</span>
                    </div>
                </div>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                <div>
                    <p class="text-[10px] text-slate-400 uppercase tracking-wider">Qabul narxi</p>
                    <p class="text-sm font-extrabold text-blue-950">${doc.price} UZS</p>
                </div>
                <button onclick="viewDoctor(${doc.id})" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-md shadow-blue-600/10">
                    Profilni ko'rish
                </button>
            </div>
        </div>
    `).join('');
}

// Shifokor profili sahifasini ko'rsatish
function viewDoctor(id) {
    const doc = doctors.find(d => d.id === id);
    selectedDoctor = doc;
    
    const detailsContainer = document.getElementById('doctor-profile-details');
    detailsContainer.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-1 bg-white p-4 rounded-3xl border border-slate-100 soft-shadow text-center">
                <img src="${doc.image}" alt="${doc.name}" class="w-32 h-32 rounded-3xl object-cover mx-auto border-4 border-emerald-400/30 shadow-lg">
                <h3 class="text-xl font-bold text-blue-950 mt-4">${doc.name}</h3>
                <p class="text-sm font-semibold text-emerald-600 mt-1">${doc.categoryName}</p>
                <p class="text-xs text-slate-400 mt-1">${doc.clinic}</p>
                
                <div class="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100">
                    <div class="bg-slate-50 p-2 rounded-xl">
                        <span class="text-[10px] text-slate-400 uppercase block">Tajriba</span>
                        <span class="text-sm font-bold text-blue-950">${doc.experience} yil</span>
                    </div>
                    <div class="bg-slate-50 p-2 rounded-xl">
                        <span class="text-[10px] text-slate-400 uppercase block">Reyting</span>
                        <span class="text-sm font-bold text-amber-500"><i class="fa-solid fa-star"></i> ${doc.rating}</span>
                    </div>
                </div>
            </div>
            
            <div class="md:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 soft-shadow flex flex-col justify-between">
                <div>
                    <h4 class="text-base font-bold text-blue-950 mb-2">Shifokor haqida ma'lumot</h4>
                    <p class="text-slate-600 text-sm leading-relaxed">${doc.bio}</p>
                    
                    <h4 class="text-base font-bold text-blue-950 mt-6 mb-2">Diplom va Sertifikatlar</h4>
                    <ul class="text-xs text-slate-600 space-y-1.5">
                        <li><i class="fa-solid fa-graduation-cap text-emerald-500 mr-2"></i> Toshkent Tibbiyot Akademiyasi (Bakalavr, 2012)</li>
                        <li><i class="fa-solid fa-certificate text-blue-500 mr-2"></i> Kardiologiya bo'yicha xalqaro malaka sertifikati (Germaniya, 2018)</li>
                    </ul>
                </div>
                
                <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                        <span class="text-xs text-slate-400 block">Konsultatsiya narxi</span>
                        <span class="text-xl font-extrabold text-blue-950">${doc.price} UZS</span>
                    </div>
                    <button onclick="openBooking()" class="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition shadow-lg shadow-emerald-500/20">
                        Onlayn Navbat Olish
                    </button>
                </div>
            </div>
        </div>
    `;
    navigateTo('doctor-profile');
}

// Navbat olish oynasini ochish va kun/vaqtlarni shakllantirish
function openBooking() {
    if (!selectedDoctor) return;
    
    document.getElementById('booking-doctor-info').innerHTML = `
        <img src="${selectedDoctor.image}" class="w-12 h-12 rounded-xl object-cover">
        <div>
            <h4 class="font-bold text-blue-950 text-sm">${selectedDoctor.name}</h4>
            <p class="text-xs text-slate-400">${selectedDoctor.categoryName} • ${selectedDoctor.clinic}</p>
        </div>
    `;

    // 3 ta namuna sana chiqarish
    const dates = ['16.06.2026', '17.06.2026', '18.06.2026'];
    document.getElementById('booking-dates').innerHTML = dates.map((d, index) => `
        <button onclick="selectDate('${d}', this)" class="p-2 text-xs border rounded-xl text-center font-bold ${index === 0 ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-200 text-slate-600 bg-white'} transition">
            ${d}
        </button>
    `).join('');
    selectedDate = dates[0];

    // Shifokorning bo'sh vaqt slotlarini chiqarish
    renderSlots();
    navigateTo('booking');
}

function selectDate(date, element) {
    selectedDate = date;
    element.parentElement.querySelectorAll('button').forEach(btn => {
        btn.className = 'p-2 text-xs border rounded-xl text-center font-bold border-slate-200 text-slate-600 bg-white transition';
    });
    element.className = 'p-2 text-xs border rounded-xl text-center font-bold border-blue-600 bg-blue-50 text-blue-600';
}

function renderSlots() {
    const grid = document.getElementById('booking-slots');
    grid.innerHTML = selectedDoctor.slots.map(slot => `
        <button onclick="selectSlot('${slot}', this)" class="p-2 text-xs border border-slate-200 bg-white rounded-xl text-center font-medium hover:border-emerald-500 text-slate-700 transition">
            ${slot}
        </button>
    `).join('');
    selectedSlot = null;
}

function selectSlot(slot, element) {
    selectedSlot = slot;
    element.parentElement.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('border-emerald-500', 'bg-emerald-50', 'text-emerald-700', 'font-bold');
    });
    element.classList.add('border-emerald-500', 'bg-emerald-50', 'text-emerald-700', 'font-bold');
}

// Navbatni muvaffaqiyatli yakunlash va bazaga qo'shish
function confirmBooking() {
    if (!selectedSlot) {
        alert("Iltimos, o'zingizga qulay qabul vaqtini tanlang!");
        return;
    }

    const newApp = {
        id: 'DRM-' + Math.floor(1000 + Math.random() * 9000),
        doctorName: selectedDoctor.name,
        date: selectedDate,
        time: selectedSlot,
        status: 'Faol'
    };

    appointments.push(newApp);
    updateAdminPanel();

    // Toast bildirishnoma ko'rsatish
    const toast = document.getElementById('toast');
    toast.innerText = `Muvaffaqiyatli: ${selectedDate} kuni soat ${selectedSlot}ga navbatingiz tasdiqlandi!`;
    toast.classList.remove('translate-y-20', 'opacity-0');
    
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
        navigateTo('home');
    }, 3000);
}

// Admin panel jadvalini yangilash
function updateAdminPanel() {
    document.getElementById('admin-total-appointments').innerText = `${appointments.length} ta`;
    const tbody = document.getElementById('admin-appointments-table');
    
    if (appointments.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-slate-400">Hozircha navbatlar mavjud emas</td></tr>`;
        return;
    }

    tbody.innerHTML = appointments.map(app => `
        <tr class="hover:bg-slate-50/80 transition">
            <td class="p-4 font-bold text-blue-900">${app.id}</td>
            <td class="p-4 font-medium">${app.doctorName}</td>
            <td class="p-4">${app.date}</td>
            <td class="p-4">${app.time}</td>
            <td class="p-4"><span class="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full font-bold">${app.status}</span></td>
        </tr>
    `).join('');
}

// Light / Dark Mode o'zgartirgichi
function toggleDarkMode() {
    const body = document.getElementById('body');
    const icon = document.getElementById('theme-icon');
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        icon.className = 'fa-solid fa-sun text-amber-400';
    } else {
        icon.className = 'fa-solid fa-moon';
    }
}
