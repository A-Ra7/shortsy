        (function() {
            "use strict";
            AOS.init({ duration: 800, once: true, easing: 'ease-out' });

            // Многостраничность
            const pages = {
                home: document.getElementById('page-home'),
                history: document.getElementById('page-history'),
                gallery: document.getElementById('page-gallery'),
                audioguide: document.getElementById('page-audioguide'),
                map: document.getElementById('page-map')
            };
            const navLinks = document.querySelectorAll('.nav-link');

            function activatePage(pageId) {
                Object.values(pages).forEach(p => p?.classList.remove('active-page'));
                if (pages[pageId]) pages[pageId].classList.add('active-page');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.dataset.page === pageId) link.classList.add('active');
                });
                setTimeout(() => AOS.refresh(), 100);
            }

            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    activatePage(this.dataset.page);
                });
            });

            // ВИКТОРИНА
            const quizData = [
                {
                    question: "Как называется самоназвание шорцев?",
                    options: ["Тадар-кижи", "Кузнецкие татары", "Шор-кижи", "Кайчи"],
                    correct: 0
                },
                {
                    question: "Какой традиционный промысел прославил шорцев в Сибири?",
                    options: ["Кузнечное дело", "Оленеводство", "Морской промысел", "Гончарство"],
                    correct: 0
                },
                {
                    question: "На территории какой современной области проживают шорцы?",
                    options: ["Кемеровская область", "Республика Алтай", "Красноярский край", "Иркутская область"],
                    correct: 0
                },
                {
                    question: "Как называется шорский эпос, исполняемый горловым пением?",
                    options: ["Кан-Перген", "Манас", "Джангар", "Олонхо"],
                    correct: 0
                },
                {
                    question: "Какая река считается священной в Горной Шории?",
                    options: ["Мрассу", "Обь", "Енисей", "Лена"],
                    correct: 0
                }
            ];

            let currentQuestion = 0;
            let score = 0;
            let selectedOption = null;

            const questionEl = document.getElementById('question-text');
            const optionsContainer = document.getElementById('options-container');
            const submitBtn = document.getElementById('submit-btn');
            const feedbackEl = document.getElementById('feedback-message');
            const resultEl = document.getElementById('result-message');

            function loadQuestion(index) {
                const q = quizData[index];
                questionEl.textContent = q.question;
                optionsContainer.innerHTML = '';
                q.options.forEach((opt, idx) => {
                    const div = document.createElement('div');
                    div.className = 'quiz-option';
                    div.innerHTML = `<i class="fas fa-circle" style="font-size: 0.7rem;"></i> ${opt}`;
                    div.dataset.optIndex = idx;
                    div.addEventListener('click', function() {
                        // снять выделение
                        document.querySelectorAll('.quiz-option').forEach(el => el.classList.remove('selected'));
                        this.classList.add('selected');
                        selectedOption = idx;
                    });
                    optionsContainer.appendChild(div);
                });
                feedbackEl.style.display = 'none';
                resultEl.style.display = 'none';
                submitBtn.disabled = false;
                selectedOption = null;
            }

            function handleSubmit() {
                if (selectedOption === null) {
                    alert('Пожалуйста, выберите вариант ответа');
                    return;
                }

                const q = quizData[currentQuestion];
                const isCorrect = (selectedOption === q.correct);
                
                if (isCorrect) {
                    score++;
                    feedbackEl.textContent = '✅ Верно! Отличный ответ!';
                    feedbackEl.style.background = '#e0edc5';
                    feedbackEl.style.color = '#2f6e3f';
                } else {
                    feedbackEl.textContent = `❌ Неверно. Правильный ответ: ${q.options[q.correct]}`;
                    feedbackEl.style.background = '#ffe1de';
                    feedbackEl.style.color = '#b23e3e';
                }
                feedbackEl.style.display = 'inline-block';
                submitBtn.disabled = true;

                // Переход к следующему вопросу или завершение
                if (currentQuestion < quizData.length - 1) {
                    setTimeout(() => {
                        currentQuestion++;
                        loadQuestion(currentQuestion);
                    }, 1800);
                } else {
                    setTimeout(() => {
                        // Показать итог
                        questionEl.style.display = 'none';
                        optionsContainer.style.display = 'none';
                        submitBtn.style.display = 'none';
                        feedbackEl.style.display = 'none';
                        resultEl.style.display = 'inline-block';
                        resultEl.innerHTML = `🎉 Викторина завершена! Ваш результат: ${score} из ${quizData.length}<br>Спасибо за интерес к народам Сибири!`;
                    }, 1800);
                }
            }

            submitBtn.addEventListener('click', handleSubmit);

            // Старт викторины
            if (document.getElementById('quiz-container')) {
                currentQuestion = 0;
                score = 0;
                loadQuestion(0);
            }

            // Активация главной при загрузке
            if (!document.querySelector('.page.active-page')) activatePage('home');
        })();