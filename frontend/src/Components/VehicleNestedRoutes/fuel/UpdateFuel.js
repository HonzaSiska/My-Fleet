import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { formatDate} from '../../../utils/utils'

const UpdateFuel = () => {
  const { id } = useParams()
  const { fuelId } = useParams()

  const [date, setDate] = useState('')
  const [amount, setAmount] = useState(0)
  const [price, setPrice] = useState(0)
  const [location, setLocation] = useState('')
  const [units, setUnits] = useState('liters')
  const [error, setError] = useState(null)
  const { user } = useAuthContext()

  const [validator, setValidator] = useState({
    date: false,
    amount: false,
    location: false,
    price: false,
    units: true,

  })
  const navigate = useNavigate()

  //  remove tab highlights
  const links = document.querySelectorAll('.tab')
  links.forEach(link => {
    console.log(link)
    link.classList.remove('tab-active')

  })

  useEffect(() => {


    const fetchFuel = async () => {
      const response = await fetch(`/api/fuel/${fuelId}`, {
        headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' },
        method: 'POST',
      })

      const json = await response.json()

      if (json.success) {

        const { fuel } = json

        console.log('received fuel', fuel)

        // convert to date 
        const newDate = new Date(fuel.date)

        fuel.date && setDate(formatDate(newDate))
        fuel.amount && setAmount(fuel.amount)
        fuel.price && setPrice(fuel.price)
        fuel.units && setUnits(fuel.units)
        fuel.location && setLocation(fuel.location)
  
        setError('')


        //set all validfators to true to et rid of validation messages
        // for (let key in validator) {
        //     console.log([key])
        //     validator[key] = true
        // }
      
    
        fuel.date && setValidator(validator.date = true)
        fuel.amount && setValidator(validator.amount = true)
        fuel.price && setValidator(validator.price = true)
        fuel.units && setValidator(validator.units = true)
        fuel.location && setValidator(validator.location = true)

        console.log('validator after fetch', validator)


      }
    }

    if (user) {
      fetchFuel()
    }

  }, [user, fuelId])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      validator.date === false ||
      validator.amount === false ||
      validator.price === false ||
      validator.location === false ||
      validator.units === false
    ) {
      return
    }

    const fuel = { _id: fuelId, date, amount, price, location, units }

    const response = await fetch('/api/fuel/update', {
      method: 'POST',
      body: JSON.stringify(fuel),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()
    console.log('rsesponse', json)

    if (!json.success) {
      setError(json.error)
    }

    if (json.success) {
      setLocation('')
      setDate('')
      setAmount('')
      setPrice('')
      setValidator(prev => ({ ...prev, location: false, date: false, amount: false, price: false }))
      navigate(`/vehicle/${id}/fuel/all`)
    }

  }

  const handleDateChange = (value) => {
    setDate(value)
    setValidator(prev => ({ ...prev, date: true }))
  }

  const handleLocationChange = (value) => {
    setLocation(value)
    if (value) {
      setValidator(prev => ({ ...prev, location: true }))
    } else {
      setValidator(prev => ({ ...prev, location: false }))
    }
  }

  const handleAmountChange = (value) => {
    setAmount(value)

    if (value && !isNaN(value)) {
      setValidator(prev => ({ ...prev, amount: true }))
    }
    if (value && isNaN(value)) {
      setValidator(prev => ({ ...prev, amount: false }))
    }
    if (!value) {
      setValidator(prev => ({ ...prev, amount: false }))
    }

  }
  const handlePriceChange = (value) => {
    setPrice(value)

    if (value && !isNaN(value)) {
      setValidator(prev => ({ ...prev, price: true }))
    }
    if (value && isNaN(value)) {
      setValidator(prev => ({ ...prev, price: false }))
    }
    if (!value) {
      setValidator(prev => ({ ...prev, price: false }))
    }

  }

  const handleUnitsChange = (value) => {
    setUnits(value)
    setValidator(prev => ({ ...prev, units: true }))
  }

  return (
    <div>
      <div className='form-wrapper'>
        <form onSubmit={handleSubmit} className='form-content'>
          {error &&
            (
              <div className='error'>
                <span>{error}</span>
              </div>
            )
          }
          <label>Date</label>
          <br />
          <input
            type='date'
            onChange={((e) => { handleDateChange(e.target.value) })}
            value={date}
          />
          <div className='validator'>
            <span>{(validator.date == '') && <span>{`* Required`}</span>}</span>
          </div>
          <label>Location</label>
          <br />
          <input
            type='text'
            onChange={((e) => { handleLocationChange(e.target.value) })}
            value={location}
          />
          <div className='validator'>
            <span>{(validator.location  == '') && <span>{`* Required`}</span>}</span>
          </div>
          <label>Amount</label>
          <br />
          <input
            type='number'
            onChange={((e) => { handleAmountChange(e.target.value) })}
            value={amount}
          />
          <div className='validator'>
            <span>{(validator.amount == '') && <span>{`* Required, must be a number !!`}</span>}</span>
          </div>
          <label>Price</label>
          <br />
          <input
            type='number'
            onChange={((e) => { handlePriceChange(e.target.value) })}
            value={price}
          />
          <div className='validator'>
            <span>{(validator.price  == '') && <span>{`* Required, must be u number !!`}</span>}</span>
          </div>
          <label>Units</label>
          <br />
          <div className='input-wrapper'>
            <select style={{ width: '200px' }} onChange={(e) => handleUnitsChange(e.target.value)} value={units}>

              <option>Liters</option>
              <option>Gallons</option>

            </select>
          </div>



          <button
            className='submit-button'
            type='submit' disabled=
            {
              (
                validator.amount === false ||
                validator.location === false ||
                validator.date === false ||
                validator.price === false
                ? true : false
              )
            }
            style={{
              opacity:
                (
                  validator.amount === false ||
                  validator.location === false ||
                  validator.date === false ||
                  validator.price === false
                  ? '0.1' : '1'
                )

            }}

          >Submit</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateFuel