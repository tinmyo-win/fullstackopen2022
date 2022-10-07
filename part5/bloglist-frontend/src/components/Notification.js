const Notification = ( { message, color='green' }) => {
  const notiCss = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notiCss} className='notification' >{message}</div>
  )
}

export default Notification