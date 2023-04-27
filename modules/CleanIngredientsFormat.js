export default function CleanIngredientsFormat(
  quantity,
  unit,
  name,
  portion,
  counter
) {
  if (
    typeof quantity === "undefined" ||
    quantity === null ||
    quantity === 0 ||
    quantity === "null" ||
    isNaN(quantity)
  ) {
    return name;
  } else if (
    !(
      typeof quantity === "undefined" ||
      quantity === null ||
      quantity === 0 ||
      quantity === "null" ||
      isNaN(quantity)
    ) &&
    (typeof unit === "undefined" ||
      unit === null ||
      unit === 0 ||
      unit === "null")
  ) {
    let quantities = (+quantity / +portion) * +counter;
    if (Number.isInteger(quantity)) {
      return `${quantities.toFixed(0)} de ${name}`;
    } else {
      return `${quantities.toFixed(1)} ${name}`;
    }
  } else {
    let quantities = (+quantity / +portion) * +counter;
    if (Number.isInteger(quantities)) {
      return `${quantities.toFixed(0)} ${unit} de ${name}`;
    } else {
      return `${quantities.toFixed(1)} ${unit} de ${name}`;
    }
  }
}
