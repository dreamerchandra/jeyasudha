import React from 'react'

const BillMaterials = () => (
  <div className="bill">
    <table border="0" cellSpacing="0" cellPadding="0" className="bill-table">
      <thead>
        <tr>
          <th>#</th>
          <th className="text-center">DESCRIPTION</th>
          <th className="text-right">UNIT PRICE</th>
          <th className="text-right">QUANTITY</th>
          <th className="text-center">TOTAL</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="no">04</td>
          <td className="text-left">
            <h3>Sand & Cement</h3>
          </td>
          <td className="unit">Rs.0.00</td>
          <td className="qty">100</td>
          <td className="total">Rs.0.00</td>
        </tr>
        <tr>
          <td className="no">01</td>
          <td className="text-left">
            <h3>Blue marble & tiling</h3>
          </td>
          <td className="unit">Rs.40.00</td>
          <td className="qty">30</td>
          <td className="total">Rs.1,200.00</td>
        </tr>
        <tr>
          <td className="no">02</td>
          <td className="text-left">
            <h3>Fabrication and transportation</h3>
          </td>
          <td className="unit">Rs.40.00</td>
          <td className="qty">80</td>
          <td className="total">Rs.3,200.00</td>
        </tr>
        <tr>
          <td className="no">03</td>
          <td className="text-left">
            <h3>Misc</h3>
          </td>
          <td className="unit">Rs.40.00</td>
          <td className="qty">20</td>
          <td className="total">Rs.800.00</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="2" />
          <td colSpan="2">SUBTOTAL</td>
          <td className="text-center">Rs.5,200.00</td>
        </tr>
        <tr>
          <td colSpan="2" />
          <td colSpan="2">TAX 25%</td>
          <td className="text-center">Rs.1,300.00</td>
        </tr>
        <tr>
          <td colSpan="2" />
          <td colSpan="2">GRAND TOTAL</td>
          <td className="text-center">Rs.6,500.00</td>
        </tr>
      </tfoot>
    </table>
  </div>
)

export default BillMaterials
