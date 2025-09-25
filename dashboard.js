document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    // --- Get All HTML Elements ---
    const usernameDisplay = document.getElementById('username-display');
    const levelDisplay = document.getElementById('level-display');
    const xpBarFill = document.getElementById('xp-bar-fill');
    const xpText = document.getElementById('xp-text');
    const quizzesTakenDisplay = document.getElementById('quizzes-taken');
    const avgScoreDisplay = document.getElementById('avg-score');
    const welcomeMessage = document.getElementById('welcome-message');
    const logoutBtn = document.getElementById('logoutBtn');
    const classSelectionButtons = document.querySelectorAll('.class-btn');
    const classContentContainer = document.getElementById('class-content-container');
    const topicListContainer = document.getElementById('topic-list-container');
    const showQuizzesBtn = document.getElementById('showQuizzesBtn');
    const showBooksBtn = document.getElementById('showBooksBtn');
    const showVideosBtn = document.getElementById('showVideosBtn');
    const quizContainer = document.getElementById('quiz-container');
    const scoreModal = document.getElementById('scoreModal');
    const finalScoreDisplay = document.getElementById('final-score');
    const closeScoreModalBtn = document.getElementById('closeScoreModalBtn');
    const bookModal = document.getElementById('bookModal');
    const closeBookModalBtn = document.getElementById('closeBookModalBtn');
    const bookTitleDisplay = document.getElementById('book-title-display');
    const pageContentDisplay = document.getElementById('page-content-display');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const currentPageNum = document.getElementById('current-page-num');
    const totalPageNum = document.getElementById('total-page-num');
    const videoModal = document.getElementById('videoModal');
    const closeVideoModalBtn = document.getElementById('closeVideoModalBtn');
    const videoTitleDisplay = document.getElementById('video-title-display');
    const youtubePlayer = document.getElementById('youtube-player');
    
    const API_URL = '/api';
    let currentClassQuizzes = [];
    let currentClassBooks = [];
    let currentClassVideos = [];
    let currentBookPages = [];
    let currentPageIndex = 0;
    let currentSubjectId = null;

    async function fetchDashboardData() {
        try {
            const response = await fetch(`${API_URL}/dashboard`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();
            const mockLevel = Math.floor(data.progress.length / 2) + 1;
            const mockCurrentXP = (data.progress.length % 2) * 100;
            const mockXPForNextLevel = 200;
            usernameDisplay.textContent = data.username;
            welcomeMessage.textContent = `Welcome back, ${data.username}!`;
            levelDisplay.textContent = `Level ${mockLevel} Explorer`;
            xpBarFill.style.width = `${(mockCurrentXP / mockXPForNextLevel) * 100}%`;
            xpText.textContent = `${mockCurrentXP} / ${mockXPForNextLevel} XP`;
            quizzesTakenDisplay.textContent = data.progress.length;
            if (data.progress.length > 0) {
                const totalScore = data.progress.reduce((sum, p) => sum + p.score, 0);
                avgScoreDisplay.textContent = `${Math.round(totalScore / data.progress.length)}%`;
            } else { avgScoreDisplay.textContent = '0%'; }
        } catch (error) { localStorage.removeItem('token'); window.location.href = 'index.html'; }
    }

    async function fetchClassContent(classLevel) {
        currentSubjectId = classLevel;
        try {
            const response = await fetch(`${API_URL}/class/${classLevel}/content`, { headers: { 'Authorization': `Bearer ${token}` } });
            const data = await response.json();
            
            currentClassQuizzes = data.quizzes;
            currentClassBooks = data.books;
            currentClassVideos = data.videos;

            classContentContainer.classList.remove('hidden');
            topicListContainer.innerHTML = '';
            showQuizzesBtn.classList.remove('active');
            showBooksBtn.classList.remove('active');
            showVideosBtn.classList.remove('active');
            quizContainer.classList.add('hidden');
        } catch (error) { console.error('Error fetching class content:', error); }
    }

    function renderQuizList() {
        showQuizzesBtn.classList.add('active');
        showBooksBtn.classList.remove('active');
        showVideosBtn.classList.remove('active');
        if (currentClassQuizzes.length > 0) {
            topicListContainer.innerHTML = currentClassQuizzes.map(q => `<div class="content-item"><button class="cta-button" onclick="startQuiz(${q.quiz_id})">${q.title}</button><p class="summary-text">${q.summary || ''}</p></div>`).join('');
        } else { topicListContainer.innerHTML = '<p>No quizzes available for this class yet.</p>'; }
    }

    function renderBookList() {
        showBooksBtn.classList.add('active');
        showQuizzesBtn.classList.remove('active');
        showVideosBtn.classList.remove('active');
        if (currentClassBooks.length > 0) {
            topicListContainer.innerHTML = currentClassBooks.map(b => `<div class="content-item"><a class="note-item" onclick="openBook(${b.book_id}, '${b.title.replace(/'/g, "\\'")}')">${b.title}</a><p class="summary-text">${b.summary || ''}</p></div>`).join('');
        } else { topicListContainer.innerHTML = '<p>No books available for this class yet.</p>'; }
    }

    function renderVideoList() {
        showVideosBtn.classList.add('active');
        showQuizzesBtn.classList.remove('active');
        showBooksBtn.classList.remove('active');
        if (currentClassVideos.length > 0) {
            topicListContainer.innerHTML = currentClassVideos.map(v => `<div class="content-item"><a class="video-item" onclick="playVideo('${v.youtube_video_id}', '${v.title.replace(/'/g, "\\'")}')">${v.title}</a><p class="summary-text">${v.summary || ''}</p></div>`).join('');
        } else { topicListContainer.innerHTML = '<p>No videos available for this class yet.</p>'; }
    }
    
    window.playVideo = function(youtubeId, title) {
        videoTitleDisplay.textContent = title;
        youtubePlayer.src = `https://www.youtube.com/embed/${youtubeId}`;
        videoModal.classList.remove('hidden');
    }

    window.openBook = async function(bookId, bookTitle) {
        try {
            const response = await fetch(`${API_URL}/book/${bookId}/pages`, { headers: { 'Authorization': `Bearer ${token}` } });
            currentBookPages = await response.json();
            currentPageIndex = 0;
            bookTitleDisplay.textContent = bookTitle;
            displayPage(currentPageIndex);
            bookModal.classList.remove('hidden');
        } catch (error) { console.error('Error opening book:', error); }
    }
    
    function displayPage(pageIndex) {
        pageContentDisplay.innerHTML = currentBookPages[pageIndex].content;
        currentPageNum.textContent = pageIndex + 1;
        totalPageNum.textContent = currentBookPages.length;
        prevPageBtn.disabled = (pageIndex === 0);
        nextPageBtn.disabled = (pageIndex === currentBookPages.length - 1);
    }
    
    window.startQuiz = async function(quizId) {
        try {
            const response = await fetch(`${API_URL}/quiz/${quizId}`, { headers: { 'Authorization': `Bearer ${token}` } });
            const questions = await response.json();
            let quizHTML = `<h2>Quiz Time!</h2><form id="quizForm" data-quiz-id="${quizId}">`;
            questions.forEach((q, index) => {
                quizHTML += `<div class="question"><p><strong>${index + 1}. ${q.question_text}</strong></p><div class="answers">${q.answers.map(a => `<label><input type="radio" name="question_${q.question_id}" value="${a.answer_id}" required> <span>${a.text}</span></label>`).join('')}</div></div>`;
            });
            quizHTML += `<button type="submit" class="cta-button">Submit Quiz</button></form>`;
            topicListContainer.innerHTML = '';
            quizContainer.innerHTML = quizHTML;
            quizContainer.classList.remove('hidden');
            quizContainer.classList.add('quiz-active');
            quizContainer.setAttribute('data-subject', currentSubjectId);
            document.getElementById('quizForm').addEventListener('submit', submitQuiz);
        } catch (error) { console.error('Error starting quiz:', error); }
    }

    async function submitQuiz(e) {
        e.preventDefault();
        const quizId = e.target.dataset.quizId;
        const formData = new FormData(e.target);
        const userAnswers = {};
        for (let [key, value] of formData.entries()) { userAnswers[key.split('_')[1]] = value; }
        try {
            const response = await fetch(`${API_URL}/quiz/submit`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ quiz_id: quizId, answers: userAnswers }) });
            const result = await response.json();
            finalScoreDisplay.textContent = `${result.score}%`;
            scoreModal.classList.remove('hidden');
            quizContainer.classList.add('hidden');
            quizContainer.classList.remove('quiz-active');
            quizContainer.removeAttribute('data-subject');
            quizContainer.innerHTML = '';
            fetchDashboardData();
        } catch (error) { console.error('Error submitting quiz:', error); }
    }

    classSelectionButtons.forEach(button => {
        button.addEventListener('click', () => {
            classSelectionButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            fetchClassContent(button.dataset.class);
        });
    });

    showQuizzesBtn.addEventListener('click', renderQuizList);
    showBooksBtn.addEventListener('click', renderBookList);
    showVideosBtn.addEventListener('click', renderVideoList);
    closeVideoModalBtn.addEventListener('click', () => { videoModal.classList.add('hidden'); youtubePlayer.src = ''; });
    closeBookModalBtn.addEventListener('click', () => bookModal.classList.add('hidden'));
    prevPageBtn.addEventListener('click', () => { if (currentPageIndex > 0) { currentPageIndex--; displayPage(currentPageIndex); } });
    nextPageBtn.addEventListener('click', () => { if (currentPageIndex < currentBookPages.length - 1) { currentPageIndex++; displayPage(currentPageIndex); } });
    closeScoreModalBtn.addEventListener('click', () => scoreModal.classList.add('hidden'));
    logoutBtn.addEventListener('click', () => { localStorage.removeItem('token'); window.location.href = 'index.html'; });

    fetchDashboardData();
});