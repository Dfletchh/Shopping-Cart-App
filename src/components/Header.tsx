import Nav from "./Nav"

type PropsType = {
  viewCart: boolean
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>
}

const header = ({ viewCart, setViewCart }: PropsType) => {
  const content = (
    <header className='header'>
      <div className='header__title-bar'>
        <h1>The Coral Collective</h1>
        <div className='header__price-box'>
          <p>Total Items:</p>
          <p>Total Price:</p>
        </div>
        <Nav viewCart={viewCart} setViewCart={setViewCart} />
      </div>
    </header>
  )

  return <div>header</div>
}

export default header
