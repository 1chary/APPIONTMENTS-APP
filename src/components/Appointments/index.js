// Write your code here

import {Component} from 'react'

import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {appointmentList: [], title: '', date: '', isFilterActive: false}

  title = event => {
    this.setState({title: event.target.value})
  }

  date = event => {
    this.setState({date: event.target.value})
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title,
      formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  changeTheColorOfTheStar = id => {
    const {appointmentList} = this.state
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachValue => {
        if (id === eachValue.id) {
          return {...eachValue, isStarred: !eachValue.isStarred}
        }
        return eachValue
      }),
    }))
  }

  isActive = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  getFilteredList = () => {
    const {appointmentList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentList.filter(eachId => eachId.isStarred === true)
    }
    return appointmentList
  }

  render() {
    const {appointmentList, isFilterActive} = this.state
    const changeColorOfTheButton = isFilterActive ? 'purple' : 'white'
    const {title, formattedDate, id} = appointmentList
    const filteredList = this.getFilteredList()

    return (
      <div className="appContainer">
        <div className="whiteContainer">
          <h1 className="heading">Add Appointment</h1>
          <div className="imageHolder">
            <form onSubmit={this.addAppointment} className="form">
              <label className="titleHeading" htmlFor="titleInput">
                TITLE
              </label>
              <input
                type="text"
                className="inputTitle"
                placeholder="Title"
                onChange={this.title}
                id="titleInput"
                value={title}
              />
              <label className="titleHeading" htmlFor="dateEnter">
                DATE
              </label>
              <input
                type="date"
                className="inputTitle"
                onChange={this.date}
                id="dateEnter"
                value={formattedDate}
              />
              <button className="addButton" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              alt="appointments"
              className="photo"
            />
          </div>
          <hr className="line" />
          <div className="belowLine">
            <h1 className="heading">Appointments</h1>
            <button
              className={`starredButton ${changeColorOfTheButton}`}
              type="button"
              onClick={this.isActive}
            >
              Starred
            </button>
          </div>
          <ul className="appointmentContainer">
            {filteredList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                eachAppointment={eachAppointment}
                changeTheColorOfTheStar={this.changeTheColorOfTheStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
