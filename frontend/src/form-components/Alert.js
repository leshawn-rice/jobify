import './Alert.css';

const Alert = ({ alerts = [] }) => {

  const closeAlert = (evt) => {
    setTimeout(() => {
      evt.target.parentElement.style.display = 'none'; // Pushes any following alerts into the current spot
    }, 1000);
    evt.target.parentElement.style.opacity = '0%';
  }

  if (alerts.length > 0) {
    return (
      <>
        {alerts.map(alert => (
          <div key={alert.message} className={`Alert ${alert.type}`}>
            <p>{alert.message}</p>
            <button onClick={closeAlert} className="Alert-Close">X</button>
          </div>
        ))}
      </>
    )
  }
  else {
    return <></>;
  }
}

export default Alert;