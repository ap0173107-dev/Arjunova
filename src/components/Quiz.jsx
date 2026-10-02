import React, { useState } from 'react'
import { CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react'

export default function Quiz({ quiz }) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  if (!quiz) return null
  const question = quiz.questions[index]
  const isLast = index === quiz.questions.length - 1

  const choose = (i) => {
    if (selected !== null) return
    setSelected(i)
    if (i === question.correct) setScore((s) => s + 1)
  }

  const next = () => {
    if (isLast) {
      setDone(true)
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
  }

  const restart = () => {
    setIndex(0)
    setSelected(null)
    setScore(0)
    setDone(false)
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-border/10 p-7 text-center">
        <p className="eyebrow text-arjuna">Result</p>
        <p className="mt-3 font-display font-extrabold text-4xl">
          {score} / {quiz.questions.length}
        </p>
        <p className="mt-2 text-sm text-mist">
          {score === quiz.questions.length
            ? 'Perfect score — you\u2019re ready for the real thing.'
            : 'Nice attempt — this is exactly what our diagnostic session digs into.'}
        </p>
        <button onClick={restart} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-nova">
          <RotateCcw className="w-4 h-4" /> Try again
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-border/10 p-7">
      <div className="flex items-center justify-between">
        <p className="eyebrow text-arjuna">{quiz.title}</p>
        <p className="text-xs text-mist">
          {index + 1} / {quiz.questions.length}
        </p>
      </div>
      <h4 className="mt-4 font-display font-bold text-lg leading-snug">{question.q}</h4>
      <div className="mt-5 space-y-2.5">
        {question.options.map((opt, i) => {
          const isCorrect = selected !== null && i === question.correct
          const isWrongPick = selected === i && i !== question.correct
          return (
            <button
              key={opt}
              onClick={() => choose(i)}
              className={`w-full flex items-center justify-between text-left rounded-xl border px-4 py-3 text-sm transition-colors ${
                isCorrect
                  ? 'border-arjuna/60 bg-arjuna/10'
                  : isWrongPick
                  ? 'border-red-400/50 bg-red-400/10'
                  : 'border-border/15 hover:border-nova/40'
              }`}
            >
              {opt}
              {isCorrect && <CheckCircle2 className="w-4 h-4 text-arjuna shrink-0" />}
              {isWrongPick && <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
            </button>
          )
        })}
      </div>
      {selected !== null && (
        <button
          onClick={next}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-nova text-[#1B2130] font-semibold px-5 py-2.5 text-sm hover:brightness-105 transition-all"
        >
          {isLast ? 'See result' : 'Next question'} <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}