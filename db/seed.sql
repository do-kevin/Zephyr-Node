-- INSERTING INTO Users won't work due to hash passwords, so manually make these accounts in the same order to get the other seeds working

INSERT INTO Users (name, username, password, phoneNumber) VALUES
("Pistachio Jones", "pjones", "password", null),
("Banana Jenkins", "banana", "password", null),
("Apple Cider", "applecider", "password", null),
("Protein Shake", "shakeshake", "password", null),
("Saul Goodman", "itsallgoodman", "kimwexler", null),
("Jiggly Puff", "puffpuffjiggle", "password", null),
("Bubble Sort", "bulbasaur","password", null);

INSERT INTO Decks (subject, userId) VALUES
("pistachio", 1),
("bananas", 2),
("Apple", 3),
("Cider", 3),
("Protein", 4),
("Texas Criminal Law", 5),
("Criminal Law", 5),
("Breaking Bad", 5),
("Pokemon", 6),
("Sorting", 7);

INSERT INTO Flashcards (front, back, deckId) VALUES
-- Pistachio Jones (Should be userId 1 if you run with a blank db)
("How long has the pistachio been cultivated?", "Over 7000 years", 1),
("In what famous book is it mentioned in?", "The Old Testament of the Bible", 1),
("What is its nickname?", "Green Almonds", 1),
("Who created the pistachio ice cream?", "James W. Parkinson", 1),
-- Banana Jenkins
("What is the banana's scientific name?", "musa sapientum", 2),
("What does musa sapientum mean?", "Fruit of the wise men", 2),
("What are the benefits of eating bananas?", "Eating bananas may lower the risk of heart attacks and strokes, as well as decrease the risk of getting some cancers.", 2),
-- Apple Cider
("What is scientific name of apple growing?", "Pomology.", 3),
("How long does it take for apple trees to produce their first fruit?", "Four to five years", 3),
("In what century were children baptized in cider?", "14th Century", 4),
("Which president drank a tankard of cider every morning?", "President John Adams", 4),
-- Protein Shake
("What can protein manufacture?", "Hormones, enzymes, cellular messengers, nucleic acids, and immune-system components", 5),
-- Saul Goodman -- Deck 1
("If the client breaks into a house with the intent to steal something, what crime is he or she most closely committing?", "Burglary", 6),
("If the client is robbing a bank and s/he intentionally shoots and kills a bank teller, what crime have is s/he most closely committed?", "Capital Murder", 6),
("If the client lights his neighbor's house on fire with the intent to destroy their house, what crime is he most closely being committed?", "Arson", 6),
("If you are at home in Texas and a burglar breaks into your home and you shoot and kill him/her, what crime have you most closely committed?", "Capital Murder", 6),
("In Texas, if the client was driving while intoxicated and she/he hits a car on the way to his/her home and he/she kills the person he/she hit, what crime has he/she most closely committed?", "Manslaughter", 6),
("If the client's friend wants to commit suicide and he/she asks the client to help them do so, what crime had the client most closely done?", "Aiding in Suicide ", 6),
("What is it called when the client tells a false statement while under oath in a courtroom?", "Perjury", 6),
("What is entrapment?", "When a police officer induces you into doing something unlawful to obtain an arrest.", 6),
-- Deck 2
("Justice", "The principle of fairness; the ideal of moral equality", 7),
("National Crime Victimization Survey", "Survey given to victims door-to-door to acquire crime data.", 7),
("Who is called the Father of Policing?", "Sir Robert Peel", 7),
("According to a 1999 report, what kills more US police officers in the line of duty?", "Automobile accidents", 7),
("What security firm uses the motto We Never Sleep?", "Pinkerton", 7),
("What landmark case allowed right to counsel in state courts for persons charged with a felony?", "Gideon v. Wainwright", 7),
("There is a difference between a frisk and a brisk pat-down?", "Terry v. Ohio. An officer can do a pat down if he believes there is immiment danger as long as it is confined to the outside of your clothing.", 7),
-- Deck 3
("What was the name of the high school where Walter White taught chemistry?", "J.P. Wynne High School", 8),
("What does Jesse Pinkman's license say?", "THE CAPN", 8),
("How much money did Heisenberg bury in the desert?", "$80 million", 8),
("What is Hank's beer called?", "Schraderbräu", 8),
-- Jiggly Puff
("In the beginning of the episode, Ash catches what Pokemon?", "Caterpie", 9),
("Officer Jenny makes an announcement to the people of Viridian City that thieves have been roaming around the city. Who does she see running with a wounded Pikachu in his arms?", "Ash", 9),
("The episode interestingly starts with a scene that is similar to the introductory scene from the 'Pokémon' games Red and Blue version. The show begins with a Gengar battling which other Pokémon?", "Nidorino", 9),
("What is the name of the famous electric-type, yellow-coloured Pokémon that follows the protagonist, Ash Ketchum, around and refuses to enter a Poké ball?", "Pikachu", 9),
("What species is Weedle?", "The Hairy Bug Pokemon", 9),
("This Pokemon has a flame on its tail, and if it goes out, it won't survive. It is orange and is known as a lizard Pokemon. It is a fire type. Who's that Pokemon?", "Charmander", 9),
-- Bubble Sort
("What is a Bubble Sort?", "A simple sorting algorithm that repeatedly steps through the list to be sorted, compares each pair of adjacent items and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted. The algorithm, which is a comparison sort, is named for the way smaller or larger elements as a bubble to the top of the list. Although the algorithm is simple, it is too slow and impractical for most problems even when compared to insertion sort. Bubble sort can be practical if the input is in mostly sorted order with some out-of-order elements nearly in position.", 10),
("What is an Insertion Sort?", "A simple sorting algorithm that builds the final sorted array (or list) one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort", 10),
("What is a Quick Sort?", "A comparison sort, meaning that it can sort items of any type for which a less-than relation (formally, a total order) is defined. In efficient implementations it is not a stable sort, meaning that the relative order of equal sort items is not preserved. Quicksort can operate in-place on an array, requiring small additional amounts of memory to perform the sorting. It is very similar to selection sort, except that it does not always choose worst-case partition.", 10);

INSERT INTO Tags (tags, deckId) VALUES
("pistachio", 1),
("banana", 2),
("apple", 4),
("cider", 4),
("protein", 5),
("texas", 6),
("criminal", 6),
("criminal", 7),
("saul", 7),
("saul", 8),
("pokemon", 9),
("bubble", 10),
("quick", 10),
("insertion", 10);

INSERT INTO Quotes (quote, author) VALUES
("The secret to getting ahead is getting started. The secret of getting started is breaking your complex, overwhelming tasks into small manageable tasks, and then starting on the first one.", "Mark Twain"),
("The expert in everything was once a beginner.", "Helen Hayes"),
("Start where you are. Use what you have. Do what you can.","Arthur Ashe"),
("There are two kinds of people in this world: those who want to get things done and those who don’t want to make mistakes.","John Maxwell"),
("Your positive action combined with positive thinking results in success.","Shiv Khera"),
("I find that the harder I work, the more luck I seem to have.","Thomas Jefferson"),
("Success is the sum of small efforts, repeated day in and day out.","Robert Collier"),
("Self-belief and hard work will always earn you success.","Virat Kohli"),
("If people only knew how hard I’ve worked to gain my mastery, it wouldn’t seem so wonderful at all.","Michelangelo"),
("I’ve failed over and over and over again in my life. And that is why I succeed.","Michael Jordan"),
("Believe in yourself, take on your challenges, dig deep within yourself to conquer fears. Never let anyone bring you down. You got to keep going.","Chantal Sutherland"),
("Believe you can and you’re halfway there.","Theodore Roosevelt"),
("It always seems impossible until it’s done.","Nelson Mandela"),
("Don’t let what you cannot do interfere with what you can do.","John Wooden"),
("Work gives you meaning and purpose and life is empty without it.","Stephen Hawking"),
("Good things come to people who wait, but better things come to those who go out and get them.","Anonymous"),
("Strive for progress, not perfection.","Anonymous"),
("You don’t have to be great to start, but you have to start to be great.","John Garvens"),
("Push yourself, because no one else is going to do it for you.","Anonymous"),
("You don’t always get what you wish for; you get what you work for.","Anonymous"),
("Challenges are what make life interesting. Overcoming them is what makes life meaningful.","Joshua J. Marine"),
("If you’re going through hell, keep going.","Winston Churchill"),
("Don’t let your victories go to your head, or your failures go to your heart.","Bill Cosby"),
("Failure is the opportunity to begin again more intelligently.","Henry Ford"),
("You don’t drown by falling in the water; you drown by staying there.","Ed Cole"),
("I'm not telling you it's going to be easy - I'm telling you it's going to be worth it.","Art Williams"),
("If you can image it, you can achieve it. If you can dream it, you can become it.","William Arthur Ward"),
("Do it now. Sometimes 'later' becomes 'never'.","Anonymous"),
("When you feel like quitting, think about why you started.","Anonymous"),
("With the new day comes new strength and new thoughts.","Eleanor Roosevelt");

SELECT * FROM Users;
SELECT * FROM Reminders;
SELECT * FROM Appointments;
SELECT * FROM Decks;
SELECT * FROM Flashcards;
SELECT * FROM Tags;
SELECT * FROM Quotes;