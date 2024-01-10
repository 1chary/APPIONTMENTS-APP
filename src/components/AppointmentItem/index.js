// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, changeTheColorOfTheStar} = props
  const {title, formattedDate, id, isStarred} = eachAppointment

  const changeImage = () => {
    changeTheColorOfTheStar(id)
  }

  const imageChange = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="individualAppointment">
      <div className="titleAndImage">
        <p className="title">{title}</p>
        <button
          className="starButton"
          type="button"
          onClick={changeImage}
          data-testid="star"
        >
          <img src={imageChange} alt="star" />
        </button>
      </div>
      <p className="dateInput">Date: {formattedDate}</p>
    </li>
  )
}

export default AppointmentItem
