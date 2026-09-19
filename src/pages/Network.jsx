import { useEffect } from 'react'
import User from '../components/User.jsx'
import { Row, Col, ListGroup, Tab } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { fetchNetwork, fetchConnections } from '../store/actions/network.js'

function Network() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.network.users)
  const connections = useSelector((state) => state.network.connections)
  const receivedRequests = useSelector((state) => state.network.receivedRequests)
  const sentRequests = useSelector((state) => state.network.sentRequests)

  useEffect(() => {
    dispatch(fetchNetwork())
    dispatch(fetchConnections())
  }, [dispatch])

  return (
    <div className='text-center'>
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
      <Row>
        <Col sm={4}>
          <ListGroup>
            <ListGroup.Item action href="#link1">
              Suggestions
            </ListGroup.Item>
            <ListGroup.Item action href="#link2">
              Connections
            </ListGroup.Item>
            <ListGroup.Item action href="#link3">
              Received Requests
            </ListGroup.Item>
            <ListGroup.Item action href="#link4">
              Sent Requests
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={8}>
          <Tab.Content>
            <Tab.Pane eventKey="#link1">
              <Row className="gx-4 gy-4">

                {users.map((user) => (
                  <Col key={user._id} xl={3} lg={4} md={6} className="mb-4">
                    <User user={user} />
                  </Col>
                ))}
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="#link2">
            <Row className="gx-4 gy-4">
                {connections.map((user) => (
                  <Col key={user._id} xl={3} lg={4} md={6} className="mb-4">
                    <User user={user} />
                  </Col>
                ))}
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="#link3">
              <Row className="gx-4 gy-4">
                {receivedRequests.map((user) => (
                  <Col key={user._id} xl={3} lg={4} md={6} className="mb-4">
                    <User user={user} />
                  </Col>
                ))}
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="#link4">
            <Row className="gx-4 gy-4">
                {sentRequests.map((user) => (
                  <Col key={user._id} xl={3} lg={4} md={6} className="mb-4">
                    <User user={user} />
                  </Col>
                ))}
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    </div>
  );
}

export default Network;