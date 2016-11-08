import React from 'react'
import {formatPrice} from '../helpers'

class Order extends React.Component {
  renderOrder(key) {
    const { fishes, order } = this.props
    const fish = fishes[key]
    const count = order[key]
    const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

    if (!fish || fish.status === 'unavailable') {
      return <li key={key}>Sorry, Fish is no longer available! {removeButton}</li>
    }

    return (
      <li key={key}>
        <span> {count}lbs {fish.name} {removeButton} </span>
        <span className='price'> {formatPrice(count * fish.price)} </span>
      </li>
    )
  }

  render() {
    const { order, fishes } = this.props
    const orderIds = Object.keys(order)
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = fishes[key]
      const count = order[key]
      const isAvailable = fish && fish.status === 'available'
      if (isAvailable) {
        return prevTotal + (count * fish.price || 0)
      }
      return prevTotal
    }, 0)

    return(
      <div className='order-wrap'>
        <h2> Your Order </h2>
        <ul className='order'>
          {orderIds.map((key) => this.renderOrder(key))}
          <li className='total'>
            <strong> Total: </strong>
            {formatPrice(total)}
          </li>
        </ul>
      </div>
    )
  }
}

export default Order
