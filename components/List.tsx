
import Link from 'next/link';
import { wordMap, blurUrl } from '@/libs/wordList'
import Image from "next/image";
import { FaRegLightbulb } from "react-icons/fa";

const Game = () => {
    let list = Object.values(wordMap).map((category: any[]) => {
        return {
            ...category[0],
            len: category.length
        }
    });
    return (
        <section className="max-w-[1000px] mx-auto px-8 py-8 grid gap-4 grid-cols-1 md:grid-cols-3">
            {list.map((item, index) => (
                <div key={index} className="card bg-base-100 shadow-xl overflow-hidden">
                    <Link href={`/detail/${item.type}`}>
                        <div className="w-full h-[200px] z-10 relative">
                            <Image
                                src={item.img}
                                width={400}
                                height={200}
                                alt={item.word}
                                placeholder="blur"
                                blurDataURL={blurUrl}
                            />
                        </div>
                        <div className="card-body bg-base-100 p-2 flex flex-row justify-between z-20 relative leading-[35px]">
                            {/* <div className='w-10 flex flex-row'>
                                <LuUserRound size='small' />
                                <span>88</span>
                            </div> */}
                            <div>difficulty: {item.difficulty}</div>
                            <div>words: {item.len}</div>
                            <button className="btn btn-sm bg-[#FEC017]">
                                <FaRegLightbulb />
                            </button>
                        </div>
                    </Link>
                </div>
            ))}
        </section>
    );
};

export default Game;
