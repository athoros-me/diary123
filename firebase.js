const firebaseConfig = {
    apiKey: "AIzaSyDL0Sso7I2rXcBRYxATzPsHndVgcNzvjwY",
    authDomain: "diarytop4ik.firebaseapp.com",
    databaseURL: "https://diarytop4ik-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "diarytop4ik",
    storageBucket: "diarytop4ik.firebasestorage.app",
    messagingSenderId: "45809794429",
    appId: "1:45809794429:web:aa0ac0e5a652e219c9a014",
    measurementId: "G-BLVX6J5CCB"
  };

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let currentDate = new Date();

const subjectMapping = {
    'russian': 'Русский язык',
    'algebra': 'Алгебра',
    'biology': 'Биология',
    'geography': 'География',
    'geometry': 'Геометрия',
    'history': 'История',
    'literature': 'Литература',
    'obzh': 'ОБЖ',
    'obschestvo': 'Обществознание',
    'physics': 'Физика',
    'chemistry': 'Химия',
    'english': 'Английский язык',
    'probability': 'Вероятность и статистика',
    'informatics': 'Информатика/Труды',
    'labor': 'Труды/Информатика'
};

const schedule = {
    'Пн': [
        { number: 1, subject: 'Разговор о важном', homework: 'none' },
        { number: 2, subject: 'Английский язык', homework: 'none' },
        { number: 3, subject: 'Физика', homework: 'none' },
        { number: 4, subject: 'Труды/Информатика', homework: 'none' },
        { number: 5, subject: 'Информатика/Труды', homework: 'none' },
        { number: 6, subject: 'Русский Язык', homework: 'none' },
        { number: 7, subject: 'Литература', homework: 'none' },
        { number: 9, subject: 'Информатика/География Доп.', homework: 'none'},
        { number: 10, subject: 'Информатика Доп.', homework: 'none'},
    ],
    'Вт': [
        { number: 1, subject: 'Русский язык', homework: 'none' },
        { number: 2, subject: 'Химия', homework: 'none' },
        { number: 3, subject: 'Литература', homework: 'none' },
        { number: 4, subject: 'Алгебра', homework: 'none' },
        { number: 5, subject: 'История', homework: 'none' },
        { number: 6, subject: 'География', homework: 'none' },
        { number: 7, subject: 'Физ-ра', homework: 'none' },
        { number: 8, subject: 'Русский язык Доп.', homework: 'none' },
    ],
    'Ср': [
        { number: 0, subject: 'Английский язык (Доп)', homework: 'none' },
        { number: 1, subject: 'Вероятность и статистика', homework: 'none' },
        { number: 2, subject: 'Геометрия', homework: 'none' },
        { number: 3, subject: 'История', homework: 'none' },
        { number: 4, subject: 'Физика', homework: 'none'},
        { number: 5, subject: 'Русский язык', homework: 'none' },
        { number: 6, subject: 'Обществознание', homework: 'none' },
        { number: 8, subject: 'Физика Доп.', homework: 'none' },
    ],
    'Чт': [
        { number: 1, subject: 'Россия - мои горизонты', homework: 'none' },
        { number: 2, subject: 'Алгебра', homework: 'none' },
        { number: 3, subject: 'Алгебра', homework: 'none' },
        { number: 4, subject: 'История', homework: 'none' },
        { number: 5, subject: 'Химия', homework: 'none' },
        { number: 6, subject: 'Биология', homework: 'none' },
        { number: 7, subject: 'Литература', homework: 'none' },
        { number: 8, subject: 'Английский язык', homework: 'none' },
        { number: 9, subject: 'Математика/Обществознание Доп.', homework: 'none' },
        { number: 10, subject: 'Обществознание Доп.', homework: 'none' },
    ],
    'Пт': [
        { number: 1, subject: 'География', homework: 'none' },
        { number: 2, subject: 'Геометрия', homework: 'none' },
        { number: 3, subject: 'ОБЖ', homework: 'none' },
        { number: 4, subject: 'Физ-ра', homework: 'none' },
        { number: 5, subject: 'Биология', homework: 'none' },
        { number: 6, subject: 'Физика', homework: 'none' },
        { number: 7, subject: 'Английский язык', homework: 'none' }
    ]
};

function formatDate(date) {
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    
    return {
        dayName: days[date.getDay()],
        dayDate: `${date.getDate()} ${months[date.getMonth()]}`
    };
}

function updateDateDisplay(direction = null) {
    const container = document.querySelector('.day-slide-container');
    if (!container) {
        console.error('контейнера нету');
        return;
    }
    
    const { dayName, dayDate } = formatDate(currentDate);

    const newContent = document.createElement('div');
    newContent.className = 'day-content';
    newContent.innerHTML = `
        <div class="text-white font-medium">${dayName}</div>
        <div class="text-xs text-zinc-500">${dayDate}</div>
    `;

    const currentContent = container.querySelector('.day-content.active');

    container.appendChild(newContent);

    if (direction === 'next') {
        newContent.classList.add('slide-left-in');
    } else if (direction === 'prev') {
        newContent.classList.add('slide-right-in');
    }

    requestAnimationFrame(() => {
        if (currentContent) {
            if (direction === 'next') {
                currentContent.classList.add('slide-left-out');
            } else if (direction === 'prev') {
                currentContent.classList.add('slide-right-out');
            }
            currentContent.classList.remove('active');
        }

        requestAnimationFrame(() => {
            newContent.classList.remove('slide-left-in', 'slide-right-in');
            newContent.classList.add('active');
        });

        setTimeout(() => {
            if (currentContent) {
                currentContent.remove();
            }
        }, 300);
    });

    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const shortDay = days[currentDate.getDay()];
    updateLessons(shortDay);
}

function changeDay(direction) {
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    
    if (direction === 'next') {
        currentDate.setDate(currentDate.getDate() + 1);
    } else if (direction === 'prev') {
        currentDate.setDate(currentDate.getDate() - 1);
    }
    
    updateDateDisplay(direction);
}

function saveHomework() {
    const subject = document.querySelector('#homework-modal select').value;
    const homework = document.querySelector('#homework-modal textarea').value.trim();

    if (!subject || !homework) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    const subjectName = subjectMapping[subject];
    const date = getNextLessonDate(subject);
    const dateString = date.toISOString().split('T')[0];

    database.ref('homework/' + dateString)
        .push({
            subject: subjectName, 
            homework: homework,
            createdAt: firebase.database.ServerValue.TIMESTAMP
        })
        .then(() => {
            document.querySelector('#homework-modal select').value = '';
            document.querySelector('#homework-modal textarea').value = '';
            closeModal();
            
            loadHomework();
        })
        .catch(error => {
            console.error('ошибка при сохранении ебать:', error);
            alert('да сука заебала: ' + error.message);
        });
}

function getNextLessonDate(subject) {
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDay = days[tomorrow.getDay()];

    const subjectName = subjectMapping[subject];
    
    console.log('ищем нект урок ебатб:', subjectName);
    console.log('завтра урок ебать:', tomorrowDay);

    const tomorrowSchedule = schedule[tomorrowDay] || [];
    const hasLessonTomorrow = tomorrowSchedule.some(lesson => {
        return lesson.subject === subjectName || 
               (subject === 'informatics' && lesson.subject.includes('Информатика')) ||
               (subject === 'labor' && lesson.subject.includes('Труды'));
    });

    if (hasLessonTomorrow) {
        console.log('урок уже есть ебать завтра');
        return tomorrow;
    }

    let nextDate = new Date(tomorrow);
    for (let i = 0; i < 7; i++) {
        nextDate.setDate(nextDate.getDate() + 1);
        const nextDay = days[nextDate.getDay()];
        const daySchedule = schedule[nextDay] || [];
        
        if (daySchedule.some(lesson => {
            return lesson.subject === subjectName || 
                   (subject === 'informatics' && lesson.subject.includes('Информатика')) ||
                   (subject === 'labor' && lesson.subject.includes('Труды'));
        })) {
            console.log('урок ебать в этот день:', nextDay);
            return nextDate;
        }
    }

    console.log('не нашли день ебаь');
    return tomorrow;
}

function loadHomework() {
    const container = document.getElementById('homework-container');
    
    container.innerHTML = `
        <div class="loader-container">
            <div class="loader"></div>
            <div class="loader-text">Загрузка заданий...</div>
        </div>
    `;

    const today = new Date();
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    
    let weekDates = [];
    for(let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        if (date.getDay() !== 0 && date.getDay() !== 6) {
            weekDates.push({
                date: date,
                dayName: days[date.getDay()],
                formattedDate: `${date.getDate()} ${months[date.getMonth()]}`,
                dateString: date.toISOString().split('T')[0]
            });
        }
    }

    const oldBlocks = container.querySelectorAll('.homework-block');
    if (oldBlocks.length > 0) {
        oldBlocks.forEach(block => {
            block.classList.add('removing');
        });
        setTimeout(() => {
            container.innerHTML = '';
            loadNewHomework();
        }, 200);
    } else {
        loadNewHomework();
    }

    function loadNewHomework() {
        weekDates.forEach((dayInfo, index) => {
            database.ref('homework/' + dayInfo.dateString).once('value', (snapshot) => {
                if (!snapshot.exists()) return; 

                const homeworkData = {};

                snapshot.forEach((childSnapshot) => {
                    const homework = childSnapshot.val();
                    homeworkData[homework.subject] = homework.homework;
                });

                if (Object.keys(homeworkData).length > 0) {
                    const homeworkBlock = document.createElement('div');
                    homeworkBlock.className = 'homework-block bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-4 border border-zinc-800 mb-4';
                    homeworkBlock.style.animationDelay = `${index * 0.1}s`;
                    
                    homeworkBlock.innerHTML = `
                        <div class="flex justify-between items-center mb-3">
                            <div class="font-medium">${dayInfo.dayName}</div>
                            <div class="text-zinc-500 text-sm">${dayInfo.formattedDate}</div>
                        </div>
                        <div class="space-y-2">
                            ${Object.entries(homeworkData).map(([subject, homework]) => `
                                <div class="flex justify-between items-center">
                                    <div class="text-zinc-500">${subject}</div>
                                    <div class="text-sm">${homework}</div>
                                </div>
                            `).join('')}
                        </div>
                    `;

                    container.appendChild(homeworkBlock);
                }

                if (dayInfo.dayName === days[currentDate.getDay()]) {
                    updateLessons(dayInfo.dayName, homeworkData);
                }
            });
        });

        setTimeout(() => {
            if (container.innerHTML === '') {
                const emptyBlock = document.createElement('div');
                emptyBlock.className = 'homework-block bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-4 border border-zinc-800 text-zinc-500 text-center';
                emptyBlock.textContent = 'Нет домашних заданий';
                container.appendChild(emptyBlock);
            }
        }, 500);
    }
}

function updateLessons(day, homeworkData = {}) {
    const container = document.getElementById('lessons-container');
    if (!container) {
        console.error('Контейнер для уроков не найден');
        return;
    }

    // Показываем лоадер
    container.innerHTML = `
        <div class="loader-container">
            <div class="loader"></div>
            <div class="loader-text">Загрузка расписания...</div>
        </div>
    `;

    const lessons = schedule[day];
    if (!lessons) {
        container.innerHTML = `
            <div class="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-4 border border-zinc-800 text-zinc-500 text-center">
                Нет уроков
            </div>
        `;
        return;
    }

    const today = new Date(currentDate);
    const dateString = today.toISOString().split('T')[0];

    database.ref('homework/' + dateString).once('value', (snapshot) => {
        const currentHomework = {};
        
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const homework = childSnapshot.val();
                currentHomework[homework.subject] = homework.homework;
            });
        }

        const tempContainer = document.createElement('div');
        tempContainer.className = 'content-fade-in';

        lessons.forEach(lesson => {
            const homework = currentHomework[lesson.subject] || lesson.homework;
            const displayHomework = homework === 'none' ? '—' : homework;
            
            const lessonElement = document.createElement('div');
            lessonElement.className = 'lesson-item bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-4 border border-zinc-800 mb-2';
            lessonElement.innerHTML = `
                <div class="flex justify-between items-center">
                    <div>
                        <div class="text-zinc-500 text-xs mb-1">${lesson.number} урок</div>
                        <div class="font-medium">${lesson.subject}</div>
                    </div>
                    <div class="text-zinc-500 text-sm">${displayHomework}</div>
                </div>
            `;
            
            tempContainer.appendChild(lessonElement);
        });

        setTimeout(() => {
            container.innerHTML = '';
            container.appendChild(tempContainer);
        }, 500);
    }).catch(error => {
        container.innerHTML = `
            <div class="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-4 border border-zinc-800 text-zinc-500 text-center">
                Ошибка загрузки данных
            </div>
        `;
        console.error('Ошибка при загрузке домашних заданий:', error);
    });
}

function initializeApp() {
    const container = document.querySelector('.day-slide-container');
    
    if (container) {
        updateDateDisplay();
        
        const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        const currentDay = days[currentDate.getDay()];
        updateLessons(currentDay);
    }
    
    loadHomework();
    changeTab('schedule');
    
    const saveButton = document.getElementById('save-homework-btn');
    if (saveButton) {
        saveButton.addEventListener('click', saveHomework);
    }

    const modal = document.getElementById('homework-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);

function changeTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });

    document.getElementById(tabId).classList.remove('hidden');
    // ЕБАЛ МАТЬ
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const currentButton = document.querySelector(`button[onclick="changeTab('${tabId}')"]`);
    if (currentButton) {
        currentButton.classList.add('active');
    }

    const daysSwitcher = document.getElementById('days-switcher');
    if (tabId === 'schedule') {
        daysSwitcher.classList.remove('hidden');
    } else {
        daysSwitcher.classList.add('hidden');
    }

    if (tabId === 'bells') {
        updateBellProgress();
        if (window.bellProgressInterval) {
            clearInterval(window.bellProgressInterval);
        }
        window.bellProgressInterval = setInterval(updateBellProgress, 60000);
    } else {
        if (window.bellProgressInterval) {
            clearInterval(window.bellProgressInterval);
        }
    }
}

function openModal() {
    const modal = document.getElementById('homework-modal');
    const modalContent = document.getElementById('modal-content');
    
    modal.classList.remove('hidden');
    modal.classList.add('flex', 'showing');
    modalContent.classList.add('showing');
    
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('homework-modal');
    const modalContent = document.getElementById('modal-content');
    
    modal.classList.add('hiding');
    modalContent.classList.add('hiding');
    modalContent.classList.remove('showing');
    
    setTimeout(() => {
        modal.classList.remove('flex', 'showing', 'hiding');
        modal.classList.add('hidden');
        modalContent.classList.remove('hiding');
        document.body.style.overflow = 'auto';
    }, 200);
}

function updateBellProgress() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;

    const bellItems = document.querySelectorAll('.bell-item');
    let foundCurrent = false;
    let allLessonsEnded = true;

    const lastLesson = bellItems[bellItems.length - 1];
    const lastLessonTime = lastLesson.querySelector('.text-sm').textContent;
    const [, endTime] = lastLessonTime.split(' - ');
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const lastLessonEnd = endHour * 60 + endMinute;

    if (currentTime > lastLessonEnd) {
        const container = document.getElementById('regular-schedule');
        let endMessage = container.querySelector('.lessons-ended-message');
        if (!endMessage) {
            endMessage = document.createElement('div');
            endMessage.className = 'lessons-ended-message bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-4 border border-zinc-800 text-zinc-500 text-center mt-4';
            endMessage.textContent = 'Уроки закончились, кайфуйте';
            container.appendChild(endMessage);
        }
        
        bellItems.forEach(item => {
            item.classList.remove('current', 'next');
            item.classList.add('past');
            const progress = item.querySelector('.bell-progress');
            if (progress) {
                progress.style.width = '100%';
            }
        });
        
        return;
    }

    const endMessage = document.querySelector('.lessons-ended-message');
    if (endMessage) {
        endMessage.remove();
    }

    bellItems.forEach(item => {
        item.classList.remove('current', 'past', 'next');
    });

    for (const item of bellItems) {
        const timeText = item.querySelector('.text-sm').textContent;
        const [startTime, endTime] = timeText.split(' - ');
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);
        
        const lessonStart = startHour * 60 + startMinute;
        const lessonEnd = endHour * 60 + endMinute;

        if (currentTime >= lessonStart && currentTime <= lessonEnd) {
            item.classList.add('current');
            const progress = ((currentTime - lessonStart) / (lessonEnd - lessonStart)) * 100;
            item.querySelector('.bell-progress').style.width = `${progress}%`;
            foundCurrent = true;
            allLessonsEnded = false;
        } else if (currentTime > lessonEnd) {
            item.classList.add('past');
        } else if (!foundCurrent && currentTime < lessonStart) {
            item.classList.add('next');
            foundCurrent = true;
            allLessonsEnded = false;
        }
    }
}
  
