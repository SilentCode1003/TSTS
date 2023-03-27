import React, { useState } from 'react'
import { MdArrowDropDown } from 'react-icons/md'

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
          className={`py-4 px-4 flex justify-between bg-neutral-300  border-b-2 border-b-neutral-500 font-bold cursor-pointer`}
          onClick={() => handleClick(index)}
        >
          {item.title}
          <MdArrowDropDown className="text-2xl" />
        </div>
        <div className={`p-4 ${contentActive} bg-neutral-200 text-black`}>
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    )
  })

  return (
    <>
      {items.length < 1 ? (
        ''
      ) : (
        <div className="w-full rounded-md border-2 border-neutral-400 overflow-hidden">
          {renderedItems}
        </div>
      )}
    </>
  )
}

export default Accordion
