import React, { useState } from 'react'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null)

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index)
  }

  const renderedItems = items.map((item, index) => {
    const contentActive = index === activeIndex ? 'block' : 'hidden'

    return (
      <React.Fragment key={item.title}>
        <div
          className={`py-4 px-4 flex justify-between bg-gray-100  border-2 border-b-gray-200 font-bold cursor-pointer`}
          onClick={() => handleClick(index)}
        >
          {item.title}
          {index !== activeIndex ? (
            <MdArrowDropDown className="text-2xl" />
          ) : (
            <MdArrowDropUp className="text-2xl" />
          )}
        </div>
        <div
          className={`p-4 max-w-none ${contentActive} bg-gray-50 text-black border-2 border-b-gray-200 prose`}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {item.content}
          </ReactMarkdown>
        </div>
      </React.Fragment>
    )
  })

  return (
    <>
      {items.length < 1 ? (
        ''
      ) : (
        <div className="w-full rounded-md border-gray-200 overflow-hidden">
          {renderedItems}
        </div>
      )}
    </>
  )
}

export default Accordion
