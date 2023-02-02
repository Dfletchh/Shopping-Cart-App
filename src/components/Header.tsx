type PropsType = {
  viewCart: boolean
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>
}

const header = ({ viewCart, setViewCart }: PropsType) => {
  const content = {}
  return <div>header</div>
}

export default header
