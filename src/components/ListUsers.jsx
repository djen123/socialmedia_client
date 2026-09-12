

const listUsers = () => {
  return (
    <>
    <h1 className='display-4'>welcome to full stack app</h1>
      {/** pass fetchUsers as props as it updates when new user is added and can be displayed at the same time */}
      <AddNewUser fetchUsers = {fetchUsers}/>
      <Row>
        {/* map each user and create a column for user with users info
         */}
        {
          users.map((user)=>(
            <Col key = {user._id} xl={3} lg={4}md={6} className='mt-4'>

            {/* send user as props*/}
            <User user ={user} fetchUsers = {fetchUsers}/>
            </Col>
          ))

        }
       
      </Row>
      </>
  )
}

export default listUsers
