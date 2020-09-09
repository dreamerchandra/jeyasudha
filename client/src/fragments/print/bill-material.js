import React from 'react'
import { floatToMoney } from '../../js/helper/utils'

const BillMaterials = ({ billDetails }) => (
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
          <td className="no">01</td>
          <td className="text-left">
            <h3>{billDetails.orderDetails.particularDetails.uniqueName}</h3>
          </td>
          <td className="unitRs text-right">
            Rs.
            {floatToMoney(billDetails.orderDetails.particularDetails.actualPrice)}
          </td>
          <td className="qty">{billDetails.orderDetails.unit}</td>
          <td className="total">
            Rs.{floatToMoney(billDetails.orderDetails.total)}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="2" />
          <td colSpan="2">SUBTOTAL</td>
          <td className="text-center">Rs.{floatToMoney(billDetails.subTotal)}</td>
        </tr>
        <tr>
          <td colSpan="2" />
          <td colSpan="2">CGST 5%</td>
          <td className="text-center">Rs.{floatToMoney(billDetails.cgstTotal)}</td>
        </tr>
        <tr>
          <td colSpan="2" />
          <td colSpan="2">SGST 5%</td>
          <td className="text-center">Rs.{floatToMoney(billDetails.sgstTotal)}</td>
        </tr>
        <tr>
          <td colSpan="2" />
          <td colSpan="2">GRAND TOTAL</td>
          <td className="text-center">Rs.{floatToMoney(billDetails.grandTotal)}</td>
        </tr>
      </tfoot>
    </table>
  </div>
)

export default BillMaterials
