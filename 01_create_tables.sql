-- Create all tables for the STEMQuest project

CREATE TABLE subjects (
    subject_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quizzes (
    quiz_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subject_id INT NOT NULL REFERENCES subjects(subject_id),
    class_level INT,
    summary VARCHAR(500)
);

CREATE TABLE questions (
    question_id SERIAL PRIMARY KEY,
    question_text TEXT NOT NULL,
    quiz_id INT NOT NULL REFERENCES quizzes(quiz_id)
);

CREATE TABLE answers (
    answer_id SERIAL PRIMARY KEY,
    answer_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    question_id INT NOT NULL REFERENCES questions(question_id)
);

CREATE TABLE quiz_attempts (
    attempt_id SERIAL PRIMARY KEY,
    score INT NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL REFERENCES users(user_id),
    quiz_id INT NOT NULL REFERENCES quizzes(quiz_id)
);

CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subject_id INT NOT NULL REFERENCES subjects(subject_id),
    class_level INT NOT NULL,
    summary VARCHAR(500)
);

CREATE TABLE pages (
    page_id SERIAL PRIMARY KEY,
    book_id INT NOT NULL REFERENCES books(book_id),
    page_number INT NOT NULL,
    content TEXT NOT NULL,
    UNIQUE(book_id, page_number)
);

CREATE TABLE videos (
    video_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    youtube_video_id VARCHAR(255) NOT NULL,
    summary TEXT,
    class_level INT NOT NULL,
    subject_id INT NOT NULL REFERENCES subjects(subject_id)
);