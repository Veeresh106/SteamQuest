-- Insert all sample data for the STEMQuest project

-- Insert Subjects
INSERT INTO subjects (subject_id, name) VALUES (1, 'Maths'), (2, 'Science'), (3, 'Coding');

-- Insert Quizzes
INSERT INTO quizzes (quiz_id, title, subject_id, class_level, summary) VALUES
(1, 'Algebra Basics', 1, 8, 'Test your knowledge of basic linear equations, variables, and exponents.'),
(2, 'The Solar System', 2, 9, 'Explore the planets, stars, and celestial bodies that make up our cosmic neighborhood.'),
(3, 'Introduction to Python', 3, 10, 'Learn the fundamental concepts of Python, one of the world''s most popular programming languages.'),
(4, 'Geometry Basics', 1, 8, 'Challenge your understanding of shapes, angles, and the basic principles of geometry.'),
(5, 'Human Biology', 2, 9, 'Discover the amazing systems of the human body, from the heart to the brain.'),
(6, 'HTML Fundamentals', 3, 10, 'Understand the building blocks of the web with these questions on HTML tags and structure.'),
(7, 'Components of Food', 2, 6, 'Learn about carbohydrates, proteins, and vitamins and why they are essential for a healthy life.'),
(8, 'Integers and Fractions', 1, 7, 'Practice your skills with positive and negative numbers, and learn how to work with fractions.'),
(9, 'Basic Arithmetic', 1, 6, 'A quick test of your core skills in addition, subtraction, multiplication, and division.'),
(10, 'Computer Basics', 3, 6, 'Learn about the core parts of a computer, like the CPU, and the difference between hardware and software.'),
(11, 'Acids and Bases', 2, 7, 'Test your knowledge of the pH scale and the properties of acidic and basic substances.'),
(12, 'Intro to Logic', 3, 7, 'Understand the basics of computational thinking with loops and conditional statements.'),
(13, 'Force and Pressure', 2, 8, 'Learn about the fundamental concepts of force, pressure, and Newton''s Laws of Motion.'),
(14, 'Intro to CSS', 3, 8, 'Learn how to style web pages using Cascading Style Sheets to control colors, fonts, and layouts.'),
(15, 'Number Systems', 1, 9, 'Explore different types of numbers, including rational, irrational, and prime numbers.'),
(16, 'Intro to JavaScript', 3, 9, 'Get started with the language of the web by learning about variables and comments.'),
(17, 'Trigonometry Basics', 1, 10, 'A test on the fundamental ratios in trigonometry, such as sine and cosine.'),
(18, 'Electricity', 2, 10, 'Learn about electric current, conductors, and the basic principles of Ohm''s Law.');

-- Insert Questions and Answers (All questions and answers go here)
-- This is a combination of all previous INSERT statements for questions and answers.

-- Insert Books and Summaries
INSERT INTO books (book_id, title, subject_id, class_level, summary) VALUES
(1, 'Class 6 Science: Food & Nutrients', 2, 6, 'A complete guide to food groups, nutrients, and the importance of a balanced diet for a healthy body.'),
(2, 'Class 7 Maths: Exploring Integers', 1, 7, 'This book covers the properties of integers and how to perform operations like addition and subtraction on them.'),
(3, 'Class 8 Science: Light and Reflection', 2, 8, 'Learn about the fascinating properties of light, mirrors, and the laws of reflection.'),
(4, 'Class 9 Maths: Intro to Polynomials', 1, 9, 'An introduction to algebraic expressions and the different types of polynomials.'),
(5, 'Class 10 Coding: Web Development Basics', 3, 10, 'Your first step into creating websites, covering the basics of HTML, CSS, and JavaScript.');

-- Insert Pages for Books
-- (All INSERT INTO pages... commands from previous steps go here)

-- Insert Videos and Summaries
INSERT INTO videos (title, youtube_video_id, summary, class_level, subject_id) VALUES
('Components of Food | Class 6 Science', '_F6RDB242sA', 'An animated video explaining carbohydrates, proteins, fats, vitamins, and minerals.', 6, 2),
('What are Integers? | Class 7 Maths', '6yZ202T52iA', 'A simple introduction to positive numbers, negative numbers, and the number line.', 7, 1),
('Light Reflection and Refraction | Class 8 Science', 'kLp_4OLM-0o', 'Learn the basics of how light reflects off surfaces and the laws of reflection.', 8, 2),
('Introduction to HTML | Class 10 Coding', 'kUMe1FH4CHE', 'A beginner-friendly tutorial that covers the fundamental tags and structure of an HTML page.', 10, 3);