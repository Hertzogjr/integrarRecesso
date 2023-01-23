// VARIABLES
const startDate = document.querySelector("#startDate")
const endDate = document.querySelector("#endDate")
const salary = document.querySelector("#salary")
const calculate = document.querySelector("#calculate")

const workedDays = document.querySelector("#workedDays")
const salaryPerDay = document.querySelector("#salaryPerDay")
const vacationQuantity = document.querySelector("#vacationQuantity")
const vacationValue = document.querySelector("#vacationValue")

const data = {}

// ---------------------------------------------------------------

$("#salary").maskMoney({prefix:'R$ ', allowNegative: false, thousands:'.', decimal:',', affixesStay: false});

calculate.addEventListener("click", (e) => {
  e.preventDefault()

  if (startDate.value == "" || !startDate) {
    startDate.focus();
    startDate.value = "";
    alert('Data de início não informada');
    return;
  };

  if (endDate.value == "" || !endDate) {
    endDate.focus();
    endDate.value = "";
    alert('Data de término não informada');
    return;
  };

  if (endDate.value <= startDate.value) {
    endDate.focus();
    endDate.value = "";
    alert('Data de término não pode ser menor que a data de início');
    return;
  };

  if (salary.value == "" || salary.value == 0 || !salary) {
    salary.focus();
    salary.value = 0;
    alert('Valor da bolsa não informado');
    return;
  };

  data["startDate"] = startDate.value;
  data["endDate"] = endDate.value;
  data["salary"] = salary.value;

  function realToDolar(num){
    num = num.replace('.', '');
    num = num.replace(',', '.');
    return num
}

  // Bolsa por dia
  const treatedValue = data["salary"].replace(/R\$/, "")
  const dolar = realToDolar(treatedValue)
  const valuePerDay = (Number(dolar) / 30).toFixed(2);

  var formatedValue = Number(valuePerDay).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  document.getElementById("salaryPerDay").innerHTML = formatedValue;

  //Diferença de datas
  let data1 = data['startDate'];
  let data2 = data['endDate'];

  //Quebrar as datas para montar no formato certo
  const dataSplit1 = data1.split('-');
  const dataSplit2 = data2.split('-');

  const day1 = dataSplit1[2]; // 30
  const day2 = dataSplit2[2]; // 30

  const month1 = dataSplit1[1]; // 03
  const month2 = dataSplit2[1]; // 03

  const year1 = dataSplit1[0]; // 2019
  const year2 = dataSplit2[0]; // 2019

  // Agora podemos inicializar o objeto Date, lembrando que o mês começa em 0, então fazemos -1.
  data1 = new Date(year1, month1 - 1, day1);
  data2 = new Date(year2, month2 - 1, day2);

  const difference = Math.abs(data2 - data1);

  const days = parseInt(difference / 86400000 + 1);

  document.getElementById("workedDays").innerHTML = `${days} dia${days === 1 ? "" : "s"}`;

  // Folga
  let diasEstagiados = days;
  let diasAno = 360
  let gozoCompleto = 30
  let recessoAGozar = (diasEstagiados * gozoCompleto) / diasAno;
  const resRecesso = recessoAGozar = Math.round(recessoAGozar)
  document.getElementById("vacationQuantity").innerHTML = resRecesso + " dia" + (resRecesso !== 1 ? 's' : '')

  // Recesso
  const recesso = resRecesso;
  const valorRecessoPrevisto = (resRecesso * valuePerDay);
  var valorFormatado = valorRecessoPrevisto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  
  document.getElementById("vacationValue").innerHTML = valorFormatado

  const resultContainer = document.querySelector(".result-container").classList.remove("hidden")
  
  $('html, body').animate({
    scrollTop: $(".result-container").offset().top
  });
})

