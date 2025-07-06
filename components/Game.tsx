'use client'
import { useEffect, useRef, useState } from "react";
import './Game.css'
import { FaRegLightbulb, FaTwitter } from "react-icons/fa";
import { GrCaretNext } from "react-icons/gr";
import { prefix, wordMap, blurUrl } from '@/libs/wordList'
import Image from "next/image";

interface GameProps {
    type: string
}

function getImgUrlByNumber(right: number, wrong: number) {
    const total = right + wrong;
    const errorRate = wrong / total;
    let img, desc;
    if (errorRate === 0) {
        img = 'leo-glass.avif';
        desc = 'Perfect! You got them all right!';
    } else if (errorRate <= 0.2) {
        img = 'fine.jpg';
        desc = 'Just so so... You can do better!';
    } else if (errorRate <= 0.4) {
        img = 'ngr/clever.png';
        desc = 'It is ok... You are on the right track!';
    } else {
        img = 'face.jpg';
        desc = 'Oops... You might want to try again!';
    }
    return { img, desc };
}

const Game = (props: GameProps) => {
    const { type } = props
    const wordList = wordMap[type];
    const [currIdx, setCurrIdx] = useState(0)
    const [wordConf, setWordConf] = useState(wordList[currIdx])
    const [userInput, setUserInput] = useState([])
    const inputRefs = useRef([])
    const [checkStyle, setCheckStyle] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [skip, setSkip] = useState(false)
    const [result, setResult] = useState({
        start: 0,
        end: 0,
        right: 0,
        wrong: 0
    })
    const imgRef = useRef(null)

    // 初始化输入数组
    useEffect(() => {
        const initial = Array(wordConf.word.length).fill("")
        wordConf.showIdx.forEach((index: number) => {
            initial[index] = wordConf.word[index]
        })
        setUserInput(initial)
    }, [wordConf])

    useEffect(() => {
        setWordConf(wordList[currIdx])
        setSkip(false);
    }, [currIdx])

    // 处理输入变化
    const handleInputChange = (index: number, value: string) => {
        // 每个格子只允许一个字母
        if (value.length > 1) return

        const newInput = [...userInput]
        newInput[index] = value.toUpperCase()
        setUserInput(newInput)

        // 自动跳转到下一个输入框
        if (value && index < wordConf.word.length - 1) {
            const nextIndex = findNextEmptyIndex(index + 1)
            if (nextIndex !== -1) {
                inputRefs.current[nextIndex]?.focus()
            }
        }
        setCheckStyle([])
    }

    // 找到下一个空输入框
    const findNextEmptyIndex = (startIndex: number): number => {
        for (let i = startIndex; i < wordConf.word.length; i++) {
            if (!wordConf.showIdx.includes(i)) {
                return i
            }
        }
        return -1
    }

    // 处理按键事件
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !userInput[index] && index > 0) {
            // 当前格子为空且按下删除键时，跳回上一个可编辑的格子
            const prevIndex = findPrevEmptyIndex(index - 1)
            if (prevIndex !== -1) {
                inputRefs.current[prevIndex]?.focus()
            }
        }
    }

    // 找到前一个空输入框
    const findPrevEmptyIndex = (startIndex: number): number => {
        for (let i = startIndex; i >= 0; i--) {
            if (!wordConf.showIdx.includes(i)) {
                return i
            }
        }
        return -1
    }

    // 检查输入是否正确
    const isCorrect = (index: number) => {
        return userInput[index] === wordConf.word[index].toUpperCase()
    }

    const handleCheckBtn = (e: any) => {
        const button = e.target;
        const { type } = button.dataset;
        // add start time
        if (currIdx === 0) {
            setResult(prev => ({
                ...prev,
                start: +new Date()
            }))
        }

        if (type === 'check') {
            // 更新所有输入框的样式
            const updatedInputStyles = userInput.map((input, index) => {
                if (wordConf.showIdx.includes(index)) return ''
                return isCorrect(index)
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-red-500 bg-red-50 text-red-700";
            });
            setCheckStyle(updatedInputStyles);

            const isAllMatched = userInput.every(
                (ele, idx) => wordConf.showIdx.includes(idx) || isCorrect(idx)
            )

            if (isAllMatched) {
                setCheckStyle([])
                setResult(prev => {
                    let newCount = skip ? { wrong: prev.wrong + 1 } : { right: prev.right + 1 }

                    return { ...prev, ...newCount }
                })
                if (currIdx === wordList.length - 1) {
                    setResult(prev => ({
                        ...prev,
                        end: +new Date()
                    }))
                    setShowResult(true)
                    return;
                }
                setCurrIdx(prev => prev + 1)
            }

            // 添加动画类
            button.classList.add('animate-confetti');

            // 动画结束后移除类，以便下次点击可以再次触发
            button.addEventListener('animationend', () => {
                button.classList.remove('animate-confetti');
            }, { once: true });
        }
        else if (type === 'anwser') {
            // 显示正确答案显示出来
            setCheckStyle([])
            const result = wordConf.word.split('').map((item: string) => item.toUpperCase())
            setSkip(true);
            setUserInput(result)
        }
    }

    const { img: resultImg, desc } = getImgUrlByNumber(result.right, result.wrong);
    const shareText = encodeURIComponent(
        `I just completed the word game with ${result.right} correct answers and ${result.wrong} mistakes! 🎉`
    )

    return (
        <section className="max-w-[1000px] mx-auto p-2">
            {/* 调整完成 看下猜对猜错的 */}
            {
                showResult ? (
                    <div className="bg-white rounded-xl p-1 md:p-4 text-center">
                        <div className="stats stats-horizontal shadow">
                            <div className="stat">
                                <div className="stat-title">✅ right</div>
                                <div className="stat-value">{result.right}</div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">❌ wrong</div>
                                <div className="stat-value">{result.wrong}</div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">⏳ Time(s)</div>
                                <div className="stat-value">{Math.round((result.end - result.start) / 1000)}</div>
                            </div>
                        </div>
                        <p className="pt-4">{desc}</p>
                        {/* Add Twitter share button */}
                        <a
                            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        >
                            <FaTwitter /> &nbsp;Share on Twitter
                        </a>
                        <div className="text-center">
                            <Image
                                className={`mt-4 w-3xs mx-auto object-cover rounded-xl `}
                                src={prefix + resultImg}
                                width={400}
                                height={200}
                                alt="success leo glass laugh"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl p-2 md:p-4 shadow-lg">
                        <div className="rounded-md relative">
                            <Image
                                className={`w-3xs mx-auto object-cover `}
                                src={wordConf.img}
                                width={600}
                                height={300}
                                alt={wordConf.word}
                                placeholder="blur"
                                blurDataURL={blurUrl}
                            />
                        </div>
                        <div className="text-center my-4">
                            <p className="text-gray-600">
                                No.{currIdx + 1}: Fill in the missing letters
                            </p>
                            <progress className="progress w-56" value={currIdx + 1} max={wordList.length}></progress>
                        </div>
                        <div className="flex gap-2 justify-center flex-wrap">
                            {wordConf.word.split("").map((letter: string, index: number) => (
                                <input
                                    key={index}
                                    ref={(el: HTMLInputElement | null) => {
                                        if (el) {
                                            inputRefs.current[index] = el;
                                        }
                                    }}
                                    type="text"
                                    maxLength={1}
                                    value={userInput[index] || ""}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    disabled={wordConf.showIdx.includes(index)}
                                    className={`letter-input ` + checkStyle[index]}
                                />
                            ))}
                        </div>
                        <div className="mx-auto md:w-[60%] my-4 flex flex-row justify-around flex-wrap text-sm text-gray-500">
                            <button data-type="anwser" className="px-10 btn md:mr-10 m-0" onClick={(e) => handleCheckBtn(e)}>
                                <FaRegLightbulb /> Show Anwser
                            </button>
                            <button data-type="check" className="px-10 btn bg-[#FEC017] mt-4 md:mt-0" onClick={(e) => handleCheckBtn(e)}>
                                <GrCaretNext /> Check Anwser
                            </button>
                        </div>
                    </div>
                )
            }
        </section >
    );
};

export default Game;
