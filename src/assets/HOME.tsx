interface IHomeType {
  isNav: boolean
}


export const HOME = ({isNav} : IHomeType) => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.3335 28V12L16.0002 4L26.6668 12V28H18.6668V18.6667H13.3335V28H5.3335Z" fill={isNav ? "#0056D6" : "#ADADAD"}/>
</svg>

  )
}