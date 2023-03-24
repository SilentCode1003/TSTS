function Card({ children, classNames, ...rest }) {
  return (
    <div className={`shadow border rounded ${classNames}`} {...rest}>
      {children}
    </div>
  )
}

export default Card
