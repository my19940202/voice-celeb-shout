
import { wordMap, blurUrl } from '@/libs/wordList'

const Seo = () => {
    let list = Object.values(wordMap).map((category: any[]) => {
        return {
            ...category[0],
            len: category.length
        }
    });
    return (
        <section className="max-w-[1000px] mx-auto px-8 py-8">
            <div className="w-full mb-8 p-8 rounded-lg shadow-xl">
                <h3 className="text-2xl font-bold mb-6" >
                    🎮 Free Game: Guess Word Online
                </h3>
                <div className="text-lg">
                    <p>Embark on a thrilling adventure with our "Guess the Word Online" game! This captivating experience combines visual puzzles with linguistic challenges, ensuring an unpredictable and entertaining journey. Share your progress on Twitter and compete with friends to see who can guess the most words correctly. Dive into the world of words and discover the unexpected!</p>
                </div>
            </div>

            <div className="w-full mb-8 p-8 rounded-lg shadow-xl">
                <h3 className="text-2xl font-bold mb-6" >
                    📖 How to play Guess Word Online
                </h3>
                <div className="text-lg">
                    <p>
                        How to Play Guess Word Like a Pro:<br />
                        Spot the Blank & Start Guessing!<br />
                        Click on the flashing blank spaces to activate them.<br />
                        Use the on-screen keyboard (or your physical keyboard) to enter letters.<br />
                        Pro Tip: Start with common vowels (A, E, I, O, U) – they appear in over 60% of English words!<br />
                        <br />
                        Decode the Color Clues:<br />
                        Green: You nailed it! The letter is correct and in the right position.<br />
                        Red: The red letters represent mistakes and the letters need to be replaced.  <br />

                        Use Smart Tools When You’re Stuck:<br />

                        Click “Show Answer” to reveal the full word and learn its meaning.<br />

                        Use the “Hint” button for a contextual clue (e.g., “A type of fruit” for APPLE).<br />
                        <br />
                        Check Your Progress & Level Up:
                        <br />
                        Click “Check” to submit your answer and move to the next word.<br />
                        Track your stats, including accuracy, streaks, and time per word.<br />
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Seo;
