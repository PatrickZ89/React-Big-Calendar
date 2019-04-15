import React from 'react'
import Api from './Api'
import Intro from './Intro.md'
import { render } from 'react-dom'
import Layout from 'react-tackle-box/Layout'

import localizer from 'react-big-calendar/lib/localizers/globalize'
import globalize from 'globalize'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import 'react-big-calendar/lib/less/styles.less'
import './styles.less'
import './prism.less'
import Card from './Card'
import ExampleControlSlot from './ExampleControlSlot'
import Basic from './demos/basic'
import Selectable from './demos/selectable'
import Cultures from './demos/cultures'
import Popup from './demos/popup'
import Rendering from './demos/rendering'
import CustomView from './demos/customView'
import Resource from './demos/resource'
import DndResource from './demos/dndresource'
import Timeslots from './demos/timeslots'
import Dnd from './demos/dnd'
import Dropdown from 'react-bootstrap/lib/Dropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'

const globalizeLocalizer = localizer(globalize)

let demoRoot =
  'https://github.com/intljusticemission/react-big-calendar/tree/master/examples/demos'

// All the options as they will appear on the DOM
const EXAMPLES = {
  basic: 'Basic Calendar',
  selectable: 'Create events',
  popup: 'Show more via a popup',
  timeslots: 'Custom Time Grids',
  rendering: 'Customized Component Rendering',
  resource: 'Resource Scheduling',
  dnd: 'Addon: Drag and drop',
}

const DEFAULT_EXAMPLE = 'basic'

class Example extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      selected: DEFAULT_EXAMPLE,
    }
  }

  select = selected => {
    this.setState({ selected })
  }

  componentDidMount() {
    const hash = (window.location.hash || '').slice(1)
    this.select(hash || DEFAULT_EXAMPLE)
  }

  render() {
    let selected = this.state.selected
    let Current = {
      basic: Basic,
      selectable: Selectable,
      popup: Popup,
      rendering: Rendering,
      resource: Resource,
      timeslots: Timeslots,
      dnd: Dnd,
      dndresource: DndResource,
    }[selected]

    return (
      <div className="app">
        <div className="examples">
          <Card className="examples--header">
            <Layout
              align="center"
              justify="space-between"
              style={{ marginBottom: 15 }}
            >
              <Dropdown
                pullRight
                id="examples-dropdown"
                className="examples--dropdown"
              >
                <Dropdown.Toggle bsStyle="link" className="dropdown--toggle ">
                  {EXAMPLES[selected]}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {Object.entries(EXAMPLES).map(([key, title]) => (
                    <MenuItem
                      active={this.state.selected === key}
                      key={key}
                      href={`#${key}`}
                      onClick={() => this.select(key)}
                    >
                      {title}
                    </MenuItem>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Layout>
            <ExampleControlSlot.Outlet />
          </Card>
          <div className="example">
            <Current localizer={globalizeLocalizer} />
          </div>
        </div>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  render(<Example />, document.getElementById('app'))
})
