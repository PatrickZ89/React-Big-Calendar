import React from 'react'
import BigCalendar from 'react-big-calendar'
import events from '../events'
import ExampleControlSlot from '../ExampleControlSlot'

const propTypes = {}

class Selectable extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = { events }
  }

  handleMouseUp = ({ start, end }) => {
    // this is where a new event will be created. The start and end
    // are taken from the user's mouse drag.
    console.log('the user has dragged a box. Its from ', start, ' to', end)
  }

  render() {
    const { localizer } = this.props
    return (
      <>
        <BigCalendar
          selectable
          localizer={localizer}
          events={this.state.events}
          defaultView={BigCalendar.Views.MONTH}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2015, 3, 12)}
          onSelectEvent={this.onEventSelected}
          onSelectSlot={this.handleMouseUp}
        />
      </>
    )
  }

  onEventSelected = event => {
    console.log('hi wow you selected', event)
    // render the event to some component, or put it in redux
  }
}

Selectable.propTypes = propTypes

export default Selectable
