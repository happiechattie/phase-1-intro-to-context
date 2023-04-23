function createEmployeeRecord(array){
    const employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    
    return employee;
}

function createEmployeeRecords(array){
    // const employeeRecords = [];
    // for (i = 0; i < array.length; i++){
    //     const employee = createEmployeeRecord(array[i]);
    //     employeeRecords.push(employee);
    // }
    // return employeeRecords;

    return array.map(element => createEmployeeRecord(element));
}


function createTimeInEvent(record, date){
    const dateArray = date.split(" ");
    
    const timeIn = {
        type: "TimeIn",
        hour: parseInt(dateArray[1]),
        date: dateArray[0]
    }

    record.timeInEvents.push(timeIn);
    
    return record;
}

function createTimeOutEvent(record, date){
    const dateArray = date.split(" ");
    
    const timeOut = {
        type: "TimeOut",
        hour: parseInt(dateArray[1]),
        date: dateArray[0]
    }

    record.timeOutEvents.push(timeOut);
    
    return record;
}

function hoursWorkedOnDate(employeeObject, date){
    // const timeArray = employeeObject.timeInEvents;
    // let hourIn;
    // let hourOut;
    // let i;
    // for (time of timeArray){
    //     if (time.date === date){
    //         hourIn = time.hour;
    //         i = timeArray.indexOf(time);
    //     }
    //     hourOut = employeeObject.timeOutEvents[i].hour;
    // }
    // return ((hourOut - hourIn) / 100);

    const timeIn = employeeObject.timeInEvents.find(d => (d.date === date));
    const timeOut = employeeObject.timeOutEvents.find(d => (d.date === date));
    const hoursWorkedOnDate = ((timeOut.hour - timeIn.hour) / 100);
    return hoursWorkedOnDate;
}

function wagesEarnedOnDate(employeeObject, date){
    return hoursWorkedOnDate(employeeObject, date) * employeeObject.payPerHour;
}

function allWagesFor(employeeObject){
    let total = 0;
    for (let inEvent of employeeObject.timeInEvents){
        total += wagesEarnedOnDate(employeeObject, inEvent.date);
    }
    return total;
}

function calculatePayroll(employeeArray){
    let total = 0;
    for (let employee of employeeArray){
        total += allWagesFor(employee);
    }
    return total;
}

const testEmployee = createEmployeeRecord(["Julius", "Caesar", "General", 1000]);
createTimeInEvent(testEmployee, "0044-03-15 0900");
createTimeOutEvent(testEmployee, "0044-03-15 1100");
createTimeInEvent(testEmployee, "0044-03-16 0900");
createTimeOutEvent(testEmployee, "0044-03-16 1100");
hoursWorkedOnDate(testEmployee, "0044-03-15");
allWagesFor(testEmployee);