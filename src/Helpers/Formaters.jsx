const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})
function formateUSD(price){
  price = parseFloat(price)
  return(formatter.format(price))
}
export default formateUSD