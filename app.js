
const firebaseConfig = {
    apiKey: "AIzaSyBr9zv9oZ6xa1jVGTnWvVY2K8ASpII2kdE",
    authDomain: "school-diary-2be27.firebaseapp.com",
    databaseURL: "https://school-diary-2be27-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "school-diary-2be27",
    storageBucket: "school-diary-2be27.firebasestorage.app",
    messagingSenderId: "206439341197",
    appId: "1:206439341197:web:6a3e3850867364b84316c4",
    measurementId: "G-KLWW2QYG8H"
  };3

let database;

try {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    database = firebase.database();
    console.log('Firebase успешно инициализирован');

    database.ref('.info/connected').on('value', (snap) => {
        if (snap.val() === true) {
            console.log('Подключено к Firebase');
        } else {
            console.log('Отключено от Firebase');
        }
    });
} catch (error) {
    console.error('Ошибка при инициализации Firebase:', error);
    alert('Ошибка при подключении к базе данных. Пожалуйста, обновите страницу.');
}

// Initialize Telegram WebApp
const webapp = window.Telegram.WebApp;
webapp.ready();
webapp.expand();

// Schedule data
let schedule = {
    monday: [
        { number: 1, name: "Разговор о важном", homework: "none", classroom: "215" },
        { number: 10, name: "Информатика (Доп)", homework: "none", classroom: "313" },
        { number: 2, name: "Английский язык", homework: "none", classroom: "307/312" },
        { number: 3, name: "Физика", homework: "none", classroom: "220" },
        { number: 4, name: "Труды/Информатика", homework: "none", classroom: "313" },
        { number: 5, name: "Информатика/Труды", homework: "none", classroom: "313" },
        { number: 6, name: "Русский Язык", homework: "none", classroom: "216" },
        { number: 7, name: "Литература", homework: "none", classroom: "216" },
        { number: 9, name: "Информатика/География (Доп)", homework: "none", classroom: "313/318" }
    ],
    tuesday: [
        { number: 1, name: "Русский язык", homework: "none", classroom: "216" },
        { number: 2, name: "Химия", homework: "none", classroom: "317" },
        { number: 3, name: "Литература", homework: "none", classroom: "216" },
        { number: 4, name: "Алгебра", homework: "none", classroom: "215" },
        { number: 5, name: "История", homework: "none", classroom: "211" },
        { number: 6, name: "География", homework: "none", classroom: "318" },
        { number: 7, name: "Физ-ра", homework: "none", classroom: "111" },
        { number: 8, name: "Русский язык (Доп)", homework: "none", classroom: "216" }
    ],
    wednesday: [
        { number: 0, name: "Английский язык (Доп)", homework: "none", classroom: "307/312" },
        { number: 1, name: "Вероятность и Статистика", homework: "none", classroom: "215" },
        { number: 2, name: "Геометрия", homework: "none", classroom: "215" },
        { number: 3, name: "История", homework: "none", classroom: "317" },
        { number: 4, name: "Физика", homework: "none", classroom: "220" },
        { number: 5, name: "Русский язык", homework: "none", classroom: "216" },
        { number: 6, name: "Обществознание", homework: "none", classroom: "211" },
        { number: 8, name: "Физика(Доп)", homework: "none", classroom: "220" }
    ],
    thursday: [
        { number: 1, name: "Россия - мои горизонты", homework: "none", classroom: "215" },
        { number: 10, name: "Обществознание (Доп)", homework: "none", classroom: "211" },
        { number: 2, name: "Алгебра", homework: "none", classroom: "215" },
        { number: 3, name: "Алгебра", homework: "none", classroom: "215" },
        { number: 4, name: "История", homework: "none", classroom: "211" },
        { number: 5, name: "Химия", homework: "none", classroom: "317" },
        { number: 6, name: "Биология", homework: "none", classroom: "316" },
        { number: 7, name: "Литература", homework: "none", classroom: "216" },
        { number: 8, name: "Английский Язык", homework: "none", classroom: "307/312" },
        { number: 9, name: "Математика/Общество (Доп)", homework: "none", classroom: "215/211" }
    ],
    friday: [
        { number: 1, name: "География", homework: "none", classroom: "318" },
        { number: 2, name: "Геометрия", homework: "none", classroom: "215" },
        { number: 3, name: "ОБЗР", homework: "none", classroom: "211" },
        { number: 4, name: "Физ-ра", homework: "none", classroom: "111" },
        { number: 5, name: "Биология", homework: "none", classroom: "316" },
        { number: 6, name: "Физика", homework: "none", classroom: "220" },
        { number: 7, name: "Английский язык", homework: "none", classroom: "307/312" }
    ]
};

const bellSchedule = [
    { number: 0, time: "7:45 - 8:25", name: "0 урок(Доп)" },
    { number: 1, time: "8:30 - 9:10", name: "1 урок" },
    { number: 2, time: "9:20 - 10:00", name: "2 урок" },
    { number: 3, time: "10:15 - 10:55", name: "3 урок" },
    { number: 4, time: "11:10 - 11:50", name: "4 урок" },
    { number: 5, time: "12:00 - 12:40", name: "5 урок" },
    { number: 6, time: "12:55 - 13:35", name: "6 урок" },
    { number: 7, time: "13:45 - 14:25", name: "7 урок" },
    { number: 8, time: "14:30 - 15:10", name: "8 урок" }
];


const homeworkContent = document.querySelector('.homework-content');
const addHomeworkBtn = document.getElementById('addHomeworkBtn');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const dayBtns = document.querySelectorAll('.day-btn');
const scheduleContent = document.querySelector('.schedule-content');
const bellsContent = document.querySelector('.bells-content');


let homeworkList = {};


const userId = webapp.initDataUnsafe?.user?.id || 'anonymous';
const userName = webapp.initDataUnsafe?.user?.username || 'Аноним';

function createHomeworkForm() {
    const form = document.createElement('div');
    form.className = 'homework-form';
    form.innerHTML = `
        <div class="form-group">
            <label for="homeworkDay">День:</label>
            <select id="homeworkDay" required>
                <option value="monday">Понедельник</option>
                <option value="tuesday">Вторник</option>
                <option value="wednesday">Среда</option>
                <option value="thursday">Четверг</option>
                <option value="friday">Пятница</option>
            </select>
        </div>
        <div class="form-group">
            <label for="homeworkSubject">Предмет:</label>
            <select id="homeworkSubject" required></select>
        </div>
        <div class="form-group">
            <label for="homeworkText">Задание:</label>
            <textarea id="homeworkText" required></textarea>
        </div>
        <div class="form-buttons">
            <button type="button" onclick="saveHomework()" class="save-btn">Сохранить</button>
            <button type="button" onclick="cancelHomeworkForm()" class="cancel-btn">Отмена</button>
        </div>
    `;
    return form;
}

function showAddHomeworkForm() {
    const existingForm = document.querySelector('.homework-form');
    if (!existingForm) {
        const form = createHomeworkForm();
        homeworkContent.insertBefore(form, homeworkContent.firstChild);
    }
}

function cancelHomeworkForm() {
    const form = document.querySelector('.homework-form');
    if (form) {
        form.remove();
    }
}

function saveHomework() {
    const day = document.getElementById('homeworkDay').value;
    const subject = document.getElementById('homeworkSubject').value;
    const text = document.getElementById('homeworkText').value;

    if (!day || !subject || !text) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    const timestamp = Date.now();
    const homeworkRef = database.ref('homework').push();
    
    homeworkRef.set({
        day,
        subject,
        text,
        timestamp,
        addedBy: {
            id: userId,
            name: userName
        }
    }).then(() => {
        document.querySelector('.homework-form').style.display = 'none';
        displayHomework();
    }).catch(error => {
        console.error('Ошибка при сохранении домашнего задания ебать:', error);
        alert('Произошла ошибка при сохранении. Попробуйте еще раз ебать.');
    });
}

function displayHomework() {
    const homeworkContent = document.querySelector('.homework-content');
    homeworkContent.innerHTML = '<div class="loading">Загрузка домашек ебать...</div>';

    database.ref('homework').orderByChild('timestamp').on('value', (snapshot) => {
        homeworkContent.innerHTML = '';
        const homeworkByDay = {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: []
        };

        snapshot.forEach((childSnapshot) => {
            const homework = childSnapshot.val();
            const homeworkId = childSnapshot.key;
            
            if (homeworkByDay[homework.day]) {
                homeworkByDay[homework.day].push({
                    id: homeworkId,
                    ...homework
                });
            }
        });

        Object.keys(homeworkByDay).forEach(day => {
            if (homeworkByDay[day].length > 0) {
                const daySection = document.createElement('div');
                daySection.className = 'homework-day-section';
                daySection.innerHTML = `<h3>${getDayName(day)}</h3>`;

                homeworkByDay[day].sort((a, b) => {
                    return a.subject.localeCompare(b.subject);
                });

                const homeworkList = document.createElement('div');
                homeworkList.className = 'homework-list';

                homeworkByDay[day].forEach(hw => {
                    const hwElement = document.createElement('div');
                    hwElement.className = 'homework-item';
                    const date = new Date(hw.timestamp);
                    const formattedDate = date.toLocaleDateString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    });

                    hwElement.innerHTML = `
                        <div class="homework-subject">${hw.subject}</div>
                        <div class="homework-text">${hw.text}</div>
                        <div class="homework-meta">
                            Добавил: ${hw.addedBy.name} • ${formattedDate}
                        </div>
                    `;
                    homeworkList.appendChild(hwElement);
                });

                daySection.appendChild(homeworkList);
                homeworkContent.appendChild(daySection);
            }
        });

        if (homeworkContent.innerHTML === '') {
            homeworkContent.innerHTML = '<div class="no-homework">Нет домашних заданий</div>';
        }
    });
}

window.addEventListener('load', () => {
    const savedSchedule = localStorage.getItem('schedule');
    if (savedSchedule) {
        Object.assign(schedule, JSON.parse(savedSchedule));
        displaySchedule(getCurrentDay());
    }
});

database.ref('schedule').on('value', (snapshot) => {
    const updatedSchedule = snapshot.val();
    if (updatedSchedule) {
        schedule = updatedSchedule;
        displaySchedule(getCurrentDay());
        displayHomework();
    }
});

function createHomeworkForm() {
    const form = document.createElement('div');
    form.className = 'homework-form';
    form.innerHTML = `
        <div class="form-header">
            <h3>Добавление домашки</h3>
            <button type="button" class="close-btn" onclick="cancelHomeworkForm()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
        <div class="form-content">
            <div class="form-group">
                <label for="subject">Предмет</label>
                <select id="subject" required>
                    <option value="" disabled selected>Выберите предмет</option>
                    ${Object.values(schedule).flat().map(lesson => lesson.name)
                        .filter((name, index, self) => self.indexOf(name) === index)
                        .sort()
                        .map(name => `<option value="${name}">${name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label for="description">Задание</label>
                <textarea id="description" rows="3" placeholder="Введите домашнее задание" required></textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="cancelHomeworkForm()">Отмена</button>
                <button type="button" class="btn btn-primary" onclick="saveHomework()">Сохранить</button>
            </div>
        </div>
    `;
    return form;
}

function showAddHomeworkForm() {
    const existingForm = document.querySelector('.homework-form');
    if (!existingForm) {
        const form = createHomeworkForm();
        homeworkContent.insertBefore(form, homeworkContent.firstChild);
    }
}

function cancelHomeworkForm() {
    const form = document.querySelector('.homework-form');
    if (form) {
        form.remove();
    }
}

function saveHomework() {
    const subject = document.getElementById('subject').value;
    const description = document.getElementById('description').value;

    if (!subject || !description) {
        alert('Пожалуйста, заполните все поля');
        return;
    }


    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = new Date().getDay(); 
    let foundSubject = false;
    

    let checkDay = (today + 1) % 7;
    const startCheckDay = checkDay;
    

    do {
        const dayName = days[checkDay];
        if (schedule[dayName]) {
            const daySchedule = schedule[dayName];
            const subjectLesson = daySchedule.find(lesson => lesson.name === subject);
            
            if (subjectLesson) {

                subjectLesson.homework = description;
                foundSubject = true;
                break;
            }
        }
        checkDay = (checkDay + 1) % 7;
    } while (checkDay !== startCheckDay);

    if (!foundSubject) {
        alert('Предмет не найден в расписании на ближайшие дни');
        return;
    }

    database.ref('schedule').set(schedule)
        .then(() => {
            console.log('Данные успешно сохранены в Firebase');
            localStorage.setItem('schedule', JSON.stringify(schedule));
            cancelHomeworkForm();
            displaySchedule(getCurrentDay());
        })
        .catch((error) => {
            console.error('Ошибка при сохранении в Firebase:', error);
            alert('Произошла ошибка при сохранении. Пожалуйста, попробуйте еще раз.');
        });
}

function displayHomework() {
    const homeworkItems = document.createElement('div');
    homeworkItems.className = 'homework-grid';

    Object.entries(schedule).forEach(([day, lessons]) => {
        const homeworkLessons = lessons.filter(lesson => lesson.homework !== 'none');
        
        if (homeworkLessons.length > 0) {
            const dayCard = document.createElement('div');
            dayCard.className = 'subject-card';

            dayCard.innerHTML = `
                <div class="subject-header">
                    <h3>${getDayName(day)}</h3>
                    <span class="task-count">${homeworkLessons.length} заданий</span>
                </div>
                <div class="assignments-list">
                    ${homeworkLessons.map(lesson => `
                        <div class="assignment-item">
                            <div class="assignment-text">
                                <strong>${lesson.name}</strong><br>
                                ${lesson.homework}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            homeworkItems.appendChild(dayCard);
        }
    });

    homeworkContent.innerHTML = '';
    homeworkContent.appendChild(homeworkItems);
}


function getCurrentDay() {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[new Date().getDay()];
    return today !== 'saturday' && today !== 'sunday' ? today : 'monday';
}


function getDayName(day) {
    const dayNames = {
        monday: 'Понедельник',
        tuesday: 'Вторник',
        wednesday: 'Среда',
        thursday: 'Четверг',
        friday: 'Пятница'
    };
    return dayNames[day];
}


tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        

        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        

        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === tabId) {
                content.classList.add('active');
            }
        });
    });
});


dayBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const day = btn.dataset.day;
        

        dayBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        

        displaySchedule(day);
    });
});


function displaySchedule(day) {
    const daySchedule = schedule[day];
    scheduleContent.innerHTML = '';
    
    daySchedule.forEach(lesson => {
        const lessonElement = document.createElement('div');
        lessonElement.className = 'schedule-item';
        lessonElement.innerHTML = `
            <div class="schedule-item-header">
                <span class="lesson-number">${lesson.number} урок</span>
                <span class="lesson-name">${lesson.name}</span>
            </div>
            <div class="lesson-details">
                <span class="classroom">Кабинет ${lesson.classroom || '—'}</span>
                <span class="homework">${lesson.homework !== 'none' ? 'ДЗ: ' + lesson.homework : 'Нет ДЗ'}</span>
            </div>
        `;
        scheduleContent.appendChild(lessonElement);
    });
}


function displayBellSchedule() {
    bellsContent.innerHTML = '';
    
    bellSchedule.forEach(bell => {
        const bellElement = document.createElement('div');
        bellElement.className = 'schedule-item';
        bellElement.innerHTML = `
            <span class="lesson-name">${bell.name}</span>
            <span class="time">${bell.time}</span>
        `;
        bellsContent.appendChild(bellElement);
    });
}


function getWeekDates() {
    const today = new Date();
    const currentDay = today.getDay();
    const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Adjust when today is sunday
    const monday = new Date(today.setDate(diff));
    
    const weekDates = {
        monday: new Date(monday),
        tuesday: new Date(monday.setDate(monday.getDate() + 1)),
        wednesday: new Date(monday.setDate(monday.getDate() + 1)),
        thursday: new Date(monday.setDate(monday.getDate() + 1)),
        friday: new Date(monday.setDate(monday.getDate() + 1))
    };
    
    return weekDates;
}


function formatDate(date) {
    const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    return `${date.getDate()} ${months[date.getMonth()]}`;
}


function updateDaySelector() {
    const weekDates = getWeekDates();
    const dayBtns = document.querySelectorAll('.day-btn');
    
    dayBtns.forEach(btn => {
        const day = btn.dataset.day;
        if (weekDates[day]) {
            btn.innerHTML = `
                ${getDayShortName(day)}<br>
                <span class="date-label">${formatDate(weekDates[day])}</span>
            `;
        }
    });
}


function getDayShortName(day) {
    const dayNames = {
        monday: 'Пн',
        tuesday: 'Вт',
        wednesday: 'Ср',
        thursday: 'Чт',
        friday: 'Пт'
    };
    return dayNames[day];
}


function checkAndClearHomework() {
    const today = new Date();
    if (today.getDay() === 6) { 
        Object.values(schedule).forEach(daySchedule => {
            daySchedule.forEach(lesson => {
                lesson.homework = 'none';
            });
        });
        database.ref('schedule').set(schedule);
    }
}


addHomeworkBtn.addEventListener('click', showAddHomeworkForm);


document.addEventListener('DOMContentLoaded', () => {

    database.ref('schedule').set(schedule).then(() => {

        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const today = days[new Date().getDay()];
        if (today !== 'saturday' && today !== 'sunday') {
            const todayBtn = document.querySelector(`[data-day="${today}"]`);
            if (todayBtn) {
                todayBtn.classList.add('active');
                displaySchedule(today);
            }
        } else {

            const mondayBtn = document.querySelector('[data-day="monday"]');
            if (mondayBtn) {
                mondayBtn.classList.add('active');
                displaySchedule('monday');
            }
        }
        
        updateDaySelector();
        displayBellSchedule();
        displayHomework();
        checkAndClearHomework();
    });
});


setInterval(checkAndClearHomework, 60000);
