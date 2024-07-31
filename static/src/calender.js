async function queryData() {
    try {
        const response = await fetch("/query/calander");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching data", error);
    }
}

document.addEventListener("DOMContentLoaded", async function() {
    $("#calendar").evoCalendar({
        theme: "Midnight Blue",
        calendarEvents: await queryData(),
        todayHighlight: true
    });
})
