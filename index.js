import express from "express";

const app = express();

const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "1/3/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" },
];

const today = new Date();
const todayString = today.toLocaleDateString();


app.get("/holidays", (request, response) => {
    response.send(holidays);
})

app.get("/is-today-holiday", (request, response) => {
    response.send(compareDates(todayString, holidays));
})

app.get("/holidays/:idMonth", (request, response) => {
    const idMonth = request.params.idMonth

    response.send(compareMonths(idMonth, holidays));
})

app.listen(5000, () => {
    console.log("Server working fine...")
})

function formatDate(date) {
    const brazilianDate = date.split("/", 2).reverse().join("/").concat(date.slice(-5))
    return brazilianDate;
}

function compareDates(today, holidays) {
    const holidayName = holidays.find((item) => formatDate(item.date) === today);
    return holidayName !== undefined ? `Sim, hoje é ${holidayName.name}` : `Não, hoje não é feriado`;
}

function compareMonths(month, holidays) {
    const holidayName = holidays.filter((item) => returnMonths(item.date) === month);
    return holidayName.length > 0 ? holidayName : `Não tem feriado esse mês`;
}

function returnMonths(date) {
    const month = date.split("/", 1).join("");
    return month;
}